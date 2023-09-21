import Vue from "vue";
import Router from "vue-router";
import { isLogined } from "@/utils/isLogined";

Vue.use(Router);

// 以下代码为了解决 "跳转相同路径页面报错" 的问题,重写了push方法
// 获取原型对象上的push函数
// const originalPush = Router.prototype.push
// // 修改原型对象中的push方法
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
// const originalReplace = Router.prototype.replace
// Router.prototype.replace = function replace(location) {
//   return originalReplace.call(this, location).catch(err => err)
// }

const router = new Router({
  routes: [
    // 首页
    {
      path: "/",
      name: "home",
      component: () => import("views/Home"),
      meta: {
        // 显示顶部导航栏
        showTopBar: true,
      },
    },
    // 报名
    {
      path: "/enroll",
      name: "enroll",
      component: () => import("views/Enroll"),
    },
    // 关于
    {
      path: "/about",
      name: "about",
      component: () => import("views/About"),
      meta: {
        returnTop: true,
        showTopBar: true,
      },
    },
    // 比赛详情
    {
      path: "/detail",
      name: "detail",
      component: () => import("views/PersonalCenter"),
    },
    // 注册
    {
      path: "/register",
      name: "register",
      component: () => import("views/Register"),
    },
    // 新建文章
    {
      path: "/createArticle",
      name: "createarticle",
      component: () => import("views/Article"),
      meta: {
        requireAuth: true,
        // 显示顶部导航栏
        showTopBar: true,
      },
    },
    // 编辑文章
    {
      path: "/editArticle",
      name: "editarticle",
      component: () => import("views/EditArticle"),
      // 需要鉴权
      meta: {
        requireAuth: true,
        showTopBar: true,
      },
    },
    //文章详情
    {
      path: "/articleDteail",
      name: "articleDteail",
      component: () => import("views/ArticleDetail"),
      meta: {
        // 显示顶部导航栏
        showTopBar: true,
      },
    },
    // 欢迎
    {
      path: "/welcome",
      name: "welcome",
      component: () => import("views/Welcome"),
    },
    // 登录
    {
      path: "/login",
      name: "login",
      component: () => import("views/Login"),
    },
    // 资料下载
    {
      path: "/download",
      name: "download",
      component: () => import("views/Download"),
      meta: {
        // 显示顶部导航栏
        showTopBar: true,
      },
    },
    // 资料上传
    {
      path: "/upload",
      name: "upload",
      component: () => import("views/Download/upload.vue"),
    },
    // 打卡
    {
      path: "/clock",
      name: "clock",
      component: () => import("views/Clock"),
      // 需要鉴权
      meta: {
        requireAuth: true,
        // 显示顶部导航栏
        showTopBar: true,
      },
    },
    {
      path: "/clockIn",
      // name: "clockIn",
      // name: "clock",
      component: () => import("views/clockIn/clockIn.vue"),
    },
    // 用户主页
    {
      path: "/account",
      name: "account",
      redirect: "/account/personInfo",
      component: () => import("views/Account"),
      meta: {
        // 显示顶部导航栏
        showTopBar: true,
      },
      children: [
        {
          path: "personInfo",
          name: "personInfo",
          component: () => import("views/Account/IndexForm/index"),
        },
        {
          path: "updatePass",
          name: "updatePass",
          component: () => import("views/Account/UpdatePass/index"),
        },
      ],
    },
    // 个人主页
    {
      path: "/personalCenter",
      name: "personalCenter",
      component: () => import("views/PersonalCenter"),
      meta: {
        // 显示顶部导航栏
        showTopBar: true,
      },
      children: [
        {
          path: "/",
          name: "page1",
          component: () => import("views/PersonalCenter/MyContent/MyText.vue"),
          meta: {
            // 显示顶部导航栏
            showTopBar: true,
          },
        },
        {
          path: "/page1",
          name: "page1",
          component: () => import("views/PersonalCenter/MyContent/MyText.vue"),
          meta: {
            // 显示顶部导航栏
            showTopBar: true,
          },
        },
        {
          path: "/page2",
          name: "page2",
          component: () =>
            import("views/PersonalCenter/MyContent/EditInformation.vue"),
          meta: {
            // 显示顶部导航栏
            showTopBar: true,
          },
        },
        {
          path: "/page3",
          name: "page3",
          component: () =>
            import("views/PersonalCenter/MyContent/MyChange.vue"),
          meta: {
            // 显示顶部导航栏
            showTopBar: true,
          },
        },
        {
          path: "/page4",
          name: "page4",
          component: () =>
            import("views/PersonalCenter/MyContent/MyInformation.vue"),
          meta: {
            // 显示顶部导航栏
            showTopBar: true,
          },
        },
        {
          path: "/page5",
          name: "page5",
          component: () =>
            import("views/PersonalCenter/MyContent/ChangePassword.vue"),
          meta: {
            // 显示顶部导航栏
            showTopBar: true,
          },
        },
        {
          path: "/page6",
          name: "page6",
          component: () =>
            import("views/PersonalCenter/MyContent/MyFriends.vue"),
          meta: {
            // 显示顶部导航栏
            showTopBar: true,
          },
        },
        {
          path: "/page7",
          name: "page7",
          component: () =>
            import("views/PersonalCenter/MyContent/MyCollect.vue"),
          meta: {
            // 显示顶部导航栏
            showTopBar: true,
          },
        },
        {
          path: "/page8",
          name: "page8",
          component: () =>
            import("views/PersonalCenter/MyContent/MyRecord.vue"),
          meta: {
            // 显示顶部导航栏
            showTopBar: true,
          },
        },
        {
          path: "/page9",
          name: "page9",
          component: () => import("views/PersonalCenter/MyContent/MyMore.vue"),
          meta: {
            // 显示顶部导航栏
            showTopBar: true,
          },
        },
      ],
    },
  ],
  // 页面刷新时，期望滚动到哪个位置
  scrollBehavior(to) {
    if (to.meta.returnTop) {
      return {
        x: 0,
        y: 0,
      };
    }
  },
});

// 初始化时调用一次，路由切换前也调用
router.beforeEach((to, from, next) => {
  // 如果是要鉴权的页面
  if (to.meta && to.meta["requireAuth"]) {
    if (isLogined()) {
      next();
    } else {
      Vue.prototype.$message({
        showClose: true,
        message: "请先登录！",
        type: "error",
        duration: 2000,
      });
      next("login");
    }
  } else {
    // 直接放行，即允许切换
    next();
  }
});

export default router;
