<template>
  <div>
    <svg-icon icon-class="download" @click="handleDownload"/>
  </div>
</template>

<script>
export default {
  name: 'iking',
  data() {
    return {
      url: 'http://140.143.201.247/manage/iking-manage'
    }
  },
  methods: {
    handleDownload() {
      window.open(this.url)
    }
  }
}
</script>