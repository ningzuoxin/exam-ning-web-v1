<template>
  <div :class="{'Mt-20':paperQus}" class="W100 box-v-center">
    <div v-if="!paperQus" style="width:80%;height:54px;max-width: 1350px;" class="Mt-10 box-start mousePointer">
      <i class="el-icon-circle-plus normalBlue"/>
      <div class="Ml-10 normalBlue" @click="showAddTopicPanle">新增题目</div>
    </div>
    <div v-show="showAddTopic" class="addAnswerCss box-start align-stretch Pt-20 Pb-20 gray-dark Mb-20">
      <div style="width:80%" class="box-v-start ">
        <div class="box-justify Mb-16 align-stretch" style="width:80%">
          <div class="Mr-20">[问答题]</div>
          <div class="rest">
            <el-input
              :autosize="{ minRows: 2, maxRows: 4}"
              v-model="answerObj.stem"
              style="width:80%"
              type="textarea"
              placeholder="请输入题目标题"
            />
          </div>
          <div v-if="paperQus">分值：<input v-model="answerObj.score" class="scoreInput">分</div>
        </div>
        <div class="box-justify Mb-16" style="width:80%">
          <div class="Mr-20 visibilityNone">[单选题]</div>
          <div class="rest box-start">
            <div class="box-start" style="width:80%">
              <el-input
                :autosize="{ minRows: 3, maxRows: 6}"
                v-model="answerObj.answer"
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
              v-model="answerObj.analysis"
              style="width:100%"
              type="textarea"
              placeholder="请输入题目解析"
            />
          </el-collapse-item>
        </el-collapse>
        <div class="box-start Mt-10" style="width:80%">
          <div>关键字：</div><addBTags :tags-arr="answerObj.keyWord"/>
        </div>
        <div class="box-start Mt-10" style="width:80%">
          <div>题库类别：</div>
          <el-cascader
            :options="treeDataList"
            :props= "$defaulTcategory()"
            :show-all-levels="false"
            v-model="answerObj.knowledgeType"
            style="width:150px"
            placeholder="试试搜索"
            filterable
            clearable
            change-on-select
            class="formSelect Ml-10"/>
        </div>
      </div>
      <div class="toolBtn box-v-center align-stretch rest">
        <div class="saveBtn box-center mousePointer" style="margin-bottom:28px" @click="addAnswer">保存</div>
        <div class="deleteBtn box-center mousePointer" @click="clearAnswer">删除</div>
      </div>
    </div>
    <b-answer-question v-for="(item, index2) in examQuestionList" :key="index2" :topic-obj="item" :paper-qus="paperQus" @saveTopic="saveTopic">
      <div slot="itemOrder" class="box-v-start br1px" style="width:13%">
        <div style="height:50px" class="box-v-center">Q{{ index2+1 }}[问答题]</div>
        <div class="rest box-v-distribute">
          <div v-if="paperQus" class="gray-light mousePointer" @click="upItem(index2)"><i class="el-icon-sort-up" />上移</div>
          <div v-if="paperQus" class="gray-light mousePointer" @click="downItem(index2)"><i class="el-icon-sort-down" />下移</div>
          <div class="gray-light mousePointer" @click="deleteItem(index2)"><i class="el-icon-error"/>删除</div>
          <div class="gray-light mousePointer" @click="editItem(index2)"><i class="el-icon-edit-outline"/> 编辑</div>
          <!-- <div v-if="paperQus" class="gray-light mousePointer" @click="addLastItem(index2)"><i class="el-icon-circle-plus-outline"/> 新增</div> -->
        </div>
      </div>
    </b-answer-question>
  </div>
