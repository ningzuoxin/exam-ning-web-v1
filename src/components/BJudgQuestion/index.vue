<template>
  <div class="W100 box-v-center">
    <div v-show="judgDetail.showAddTopic" class="addJudgCss box-start align-stretch Pt-20 Pb-20 gray-dark Mb-20">
      <div style="width:80%" class="box-v-start ">
        <div class="box-justify Mb-16 align-stretch" style="width:80%">
          <div class="Mr-20">[判断题]</div>
          <div class="rest">
            <el-input
              :autosize="{ minRows: 2, maxRows: 4}"
              v-model="judgDetail.stem"
              style="width:80%"
              type="textarea"
              placeholder="请输入题目标题"
            />
          </div>
          <div v-if="paperQus">分值：<input v-model="judgDetail.score" class="scoreInput">分</div>
        </div>
        <div v-for="(item, index) in judgDetail.opitions" :key="item.id" class="box-justify Mb-16" style="width:80%">
          <div class="Mr-20 visibilityNone">[判断题]</div>
          <div class="rest box-start">
            <div class="box-start" style="width:80%">
              <div class="Mr-10 gray-medium box-start"><div class="circle Mr-10"/>{{ index+1 | convert }}</div>
              <el-input
                v-model="item.title"
                class="optionItemCss rest"
                placeholder="请输入选项内容"
              />
            </div>
            <div class="rest box-start">
              <div style="position:absolute;width:200px" class="box-distribute Ml-10">
                <div :class="{isAnswer:item.isAnswer}" class="circle mousePointer" @click="setAnswer(index)"/>
                <p class="mousePointer" @click="setAnswer(index)">设为答案</p>
              </div>
            </div>
          </div>
          <div class="visibilityNone">分值：<input class="scoreInput">分</div>
        </div>
        <el-collapse style="width:80%" @change="handleChange">
          <el-collapse-item title="添加解析" name="1">
            <el-input
              :autosize="{ minRows: 2, maxRows: 4}"
              v-model="judgDetail.analysis"
              style="width:100%"
              type="textarea"
              placeholder="请输入题目解析"
            />
          </el-collapse-item>
        </el-collapse>
        <!-- <div class="box-start Mt-10" style="width:80%">
          <div>关键字：</div><addBTags :tags-arr="judgDetail.keyWord"/>
        </div> -->
        <div class="box-start Mt-10" style="width:80%">
          <div>题库类别：</div>
          <el-cascader
            :options="treeDataList"
            :props= "$defaulTcategory()"
            :show-all-levels="false"
            v-model="judgDetail.knowledgeType"
            style="width:150px"
            placeholder="试试搜索"
            filterable
            clearable
            change-on-select
            class="formSelect Ml-10"/>
        </div>
      </div>
      <div class="toolBtn box-v-center align-stretch rest">
        <div class="saveBtn box-center mousePointer" style="margin-bottom:28px" @click="saveTopic">保存</div>
        <div class="deleteBtn box-center mousePointer" @click="cancleJudg">取消</div>
      </div>
    </div>
    <div v-show="!judgDetail.showAddTopic" class="judgCss box-start gray-dark align-stretch Mb-20">
      <slot name="itemOrder"/>
      <div class="rest judgDetail">
        <div class="box-justify Mb-30">
          <div class="rest">{{ judgDetail.stem }}</div>
          <div v-if="paperQus">分值：{{ judgDetail.score }}分</div>
        </div>
        <div v-for="(item2, index2) in judgDetail.opitions" :key="item2.id" class="box-start Mb-20">
          <div class="Mr-10 gray-medium box-start "><div class="circle Mr-10"/>{{ index2+1 | convert }}</div>
          <div class="rest">{{ item2.title }} <span v-if="item2.isAnswer" style="color:#EF684A">（答案）</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Url from '@/api/url'
