<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="试卷类型">
        <el-select placeholder="请选择试卷类型">
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
    </el-form>
    <!-- 选择试题弹出层 -->
    <el-dialog :visible.sync="isShowDialog" :append-to-body="true" :close-on-click-modal="false" title="试题列表" width="1000px" style="padding: 0px;">
      <SelectQuestion :selecttype="selectType" :date-stamp="dataTime" :select-data="examQuestionList"/>
    </el-dialog>
  </div>
</template>

<script>
  import SelectQuestion from '@/components/SelectQuestion'

  export default {
    name: 'AddTestPaper',
    components: { SelectQuestion },
    data() {
      return {
        isShowDialog: false,
        selectType: 'check',
        dataTime: null,
        examQuestionList: [],
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
        this.dataTime = new Date().getTime()
        this.isShowDialog = true
      }
    }
  }
</script>

<style scoped>

</style>
