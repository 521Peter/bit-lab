<template>
  <el-row :gutter="16" type="flex" justify="center">
    <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
      <div class="edition-center">
        <slot></slot>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.edition-center {
  width: 100%;
  background-color: #b4babf;
}
</style>
