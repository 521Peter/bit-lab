<template>
    <div>
        <h3>更多设置</h3>
        <br/>
        <div class="box" slot="empty" style="text-align: left;">
            <el-empty description="暂无更多"></el-empty>
        </div>
    </div>
</template>

<script>
export default {
    name:'MyMore'
}
</script>

<style lang="scss" scoped>
.box {
  background-color: #ffffffd4;
}   
</style>