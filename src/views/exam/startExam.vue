<template>
  <div v-loading.fullscreen.lock="!overData" style="background-color:#F5F5FC;min-height:calc(100vh);width:100%;">
    <div class="box-start startHeader">
      <div class="testCenter box-start">
        <div class="gray-dark size-header font-bold">{{ testPaperName }}</div>
      </div>
    </div>
    <div style="min-height:calc(100vh - 74px);">
      <div class="testCenter box-start Pt-30 align-stretch">
        <div class="rest gray-dark Pr-30 box-v-start align-stretch" style="min-height:calc(100vh - 104px);">
          <div class="box-start Pl-20 testDetailInfo">
            <div style="margin-right:42px;">总分：{{ totalScore }}分</div>
            <div style="margin-right:42px;">及格：{{ passedScore }}分</div>
            <div style="margin-right:42px;">共{{ itemCount }}题</div>
          </div>
          <div class="rest testDetail">
            <div style="padding:0px 22px;" class="bg-white">
              <div class="questionType box-start bb1px">
                <div v-if="choiceQuestions.length>0" :class="{activeItem:typeIndex===1}" class="questionTypeItem box-center" @click="changeTypeItem(1)">单选题（{{ choiceQuestions.length }}）</div>
                <div v-if="choiceMultiQuestions.length>0" :class="{activeItem:typeIndex===2}" class="questionTypeItem box-center" @click="changeTypeItem(2)">多选题（{{ choiceMultiQuestions.length }}）</div>
                <div v-if="trueFalseQuestions.length>0" :class="{activeItem:typeIndex===3}" class="questionTypeItem box-center" @click="changeTypeItem(3)">判断题（{{ trueFalseQuestions.length }}）</div>
                <div v-if="fillBlankQuestions.length>0" :class="{activeItem:typeIndex===4}" class="questionTypeItem box-center" @click="changeTypeItem(4)">填空题（{{ fillBlankQuestions.length }}）</div>
                <div v-if="questionQuestions.length>0" :class="{activeItem:typeIndex===5}" class="questionTypeItem box-center" @click="changeTypeItem(5)">问答题（{{ questionQuestions.length }}）</div>
              </div>
            </div>
            <previewChoiceList v-show="typeIndex===1" :choiceQuestions="choiceQuestions" @backItem="backItem" @nextGroup="nextGroup"/>
            <previewChoiceMultiList v-show="typeIndex===2" :choiceMultiQuestions="choiceMultiQuestions" @backItem="backItem" @nextGroup="nextGroup"/>
            <previewTrueFalseList v-show="typeIndex===3" :trueFalseQuestions="trueFalseQuestions" @backItem="backItem" @nextGroup="nextGroup"/>
            <previewFillBlankList v-show="typeIndex===4" :fillBlankQuestions="fillBlankQuestions" @backItem="backItem" @nextGroup="nextGroup"/>
            <previewQuestionList v-show="typeIndex===5" :questionQuestions="questionQuestions" @backItem="backItem"/>
          </div>
        </div>
        <div class="outlineTest">
          <div class="outlineBody">
            <div class="gray-medium size-large box-center" style="margin-top:8px;">剩余时间</div>
            <div class="box-center countdown">
              {{ limitedTime | countdownFilter }}
            </div>
            <div class="gray-medium size-large Mt-20 Mb-20">答题卡</div>
            <div class="box-start-wrap Mb-30" style="max-height:700px;overflow-y:auto;">
              <div v-for="(item,index) in allQuestions" :key="item.id" class="itemContent box-v-start">
                <div :class="{doneItem:item.isAnswer}" class="itemIndex box-v-center">
                  {{ index + 1 }}
                </div>
                <div :class="{visibilityNone:!item.isSign}" class="signCircle"/>
              </div>
            </div>
            <div class="box-distribute">
              <div class="box-start">
                <span class="gray-medium" style="margin-right:5px;">已答</span>
                <div class="answered"/>
              </div>
              <div class="box-start">
                <span class="gray-medium" style="margin-right:5px;">未答</span>
                <div class="unAnswered"/>
              </div>
              <div class="box-start">
                <span class="gray-medium" style="margin-right:5px;">标记</span>
                <div class="signCircle"/>
              </div>
            </div>
          </div>
          <div class="submitTest box-v-center mousePointer">交卷</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import previewChoiceList from '@/views/testPaper/components/preview/previewChoiceList'
  import previewChoiceMultiList from '@/views/testPaper/components/preview/previewChoiceMultiList'
  import previewTrueFalseList from '@/views/testPaper/components/preview/previewTrueFalseList'
  import previewFillBlankList from '@/views/testPaper/components/preview/previewFillBlankList'
  import previewQuestionList from '@/views/testPaper/components/preview/previewQuestionList'
  import { preview } from '@/api/testPaper/test-paper'

  export default {
    name: 'StartExam',
    components: {
      previewChoiceList,
      previewChoiceMultiList,
      previewTrueFalseList,
      previewFillBlankList,
      previewQuestionList
    },
    computed: {
      testPaperId() {
        return this.$route.query.id
      }
    },
    data() {
      return {
        typeIndex: 1,
        // 试卷名
        testPaperName: '',
        totalScore: 0,
        passedScore: 0,
        itemCount: 0,
        limitedTime: 0,
        // 所有试题
        allQuestions: [],
        // 单选题
        choiceQuestions: [],
        // 多选题
        choiceMultiQuestions: [],
        // 判断题
        trueFalseQuestions: [],
        // 填空题
        fillBlankQuestions: [],
        // 问答题
        questionQuestions: [],
        // 倒计时定时器
        countdown: null,
        overData: true
      }
    },
    created() {
      this.preview()
    },
    beforeDestroy() {
      alert('清除定时器，并且提交试卷')
      window.clearInterval(this.countdown)
    },
    methods: {
      preview() {
        const params = { id: this.testPaperId }
        preview(params).then(response => {
          const data = response.data
          this.testPaperName = data.name
          this.totalScore = data.totalScore
          this.passedScore = data.passedScore
          this.itemCount = data.itemCount
          this.limitedTime = data.limitedTime
          // 所有试题
          this.allQuestions = data.examQuestions
          // 单选题
          this.choiceQuestions = data.examQuestions.filter(item => item.type === 'choice')
          this.choiceQuestions = this.choiceQuestions.map(question => {
            const item = data.examTestPaperItems.find(item => item.questionId === question.id)
            question.score = item.score
            return question
          })
          // 多选题
          this.choiceMultiQuestions = data.examQuestions.filter(item => item.type === 'choice_multi')
          this.choiceMultiQuestions = this.choiceMultiQuestions.map(question => {
            const item = data.examTestPaperItems.find(item => item.questionId === question.id)
            question.score = item.score
            return question
          })
          // 判断题
          this.trueFalseQuestions = data.examQuestions.filter(item => item.type === 'true_false')
          this.trueFalseQuestions = this.trueFalseQuestions.map(question => {
            const item = data.examTestPaperItems.find(item => item.questionId === question.id)
            question.score = item.score
            return question
          })
          // 填空题
          this.fillBlankQuestions = data.examQuestions.filter(item => item.type === 'fill_blank')
          this.fillBlankQuestions = this.fillBlankQuestions.map(question => {
            const item = data.examTestPaperItems.find(item => item.questionId === question.id)
            question.score = item.score
            return question
          })
          // 问答题
          this.questionQuestions = data.examQuestions.filter(item => item.type === 'question')
          this.questionQuestions = this.questionQuestions.map(question => {
            const item = data.examTestPaperItems.find(item => item.questionId === question.id)
            question.score = item.score
            return question
          })
          // 倒计时开始
          this.countdown = window.setInterval(this.countdownTime, 1000)
        })
      },
      // 倒计时
      countdownTime() {
        this.limitedTime--
        if (this.limitedTime === 0) {
          window.clearInterval(this.countdown)
          // 倒计时结束必须交卷
          alert('时间到，请交卷')
          // this.upTest()
        } else if (this.limitedTime === 900) {
          this.$notify({
            title: '注意',
            message: '仅剩最后15分钟',
            type: 'warning'
          })
        }
      },
      changeTypeItem(type) {
        this.typeIndex = type
      },
      backItem(data) {
        const indexChange = data.indexItem
        this.$set(this.testItemList[indexChange], 'isAnswer', data.isAnswer)
        this.$set(this.testItemList[indexChange], 'isSign', data.isSign)
        this.$set(this.testItemList[indexChange], 'stuAnswer', data.stuAnswer)
      },
      nextGroup(type) {
        this.changeTypeItem(type)
      }
    }
  }
