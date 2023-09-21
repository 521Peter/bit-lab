<template>
    <div>
        <h3>我的个人信息</h3>
        <br/>
        <div class="box">
            <div>姓名：{{user.name}}</div>
            <div>昵称：{{user.nickName}}</div>
            <div>性别：
              {{user.gender === 0  ? "女"
              :user.gender === 1  ? "男"
              : "未填写"
              }}
            </div>
            <div>学号：{{user.stuNum}}</div>
            <div>所在城市：{{user.city}}</div>
            <div>所在学院：{{user.institute}}</div>
            <div>所学专业：{{user.major}}</div>
            <div>所在组别：
              {{user.groupx}}
            </div>
            <div>个性签名：{{user.signature}}</div>
        </div>
        
    </div>
</template>

<script>
import { getUserInfo } from '@/network/account/account';

export default {
    name:'MyInformation',
    created() {
        this.userInfo();
    },
    data() {
        return {
          user:{}
        }
    },
    methods:{
        // 获得当前用户的信息
        async userInfo() {
          try {
            // 调用获取用户信息的api请求 , 并解构出data, 重命名为res
            const { data: res } = await getUserInfo();
            // console.log(res);
            // 赋值
            this.user = res;
          } catch (err) {
            console.log(err);
          }
        },
    }
}
</script>

<style lang="scss" scoped>
.box {
    width: 800px;
    margin-left: 20px;
}
.box div{
    width: 780px;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    color: #61586e;
    background-color: #faf9ffc5;
    margin-top: 20px;
    padding-left: 20px;
    border-left: 10px solid #8a9abc;
}
</style>