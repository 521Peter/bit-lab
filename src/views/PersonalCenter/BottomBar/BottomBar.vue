<template>
  <div class="socialize">
    <a class="gzh">
      <li class="gzhBox">
      </li>
    </a>
    <li class="text">更多详情可关注比特巅峰实验室公众号</li>
  </div>
</template>

<script>
export default {
    name: "BottomBar",
};
</script>

<style lang="scss" scoped>
.socialize {
  width: 250px;
  height: 50px;
  margin: 64px 0 0 474px;
}
.socialize li {
  display: inline-block;
  float: left;
  width: 50px;
  height: 50px;
  list-style: none;
  margin: 14px;
}
.socialize .text{
  width: 100px;
}
.gzhBox {
  background-image: url("../../../assets/img/home/logo.png");
  background-size: 100%;
  border-radius: 50%;
}
.gzh {
  position:relative;
}

.gzh::after {
  content: url(../../../assets/img/PersonalCenter/bit.jpg);
  position: absolute;
  z-index: 999;
  width: 200px;
  height: 200px;
  padding: 10px;
  background: #fff;
  bottom: 30px;
  left: -200px;
  -webkit-transform: translate3d(0, 50px, 0);
  transform: translate3d(0, 80px, 0);
  transition: 0.7s all ease;
  -webkit-transition: 0.7s all ease;
  -moz-transition: 0.7s all linear;
  -o-transition: 0.7s all ease;
  -ms-transition: 0.7s all ease;
  opacity: 0;
}
.gzh:hover::after{
  transform:scale(1);
  opacity: 1;
}
</style>