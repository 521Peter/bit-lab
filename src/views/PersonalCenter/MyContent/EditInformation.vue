<template>
    <div>
        <h3>修改头像</h3>
        <br/>
        <p>如果您还没有设置自己的头像,系统会显示为默认头像，您需要自己上传一张新照片来作为自己的个人头像</p>
        <br />
        <br />
        <div class="box">
          <div class="headerMain">
            <div class="headPortrait">
              <img :src="imgUrl || imageUrl" class="avatar"  @error="setDefaultImage">
            </div>
            <el-upload
              class="upload-demo"
              ref="upload"
              action="/bitlab/bitdf/user/upload/img/"
              :headers="{ Authorization: session }"
              name="img"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"

              accept=".jpeg,.png"
              list-type="picture">
              <!-- list-type属性指的是照片picture-card展示的方式 -->
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
            </el-upload>
          </div>
        </div>
        <div>
        </div>
    </div>
</template>
<script>
export default {
    name: "EditInformation",
    data() {
      return {
        // 上传图片后返回的路径，起临时作用
        imgUrl: "",
        // 上传的图片
        imgFile: "",
      };
    },
    computed: {
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
    },
    methods: {
      // 图片加载失败后的处理逻辑，例如显示一张默认图片
      setDefaultImage(e) {
        e.target.src = require("../../../assets/img/topBar/avatar.png")
      },
      // 上传图片成功的接口
      handleAvatarSuccess(res, file) {
        // console.log('上传成功后的res',res);
        this.imgUrl = URL.createObjectURL(file.raw);
        this.userInfo.imgUrl = res.data;
        sessionStorage.setItem("userInfoList", JSON.stringify(this.userInfo));
        this.$message({
          message: "头像修改成功！",
          type: "success",
          duration:2000,
        })
        this.$router.go(0);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG/png 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    }
}  
</script>
<style lang="scss" scoped>
.box{
    display: flex;
    justify-content: center;
    align-items: center;
}
p {
    color: #494747;
    font-size: 14px;
}
.headerMain {
    width: 400px;
    height: 12px;
    // background-color: aquamarine;
}
.headerMain .name {
    width: 107px;
}
// .headerMain .city {
//     margin-left: 40px;
// }
.headerMain .group {
    margin-left: 24px;
}
.headerMain .headPortrait {
    width: 160px;
    height: 160px;
    background-color: #fff;
    border-radius: 50%;
    border: 2px solid #434647;
    margin: 10px auto;
    // background-image: url('../../../assets/img/PersonalCenter/pfp01.jpg');
    background-size: 100%;
}
.headerMain .headPortrait img {
  //使图片自适应盒子
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.upload-demo {
    margin-top: 30px;
    margin-left: 90px;
}
.headerMain button{
    width: 120px;
    margin-left: 45px;
}
</style>