</script>

<style scoped>
  .startHeader {
    width: 100%;
    height: 74px;
    background-color: white
  }

  .backCssIcon {
    color: #979797;
    font-size: 25px;
    margin-left: 40px;
    position: absolute;
  }

  .testCenter {
    margin: 0px auto;
    width: 78%;
    min-width: 1119px;
    max-width: 1170px;
    height: 100%;
  }

  .outlineTest {
    width: 270px;

  }

  .outlineBody {
    padding: 18px 26px;
    border-radius: 2px;
    background-color: white
  }

  .countdown {
    color: #EF684A;
    font-size: 24px;
    font-weight: 600;
    padding: 13px 0px 20px;
    border-bottom: 1px solid #EAEAEA
  }

  .itemContent {
    width: 20%;
    margin-bottom: 13px
  }

  .signCircle {
    background-color: #EF684A;
    width: 6px;
    height: 6px;
    border-radius: 50%
  }

  .itemIndex {
    border-radius: 50%;
    width: 32px;
    height: 32px;
    color: #666666;
    border: 1px solid #CBCBCB;
    font-size: 14px;
    margin-bottom: 2px;
  }

  .doneItem {
    background-color: #3D53E6;
    color: white;
    border: none
  }

  .answered {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #3D53E6
  }

  .unAnswered {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid #CBCBCB
  }

  .submitTest {
    height: 43px;
    background: rgba(61, 83, 230, 1);
    border-radius: 5px;
    color: white;
    font-weight: bold;
    margin-top: 20px
  }

  .testDetailInfo {
    height: 48px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    margin-bottom: 30px;
  }

  .testDetail {
    background-color: rgb(245, 245, 252);
    overflow-y: auto;
    height: 100%;
    max-height: calc(100vh - 182px)
  }

  .questionType {
    height: 61px;
  }

  .questionTypeItem {
    height: 61px;
    padding: 0px 20px;
    cursor: pointer;
    color: #666666;
    transition: background-color .6s ease
  }

  .questionTypeItem:hover {
    color: #333333
  }

  .activeItem {
    color: #333333;
    font-weight: bold;
    border-bottom: 1px solid #3D53E6
  }
</style>
