<template>
  <div class="W100 box-v-center">
    <div v-show="singleDetail.showAddTopic" class="addSingleCss box-start align-stretch Pt-20 Pb-20 gray-dark Mb-20">
      <div style="width:80%" class="box-v-start ">
        <div class="box-justify Mb-16 align-stretch" style="width:80%">
          <div class="Mr-20">[单选题]</div>
          <div class="rest">
            <el-input
              ref="stemInput"
              :autosize="{ minRows: 2, maxRows: 4}"
              v-model="singleDetail.stem"
              style="width:80%"
              type="textarea"
              placeholder="请输入题目标题"
            />
          </div>
          <div v-if="paperQus">分值：<input v-model="singleDetail.score" class="scoreInput">分</div>
        </div>
        <div v-for="(item, index) in singleDetail.opitions" :key="item.id" class="box-justify Mb-16" style="width:80%">
          <div class="Mr-20 visibilityNone">[单选题]</div>
          <div class="rest box-start">
            <div class="box-start" style="width:80%">
              <div class="Mr-10 gray-medium box-start"><div class="circle Mr-10"/>{{ index+1 | convert }}</div>
              <el-input
                v-model="item.title"
                class="optionItemCss rest"
                placeholder="请输入选项内容"
              />
            </div>
            <div class="rest box-start">
              <div style="position:absolute;width:200px" class="box-distribute Ml-10">
                <div :class="{isAnswer:item.isAnswer}" class="circle mousePointer" @click="setAnswer(index)"/>
                <p class="mousePointer" @click="setAnswer(index)">设为答案</p>
                <i class="el-icon-sort-up mousePointer" @click="upItemOpition(index)"/>
                <i class="el-icon-sort-down mousePointer" @click="downItemOpition(index)"/>
                <i class="el-icon-error mousePointer" @click="deleteOpition(index)"/>
              </div>
            </div>
          </div>
          <div class="visibilityNone">分值：<input class="scoreInput">分</div>
        </div>
        <div class="box-justify Mb-16" style="width:80%">
          <div class="Mr-20 visibilityNone">[单选题]</div>
          <div class="rest box-start">
            <div class="box-start" style="width:80%">
              <div class="Mr-10 gray-medium box-start visibilityNone"><div class="circle Mr-10"/>A</div>
              <div class="rest addOpition box-center mousePointer gray-light" @click="addOpition">+添加选项</div>
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
              v-model="singleDetail.analysis"
              style="width:100%"
              type="textarea"
              placeholder="请输入题目解析"
            />
          </el-collapse-item>
        </el-collapse>
        <!-- <div class="box-start Mt-10" style="width:80%">
          <div>关键字：</div><addBTags :tags-arr="singleDetail.keyWord"/>
        </div> -->
        <div class="box-start Mt-10" style="width:80%">
          <div>题库类别：</div>
          <el-cascader
            :options="treeDataList"
            :props= "$defaulTcategory()"
            :show-all-levels="false"
            v-model="singleDetail.knowledgeType"
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
        <div class="deleteBtn box-center mousePointer" @click="cancleSingle">取消</div>
      </div>
    </div>
    <div v-show="!singleDetail.showAddTopic" class="singleCss box-start gray-dark align-stretch Mb-20">
      <slot name="itemOrder"/>
      <div class="rest singleDetail">
        <div class="box-justify Mb-30">
          <div class="rest">{{ singleDetail.stem }}</div>
          <div v-if="paperQus" >分值：{{ singleDetail.score }}分</div>
        </div>
        <div v-for="(item2, index2) in singleDetail.opitions" :key="item2.id" class="box-start Mb-20">
          <div class="Mr-10 gray-medium box-start "><div class="circle Mr-10"/>{{ index2+1 | convert }}</div>
          <div class="rest">{{ item2.title }} <span v-if="item2.isAnswer" style="color:#EF684A">（答案）</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Url from '@/api/url'
