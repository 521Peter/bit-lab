<template>
  <el-switch
    v-model="switchValue"
    active-color="#9998ea"
    inactive-color="#7977EE"
    active-icon-class="iconfont icon-yejian"
    inactive-icon-class="iconfont icon-baitianmoshi"
    @change="modeToggle()"
  >
  </el-switch>
</template>

<script>
export default {
  computed: { 
    switchValue: {
      // 设置圆滑块的位置由dark决定（dark为false，圆滑块在左边；dark为true，圆滑块在右边）
      get() {
        return this.$store.state.dark;
      },
      // 滑块移动后，switchValue的值会自动取反，因为直接到对计算属性进行操作，所以将触发下面的set方法
      set(newValue) {
        this.$store.state.dark = newValue;
      },
    },
  },
  methods: {
    // 白天or夜间切换，点击滑块时触发
    modeToggle() {
      // 如果是夜间模式
      if (this.$store.state.dark) {
        // 将切换后的模式保存到本地存储
        localStorage.setItem("time", "dark");
        // 更新html中的属性选择器
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        // 将切换后的模式保存到本地存储
        localStorage.setItem("time", "light");
        document.documentElement.setAttribute("data-theme", "light");
      }
    },
  },
  mounted() {
    // 获取本地存储中的时间，没有则默认是白天
    const time = localStorage.getItem("time") || "light";
    if (time === "dark") {
      this.$store.state.dark = true;
    }
    // document.documentElement是一个真正的html节点对象，setAttribute是给html标签添加属性
    // 执行下面的代码后：<html data-theme="xxx"></html>
    document.documentElement.setAttribute("data-theme", time);
  },
};
</script>