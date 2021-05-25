<template>
  <div class="bg-white group">
    <div v-for="(item,index) in questionQuestions" :key="item.id" class="groupItem">
      <PreviewQuestion :questionQuestion="item" :index="index" :lookWrong="lookWrong" :isMarking="isMarking" @backItem="backItem"/>
    </div>
  </div>
</template>

<script>
  import PreviewQuestion from '@/components/PreviewQuestion'

  export default {
    name: 'PreviewQuestionList',
    components: { PreviewQuestion },
    props: {
      questionQuestions: {
        type: Array,
        default: null
      },
      lookWrong: {
        type: Boolean,
        default: false
      },
      isMarking: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      backItem(data) {
        this.$emit('backItem', data)
      }
    }
  }
</script>

<style scoped>
  .group {
    padding: 0px 22px 20px 22px
  }

  .groupItem {
    padding: 36px 50px 16px 21px;
    border-bottom: 1px solid #EAEAEA
  }
</style>
