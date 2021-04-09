<template>
  <div :class="{'Mt-20':paperQus}" class="W100 box-v-center">
    <div v-if="!paperQus" style="width: 80%;height: 55px;max-width: 1350px;" class="Mt-10 box-start mousePointer">
      <i class="el-icon-circle-plus normalBlue"/>
      <div class="Ml-10 normalBlue" @click="showAddTopicPanle">添加判断题</div>
    </div>
    <div v-show="showAddTopic" class="addJudgCss box-start align-stretch Pt-20 Pb-20 gray-dark Mb-20">
      <div style="width: 80%;" class="box-v-start ">
        <div class="box-justify Mb-16 align-stretch" style="width: 80%;">
          <div class="rest">
            <el-input :autosize="{minRows: 2,maxRows: 4}" v-model="judgObj.stem" type="textarea" placeholder="请输入题干内容"/>
          </div>
          <div v-if="paperQus">分值：<input v-model="judgObj.score" class="scoreInput">分</div>
        </div>
        <div class="box-justify Mb-16 align-stretch" style="width: 80%;">
          <div class="rest">
            <el-input :autosize="{ minRows: 2,maxRows: 4}" v-model="judgObj.analysis" type="textarea" placeholder="请输入题目解析"/>
          </div>
        </div>
        <div v-for="(item, index) in judgObj.opitions" :key="item.id" class="box-justify Mb-16" style="width: 80%;">
          <div class="rest box-start">
            <div class="box-start" style="width: 80%;">
              <div class="Mr-10 gray-medium box-start">
                <div class="circle Mr-10"/> {{ index + 1 }}
              </div>
              <el-input v-model="item.title" readonly class="rest" />
            </div>
            <div class="rest box-start">
              <div style="position: absolute;width: 120px;" class="box-distribute Ml-10">
                <div :class="{isAnswer:item.isAnswer}" class="circle mousePointer" @click="setAnswer(index)"/>
                <p class="mousePointer" @click="setAnswer(index)">设为答案</p>
              </div>
            </div>
          </div>
        </div>
        <div class="box-justify Mb-16" style="width: 80%;">
          <div class="rest box-start">
            <div class="saveBtn box-center mousePointer" @click="addJudg">保存</div>
            <div class="deleteBtn box-center mousePointer Ml-16" @click="clearJudg">删除</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Url from '@/api/url'

  export default {
    name: 'TrueOrFalse',
    props: {
      judgArr: {
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
        judgObj: {
          analysis: null,
          answer: null,
          stem: null,
          score: null,
          showAddTopic: false,
          opitions: [{
            isAnswer: true,
            title: '正确',
            id: 1
          },
            {
              isAnswer: false,
              title: '错误',
              id: 2
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
      judgArr: {
        handler(val, oldVal) {
          this.examQuestionList = val.map(item => {
            return this.$copy(item)
          })
        },
        deep: true
      }
    },
    created() {
      this.examQuestionList = this.$isNull(this.judgArr) ? [] : this.judgArr.map(item => {
        return this.$copy(item)
      })
    },
    methods: {
      handleChange(val) {
        console.log(val)
      },
      setAnswer(index) {
        for (let i = 0; i < this.judgObj.opitions.length; i++) {
          if (index === i) {
            this.$set(this.judgObj.opitions[i], 'isAnswer', true)
          } else {
            this.$set(this.judgObj.opitions[i], 'isAnswer', false)
          }
        }
      },
      showAddTopicPanle() {
        if (this.editIndexNow !== null) {
          this.$message('请先保存题目')
          return
        }
        this.editIndexNow = 0
        this.showAddTopic = true
      },
      addJudg() {
        let temp = 0
        for (let i = 0; i < this.judgObj.opitions.length; i++) {
          if (this.judgObj.opitions[i].isAnswer === true) {
            temp = i
          }
        }
        const params = {
          analysis: this.judgObj.analysis,
          answer: temp,
          metas: null,
          score: 0,
          stem: this.judgObj.stem,
          type: 'TRUE_FALSE',
          categoryId: this.$isNull(this.judgObj.knowledgeType) ? null : this.judgObj.knowledgeType[this.judgObj.knowledgeType.length - 1]
        }
        this.$post(Url.examquestions.add, params).then(data => {
          console.log(data)
          this.$message.success('新增成功')
          this.judgObj.id = data.data.id
          this.examQuestionList.push(this.judgObj)
          this.clearJudg()
        })
      },
      clearJudg() {
        this.judgObj = {
          analysis: null,
          answer: null,
          stem: null,
          score: null,
          showAddTopic: false,
          opitions: [{
            isAnswer: true,
            title: '对',
            id: 1
          },
            {
              isAnswer: false,
              title: '错',
              id: 2
            }],
          keyWord: [],
          knowledgeType: []
        }
        this.editIndexNow = null
        this.showAddTopic = false
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
        this.$emit('groupJudg', this.examQuestionList)
        this.editIndexNow = null
      },
      addLastItem(index) {
        if (this.editIndexNow !== null) {
          this.$message('请先保存题目')
          return
        }
        this.judgObj.showAddTopic = true
        this.examQuestionList.splice(index + 1, 0, this.judgObj)
        this.editIndexNow = index + 1
      }
    }
  }
</script>
<style scoped>
  .addJudgCss {
    width: 80%;
    max-width: 1350px;
    background: rgba(240, 240, 240, 1);
  }

  .judgCss {
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
    border-radius: 50%;
    border: 1px solid rgba(151, 151, 151, 1);
  }

  .addOpition {
    height: 32px;
    border-radius: 5px;
    border: 1px dashed rgba(203, 203, 203, 1);
  }

  .judgDetail {
    padding: 30px 70px
  }

  .isAnswer {
    background-color: #EF684A;
    padding: 2px;
  }
</style>

