<template>
  <div>
    <!-- <top-header class="nav"></top-header> -->
    <!-- <h1 style="text-align: center; margin-top: 200px">首页</h1> -->
    <div class="top_img" @click="goAbout">
      <img src="../../assets/img/home/top.png" alt="" />
    </div>

    <div class="main">
      <el-container>
        <!-- 左边 -->
        <el-aside width="282px" class="left">
          <div class="logo">
            <img src="../../assets/img/home/logo.png" alt="" />
            <p>比特巅峰工作室</p>
          </div>
          <div class="call">
            <div class="explain">
              <h1>公告栏</h1>
              <p>
                欢迎您进入比特巅峰工作室官方网站！您可以在此进行学术交流，资料分享。
              </p>
            </div>
            <div class="board"></div>
          </div>
        </el-aside>
        <!-- 中间 -->
        <div class="middle">
          <!-- 轮播图 -->

          <div class="block">
            <el-carousel trigger="click" height="358px">
              <el-carousel-item v-for="item in 4" :key="item">
                <img src="../../assets/img/about/long_page.jpg" alt="" />
              </el-carousel-item>
            </el-carousel>
          </div>

          <div class="search">
            <!-- <div class="demo-input-suffix">
              <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input2">
              </el-input>
            </div> -->
            <div style="margin-top: 15px;">
              <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </div>
          </div>

          <div class="main_nav">
            <!-- <span>最新</span>
            <span>推荐</span>
            <span>公号推文</span> -->
          </div>

          <!-- 文章列表 -->
          <div class="art_list">
            <div class="article" v-for="item in this.pageData" :key="item.artId" @click="articleClick(item.artId)">
              <div class="author">
                <span>{{ item.author }}</span>
                <span>{{ item.upTime }}</span>
                <!-- <span>chatGpt</span> -->
              </div>
              <div class="title">{{ item.title }}</div>
              <div class="content">
                {{ item.authWork.replace(/<[^>]*>|/g, "") }}
                  <!-- <p v-text="item.authWork"></p> -->

              </div>
              <div class="info">
                <span><i class="el-icon-view"></i>{{ item.downNum }}</span>
                <span><i class="el-icon-star-on"></i>{{ item.collectNum }}</span>
                <span><i class="el-icon-edit-outline"></i>{{ item.replyNum }}</span>
              </div>
            </div>

            <el-pagination background layout="prev, pager, next" :total="pageTotal" @size-change="handleSizeChange"
              @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize">
            </el-pagination>
          </div>
        </div>

        <!-- 右边 -->
        <el-aside width="282px" class="right">
          <div class="user">
            <div class="avater" v-show="!isLogined">
              <img src="../../assets/img/home/tx.jpg" alt="" />
              <!-- ../../assets/img/home/tx.jpg -->
            </div>
            <div class="avater" v-show="isLogined">
              <img :src="userAvatar" alt="" @error="setDefaultImage" />
              <!-- ../../assets/img/home/tx.jpg -->
            </div>
            <div class="username" v-show="!isLogined" @click="goLogin">登录/注册</div>
            <div class="username" v-show="isLogined">{{ userName }}</div>
            <div class="gocenter" @click="goPersonal">个人中心 &nbsp;&nbsp;></div>
            <div class="info">
              <ul>
                <li>0</li>
                <li>0</li>
                <li>0</li>
                <li>0</li>
              </ul>
              <ul>
                <li>创作中心</li>
                <li>关注</li>
                <li>收藏</li>
                <li>最近浏览</li>
              </ul>
            </div>
          </div>
          <div class="code">
            <img src="../../assets/img/home/ewm.jpg" alt="" />
            <p>
              关注微信公众号 <br />
              “比特巅峰工作室”
            </p>
          </div>
          <div class="ad">
            <!-- <div v-for="(item, index) in 4" :key="index">
              <img src="../../assets/img/home/ad.jpg" alt="" />
            </div> -->
          </div>
        </el-aside>
      </el-container>
    </div>
  </div>
</template>

<script>
import { getArticle, getArticleByKey } from "network/getArticle/getArticle.js";

