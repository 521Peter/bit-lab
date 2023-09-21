<template>
  <li class="search">
    <input type="checkbox" id="searchIpt" @click="openIptFn($event)" />
    <!-- label将checkbox和搜索文字及其图标联系起来 -->
    <label for="searchIpt">
      <!-- 搜索图标 -->
      <i class="el-icon-search"></i><span> 搜索</span>
      <!-- 隐藏的搜索框 -->
      <div class="searchWrapper">
        <div class="searchContent">
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="inputValue"
            ref="elInput"
          >
          </el-input>
        </div>
      </div>
    </label>
  </li>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    // 点击搜索
    openIptFn(e) {
      // 如果选中了搜索
      if (e.target.checked === true) {
        // 自动获取焦点
        this.$refs.elInput.focus();
      } else {
        // 清空搜索框中的值
        this.inputValue = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/css/_content.scss";

// 搜索按钮
.search {
  // checkbox盒子
  #searchIpt {
    display: none;
  }
  label {
    // 搜索图标
    i {
      font-size: 17px;
      cursor: pointer;
    }
    // 搜索文字
    span {
      // 设置文字无法选中
      user-select: none;
      cursor: pointer;
    }
  }
  // 隐藏的搜索框
  .searchWrapper {
    position: absolute;
    // 隐藏
    display: none;
    width: 100%;
    // 占满整个屏幕的高度
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 99999;
    background-color: rgba(0, 0, 0, 0.67);
    .searchContent {
      position: absolute;
      width: 700px;
      box-sizing: border-box;
      top: 100px;
      // 设置水平居中
      left: 0;
      right: 0;
      margin: 0 auto;
      padding: 12px;
      border-radius: 10px;
      @include background_color("searchBoxBgc");
      // 修改element中的搜索框样式
      ::v-deep .el-input__inner {
        height: 54px;
        padding-left: 48px;
        // 设置文字无法选中
        user-select: none;
        font-size: 16px;
        // 设置边框颜色
        @include border_color("deputyTextClr");
        // 设置背景颜色
        @include background_color("searchBgc");
        // 设置文字颜色
        @include font_color("searchIptTextClr");
      }
      // 修改element中的搜索图标样式
      ::v-deep .el-input__icon.el-icon-search {
        font-size: 28px;
        margin: 8px 0 0 8px;
        @include font_color("deputyTextClr");
      }
    }
  }
  // 当盒子被选中时,显示搜索框
  #searchIpt:checked ~ label .searchWrapper {
    // 显示
    display: block;
  }
}

// 屏幕宽度小于 992 像素
@media screen and (max-width: 992px) {
  // 搜索框
  .search {
    i {
      margin-top: 5px;
    }
    span {
      // 隐藏文字
      display: none;
    }
  }
}

// 屏幕宽度小于 768 像素
@media screen and (max-width: 768px) {
  // 搜索框
  .search {
    .searchWrapper {
      .searchContent {
        width: 510px;
        // 修改element中的搜索图标样式
        ::v-deep .el-input__icon.el-icon-search {
          margin: 4px 0 0 8px;
          font-size: 22px;
        }
        // 修改element中的搜索框样式
        ::v-deep .el-input__inner {
          height: 48px;
          font-size: 14px;
        }
      }
    }
  }
}

// 屏幕宽度小于 576 像素
@media screen and (max-width: 576px) {
  // 搜索按钮
  .search {
    .searchWrapper {
      .searchContent {
        width: 100%;
      }
    }
  }
}
</style>
