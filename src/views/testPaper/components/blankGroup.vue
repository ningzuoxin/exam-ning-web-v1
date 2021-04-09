<template>
  <div :class="{'Mt-20':paperQus}" class="W100 box-v-center">
    <div v-if="!paperQus" style="width:80%;height:54px;max-width: 1350px;" class="Mt-10 box-start mousePointer">
      <i class="el-icon-circle-plus normalBlue"/>
      <div class="Ml-10 normalBlue" @click="showAddTopicPanle">新增题目</div>
    </div>
    <div v-show="showAddTopic" class="addBlankCss box-start align-stretch Pt-20 Pb-20 gray-dark Mb-20">
      <div style="width:80%" class="box-v-start ">
        <div class="box-justify Mb-16 align-stretch" style="width:80%">
          <div class="Mr-20">[填空题]</div>
          <div class="rest">
            <div class="box-start blankCssInput">
              <el-button size="mini" type="primary" class="Mr-10" @click="setBlank">设为空格</el-button>
              <div>输入完整题目后，选中需要填空的文字点击“设为空格”</div>
            </div>
            <textarea ref="textarea" v-model="blankObj.name" rows="3" class="textareaCss"/>
            <div style="line-height: 20px;width:90%" class="Mb-20">预览效果：{{ blankObj.name2 }}</div>
            <div v-for="(item,index) in answer" :key="index" class="box-start-wrap Mb-10">
              <div>空格{{ index+1 }}：{{ item }}</div>
              <div class="mousePointer Ml-10 C4598E8" @click="deleteBlank(index)">取消空格</div>
            </div>
          </div>
          <div v-if="paperQus">
            <div class="Mb-10">分值：<input v-model="blankObj.score" class="scoreInput">分</div>
            <div>每空：<input v-model="blankObj.score" class="scoreInput">分</div>
          </div>
        </div>
        <el-collapse style="width:80%" @change="handleChange">
          <el-collapse-item title="添加解析" name="1">
            <el-input
              :autosize="{ minRows: 2, maxRows: 4}"
              v-model="blankObj.analysis"
              style="width:100%"
              type="textarea"
              placeholder="请输入题目解析"
            />
          </el-collapse-item>
        </el-collapse>
        <div class="box-start Mt-10" style="width:80%">
          <div>关键字：</div><addBTags :tags-arr="blankObj.keyWord"/>
        </div>
        <div class="box-start Mt-10" style="width:80%">
          <div>题库类别：</div>
          <el-cascader
            :options="treeDataList"
            :props= "$defaulTcategory()"
            :show-all-levels="false"
            v-model="blankObj.knowledgeType"
            style="width:150px"
            placeholder="试试搜索"
            filterable
            clearable
            change-on-select
            class="formSelect Ml-10"/>
        </div>
      </div>
      <div class="toolBtn box-v-center align-stretch rest">
        <div class="saveBtn box-center mousePointer" style="margin-bottom:28px" @click="addBlank">保存</div>
        <div class="deleteBtn box-center mousePointer" @click="clearBlank">删除</div>
      </div>
    </div>
    <b-blank-question v-for="(item, index2) in examQuestionList" :key="index2" :topic-obj="item" :paper-qus="paperQus" @saveTopic="saveTopic">
      <div slot="itemOrder" class="box-v-start br1px" style="width:13%">
        <div style="height:50px" class="box-v-center">Q{{ index2+1 }}[填空题]</div>
        <div class="rest box-v-distribute">
          <div v-if="paperQus" class="gray-light mousePointer" @click="upItem(index2)"><i class="el-icon-sort-up" />上移</div>
          <div v-if="paperQus" class="gray-light mousePointer" @click="downItem(index2)"><i class="el-icon-sort-down" />下移</div>
          <div class="gray-light mousePointer" @click="deleteItem(index2)"><i class="el-icon-error"/>删除</div>
          <div class="gray-light mousePointer" @click="editItem(index2)"><i class="el-icon-edit-outline"/> 编辑</div>
          <!-- <div v-if="paperQus" class="gray-light mousePointer" @click="addLastItem(index2)"><i class="el-icon-circle-plus-outline"/> 新增</div> -->
        </div>
      </div>
    </b-blank-question>
  </div>
