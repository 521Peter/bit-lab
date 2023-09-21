<template>
  <div class="indexForm-box">
    <el-form
      label-width="70px"
      :model="userInfoList"
      @keyup.enter.native="saveInfo"
    >
      <el-form-item label="姓名">
        <el-input
          v-show="isSave === false"
          v-model.trim="userInfoList.name"
        ></el-input>
        <span v-show="isSave === true">{{ userInfoList.name }}</span>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input
          v-show="isSave === false"
          v-model.trim="userInfoList.nickName"
        ></el-input>
        <span v-show="isSave === true">{{ userInfoList.nickName }}</span>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group
          v-show="isSave === false"
          v-model.trim="userInfoList.gender"
        >
          <el-radio-button :label="1">男</el-radio-button>
          <el-radio-button :label="0">女</el-radio-button>
        </el-radio-group>
        <span v-show="isSave === true">{{
          userInfoList.gender === 0
            ? "女"
            : userInfoList.gender === 1
            ? "男"
            : ""
        }}</span>
      </el-form-item>
      <el-form-item label="学号">
        <el-input
          v-show="isSave === false"
          v-model.trim="userInfoList.stuNum"
        ></el-input>
        <span v-show="isSave === true">{{ userInfoList.stuNum }}</span>
      </el-form-item>
      <el-form-item label="城市">
        <el-input
          v-show="isSave === false"
          v-model.trim="userInfoList.city"
        ></el-input>
        <span v-show="isSave === true">{{ userInfoList.city }}</span>
      </el-form-item>
      <el-form-item label="学院">
        <el-input
          v-show="isSave === false"
          v-model.trim="userInfoList.institute"
        ></el-input>
        <span v-show="isSave === true">{{ userInfoList.institute }}</span>
      </el-form-item>
      <el-form-item label="专业">
        <el-input
          v-show="isSave === false"
          v-model.trim="userInfoList.major"
        ></el-input>
        <span v-show="isSave === true">{{ userInfoList.major }}</span>
      </el-form-item>
      <template v-if="userInfoList.role !== 0">
        <!-- 方向 -->
        <el-form-item label="组别">
          <el-select
            v-show="isSave === false"
            v-model.trim="userInfoList.groupx"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.group"
              :label="item.label"
              :value="item.group"
            >
            </el-option>
          </el-select>
          <span v-show="isSave === true">{{ group }}</span>
        </el-form-item>
      </template>

      <el-form-item label="职位">
        <el-input
          v-show="isSave === false"
          v-model.trim="userInfoList.position"
        ></el-input>
        <span v-show="isSave === true">{{ userInfoList.position }}</span>
      </el-form-item>
      <el-form-item label="个性签名">
        <el-input
          v-show="isSave === false"
          id="signature"
          type="textarea"
          v-model.trim="userInfoList.signature"
          :rows="3"
          maxlength="50"
          resize="none"
        >
        </el-input>
        <span class="textarea" v-show="isSave === true">{{
          userInfoList.signature
        }}</span>
      </el-form-item>
      <!-- 保存按钮 -->
      <input
        v-show="isSave === false"
        type="button"
        class="primary"
        value="保存"
        @click="saveInfo"
      />
      <!-- 编辑按钮 -->
      <input
        v-show="isSave === true"
        type="button"
        class="primary"
        value="编辑"
        @click="toggleSave"
      />
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { updataUserInfo, getUserInfo } from "network/account/account";
export default {
  data() {
    return {
      // 显示编辑还是保存按钮
      // true显示编辑，false显示保存
      isSave: true,
      // 组别
      options: [
        {
          group: 1,
          label: "Java",
        },
        {
          group: 2,
          label: "Python",
        },
        {
          group: 3,
          label: "前端",
        },
        {
          group: 4,
          label: "硬件",
        },
        {
          group: 5,
          label: "新媒体技术",
        },
        {
          group: 6,
          label: "网络安全",
        },
      ],
    };
  },
  computed: {
    ...mapState(["userInfoList"]),

    // 值为组别数字相同的组别名称
    groupx() {
      const res = this.options.filter((item) => {
        return item.group === this.userInfoList.groupx;
      });
      if (res[0]) {
        return res[0].label;
      } else {
        return "";
      }
    },
  },
  methods: {
    async saveInfo() {
      try {
        // console.log(this.userInfoList);
        const res = await updataUserInfo(this.userInfoList);
        if (res.code == "200") {
          this.toggleSave();
          this.$store.commit("getUserInfo", this.userInfoList);
          sessionStorage.setItem(
            "userInfoList",
            JSON.stringify(this.userInfoList)
          );
          this.$router.go(0);
          this.$message({
            showClose: true,
            message: "修改成功！",
            type: "success",
            center: true,
          });
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error",
            center: true,
          });
        }
      } catch (err) {
        // console.log(err);
      }
    },
    toggleSave() {
      this.isSave = !this.isSave;
    },
    // 获取学生信息
    async userInfo() {
      const { data } = await getUserInfo();
      sessionStorage.setItem("userInfoList", JSON.stringify(data));
      this.$store.commit("getUserInfo", data);
    },
  },
  created() {
    this.userInfo();
  },
};
</script>

<style lang="scss" scoped>
@import "assets/css/_content.scss";
.indexForm-box {
  .el-form {
    margin-top: 30px;
    margin-left: 60px;
    span {
      padding: 0 15px;
      padding-left: 30px;
    }
    .textarea {
      box-sizing: border-box;
      display: block;
      line-height: 22px;
      width: 320px;
      height: 90px;
      padding-top: 8px;
    }
    //按钮样式
    .primary {
      transition: all 0.3s;
      width: 250px;
      height: 40px;
      margin-top: 10px;
      margin-left: 100px;
      @include background_color("btnBgc");
      border: none;
      color: #fff;
      font-weight: 700;
      cursor: pointer;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
  }
  ::v-deep .el-textarea__inner {
    width: 320px;
    height: 90px;
    // background-color: #e3e9ed;
    @include background_color("inpBgc");
  }
  ::v-deep .el-input__inner {
    width: 320px;
    @include background_color("inpBgc");
  }
}
@media screen and (max-width: 900px) {
  .indexForm-box {
    .el-form {
      margin-left: 40px;
    }
  }
}
@media screen and (max-width: 550px) {
  .indexForm-box {
    .el-form {
      margin-left: 15px;
      .primary {
        margin-left: 75px;
        width: 220px;
      }
      .textarea {
        width: 250px;
      }
    }
    ::v-deep .el-textarea__inner {
      width: 240px;
    }
    ::v-deep .el-input__inner {
      width: 240px;
    }
  }
}
</style>