import addBTags from '@/components/addBTags'
export default {
  name: 'BSingleQuestion',
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
      singleDetail: null
    }
  },
  computed: {
    treeDataList() {
      return this.$store.getters.chapterType
    }
  },
  // computed: {
  //   singleDetail() {
  //     return this.topicObj
  //   }
  // },
  watch: {
    topicObj: {
      deep: true,
      handler(newValue, oldValue) {
        this.singleDetail = this.$copy(newValue)
      }
    }
  },
  created() {
    this.singleDetail = this.$copy(this.topicObj)
    console.log('单选', this.topicObj)
    console.log('单选', this.singleDetail)
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    addOpition() {
      this.singleDetail.opitions.push({
        isAnswer: false,
        title: null,
        id: new Date().getTime()
      })
    },
    setAnswer(index) {
      for (let i = 0; i < this.singleDetail.opitions.length; i++) {
        if (index === i) {
          this.$set(this.singleDetail.opitions[i], 'isAnswer', true)
        } else {
          this.$set(this.singleDetail.opitions[i], 'isAnswer', false)
        }
      }
    },
    upItemOpition(index) {
      if (index === 0) {
        return
      }
      var tempOption = this.singleDetail.opitions[index - 1]
      this.$set(this.singleDetail.opitions, index - 1, this.singleDetail.opitions[index])
      this.$set(this.singleDetail.opitions, index, tempOption)
    },
    downItemOpition(index) {
      if (index === this.singleDetail.opitions.length - 1) {
        return
      }
      var tempOption = this.singleDetail.opitions[index + 1]
      this.$set(this.singleDetail.opitions, index + 1, this.singleDetail.opitions[index])
      this.$set(this.singleDetail.opitions, index, tempOption)
    },
    deleteOpition(index) {
      this.singleDetail.opitions.splice(index, 1)
    },
    saveTopic() {
      if (this.$isNull(this.singleDetail.stem)) {
        this.$message('请先填写题目标题')
        return
      }
      if (this.singleDetail.opitions.length < 1) {
        this.$message('请先新增选项个数')
        return
      }
      if (!this.singleDetail.opitions.every(item => item.title !== null)) {
        this.$message('存在未填写的选项标题')
        return
      }
      var temp1 = this.$copy(this.singleDetail)
      var temp2 = this.$copy(this.topicObj)
      delete temp1.score
      delete temp2.score
      if (this.$objIsEqual(temp1, temp2)) {
        if (temp1.knowledgeType[temp1.knowledgeType.length - 1] === temp2.knowledgeType[temp2.knowledgeType.length - 1]) {
          console.log('未修改')
          this.singleDetail.showAddTopic = false
          this.$emit('saveTopic', this.$copy(this.singleDetail))
        } else {
          this.$post(Url.examquestions.isUsed, { id: this.singleDetail.id }).then(data => {
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
        this.$post(Url.examquestions.isUsed, { id: this.singleDetail.id }).then(data => {
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
      let temp = 0
      const tempChoice = {
        choices: this.singleDetail.opitions.map(item => {
          return item.title
        })
      }
      for (let i = 0; i < this.singleDetail.opitions.length; i++) {
        if (this.singleDetail.opitions[i].isAnswer === true) {
          temp = i
        }
      }
      const params = {
        id: this.singleDetail.id,
        analysis: this.singleDetail.analysis,
        answer: temp,
        metas: JSON.stringify(tempChoice),
        score: this.singleDetail.score || 0,
        stem: this.singleDetail.stem,
        type: 'CHOICE',
        categoryId: this.$isNull(this.singleDetail.knowledgeType) ? null : this.singleDetail.knowledgeType[this.singleDetail.knowledgeType.length - 1]
      }
      if (type === 'add') {
        this.$post(Url.examquestions.add, params).then(data => {
          console.log(data)
          this.$message.success('新增成功')
          this.singleDetail.showAddTopic = false
          this.singleDetail.id = data.data.id
          this.$emit('saveTopic', this.$copy(this.singleDetail))
        })
      } else {
        this.$post(Url.examquestions.edit, params).then(data => {
          console.log(data)
          this.$message.success('编辑成功')
          this.singleDetail.showAddTopic = false
          this.$emit('saveTopic', this.$copy(this.singleDetail))
        })
      }
    },
    cancleSingle() {
      this.singleDetail = this.$copy(this.topicObj)
      this.singleDetail.showAddTopic = false
      this.$emit('saveTopic', this.$copy(this.singleDetail))
    }
  }
}
</script>
<style scoped>
.addSingleCss{
  width: 80%;
  max-width: 1350px;
  min-width: 900px;
  /* height:341px; */
  background:rgba(251,251,251,1);
}
.singleCss{
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
.singleDetail{
  padding: 30px 70px
}
.isAnswer{
  background-color:#EF684A;
  padding: 2px;
}
</style>

