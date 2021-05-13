<template>
  <div class="app-container">
    <el-form ref="form" label-width="80px">
      <el-form-item label="试卷类型">
        <el-select placeholder="请选择试卷类型" v-model="form.desc">
          <el-option label="正式考试" value="shanghai"/>
          <el-option label="模拟考试" value="beijing"/>
          <el-option label="刷题学习" value="beijing"/>
        </el-select>
      </el-form-item>
      <el-form-item label="试卷名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="限时">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="及格分">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="选择试题">
        <el-button type="primary" @click="showDialog">选择试题</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
      <hr v-if="testPaperQuestions.length>0"/>
      <el-form-item label="试题详情" v-if="testPaperQuestions.length>0">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="单选题" name="1"><QuestionListDetail :tableData="choiceQuestions"/></el-tab-pane>
          <el-tab-pane label="多选题" name="2"><QuestionListDetail :tableData="choiceMultiQuestions"/></el-tab-pane>
          <el-tab-pane label="填空题" name="3"><QuestionListDetail :tableData="fillBlankQuestions"/></el-tab-pane>
          <el-tab-pane label="判断题" name="4"><QuestionListDetail :tableData="trueFalseQuestions"/></el-tab-pane>
          <el-tab-pane label="问答题" name="5"><QuestionListDetail :tableData="questionQuestions"/></el-tab-pane>
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

  export default {
    name: 'AddTestPaper',
    components: { SelectQuestion, QuestionListDetail },
    data() {
      return {
        activeName: '1',
        isShowDialog: false,
        testPaperQuestions: [],
        choiceQuestions: [],
        choiceMultiQuestions: [],
        fillBlankQuestions: [],
        trueFalseQuestions: [],
        questionQuestions: [],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      },
      onSubmit() {
        this.$message('submit!')
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
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
      }
    }
  }
</script>

<style scoped>
</style>
