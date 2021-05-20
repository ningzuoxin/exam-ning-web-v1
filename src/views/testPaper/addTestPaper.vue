<template>
  <div class="app-container">
    <el-form ref="form" label-width="80px">
      <el-form-item label="试卷类型">
        <el-select placeholder="请选择试卷类型" v-model="form.type">
          <el-option :label="item.title" :value="item.type" v-for="(item,index) in types" :key="index"/>
        </el-select>
      </el-form-item>
      <el-form-item label="试卷名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="限时">
        <el-input v-model="form.limitedTime"></el-input>
      </el-form-item>
      <el-form-item label="及格分">
        <el-input v-model="form.passedScore"></el-input>
      </el-form-item>
      <el-form-item label="选择试题">
        <el-button type="primary" @click="showDialog">选择试题</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
      <hr v-if="testPaperQuestions.length>0"/>
      <el-form-item label="试题详情" v-if="testPaperQuestions.length>0">
        <el-tabs v-model="activeName">
          <el-tab-pane :label="choiceLabel" name="1"><QuestionListDetail :tableData="choiceQuestions"/></el-tab-pane>
          <el-tab-pane :label="choiceMultiLabel" name="2"><QuestionListDetail :tableData="choiceMultiQuestions"/></el-tab-pane>
          <el-tab-pane :label="fillBlankLabel" name="3"><QuestionListDetail :tableData="fillBlankQuestions"/></el-tab-pane>
          <el-tab-pane :label="trueFalseLabel" name="4"><QuestionListDetail :tableData="trueFalseQuestions"/></el-tab-pane>
          <el-tab-pane :label="questionLabel" name="5"><QuestionListDetail :tableData="questionQuestions"/></el-tab-pane>
        </el-tabs>
      </el-form-item>
    </el-form>

    <!-- 选择试题弹出层 -->
    <el-dialog :visible.sync="isShowDialog" :append-to-body="true" :close-on-click-modal="false" title="试题列表" width="1000px" style="padding: 0px;">
      <SelectQuestion :selectedQuestions="testPaperQuestions" @getSelectedQuestion="getSelectedQuestion"/>
    </el-dialog>
  </div>
</template>

<script>
  import SelectQuestion from '@/components/SelectQuestion'
  import QuestionListDetail from './components/questionListDetail'
  import { listTypes } from '@/api/testPaper/test-paper'

  export default {
    name: 'AddTestPaper',
    components: { SelectQuestion, QuestionListDetail },
    data() {
      return {
        activeName: '1',
        isShowDialog: false,
        testPaperQuestions: [],
        // 单选题
        choiceQuestions: [],
        choiceScore: 0,
        // 多选题
        choiceMultiQuestions: [],
        choiceMultiScore: 0,
        // 填空题
        fillBlankQuestions: [],
        fillBlankScore: 0,
        // 判断题
        trueFalseQuestions: [],
        trueFalseScore: 0,
        // 问答题
        questionQuestions: [],
        questionScore: 0,
        form: {
          type: '',
          name: '',
          // 限时
          limitedTime: 30,
          // 及格分
          passedScore: 60
        },
        types: []
      }
    },
    computed: {
      choiceLabel() {
        return '单选题（' + this.choiceQuestions.length + '）'
      },
      choiceMultiLabel() {
        return '多选题（' + this.choiceMultiQuestions.length + '）'
      },
      fillBlankLabel() {
        return '填空题（' + this.fillBlankQuestions.length + '）'
      },
      trueFalseLabel() {
        return '判断题（' + this.trueFalseQuestions.length + '）'
      },
      questionLabel() {
        return '问答题（' + this.questionQuestions.length + '）'
      }
    },
    created() {
      this.getTestPaperTypes()
    },
    methods: {
      onSubmit() {
        alert(JSON.stringify(this.form))
      },
      onCancel() {
        return {
          activeName: '1',
          isShowDialog: false,
          testPaperQuestions: [],
          // 单选题
          choiceQuestions: [],
          choiceScore: 0,
          // 多选题
          choiceMultiQuestions: [],
          choiceMultiScore: 0,
          // 填空题
          fillBlankQuestions: [],
          fillBlankScore: 0,
          // 判断题
          trueFalseQuestions: [],
          trueFalseScore: 0,
          // 问答题
          questionQuestions: [],
          questionScore: 0,
          form: {
            type: '',
            name: '',
            limitedTime: 0,
            passedScore: 0
          }
        }
      },
      showDialog() {
        this.isShowDialog = true
      },
      getSelectedQuestion(data) {
        this.isShowDialog = false
        const selectedQuestions = JSON.parse(data.allSelected)
        this.testPaperQuestions = selectedQuestions
        this.choiceQuestions = selectedQuestions.filter(row => row.type === 'choice')
        this.choiceMultiQuestions = selectedQuestions.filter(row => row.type === 'choice_multi')
        this.fillBlankQuestions = selectedQuestions.filter(row => row.type === 'fill_blank')
        this.trueFalseQuestions = selectedQuestions.filter(row => row.type === 'true_false')
        this.questionQuestions = selectedQuestions.filter(row => row.type === 'question')
        this.choiceScore = Number(data.scoreObj.singleScore)
        this.choiceMultiScore = Number(data.scoreObj.moreScore)
        this.trueFalseScore = Number(data.scoreObj.judgScore)
        this.fillBlankScore = Number(data.scoreObj.blankScore)
        this.questionScore = Number(data.scoreObj.answerScore)
      },
      getTestPaperTypes() {
        listTypes().then(response => {
          this.types = response.data
        }).catch(function() {
        })
      }
    }
  }
</script>

<style scoped>
</style>
