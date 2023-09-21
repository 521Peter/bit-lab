<template>
  <div>
    <div class="main">
      <div class="check">
        <el-select
          class="ele"
          v-model="value1"
          collapse-tags
          style="margin-left: 20px"
          multiple
          placeholder="全部"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-select
          class="ele"
          v-model="value2"
          multiple
          collapse-tags
          style="margin-left: 20px"
          placeholder="全部"
        >
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>

      <div class="upload">
        <router-link to="/upload">
          <el-button type="primary"
            >上传<i class="el-icon-upload el-icon--right"></i
          ></el-button>
        </router-link>
      </div>

      <div class="sort">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="综合" name="first"></el-tab-pane>
          <el-tab-pane label="最热" name="second"></el-tab-pane>
          <el-tab-pane label="最新" name="third"></el-tab-pane>
        </el-tabs>
      </div>

      <div class="article">
        <div class="article_li" v-for="item in 50" :key="item">
          <img src="../../assets/img/download/word.png" alt="" />
          <p class="title">物联网-数电复习资料</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "download",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "计算机学院",
        },
        {
          value: "选项2",
          label: "艺术学院",
        },
        {
          value: "选项3",
          label: "体育学校",
        },
        {
          value: "选项4",
          label: "文法学院",
        },
        {
          value: "选项5",
          label: "电信学院",
        },
      ],
      options2: [
        {
          value: "选项1",
          label: "公共课",
        },
        {
          value: "选项2",
          label: "专业课",
        },
        {
          value: "选项3",
          label: "选修课",
        },
      ],
      value1: [],
      value2: [],
      activeName: "second",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 1440px;
  height: 1000px;
  margin: 0px auto;
  //   background-color: pink;
}
.upload {
  margin: -100px 50px 60px 1246px;
}
.check {
  width: 1100px;

  height: 150px;
  margin: 0px 50px;
  //   background-color: red;
  margin: auto;
  .ele {
    width: 420px;
    margin: 50px 30px 0px 0px;
  }
}
.article {
  .article_li {
    margin: 40px 50px 50px 40px;
    display: inline-block;
    img {
      width: 100px;
      height: 130px;
    }
    .title {
      font-size: 12px;
      font-weight: 700;
      margin-top: 10px;
    }
  }
}
</style>