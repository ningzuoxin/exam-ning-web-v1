<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="关键字" style="width: 200px;" class="filter-item"/>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
        添加
      </el-button>
    </div>

    <el-table
      :data="tableData"
      height="400px"
      border
      style="width: 100%">
      <el-table-column
        type="selection"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="username"
        label="账号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号"
        width="110">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        width="50">
      </el-table-column>
      <el-table-column
        prop="idcard"
        label="身份证">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建日期"
        width="110">
      </el-table-column>
      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template>
          <el-button type="primary" size="mini">
            修改
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
  import { listUser } from '@/api/user/user'

  export default {
    name: 'Index',
    data() {
      return {
        tableData: []
      }
    },
    created() {
      listUser().then(response => {
        this.tableData = response.data.records
      })
    },
    methods: {}
  }
</script>

<style scoped>

</style>
