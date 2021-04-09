<template>
  <div class="W100 box-v-center">
    <div v-show="blankDetail.showAddTopic" class="addBlankCss box-start align-stretch Pt-20 Pb-20 gray-dark Mb-20">
      <div style="width:80%" class="box-v-start ">
        <div class="box-justify Mb-16 align-stretch" style="width:80%">
          <div class="Mr-20">[填空题]</div>
          <div class="rest">
            <div class="box-start blankCssInput">
              <el-button size="mini" type="primary" class="Mr-10" @click="setBlank">设为空格</el-button>
              <div>输入完整题目后，选中需要填空的文字点击“设为空格”</div>
            </div>
            <textarea ref="textarea" v-model="blankDetail.name" rows="3" class="textareaCss"/>
            <div style="line-height: 20px;width:90%" class="Mb-20">预览效果：{{ blankDetail.name2 }}</div>
            <div v-for="(item,index) in answer" :key="index" class="box-start-wrap Mb-10">
              <div>空格{{ index+1 }}：{{ item }}</div>
              <div class="mousePointer Ml-10 C4598E8" @click="deleteBlank(index)">取消空格</div>
            </div>
          </div>
          <div v-if="paperQus">
            <div class="Mb-10">分值：<input v-model="blankDetail.score" class="scoreInput">分</div>
            <!-- <div>每空：<input v-model="blankDetail.score" class="scoreInput">分</div> -->
          </div>
        </div>
        <el-collapse style="width:80%" @change="handleChange">
          <el-collapse-item title="添加解析" name="1">
            <el-input
              :autosize="{ minRows: 2, maxRows: 4}"
              v-model="blankDetail.analysis"
              style="width:100%"
              type="textarea"
              placeholder="请输入题目解析"
            />
          </el-collapse-item>
        </el-collapse>
        <!-- <div class="box-start Mt-10" style="width:80%">
          <div>关键字：</div><addBTags :tags-arr="blankDetail.keyWord"/>
        </div> -->
        <div class="box-start Mt-10" style="width:80%">
          <div>题库类别：</div>
          <el-cascader
            :options="treeDataList"
            :props= "$defaulTcategory()"
            :show-all-levels="false"
            v-model="blankDetail.knowledgeType"
            style="width:150px"
            placeholder="试试搜索"
            filterable
            clearable
            change-on-select
            class="formSelect Ml-10"/>
        </div>
      </div>
      <div class="toolBtn box-v-center align-stretch rest">
        <div class="saveBtn box-center mousePointer" style="margin-bottom:28px" @click="saveTopic">保存</div>
        <div class="deleteBtn box-center mousePointer" @click="cancleBlank">取消</div>
      </div>
    </div>
    <div v-show="!blankDetail.showAddTopic" class="blankCss box-start gray-dark align-stretch Mb-20">
      <slot name="itemOrder"/>
      <div class="rest blankDetail">
        <div class="box-justify Mb-30">
          <div class="rest">{{ blankDetail.name2 | blankFilter }}</div>
          <div v-if="paperQus">
            <div>分值：{{ blankDetail.score }}分</div>
            <!-- <div>每空：{{ blankDetail.score }}分</div> -->
          </div>
        </div>
        <div v-for="(item2, index2) in blankDetail.answer" :key="index2" class="box-start Mb-20">
          <div class="Mr-10 gray-medium box-start "><div class="circle Mr-10"/>第{{ index2+1 }}空:</div>
          <div>"{{ item2 }}"</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Url from '@/api/url'