export default {
  data() {
    return {
      input3: "",
      // 判断用户是否已经登录，为true则表示登录了
      isLogined: "",
      // 总的数据
      tableData: [],
      // 分页的数据
      pageData: [],
      // 总数据量 默认为 0
      pageTotal: 0,
      // 当前页 默认是第一页
      currentPage: 1,
      // 每页大小 默认每页4条数据
      pageSize: 4
    };
  },
  computed: {
    // 用户头像
    userAvatar() {
      return this.userInfo.imgUrl;
    },
    // 用户名
    userName() {
      return this.userInfo.nickName || "用户" + this.userInfo.phone;
    },
    // 用户信息
    userInfo() {
      return JSON.parse(sessionStorage.getItem("userInfoList")) || "";
    },

  },
  methods: {

    // 图片加载失败后的处理逻辑，例如显示一张默认图片
    setDefaultImage(e) {
      e.target.src = require("../../assets/img/home/tx.jpg")
    },
    // 前往登录界面
    goLogin() {
      this.$router.push("/register");
    },
    // 前往个人页面
    goPersonal() {
      if (this.userInfo) {
        this.$router.push("/page1");
      } else {
        this.$router.push("/register");
      }
    },
    // 前往关于界面
    goAbout() {
      // 更新导航栏中被选中的文字颜色
      this.$bus.$emit('updataTextColor', 1);
      this.$router.push("/about");
    },
    //获取文章信息
    async getArticleArr() {
      const res = await getArticle();
      if (res.code === 200) {
        this.tableData = res.data
        this.pageTotal = res.data.length
        this.pageData = this.queryByPage()
      }

    },
    // 改变每页大小的回调
    handleSizeChange(val) {
      this.pageSize = val
      this.pageData = this.queryByPage()
    },
    // 改变当前页的回调
    handleCurrentChange(val) {
      this.currentPage = val
      this.pageData = this.queryByPage()
    },
    // 实现分页的方法
    queryByPage() {
      // 起始位置 = (当前页 - 1) x 每页的大小
      const start = (this.currentPage - 1) * this.pageSize
      // 结束位置 = 当前页 x 每页的大小
      const end = this.currentPage * this.pageSize
      return this.tableData.slice(start, end)
    },
    //跳转文章详情
    articleClick(artId) {
      this.$router.push({
        path: '/articleDteail',
        query: { artId: artId }
      })
    },
    //搜索
    async search() {
      const res = await getArticleByKey(this.input3);
      if (res.code === 200) {
        this.tableData = res.data
        this.pageTotal = res.data.length
        this.pageData = this.queryByPage()
        this.input3 = ''
      }
    }

  },
  mounted() {
    console.log("组件已经挂载");
    this.$bus.$on("updataTextColor", (index) => {
      this.activeIndex = index;
    });
    // 如果有用户信息，则用户已登录
    if (this.userInfo) {
      this.isLogined = true;
    }
    this.getArticleArr()

  },

  watch: {
    $route() {
      window.location.reload(); //监测到路由发生跳转时刷新一次页面
    },
  },
};
</script>

<style lang="scss" scoped>
//导航栏
.nav {
  width: 1440px !important;
  position: absolute;
  left: 240px;
}

//顶部图片
.top_img {
  display: flex;
  justify-content: center;

  img {
    width: 1440px;
    height: 265px;
  }
}

