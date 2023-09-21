<template>
  <div class="account-box">
    <section class="account-box1">
      <div class="left-nav">
        <div class="user-head">
          <!-- :data="{'img':imgFile}" -->
          <!-- :http-request=uploadImage -->
          <el-upload
            ref="upload"
            action="/bitlab/bitdf/user/upload/img/"
            class="avatar-uploader"
            :headers="{ Authorization: session }"
            name="img"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <!-- <img v-if="imageUrl" :src="imageUrl || defaultImg" class="avatar"> -->
            <img :src="imgUrl || imageUrl || defaultImg" class="avatar" />
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
          <h3>{{ userNickName || userphone }}</h3>
          <span class="phone">{{ userMail }}</span>
        </div>
        <div class="user-body">
          <div
            class="nav"
            :class="navIndex === index ? 'active' : ''"
            v-for="(item, index) in leftNav"
            :key="index"
            @click="leftNavIndex(index)"
          >
            {{ item }}
          </div>
        </div>
      </div>

      <div class="right-content">
        <div class="user-info">
          <h3>
            {{ navTitle }}
            <i class="el-icon-arrow-down" id="icon1">
              <!-- <i class="el-icon-arrow-down" @click="showList" id="icon1"> -->
              <!-- <ul class="navList" v-show="showListData"> -->
              <ul class="navList">
                <li
                  v-for="(item, index) in leftNav"
                  :key="index"
                  :class="navIndex === index ? 'active' : ''"
                  @click="leftNavIndex(index)"
                >
                  {{ item }}
                </li>
              </ul>
            </i>
          </h3>
          <!-- <ul class="navList" v-show="showListData">
             <li v-for="(item,index) in leftNav" :key="index" :class="navIndex === index? 'active' : ''" @click="leftNavIndex(index)">{{item}}&nbsp;&nbsp;&nbsp;</li>
            </ul> -->
          <router-view></router-view>
        </div>
      </div>
    </section>
  </div>
</template>

<script>


export default {
  data() {
    return {
      // 上传图片后返回的路径，起临时作用
      imgUrl: "",
      // 上传的图片
      imgFile: "",

      // userInfo: '',

      leftNav: ["个人首页", "修改密码"],
      // 屏幕变小时，控制内容区中间的列表显示隐藏
      showListData: false,
      // 导航列表索引
      // navIndex: 0,
      // 导航标题
      navTitle: "个人首页",
      defaultImg: "static/default_img.png",
      // defaultImg: 'static/1.jpg'
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log('上传成功后的res',res);
      console.log('上传成功后的file',file);
      
      this.imgUrl = URL.createObjectURL(file.raw);
      this.userInfo.imgUrl = this.imgUrl;
      sessionStorage.setItem("userInfoList", JSON.stringify(this.userInfo));
      this.$router.go(0);
    },
    beforeAvatarUpload(file) {
      const isLt15M = file.size / 1024 / 1024 <= 15;
      if (!isLt15M) {
        this.$message.error("上传头像图片大小不能超过 15MB!");
      }
      return isLt15M;
    },
    leftNavIndex(val) {
      this.$store.commit("modifyAccountNavIndex", val);
      this.navTitle = this.leftNav[val];
      switch (this.navTitle) {
        case "个人首页":
          this.$router.replace("/account/personInfo");
          this.$store.commit("modifyAccountNavIndex", 0);
          break;
        case "修改密码":
          this.$router.replace("/account/updatePass");
          this.$store.commit("modifyAccountNavIndex", 1);
          break;
        default:
          break;
      }
    },
    showList() {
      this.showListData = !this.showListData;
    },
  },
  computed: {
    navIndex() {
      return this.$store.state.navIndex;
    },

    imageUrl() {
      if (this.userInfo) {
        return this.userInfo.imgUrl;
      } else {
        return undefined;
      }
    },

    // 上传图片需要携带session
    session() {
      return sessionStorage.getItem("session");
    },
    userInfo() {
      return JSON.parse(sessionStorage.getItem("userInfoList"));
    },
    userphone() {
      if (this.userInfo) {
        return this.userInfo.nickName;
      } else {
        return undefined;
      }
    },
    userNickName() {
      if (this.userInfo) {
        return this.userInfo.nickName;
      } else {
        return undefined;
      }
    },
    userImg() {
      if (this.userInfo) {
        return this.userInfo.imgUrl;
      } else {
        return undefined;
      }
    },
    userMail() {
      if (this.userInfo) {
        return this.userInfo.mail;
      } else {
        return undefined;
      }
    },
  },
  created() {
    // this.$store.commit('modifyAccountNavIndex',0)
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("navIndex", this.$store.state.navIndex);
    });
  },
  mounted() {
    this.leftNavIndex(sessionStorage.getItem("navIndex") || 0);
  },
};
</script>

