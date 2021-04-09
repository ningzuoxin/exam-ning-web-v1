<template>
  <div class="app-container" style="min-height: calc(100vh - 60px);width: 100%;">
    <AddQuestionMain/>
  </div>
</template>
<script>
  import AddQuestionMain from './components/addQuestionMain'

  export default {
    name: 'AddQuestion',
    components: { AddQuestionMain }
  }
</script>
