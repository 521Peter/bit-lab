<template>
  <el-container>
    <el-aside class="aside">
      <el-menu
        :default-openeds="index"
        @select="handleSelect"
        :unique-opened="true"
        background-color="#fddb2f"
      >
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-user"></i>个人信息</template>
          <el-menu-item-group>
            <el-menu-item index="page1"
              >我的作品</el-menu-item
            >
            <el-menu-item index="page2">修改头像</el-menu-item>
            <el-menu-item index="page5">修改密码</el-menu-item>
            <el-menu-item index="page3">编辑个人</el-menu-item>
            <el-menu-item index="page4">查看信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"
            ><i class="el-icon-user-solid"></i>我的关注</template
          >
          <el-menu-item-group>
            <el-menu-item index="page6">好友</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"
            ><i class="el-icon-star-off"></i>我的收藏</template
          >
          <el-menu-item-group>
            <el-menu-item index="page7">收藏的文章</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-setting"></i>设置</template>
          <el-menu-item-group>
            <el-menu-item index="page8">最近浏览</el-menu-item>
            <el-menu-item index="page9">更多</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main class="main" lazy>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Aside",
  // mounted() {
  //   this.sidebarItem = this.$route.name;
  // },
  data() {
      return {
        index: [],
        imageUrl: 'https://img2.baidu.com/it/u=1922645082,3119791566&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
      };
    },
  methods: {
    //path就是要跳转的路由
    handleSelect(path) {
      this.$router.replace(path);
    },
  },
};
</script>

<style lang="scss" scoped>
.aside {
  height: 920px;
  width: 300px !important;
  margin: 10px 0;
  background: #fff;
  // background: linear-gradient(#9a98fd, #76d9d9);
  // background: linear-gradient(#9a98fd, #fff);
  // border:4px solid #9a98fd;
  // background: linear-gradient(hsl(220, 100%, 84%), #fff);
    background: linear-gradient(#ffd404, #fff);

}
.main {
  height: 920px;
  margin: 10px 0px 10px 10px;
  // background: #fff;
  // background: linear-gradient(#c3d6ff, #fff);
    background: linear-gradient(#ffd404, #fff);

}

</style>