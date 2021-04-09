<template>
  <div class="W100 box-v-center">
    <div v-show="answerDetail.showAddTopic" class="addAnswerCss box-start align-stretch Pt-20 Pb-20 gray-dark Mb-20">
      <div style="width:80%" class="box-v-start ">
        <div class="box-justify Mb-16 align-stretch" style="width:80%">
          <div class="Mr-20">[问答题]</div>
          <div class="rest">
            <el-input
              :autosize="{ minRows: 2, maxRows: 4}"
              v-model="answerDetail.stem"
              style="width:80%"
              type="textarea"
              placeholder="请输入题目标题"
            />
          </div>
          <div v-if="paperQus">分值：<input v-model="answerDetail.score" class="scoreInput">分</div>
        </div>
        <div class="box-justify Mb-16" style="width:80%">
          <div class="Mr-20 visibilityNone">[单选题]</div>
          <div class="rest box-start">
            <div class="box-start" style="width:80%">
              <el-input
                :autosize="{ minRows: 3, maxRows: 6}"
                v-model="answerDetail.answer"
                style="width:100%"
                type="textarea"
                placeholder="请输入答案"
              />
            </div>
            <div class="rest box-start visibilityNone">
              <div style="position:absolute;width:200px" class="box-distribute Ml-10">
                <div class="circle"/>
                <p>设为答案</p>
                <i class="el-icon-sort-up"/>
                <i class="el-icon-sort-down"/>
                <i class="el-icon-error"/>
              </div>
            </div>
          </div>
          <div class="visibilityNone">分值：<input class="scoreInput">分</div>
        </div>
        <el-collapse style="width:80%" @change="handleChange">
          <el-collapse-item title="添加解析" name="1">
            <el-input
              :autosize="{ minRows: 2, maxRows: 4}"
              v-model="answerDetail.analysis"
              style="width:100%"
              type="textarea"
              placeholder="请输入题目解析"
            />
          </el-collapse-item>
        </el-collapse>
        <!-- <div class="box-start Mt-10" style="width:80%">
          <div>关键字：</div><addBTags :tags-arr="answerDetail.keyWord"/>
        </div> -->
        <div class="box-start Mt-10" style="width:80%">
          <div>题库类别：</div>
          <el-cascader
            :options="treeDataList"
            :props= "$defaulTcategory()"
            :show-all-levels="false"
            v-model="answerDetail.knowledgeType"
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
        <div class="deleteBtn box-center mousePointer" @click="cancleAnswer">取消</div>
      </div>
    </div>
    <div v-show="!answerDetail.showAddTopic" class="answerCss box-start gray-dark align-stretch Mb-20">
      <slot name="itemOrder"/>
      <div class="rest answerDetail">
        <div class="box-justify Mb-30">
          <div class="rest">{{ answerDetail.stem }}</div>
          <div v-if="paperQus">分值：{{ answerDetail.score }}分</div>
        </div>
        <div class="Mb-30">参考答案：{{ answerDetail.answer }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import Url from '@/api/url'
import addBTags from '@/components/addBTags'
export default {
  name: 'BAnswerQuestion',
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
      answerDetail: null
    }
  },
  computed: {
    treeDataList() {
      return this.$store.getters.chapterType
    }
  },
  // computed: {
  //   answerDetail() {
  //     return this.topicObj
  //   }
  // },
  watch: {
    topicObj: {
      deep: true,
      handler(newValue, oldValue) {
        console.log('问答', newValue)
        this.answerDetail = this.$copy(newValue)
      }
    }
  },
  created() {
    this.answerDetail = this.$copy(this.topicObj)
    console.log('问答', this.topicObj)
    console.log('问答', this.answerDetail)
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    addOpition() {
      this.answerDetail.opitions.push({
        isAnswer: false,
        title: null,
        id: new Date().getTime()
      })
    },
    setAnswer(index) {
      for (let i = 0; i < this.answerDetail.opitions.length; i++) {
        if (index === i) {
          this.$set(this.answerDetail.opitions[i], 'isAnswer', true)
        } else {
          this.$set(this.answerDetail.opitions[i], 'isAnswer', false)
        }
      }
    },
    upItemOpition(index) {
      if (index === 0) {
        return
      }
      var tempOption = this.answerDetail.opitions[index - 1]
      this.$set(this.answerDetail.opitions, index - 1, this.answerDetail.opitions[index])
      this.$set(this.answerDetail.opitions, index, tempOption)
    },
    downItemOpition(index) {
      if (index === this.answerDetail.opitions.length - 1) {
        return
      }
      var tempOption = this.answerDetail.opitions[index + 1]
      this.$set(this.answerDetail.opitions, index + 1, this.answerDetail.opitions[index])
      this.$set(this.answerDetail.opitions, index, tempOption)
    },
    deleteOpition(index) {
      this.answerDetail.opitions.splice(index, 1)
    },
    saveTopic() {
      if (this.$isNull(this.answerDetail.stem)) {
        this.$message('请先填写题目标题')
        return
      }
      if (this.$isNull(this.answerDetail.answer)) {
        this.$message('请先填题目答案')
        return
      }
      var temp1 = this.$copy(this.answerDetail)
      var temp2 = this.$copy(this.topicObj)
      delete temp1.score
      delete temp2.score
      if (this.$objIsEqual(temp1, temp2)) {
        if (temp1.knowledgeType[temp1.knowledgeType.length - 1] === temp2.knowledgeType[temp2.knowledgeType.length - 1]) {
          console.log('未修改')
          this.answerDetail.showAddTopic = false
          this.$emit('saveTopic', this.$copy(this.answerDetail))
        } else {
          this.$post(Url.examquestions.isUsed, { id: this.answerDetail.id }).then(data => {
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
        this.$post(Url.examquestions.isUsed, { id: this.answerDetail.id }).then(data => {
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
        id: this.answerDetail.id,
        analysis: this.answerDetail.analysis,
        answer: this.answerDetail.answer,
        metas: null,
        score: this.answerDetail.score || 0,
        stem: this.answerDetail.stem,
        type: 'QUESTION',
        categoryId: this.$isNull(this.answerDetail.knowledgeType) ? null : this.answerDetail.knowledgeType[this.answerDetail.knowledgeType.length - 1]

      }
      if (type === 'add') {
        this.$post(Url.examquestions.add, params).then(data => {
          console.log(data)
          this.answerDetail.showAddTopic = false
          this.$message.success('编辑成功')
          this.answerDetail.id = data.data.id
          this.$emit('saveTopic', this.$copy(this.answerDetail))
        })
      } else {
        this.$post(Url.examquestions.edit, params).then(data => {
          console.log(data)
          this.answerDetail.showAddTopic = false
          this.$message.success('编辑成功')
          this.$emit('saveTopic', this.$copy(this.answerDetail))
        })
      }
    },
    cancleAnswer() {
      this.answerDetail = this.$copy(this.topicObj)
      this.answerDetail.showAddTopic = false
      this.$emit('saveTopic', this.$copy(this.answerDetail))
    }
  }
}
</script>
<style scoped>
.addAnswerCss{
  width: 80%;
  max-width: 1350px;
  min-width: 900px;
  /* height:341px; */
  background:rgba(251,251,251,1);
}
.answerCss{
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
.addOpition{
  height:32px;
  border-radius:5px;
  border:1px dashed rgba(203,203,203,1);
}
.answerDetail{
  padding: 30px 70px
}
.isAnswer{
  background-color:#EF684A;
  padding: 2px;
}
</style>