//首页logo公告栏部分
.left {
  height: 1231px;
  background: linear-gradient(#ffd404, #75f9f9);

  .logo {
    width: 282px;
    height: 175px;
    background: linear-gradient(180deg,
        rgba(254, 250, 131, 1) 0%,
        rgba(254, 250, 250, 0) 100%);

    img {
      width: 224px;
      height: 164px;
    }

    p {
      color: rgba(16, 16, 16, 1);
      font-size: 22px;
      font-family: ZKXiaoWeiLogo-regular;
      margin-top: -40px;
    }
  }

  .call {
    height: 1000px;

    .explain {
      background: linear-gradient(180deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(254, 250, 250, 0) 100%);
      width: 240px;
      height: 353px;
      margin: auto;

      h1 {
        color: rgba(16, 16, 16, 1);
        font-size: 24px;
        font-weight: 400;
        line-height: 50px;
      }

      p {
        font-size: 16px;
        line-height: 29px;
        text-align: left;
        margin: 0px 18px 0px 25px;
        text-indent: 2em;
        font-weight: 700;
      }
    }

    .board {
      width: 240px;
      height: 686px;
      line-height: 20px;
      background: linear-gradient(180deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(254, 250, 250, 0) 100%);
      // background-color: #fff;
      text-align: center;
      margin: auto;
    }
  }
}

//首页右边主页 广告 部分
.right {
  height: 1231px;
  background: linear-gradient(#ffd404, #75f9f9);
  position: relative;

  .user {
    width: 260px;
    height: 182px;
    line-height: 29px;
    border-radius: 15px;
    background: linear-gradient(180deg,
        rgba(117, 249, 253, 0.4) 0%,
        rgba(254, 250, 250, 0) 100%);
    color: rgba(16, 16, 16, 1);
    font-size: 20px;
    text-align: center;
    box-shadow: 0px 0px 0px 0px rgba(8, 8, 8, 8);
    font-family: Roboto;
    border: 1px solid rgba(16, 16, 16, 1);
    margin-left: 10px;

    .avater {
      position: absolute;
      top: 30px;
      left: 27px;

      img {
        width: 40px;
        height: 40px;
        border-radius: 500px;
        border: 2px solid rgba(255, 255, 255, 1);
      }
    }

    .username {
      position: absolute;
      font-size: 14px;
      top: 28px;
      left: 85px;
      cursor: pointer;
    }

    .gocenter {
      position: absolute;
      font-size: 14px;
      top: 40px;
      left: 177px;
      cursor: pointer;
    }

    .info {
      position: absolute;
      font-size: 10px;
      top: 100px;
      left: 26px;

      ul li {
        display: inline-block;
        margin: 0px 10px;
      }

      ul:nth-child(1) li {
        margin: 0px 23px;
      }
    }
  }

  .code {
    width: 260px;
    height: 353px;
    margin: 20px auto;
    padding-top: 30px;
    line-height: 34px;
    background: linear-gradient(180deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0) 100%);

    img {
      width: 144px;
      height: 146px;
      margin-bottom: 10px;
    }

    p {
      font-size: 18px;
      font-weight: 700;
    }
  }

  .ad {
    margin-top: -60px;

    img {
      width: 260px;
      height: 150px;
      margin: 10px 0px;
    }

    line-height: 0px;
  }
}

// 首页中中间 轮播图 推文部分
.middle {
  height: 1231px;
  width: 1000px;
  background: linear-gradient(#ffd404, #75f9f9);

  .block {
    height: 360px;
    width: 836px;
    margin-top: 10px;

    img {
      width: 836px;
      height: 360px;
    }
  }

  .search {
    width: 800px;
    margin: 20px;
    border-radius: 150px !important;
  }

  .main_nav {
    background: linear-gradient(180deg,
        rgba(117, 249, 253, 0.4) 0%,
        rgba(254, 250, 250, 0) 100%);

    width: 800px;
    height: 48px;
    margin: 20px;
    border-radius: 10px;

    span {
      line-height: 48px;
      display: inline-block;
      width: 130px;
      text-align: center;
      border-right: #aed66f solid 2px;
      cursor: pointer;
      color: #706464;
      font-weight: 700;
    }
  }

  .art_list {
    width: 800px;
    height: 714px;
    margin: 20px;
    border-radius: 10px;
    // background-color: #fff;
    background: linear-gradient(to top right, #ffd404, #75f9f9);

    position: relative;


    .el-pagination {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 5px;
    }

    ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
      background: linear-gradient(to bottom right, #ffd404, #75f9f9);
      color: #fff;
    }


    .el-pagination.is-background .el-pager li:hover {
      color: #08C0B9;
    }




    .article {
      height: 166px;
      // background-color: #f9f9f9;
      // background: linear-gradient(to top right, #ffd404, #75f9f9);

      border-radius: 10px;
      border-bottom: #eee solid 1px;
      border-image: radial-gradient(#ffd404, #75f9f9) 1;
      position: relative;
      cursor: pointer;

      .author {
        position: absolute;
        top: 15px;
        left: 15px;

        span {
          color: #666;
          font-size: 14px;
          margin: 20px;
        }
      }

      .title {
        position: absolute;
        top: 50px;
        left: 40px;
        font-size: 20px;
        font-weight: 700;
      }

      .content {
        position: absolute;
        top: 90px;
        left: 35px;
        color: #666;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        // 只要超过宽度就换行，不论中文还是英文
        word-break: break-all;
        //最多展示两行
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .info {
        position: absolute;
        bottom: 10px;
        left: 35px;
        color: #666;
        font-size: 14px;

        span {
          margin: 10px;
        }
      }
    }
  }
}

.main {
  width: 1440px;
  height: 1000px;
  margin: auto;

  .el-aside {
    text-align: center;
  }
}
</style>
