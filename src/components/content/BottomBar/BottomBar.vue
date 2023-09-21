<template>
  <div>
    <footer class="footer-lead-wrapper">
      <div class="contain" id="contain">
        <!-- 版权声明 -->
        <div class="version">
          <h5>Bit Lab</h5>
          <p>版权所有 2022 Bit|保留所有权利 |由Bit Lab的实验室成员设计</p>
        </div>
        <!-- 二维码 -->
        <!-- <div class="qr-code"> -->
        <!-- 实验室公众号 -->
        <!-- <div class="bit-public">
            <img src="../../../assets/img/bottomBar/public.jpg" />
            <span>实验室公众号</span>
          </div> -->
        <!-- 油你小程序 -->
        <!-- <div class="small-program">
            <img src="../../../assets/img/bottomBar/small-program.jpg" />
            <span>油你小程序</span>
          </div> -->
        <!-- 油你校园公众号 -->
        <!-- <div class="youNi-public">
            <img src="../../../assets/img/bottomBar/youni.jpg" />
            <span>油你校园公众号</span>
          </div> -->
        <!-- </div> -->
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "BottomBar",
};
</script>

<style scoped lang="scss">
@import "assets/css/_content.scss";

.footer-lead-wrapper {
  width: 100%;
  padding-bottom: 40px;
  // 设置背景颜色
  @include background_color("bgc2");
  .contain {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-top: 180px;
    transition: all 0.6;
    // 版权声明
    .version {
      text-align: center;
      h5 {
        margin-bottom: 30px;
        font-size: 23px;
      }
    }
    // 二维码
    .qr-code {
      display: flex;
      justify-content: space-between;
      img {
        width: 60px;
        height: 60px;
        margin-bottom: 10px;
      }
      // 小程序
      .small-program {
        margin: 0 40px;
      }
      .small-program,
      .bit-public,
      .youNi-public {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
}

// 屏幕宽度小于 768 像素
@media screen and (max-width: 768px) {
  .footer-lead-wrapper {
    padding-bottom: 90px;
    .contain {
      display: block;
      .qr-code {
        padding: 0 3px;
        margin-top: 50px;
        justify-content: space-between;
      }
    }
  }
}
</style>
