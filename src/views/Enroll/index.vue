<template>
  <div class="enroll-box">
    <div class="bgColor"></div>
    <div class="box">
      <EnrollForm />
    </div>
  </div>
</template>

<script>
// 引入报名表单
import EnrollForm from "views/Enroll/EnrollForm/index.vue";
export default {
  name: "Enroll",
  components: {
    EnrollForm
  }
};
</script>

<style lang="scss" scoped>
.enroll-box {
  /* 表单水平居中 */
  display: flex;
  justify-content: center;
  .bgColor {
    position: fixed;
    z-index: -99;
    width: 100%;
    height: 100%;
  }
  .box {
    display: flex;
    /* 让表单距离顶部5vh */
    padding-top: 5vh;
    padding-bottom: 30px;
  }
}
</style>