</template>
<script>
import Url from '@/api/url'
import BAnswerQuestion from '@/components/BAnswerQuestion'
import addBTags from '@/components/addBTags'
export default {
  name: 'AnswerGroup',
  components: { BAnswerQuestion, addBTags },
  props: {
    answerArr: {
      type: Array,
      default: null
    },
    paperQus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      textarea2: null,
      activeNames: ['1'],
      examQuestionList: [],
      answerObj: {
        analysis: null,
        answer: null,
        stem: null,
        score: null,
        showAddTopic: false,
        opitions: [{
          isAnswer: true,
          title: null,
          id: 1
        },
        {
          isAnswer: false,
          title: null,
          id: 2
        },
        {
          isAnswer: false,
          title: null,
          id: 3
        }],
        keyWord: [],
        knowledgeType: []
      },
      showAddTopic: false,
      editIndexNow: null
    }
  },
  computed: {
    treeDataList() {
      return this.$store.getters.chapterType
    }
  },
  watch: {
    answerArr: {
      handler(val, oldVal) {
        this.examQuestionList = val.map(item => {
          return this.$copy(item)
        })
      },
      deep: true
    }
  },
  created() {
    this.examQuestionList = this.$isNull(this.answerArr) ? [] : this.answerArr.map(item => {
      return this.$copy(item)
    })
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    addOpition() {
      this.answerObj.opitions.push({
        isAnswer: false,
        title: null,
        id: new Date().getTime()
      })
    },
    setAnswer(index) {
      for (let i = 0; i < this.answerObj.opitions.length; i++) {
        if (index === i) {
          this.$set(this.answerObj.opitions[i], 'isAnswer', true)
        } else {
          this.$set(this.answerObj.opitions[i], 'isAnswer', false)
        }
      }
    },
    deleteOpition(index) {
      this.answerObj.opitions.splice(index, 1)
    },
    showAddTopicPanle() {
      if (this.editIndexNow !== null) {
        this.$message('请先保存题目')
        return
      }
      this.editIndexNow = 0
      this.showAddTopic = true
    },
    addAnswer() {
      const params = {
        analysis: this.answerObj.analysis,
        answer: this.answerObj.answer,
        metas: null,
        score: 0,
        stem: this.answerObj.stem,
        type: 'QUESTION',
        categoryId: this.$isNull(this.answerObj.knowledgeType) ? null : this.answerObj.knowledgeType[this.answerObj.knowledgeType.length - 1]
      }
      this.$post(Url.examquestions.add, params).then(data => {
        console.log(data)
        this.$message.success('新增成功')
        this.answerObj.id = data.data.id
        this.examQuestionList.push(this.answerObj)
        this.clearAnswer()
      })
    },
    clearAnswer() {
      this.answerObj = {
        analysis: null,
        answer: null,
        stem: null,
        score: null,
        opitions: [{
          isAnswer: true,
          title: null,
          id: 1
        },
        {
          isAnswer: false,
          title: null,
          id: 2
        },
        {
          isAnswer: false,
          title: null,
          id: 3
        }],
        keyWord: [],
        knowledgeType: []
      }
      this.editIndexNow = null
      this.showAddTopic = false
    },
    upItemOpition(index) {
      if (index === 0) {
        return
      }
      var tempOption = this.answerObj.opitions[index - 1]
      this.$set(this.answerObj.opitions, index - 1, this.answerObj.opitions[index])
      this.$set(this.answerObj.opitions, index, tempOption)
    },
    downItemOpition(index) {
      if (index === this.answerObj.opitions.length - 1) {
        return
      }
      var tempOption = this.answerObj.opitions[index + 1]
      this.$set(this.answerObj.opitions, index + 1, this.answerObj.opitions[index])
      this.$set(this.answerObj.opitions, index, tempOption)
    },
    upItem(index) {
      if (this.editIndexNow !== null) {
        this.$message('请先保存题目')
        return
      }
      if (index === 0) {
        return
      }
      var tempOption = this.examQuestionList[index - 1]
      this.$set(this.examQuestionList, index - 1, this.examQuestionList[index])
      this.$set(this.examQuestionList, index, tempOption)
    },
    downItem(index) {
      if (this.editIndexNow !== null) {
        this.$message('请先保存题目')
        return
      }
      if (index === this.examQuestionList.length - 1) {
        return
      }
      var tempOption = this.examQuestionList[index + 1]
      this.$set(this.examQuestionList, index + 1, this.examQuestionList[index])
      this.$set(this.examQuestionList, index, tempOption)
    },
    deleteItem(index) {
      if (this.editIndexNow !== null) {
        this.$message('请先保存题目')
        return
      }
      this.$confirm('此操作将永久删除此试题, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$post(Url.examquestions.delete, { id: this.examQuestionList[index].id }).then(data => {
          console.log(data)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.examQuestionList.splice(index, 1)
        })
      }).catch(() => {
        console.log('11')
      })
    },
    editItem(index) {
      if (this.editIndexNow !== null) {
        this.$message('请先保存题目')
        return
      }
      this.editIndexNow = index
      this.$set(this.examQuestionList[index], 'showAddTopic', true)
    },
    saveTopic(data) {
      this.$set(this.examQuestionList, this.editIndexNow, data)
      this.$emit('groupAnswer', this.examQuestionList)
      this.editIndexNow = null
    },
    addLastItem(index) {
      if (this.editIndexNow !== null) {
        this.$message('请先保存题目')
        return
      }
      this.answerObj.showAddTopic = true
      this.examQuestionList.splice(index + 1, 0, this.answerObj)
      this.editIndexNow = index + 1
    }
  }
}
</script>
<style scoped>
.addAnswerCss{
  width: 80%;
  max-width: 1350px;
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