import addBTags from '@/components/addBTags'
export default {
  name: 'BBlankQuestion',
  components: { addBTags },
  props: {
    topicObj: {
      type: Object,
      default: null
    },
    paperQus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      aa: null,
      showAddTopic: false,
      blankDetail: null,
      // blankDetail: {
      //   analysis: null,
      //   answer: null,
      //   stem: null,
      //   score: null,
      //   showAddTopic: false,
      //   type: null,
      //   name: null,
      //   name2: null,
      //   blankAnswer: [],
      //   blankName: [],
      //   opitions: [],
      //   keyWord: [],
      //   knowledgeType: []
      // },
      answer: []
    }
  },
  computed: {
    treeDataList() {
      return this.$store.getters.chapterType
    }
  },
  watch: {
    topicObj: {
      deep: true,
      handler(newValue, oldValue) {
        this.blankDetail = this.$copy(newValue)
        if (this.blankDetail.answer.length > 0) { // 判断是否已经有空，来控制其编辑问题
          this.answer = this.$copy(this.blankDetail.answer)
        }
      }
    },
    'blankDetail.name'(newValue, oldValue) {
      this.blankDetail.name2 = newValue.replace(/\{{(.+?)\}}/g, '_______')
    }
  },
  created() {
    this.blankDetail = this.$copy(this.topicObj)
    if (this.blankDetail.answer.length > 0) {
      this.answer = this.$copy(this.blankDetail.answer)
    }
    console.log('填空1', this.topicObj)
    console.log('填空2', this.blankDetail)
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    saveTopic() {
      if (this.$isNull(this.blankDetail.stem)) {
        this.$message('请先填写题目标题')
        return
      }
      if (this.blankDetail.length < 1) {
        this.$message('请先新增选项个数')
        return
      }
      var temp1 = this.$copy(this.blankDetail)
      var temp2 = this.$copy(this.topicObj)
      delete temp1.score
      delete temp2.score
      if (this.$objIsEqual(temp1, temp2) && temp1.answer === temp2.answer) {
        if (temp1.knowledgeType[temp1.knowledgeType.length - 1] === temp2.knowledgeType[temp2.knowledgeType.length - 1]) {
          console.log('未修改')
          this.blankDetail.showAddTopic = false
          this.$emit('saveTopic', this.$copy(this.blankDetail))
        } else {
          this.$post(Url.examquestions.isUsed, { id: this.blankDetail.id }).then(data => {
            if (data.data === 1) {
              this.$confirm('修改过后的题目将添加到试题库是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.updateTopic('add')
              }).catch(() => {
                console.log('11')
              })
            } else {
              this.updateTopic('update')
            }
          })
        }
      } else {
        console.log('已修改')
        this.$post(Url.examquestions.isUsed, { id: this.blankDetail.id }).then(data => {
          if (data.data === 1) {
            this.$confirm('修改过后的题目将添加到试题库是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.updateTopic('add')
            }).catch(() => {
              console.log('11')
            })
          } else {
            this.updateTopic('update')
          }
        })
      }
    },
    updateTopic(type) {
      const params = {
        id: this.blankDetail.id,
        analysis: this.blankDetail.analysis,
        answer: JSON.stringify(this.answer),
        metas: null,
        score: this.blankDetail.score || 0,
        stem: this.blankDetail.name2.replace(/_______/g, '{{}}'),
        type: 'FILL_BLANK',
        categoryId: this.$isNull(this.blankDetail.knowledgeType) ? null : this.blankDetail.knowledgeType[this.blankDetail.knowledgeType.length - 1]
      }
      if (type === 'add') {
        this.$post(Url.examquestions.add, params).then(data => {
          console.log(data)
          this.$message.success('编辑成功')
          this.blankDetail.showAddTopic = false
          this.blankDetail.answer = JSON.parse(data.data.answer)
          this.blankDetail.id = data.data.id
          this.blankDetail.name2 = data.data.stem.replace(/{{}}/g, '_______')
          this.$emit('saveTopic', this.$copy(this.blankDetail))
        })
      } else {
        this.$post(Url.examquestions.edit, params).then(data => {
          console.log(data)
          this.$message.success('编辑成功')
          this.blankDetail.name2 = data.data.stem.replace(/{{}}/g, '_______')
          this.blankDetail.answer = JSON.parse(data.data.answer)
          this.blankDetail.showAddTopic = false
          this.$emit('saveTopic', this.$copy(this.blankDetail))
        })
      }
    },
    cancleBlank() {
      this.blankDetail = this.$copy(this.topicObj)
      this.blankDetail.showAddTopic = false
      this.$emit('saveTopic', this.$copy(this.blankDetail))
    },
    setBlank() {
      var selectionStart = this.$refs.textarea.selectionStart
      var selectionEnd = this.$refs.textarea.selectionEnd
      if (selectionStart === selectionEnd) {
        this.$message('请选中文字')
        return
      }
      var text = window.getSelection().toString()
      if (text.indexOf('{{') !== -1 || text.indexOf('}}') !== -1) {
        this.$message('不允许这么操作，请先取消原空格')
        return
      }
      this.blankDetail.name = this.blankDetail.name.slice(0, selectionStart) + '{{' + this.blankDetail.name.slice(selectionStart)
      this.blankDetail.name = this.blankDetail.name.slice(0, selectionEnd + 2) + '}}' + this.blankDetail.name.slice(selectionEnd + 2)
      this.answer = []
      this.answer = this.$getBracketStr(this.blankDetail.name)
      console.log('answerStem', this.blankDetail.name)
    },
    deleteBlank(index) { // 撤销空格操作
      const tempStr = this.answer[index]
      var re = new RegExp('{{' + tempStr + '}}', 'g')
      this.blankDetail.name = this.blankDetail.name.replace(re, tempStr)
      this.blankDetail.name2 = this.blankDetail.name.replace(/\{{(.+?)\}}/g, '_______')
      this.answer.splice(index, 1)
    }
  }
}
</script>
<style scoped>
.addBlankCss{
  width: 80%;
  max-width: 1350px;
  min-width: 900px;
  /* height:341px; */
  background:rgba(251,251,251,1);
}
.blankCss{
  width: 80%;
  max-width: 1350px;
  background:white;
  border:1px solid rgba(203,203,203,1);
}
.saveBtn{
  width:70px;
  height:32px;
  background:rgba(61,83,230,1);
  border-radius:5px;
  color: white
}
.deleteBtn{
  width:70px;
  height:32px;
  border-radius:5px;
  border:1px solid rgba(51,51,51,1);
}
.scoreInput{
  width:40px;
  height:28px;
  border-radius:5px;
  border:1px solid rgba(203,203,203,1);
}
.scoreInput:focus{
  outline: none
}
.circle{
  width:12px;
  height:12px;
  border-radius: 50%;
  border:1px solid rgba(151,151,151,1);
}
.blankDetail{
  padding: 30px 70px
}

/* .blankInput{
  width:150px;
  padding-left: 10px;
  height:28px;
  border-radius:5px;
  border:1px solid rgba(203,203,203,1);
}
.blankInput:focus{
  outline: none
} */
/* ############填空 */
.blankCssInput{
    border: 1px solid #dadada;
    width:90%;
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
.textareaCss{
    width: 90%;
    padding:5px;
    line-height: 20px;
    border:1px solid #dadada;
    margin-bottom: 15px;
  }
  .textareaCss:focus{
    outline: none
  }
</style>

