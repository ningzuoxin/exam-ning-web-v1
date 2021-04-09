<template>
  <div><el-tag
    v-for="tag in tagArr"
    :key="tag"
    :disable-transitions="false"
    :closable="!readonly"
    @close="handleClose(tag)">
    {{ tag }}
  </el-tag>
    <el-input
      v-if="inputVisible&&!readonly"
      ref="saveTagInput"
      v-model="inputValue"
      class="input-new-tag"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    />
  <el-button v-if="!inputVisible&&!readonly" class="button-new-tag" size="small" @click="showInput">+ 添加类别</el-button></div>
</template>
<script>
export default {
  name: 'AddBTags',
  props: {
    tagsArr: {
      type: Array,
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tagArr: this.tagsArr,
      inputVisible: false,
      inputValue: null
    }
  },
  watch: {
    tagsArr(newValue, oldValue) {
      this.tagArr = newValue
    }
  },
  methods: {
    handleClose(tag) {
      this.tagArr.splice(this.tagArr.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.tagArr.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>
<style scoped>
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