</template>
<script>
import Url from '@/api/url'
import BBlankQuestion from '@/components/BBlankQuestion'
import addBTags from '@/components/addBTags'
export default {
  name: 'BlankGroup',
  components: { BBlankQuestion, addBTags },
  props: {
    blankArr: {
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
      question: {
        name: null,
        name2: null
      },
      blankObj: {
        analysis: null,
        answer: null,
        stem: null,
        score: null,
        showAddTopic: false,
        name: null,
        name2: null,
        blankAnswer: [],
        blankName: [],
        opitions: [],
        keyWord: [],
        knowledgeType: []
      },
      showAddTopic: false,
      editIndexNow: null,
      answer: [],
      answerStem: null
    }
  },
  computed: {
    treeDataList() {
      return this.$store.getters.chapterType
    }
  },
  watch: {
    'blankObj.name'(newValue, oldValue) {
      if (newValue === null) {
        return
      }
      this.blankObj.name2 = this.blankObj.name.replace(/\{{(.+?)\}}/g, '_______')
    },
    blankArr: {
      handler(val, oldVal) {
        this.examQuestionList = val.map(item => {
          return this.$copy(item)
        })
      },
      deep: true
    }
  },
  created() {
    this.examQuestionList = this.$isNull(this.blankArr) ? [] : this.blankArr.map(item => {
      return this.$copy(item)
    })
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    addOpition() {
      this.blankObj.opitions.push({
        isAnswer: false,
        title: null,
        id: new Date().getTime()
      })
    },
    setAnswer(index) {
      for (let i = 0; i < this.blankObj.opitions.length; i++) {
        if (index === i) {
          this.$set(this.blankObj.opitions[i], 'isAnswer', true)
        } else {
          this.$set(this.blankObj.opitions[i], 'isAnswer', false)
        }
      }
    },
    deleteOpition(index) {
      this.blankObj.opitions.splice(index, 1)
    },
    showAddTopicPanle() {
      if (this.editIndexNow !== null) {
        this.$message('请先保存题目')
        return
      }
      this.editIndexNow = 0
      this.showAddTopic = true
    },
    addBlank() {
      const params = {
        analysis: this.blankObj.analysis,
        answer: JSON.stringify(this.answer),
        metas: JSON.stringify(this.blankObj.blankName),
        score: 0,
        stem: this.blankObj.name2.replace(/_______/g, '{{}}'),
        type: 'FILL_BLANK',
        categoryId: this.$isNull(this.blankObj.knowledgeType) ? null : this.blankObj.knowledgeType[this.blankObj.knowledgeType.length - 1]
      }
      this.$post(Url.examquestions.add, params).then(data => {
        console.log(data)
        this.blankObj.id = data.data.id
        this.blankObj.answer = JSON.parse(data.data.answer)
        this.blankObj.name2 = data.data.stem.replace(/{{}}/g, '_______')
        this.$message.success('新增成功')
        this.examQuestionList.push(this.blankObj)
        this.clearBlank()
      })
    },
    clearBlank() {
      this.blankObj = {
        analysis: null,
        answer: null,
        stem: null,
        score: null,
        showAddTopic: false,
        name: null,
        name2: null,
        blankAnswer: [],
        blankName: [],
        opitions: [],
        keyWord: [],
        knowledgeType: []
      }
      this.answer = []
      this.editIndexNow = null
      this.showAddTopic = false
    },
    upItemOpition(index) {
      if (index === 0) {
        return
      }
      var tempOption = this.blankObj.opitions[index - 1]
      this.$set(this.blankObj.opitions, index - 1, this.blankObj.opitions[index])
      this.$set(this.blankObj.opitions, index, tempOption)
    },
    downItemOpition(index) {
      if (index === this.blankObj.opitions.length - 1) {
        return
      }
      var tempOption = this.blankObj.opitions[index + 1]
      this.$set(this.blankObj.opitions, index + 1, this.blankObj.opitions[index])
      this.$set(this.blankObj.opitions, index, tempOption)
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
      this.$emit('groupBlank', this.examQuestionList)
      this.editIndexNow = null
    },
    addLastItem(index) {
      if (this.editIndexNow !== null) {
        this.$message('请先保存题目')
        return
      }
      this.blankObj.showAddTopic = true
      this.examQuestionList.splice(index + 1, 0, this.blankObj)
      this.editIndexNow = index + 1
    },
    setBlank() {
      var selectionStart = this.$refs.textarea.selectionStart
      var selectionEnd = this.$refs.textarea.selectionEnd
      if (selectionStart === selectionEnd) {
        this.$message('请选中文字')
        return
      }
      var text = window.getSelection().toString()
      if (text.indexOf('{{') !== -1 || text.indexOf('}}') !== -1) {
        this.$message('不允许这么操作，请先取消原空格')
        return
      }
      this.blankObj.name = this.blankObj.name.slice(0, selectionStart) + '{{' + this.blankObj.name.slice(selectionStart)
      this.blankObj.name = this.blankObj.name.slice(0, selectionEnd + 2) + '}}' + this.blankObj.name.slice(selectionEnd + 2)
      this.answer = []
      this.answer = this.$getBracketStr(this.blankObj.name)
      console.log('answerStem', this.blankObj.name)
      console.log('我是答案空', this.answer)
      this.$refs.textarea.selectionStart = 0
      this.$refs.textarea.selectionEnd = 0
    },
    deleteBlank(index) { // 撤销空格操作
      const tempStr = this.answer[index]
      var re = new RegExp('{{' + tempStr + '}}', 'g')
      this.blankObj.name = this.blankObj.name.replace(re, tempStr)
      this.blankObj.name2 = this.blankObj.name.replace(/\{{(.+?)\}}/g, '_______')
      this.answer.splice(index, 1)
    }
  }
}
</script>
<style scoped>
.addBlankCss{
  width: 80%;
  max-width: 1350px;
  /* height:341px; */
  background:rgba(251,251,251,1);
}
.blankCss{
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
.blankDetail{
  padding: 30px 70px
}
.isAnswer{
  background-color:#EF684A;
  padding: 2px;
}
/* ############填空 */
.blankCssInput{
    border: 1px solid #dadada;
    width:90%;
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
.textareaCss{
    width: 90%;
    padding:5px;
    line-height: 20px;
    border:1px solid #dadada;
    margin-bottom: 15px;
  }
  .textareaCss:focus{
    outline: none
  }
</style>

