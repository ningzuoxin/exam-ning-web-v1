<template>
  <div :class="{'Mt-20':paperQus}" class="W100 box-v-center">
    <div v-if="!paperQus" style="width: 80%;height: 55px;max-width: 1350px;" class="Mt-10 box-start mousePointer">
      <i class="el-icon-circle-plus normalBlue"/>
      <div class="Ml-10 normalBlue" @click="showAddTopicPanle">添加多选题</div>
    </div>
    <div v-show="showAddTopic" class="addMoreCss box-start align-stretch Pt-20 Pb-20 gray-dark Mb-20">
      <div style="width: 80%;" class="box-v-start">
        <div class="box-justify Mb-16 align-stretch" style="width: 80%;">
          <div class="rest">
            <el-input :autosize="{minRows: 2,maxRows: 4}" v-model="moreObj.stem" type="textarea" placeholder="请输入题干内容"/>
          </div>
          <div v-if="paperQus">分值：<input v-model="moreObj.score" class="scoreInput">分</div>
        </div>
        <div class="box-justify Mb-16 align-stretch" style="width: 80%;">
          <div class="rest">
            <el-input :autosize="{ minRows: 2,maxRows: 4}" v-model="moreObj.analysis" type="textarea" placeholder="请输入题目解析"/>
          </div>
        </div>
        <div v-for="(item, index) in moreObj.opitions" :key="item.id" class="box-justify Mb-16" style="width:80%">
          <div class="rest box-start">
            <div class="box-start" style="width: 80%;">
              <div class="Mr-10 gray-medium box-start">
                <div class="circle Mr-10"/>
                {{ index + 1 | convert }}
              </div>
              <el-input v-model="item.title" class="optionItemCss rest" placeholder="请输入选项内容" />
            </div>
            <div class="rest box-start">
              <div style="position: absolute;width: 200px;" class="box-distribute Ml-10">
                <div :class="{isAnswer:item.isAnswer}" class="circle mousePointer" @click="setAnswer(index)"/>
                <p class="mousePointer" @click="setAnswer(index)">设为答案</p>
                <i class="el-icon-sort-up mousePointer" @click="upItemOpition(index)"/>
                <i class="el-icon-sort-down mousePointer" @click="downItemOpition(index)"/>
                <i class="el-icon-error mousePointer" @click="deleteOpition(index)"/>
              </div>
            </div>
          </div>
        </div>
        <div class="box-justify Mb-16" style="width: 80%;">
          <div class="rest box-start">
            <div class="box-start" style="width: 80%;">
              <div class="rest addOpition box-center mousePointer gray-light" @click="addOpition">
                <i class="el-icon-circle-plus" style="letter-spacing: 10px;"/>添加选项
              </div>
            </div>
            <div class="rest box-start">
              <div style="position: absolute;width: 200px;" class="box-distribute Ml-10">
                <div class="saveBtn box-center mousePointer" @click="addMore">保存</div>
                <div class="deleteBtn box-center mousePointer" @click="clearMore">删除</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Url from '@/api/url'

  export default {
    name: 'MultipleChoice',
    props: {
      moreArr: {
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
        moreObj: {
          analysis: null,
          answer: null,
          stem: null,
          score: null,
          missScore: null,
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
            },
            {
              isAnswer: false,
              title: null,
              id: 4
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
      moreArr: {
        handler(val, oldVal) {
          this.examQuestionList = val.map(item => {
            return this.$copy(item)
          })
        },
        deep: true
      }
    },
    created() {
      this.examQuestionList = this.$isNull(this.moreArr) ? [] : this.moreArr.map(item => {
        return this.$copy(item)
      })
    },
    methods: {
      handleChange(val) {
        console.log(val)
      },
      addOpition() {
        this.moreObj.opitions.push({
          isAnswer: false,
          title: null,
          id: new Date().getTime()
        })
      },
      setAnswer(index) {
        if (this.moreObj.opitions[index].isAnswer === false) {
          this.$set(this.moreObj.opitions[index], 'isAnswer', true)
        } else {
          this.$set(this.moreObj.opitions[index], 'isAnswer', false)
        }
      },
      deleteOpition(index) {
        this.moreObj.opitions.splice(index, 1)
      },
      showAddTopicPanle() {
        if (this.editIndexNow !== null) {
          this.$message('请先保存题目')
          return
        }
        this.editIndexNow = 0
        this.showAddTopic = true
      },
      addMore() {
        var temp = []
        const tempChoice = {
          choices: this.moreObj.opitions.map(item => {
            return item.title
          })
        }
        for (let i = 0; i < this.moreObj.opitions.length; i++) {
          if (this.moreObj.opitions[i].isAnswer === true) {
            temp.push(i)
          }
        }
        const params = {
          analysis: this.moreObj.analysis,
          answer: JSON.stringify(temp),
          metas: JSON.stringify(tempChoice),
          score: 0,
          missScore: 0,
          stem: this.moreObj.stem,
          type: 'CHOICE_MULTI',
          categoryId: this.$isNull(this.moreObj.knowledgeType) ? null : this.moreObj.knowledgeType[this.moreObj.knowledgeType.length - 1]
        }
        this.$post(Url.examquestions.add, params).then(data => {
          console.log(data)
          this.$message.success('新增成功')
          this.moreObj.id = data.data.id
          this.examQuestionList.push(this.moreObj)
          this.clearMore()
        })
      },
      clearMore() {
        this.moreObj = {
          analysis: null,
          answer: null,
          stem: null,
          score: null,
          missScore: null,
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
        var tempOption = this.moreObj.opitions[index - 1]
        this.$set(this.moreObj.opitions, index - 1, this.moreObj.opitions[index])
        this.$set(this.moreObj.opitions, index, tempOption)
      },
      downItemOpition(index) {
        if (index === this.moreObj.opitions.length - 1) {
          return
        }
        var tempOption = this.moreObj.opitions[index + 1]
        this.$set(this.moreObj.opitions, index + 1, this.moreObj.opitions[index])
        this.$set(this.moreObj.opitions, index, tempOption)
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
        this.$set(this.examQuestionList, this.editIndexNow, this.$copy(data))
        this.$emit('groupMore', this.examQuestionList)
        this.editIndexNow = null
      },
      addLastItem(index) {
        if (this.editIndexNow !== null) {
          this.$message('请先保存题目')
          return
        }
        this.moreObj.showAddTopic = true
        this.examQuestionList.splice(index + 1, 0, this.moreObj)
        this.editIndexNow = index + 1
      }
    }
  }
</script>
<style scoped>
  .addMoreCss {
    width: 80%;
    max-width: 1350px;
    /* height:341px; */
    background: rgba(240, 240, 240, 1);
  }

  .moreCss {
    width: 80%;
    max-width: 1350px;
    background: white;
    border: 1px solid rgba(203, 203, 203, 1);
  }

  .saveBtn {
    width: 70px;
    height: 32px;
    background: rgba(61, 83, 230, 1);
    border-radius: 5px;
    color: white
  }

  .deleteBtn {
    width: 70px;
    height: 32px;
    border-radius: 5px;
    border: 1px solid rgba(51, 51, 51, 1);
  }

  .scoreInput {
    width: 40px;
    height: 28px;
    border-radius: 5px;
    border: 1px solid rgba(203, 203, 203, 1);
  }

  .scoreInput:focus {
    outline: none
  }

  .circle {
    width: 12px;
    height: 12px;
    border-radius: 25%;
    border: 1px solid rgba(151, 151, 151, 1);
  }

  .addOpition {
    height: 40px;
    border-radius: 5px;
    border: 2px dashed rgba(203, 203, 203, 1);
  }

  .moreDetail {
    padding: 30px 70px
  }

  .isAnswer {
    background-color: #EF684A;
    padding: 2px;
  }
</style>