<style lang="scss" scoped>
@import "assets/css/_content.scss";
// elementui样式
// .avatar-uploader .el-upload {
//     border: 1px dashed #d9d9d9;
//     border-radius: 6px;
//     cursor: pointer;
//     position: relative;
//     overflow: hidden;
//   }
//   .avatar-uploader .el-upload:hover {
//     border-color: #409EFF;
//   }
//   .avatar-uploader-icon {
//     font-size: 28px;
//     color: #8c939d;
//     width: 100px;
//     height: 100px;
//     line-height: 100px;
//     text-align: center;
//     background-color: pink;
//   }
//   .avatar {
//     width: 100px;
//     height: 100px;
//     display: block;
//   }

.account-box {
  width: 100%;
}
.account-box1 {
  width: 100%;
  display: flex;
  justify-content: center;
  .left-nav {
    width: 260px;
    height: 790px;
    box-sizing: border-box;
    border: 2px solid #e3e9ed;
    @include border_color("accountBorderClr");
    .user-head {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 200px;
      // background-color: gray;
      img {
        width: 100px;
        height: 100px;
        // height: 130px;
        // background-color: pink;
        border-radius: 50%;
      }
      h3 {
        margin: 15px 0;
      }
    }
    .user-body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-top: 1px solid #e3e9ed;
      @include border_color("accountBorderClr");
      .nav {
        height: 50px;
        width: 100%;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
    }
  }
  .right-content {
    width: 1000px;
    height: 790px;
    margin-left: 20px;
    padding-top: 5px;
    box-sizing: border-box;
    border: 2px solid #e3e9ed;
    @include border_color("accountBorderClr");
    h3 {
      padding-left: 8px;
      border-left: 5px solid #9998ea;
      #icon1 {
        transition: all 5s;
        display: none;
      }
    }
  }
  .active {
    border-bottom: 3px solid #9998ea;
    background-color: rgba(#9998ea, 0.1);

    //  @include background_color('menuBgc');
    box-sizing: border-box;
    // opacity: 1;
  }
}
@media screen and (max-width: 1400px) {
  .account-box1 {
    .right-content {
      width: 600px;
    }
  }
}
@media screen and (max-width: 900px) {
  .account-box1 {
    .left-nav {
      display: none;
    }
    .right-content {
      position: relative;
      width: 500px;
      margin-left: 0;
      .user-info {
        position: relative;
        h3 {
          border: none;
          text-align: center;
          i {
            position: relative;
            &:hover {
              .navList li {
                display: block;
              }
            }
            .navList {
              position: absolute;
              display: flex;
              left: -115px;
              top: 20px;
              flex-direction: column;
              justify-content: center;
              z-index: 1;
              cursor: pointer;
              border: 1px solid #ccc;
              border-top: none;
              align-items: center;
              overflow: hidden;
              border-radius: 5px;
              text-align: center;
              font-size: 18px;
              -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
              li {
                display: none;
                box-sizing: border-box;
                width: 150px;
                padding: 15px;
              }
            }
          }
          #icon1 {
            display: inline-block;
            background-color: lightgray;
            border-radius: 50%;
            cursor: pointer;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          }
        }
      }
    }
  }
}
@media screen and (max-width: 550px) {
  .account-box1 {
    display: flex;
    .right-content {
      width: 370px !important;
    }
  }
}
</style>
