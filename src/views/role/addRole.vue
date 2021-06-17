<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色代码" prop="roleKey">
        <el-input v-model="form.roleKey"></el-input>
      </el-form-item>
      <el-form-item label="显示顺序" prop="roleSort">
        <el-input v-model="form.roleSort"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { addRole } from '@/api/system/role'

  export default {
    name: 'AddRole',
    data() {
      return {
        // 表单校验
        rules: {
          roleName: [
            { required: true, message: '角色名称不能为空', trigger: 'blur' }
          ],
          roleKey: [
            { required: true, message: '角色代码不能为空', trigger: 'blur' }
          ]
        },
        form: {
          roleName: '',
          roleKey: '',
          roleSort: 0,
          remark: ''
        }
      }
    },
    methods: {
      onSubmit() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            addRole(this.form).then(response => {
              if (response.code === 20000) {
                this.msgSuccess('添加成功')
                setTimeout(() => this.$router.push({ path: '/user/listRole' }), 1000)
              }
            }).catch(function() {
            })
          }
        })
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      }
    }
  }
</script>

<style scoped>

</style>
