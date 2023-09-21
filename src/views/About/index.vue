<template>
  <div class="about">
    <!-- 回到顶部按钮 -->
    <BackTop />
    <!-- 顶部导航栏 -->
    <!-- <TopBar /> -->
    <!-- 长图片 -->
    <LongImg />
    <!-- 轮播图部分 -->
    <SlideShow />
    <!-- 字体图标部分 -->
    <FontIcon :countInfo="dataList.countInfo"></FontIcon>
    <!-- 项目介绍部分 -->
    <ProjectIntro :projectInfo="dataList.projectInfo"></ProjectIntro>
    <!-- 小组介绍部分 -->
    <GroupsIntroduce :groupInfo="dataList.groupInfo"></GroupsIntroduce>
    <!-- 实验室老师介绍 -->
    <!-- 等获取到dataList.teacherInfo的值后，再渲染子组件，防止报错 -->
    <TeachersIntroduce
      :teacherInfo="dataList.teacherInfo"
      v-if="dataList.teacherInfo"
    ></TeachersIntroduce>
    <!-- 加入我们 -->
    <JoinUs />
    <!-- 页尾内容 -->
    <BottomBar />
  </div>
</template>

<script>
// 引入字体图标
import "assets/icons/iconfont.css";
// 引入回到顶部组件
import BackTop from "./backTop/backTop.vue";
// 引入顶部导航栏组件
// import TopBar from "components/content/TopBar";
// 引入长背景图模块
import LongImg from "views/About/longImg/longImg.vue";
// 引入轮播图模块
import SlideShow from "views/About/slideShow/slideShow.vue";
// 引入字体图标模块
import FontIcon from "views/About/fontIcon/fontIcon.vue";
// 引入项目介绍模块
import ProjectIntro from "./projectIntroduction/projectIntro.vue";
// 引入小组介绍模块
import GroupsIntroduce from "views/About/groupsIntroduce/groupsIntroduce.vue";
// 引入老师介绍模块
import TeachersIntroduce from "views/About/teachersIntroduce/teachersIntroduce.vue";
// 引入加入我们模块
import JoinUs from "views/About/joinUs/joinUs.vue";
// 引入底部导航栏组件
import BottomBar from "components/content/BottomBar/BottomBar.vue";
// 获取about页面的方法
import { getStaticInfo } from "network/about/static";
export default {
  // 注册组件
  components: {
    // TopBar,
    BottomBar,
    SlideShow,
    TeachersIntroduce,
    FontIcon,
    GroupsIntroduce,
    JoinUs,
    LongImg,
    BackTop,
    ProjectIntro,
  },
  name: "about",
  data() {
    return {
      dataList: {},
    };
  },
  methods: {
    // insertPreloadLinks() {
    //   this.preloadImages.forEach((url) => {
    //     const link = document.createElement("link");
    //     link.rel = "preload";
    //     link.as = "image";
    //     link.href = url;
    //     document.head.appendChild(link);
    //   });
    // },
  },
  async created() {
    const { data } = await getStaticInfo();
    console.log("---data", data);
    this.dataList = data;

    let prefetchImages = this.dataList.projectInfo.map((it) => it.urlList[0]);
    prefetchImages = prefetchImages.concat(
      this.dataList.teacherInfo.map((it) => it.urls[0])
    );
    console.log("prefetchImages", prefetchImages);
    // 图片预加载
    prefetchImages.forEach((url) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "image";
      link.href = url;
      document.head.appendChild(link);
    });
  },
};
</script>
