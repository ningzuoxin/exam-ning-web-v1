<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="query.type" placeholder="请选择题型" class="filter-item">
        <el-option label="选择题" value="shanghai"/>
        <el-option label="填空题" value="beijing"/>
        <el-option label="问答题" value="beijing"/>
      </el-select>
      <el-input placeholder="关键字" style="width: 200px;margin-left: 5px;" class="filter-item"/>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="add(1)">
        手动添加
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-upload2" @click="add(2)">
        Excel导入
      </el-button>
    </div>

    <el-table
      :data="tableData"
      height="85%"
      border
      style="width: 100%">
      <el-table-column
        type="selection"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="type"
        label="题型"
        width="80">
      </el-table-column>
      <el-table-column
        prop="stem"
        label="题干">
      </el-table-column>
      <el-table-column
        prop="refNum"
        label="引用数"
        width="70">
      </el-table-column>
      <el-table-column
        prop="score"
        label="分值"
        width="50">
      </el-table-column>
      <el-table-column
        prop="answer"
        label="正确答案"
        width="120">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建日期"
        width="120">
      </el-table-column>
      <el-table-column label="操作" align="center" width="240" class-name="small-padding fixed-width">
        <template>
          <el-button type="primary" size="mini">
            修改
          </el-button>
          <el-button size="mini" type="success">
            发布
          </el-button>
          <el-button size="mini" type="danger">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="text-align: right;margin-top: 15px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import { listQuestion } from '@/api/testPaper/question'

  export default {
    name: 'ListQuestion',
    data() {
      return {
        query: {
          type: ''
        },
        tableData: []
      }
    },
    created() {
      this.tableData = listQuestion()
    },
    methods: {
      add(type) {
        if (type === 1) { // 手动添加
          this.$router.push({ path: '/testPaper/addQuestion' })
        } else if (type === 2) { // Excel导入
          this.$router.push('')
        }
      }
    }
  }
</script>

<style scoped>

</style>
