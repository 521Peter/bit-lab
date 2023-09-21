<template>
  <div style="padding: 20px;">
    <div v-html="md" class="markdown-body" style="height: 80vh; padding: 15px;overflow-y: scroll;margin-top: 10px;"></div>
  </div>
</template>

<script>
import demo from "assets/网站文档.md"; 

export default {
  name: 'detail',
  data() {
    return {
      md: demo,
      uploadedFile: "",
    };
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
</style>