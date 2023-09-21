import axios from "axios";
// import router from "../router"

//网络请求的公共配置
export function request(config) {
  const instance = new axios.create({
    //根地址
    baseURL:
      process.env.NODE_ENV === "production"
        ? "http://47.120.42.169:8088"
        : "/bitlab",
    // 5秒未连接上就超时
    timeout: 5000,
  });

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      console.log("请求体数据", config);
      // 获取并判断 session 的值是否为空
      const sessionId = sessionStorage.getItem("session");
      if (sessionId) {
        config.headers.Authorization = sessionStorage.getItem("session");
      }
      return config;
    },
    (err) => {
      return err;
    }
  );

  //设置响应拦截器
  instance.interceptors.response.use(
    (res) => {
      console.log("响应数据", res.data);
      // 拦截后需要将拦截下来处理成的结果返回
      return res.data;
    },
    (err) => {
      console.log(err);
    }
  );

  // 处理完后返回instance对象  需要注意的是 axios返回的都是promise对象
  return instance(config);
}