import addBTags from '@/components/addBTags'
export default {
  name: 'BJudgQuestion',
  components: { addBTags },
  props: {
    topicObj: {
      type: Object,
      default: null
    },
    paperQus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      aa: null,
      showAddTopic: false,
      judgDetail: null
    }
  },
  computed: {
    treeDataList() {
      return this.$store.getters.chapterType
    }
  },
  // computed: {
  //   judgDetail() {
  //     return this.topicObj
  //   }
  // },
  watch: {
    topicObj: {
      deep: true,
      handler(newValue, oldValue) {
        this.judgDetail = this.$copy(newValue)
      }
    }
  },
  created() {
    this.judgDetail = this.$copy(this.topicObj)
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    setAnswer(index) {
      for (let i = 0; i < this.judgDetail.opitions.length; i++) {
        if (index === i) {
          this.$set(this.judgDetail.opitions[i], 'isAnswer', true)
        } else {
          this.$set(this.judgDetail.opitions[i], 'isAnswer', false)
        }
      }
    },
    saveTopic() {
      if (this.$isNull(this.judgDetail.stem)) {
        this.$message('请先填写题目标题')
        return
      }
      var temp1 = this.$copy(this.judgDetail)
      var temp2 = this.$copy(this.topicObj)
      delete temp1.score
      delete temp2.score
      if (this.$objIsEqual(temp1, temp2)) {
        if (temp1.knowledgeType[temp1.knowledgeType.length - 1] === temp2.knowledgeType[temp2.knowledgeType.length - 1]) {
          console.log('未修改')
          this.judgDetail.showAddTopic = false
          this.$emit('saveTopic', this.$copy(this.judgDetail))
        } else {
          this.$post(Url.examquestions.isUsed, { id: this.judgDetail.id }).then(data => {
            if (data.data === 1) {
              this.$confirm('修改过后的题目将添加到试题库是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.updateTopic('add')
              }).catch(() => {
                console.log('11')
              })
            } else {
              this.updateTopic('update')
            }
          })
        }
      } else {
        console.log('已修改')
        this.$post(Url.examquestions.isUsed, { id: this.judgDetail.id }).then(data => {
          if (data.data === 1) {
            this.$confirm('修改过后的题目将添加到试题库是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.updateTopic('add')
            }).catch(() => {
              console.log('11')
            })
          } else {
            this.updateTopic('update')
          }
        })
      }
    },
    updateTopic() {
      let temp = 0
      for (let i = 0; i < this.judgDetail.opitions.length; i++) {
        if (this.judgDetail.opitions[i].isAnswer === true) {
          temp = i
        }
      }
      const params = {
        id: this.judgDetail.id,
        analysis: this.judgDetail.analysis,
        answer: temp,
        metas: null,
        score: this.judgDetail.score || 0,
        stem: this.judgDetail.stem,
        type: 'TRUE_FALSE',
        categoryId: this.$isNull(this.judgDetail.knowledgeType) ? null : this.judgDetail.knowledgeType[this.judgDetail.knowledgeType.length - 1]

      }
      if (this.paperQus) {
        this.$post(Url.examquestions.add, params).then(data => {
          console.log(data)
          this.$message.success('编辑成功')
          this.judgDetail.showAddTopic = false
          this.judgDetail.id = data.data.id
          this.$emit('saveTopic', this.$copy(this.judgDetail))
        })
      } else {
        this.$post(Url.examquestions.edit, params).then(data => {
          console.log(data)
          this.$message.success('编辑成功')
          this.judgDetail.showAddTopic = false
          this.$emit('saveTopic', this.$copy(this.judgDetail))
        })
      }
    },
    cancleJudg() {
      this.judgDetail = this.$copy(this.topicObj)
      this.judgDetail.showAddTopic = false
      this.$emit('saveTopic', this.$copy(this.judgDetail))
    }
  }
}
</script>
<style scoped>
.addJudgCss{
  width: 80%;
  max-width: 1350px;
  min-width: 900px;
  /* height:341px; */
  background:rgba(251,251,251,1);
}
.judgCss{
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
.judgDetail{
  padding: 30px 70px
}
.isAnswer{
  background-color:#EF684A;
  padding: 2px;
}
</style>

