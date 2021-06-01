<template>
  <div class="gray-dark">
    <div class="box-justify Mb-25">
      <div>
        <span class="font-bold">{{ index + 1 }}、{{ questionQuestion.stem }}</span> <span class="">（{{ questionQuestion.score }}分）</span>
      </div>
      <div v-if="!lookWrong">
        <img v-if="questionQuestion.isSign" src="@/assets/images/signActive.png" class="signCss mousePointer" @click="sign">
        <img v-else src="@/assets/images/sign.png" class="signCss mousePointer" @click="sign">
      </div>
    </div>
    <div class="box-start Mb-25">
      <el-input
        :autosize="{ minRows: 3, maxRows: 6}"
        :readonly="lookWrong"
        v-model="answerValue"
        type="textarea"
        placeholder="请输入内容"
        @input.native="fillAnswer"/>
    </div>
    <div v-if="lookWrong" class="Mb-20">
      <div v-if="!isMarking" class="box-start align-stretch">
        <span class="font-bold">【参考答案】</span>
        <div class="rest">{{ questionQuestion.answer }}</div>
        <span class="Ml-10">【得分】<span class="getScore2">{{ questionQuestion.score }}</span>分</span>
      </div>
      <div v-else class="box-start align-stretch">
        <span class="font-bold">【参考答案】</span>
        <div class="rest">{{ questionQuestion.answer }}</div>
        <div class="Ml-10">【得分】<input v-model="questionQuestion.score" class="getScore pl-5">分</div>
      </div>
    </div>
    <div v-if="lookWrong">
      <div><span class="font-bold">【解析】</span> {{ $isNull(questionQuestion.analysis)?'无':questionQuestion.analysis }}
      </div>
    </div>
  </div>
</template>

<script>
  import { debounce } from '@/utils/index'

  export default {
    name: 'Index',
    props: {
      questionQuestion: {
        type: Object,
        default: null
      },
      lookWrong: {
        type: Boolean,
        default: false
      },
      isMarking: {
        type: Boolean,
        default: false
      },
      index: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        answerValue: this.lookWrong ? this.questionQuestion.answer : null,
        answerData: {
          questionId: this.questionQuestion.id,
          isDone: false,
          isSign: false,
          answer: ''
        }
      }
    },
    methods: {
      fillAnswer: debounce(function() {
        this.doAnswer()
      }, 500),
      // 答题
      doAnswer() {
        if (this.lookWrong && !this.isMarking) {
          return
        }
        if (this.isMarking) {
          this.answerData.score = this.answerData.score.replace(/[^\d]/g, '')
        }
        if (!this.$isNull(this.answerValue)) {
          this.answerData.isDone = true
        } else {
          this.answerData.isDone = false
        }
        this.answerData.answer = this.answerValue
        this.$emit('doAnswer', this.answerData)
      },
      // 标记
      sign() {
        if (this.lookWrong) {
          return
        }
        this.answerData.isSign = !this.answerData.isSign
        this.$emit('doAnswer', this.answerData)
      }
    }
  }
</script>

<style scoped>
  .signCss {
    color: #999999;
    width: 25px;
    height: 25px;
  }

  .getScore {
    width: 50px;
    border-radius: 5px;
    height: 20px;
    border: 1px solid #EAEAEA
  }

  .getScore:focus {
    outline: none
  }

  .getScore2 {
    color: #EF684A;
    font-weight: bold
  }
</style>
