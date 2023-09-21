<template>
    <div>
        <h3>我的关注（互相关注）</h3>
        <br/>
        <el-card class="box-card" slot="empty" style="text-align: left;">
          <el-empty description="好友列表为空" v-show="friendList.length == 0"></el-empty>
          <div class="friendBox">
            <el-card v-for="item in friendList" :key="item" :body-style="{ display: 'flex', padding: 0 }" shadow="hover" class="friendCard">
                <img :src="item.friendImgUrl" alt="">
                <div class="friendInfo">
                    <p div class="friendName">{{item.friendName}}</p>
                    <p div class="signature">{{item.signature}}</p>
                </div>
            </el-card>
          </div>
        </el-card>
    </div>
</template>

<script>
import { getFriendList } from '@/network/account/account';
export default {
    name:'MyFriends',
    data(){
        return{
            friendList:[],
            userId:36,
        }
    },
    created() {
      this.getList(this.userId);
    },
    methods:{
        // 获得当前用户的好友列表
        getList(userId){
          getFriendList(userId).then((res)=>{
            if(res.code==200){
                // console.log('获取用户好友列表成功');
                this.friendList = res.friendsList
                // console.log(this.friendList[0].friendImgUrl);
            }else{
              this.$message({
                showClose: true,
                message: res.msg,
                type: "error",
                center: true,
              }); 
            }
          }).catch((err)=>{
            console.log('获得当前用户的好友列表失败：'+err);
          })
        },
    }
}
</script>

<style lang="scss" scoped>
.friendBox {
    display: flex;
    // 要换行
    flex-wrap: wrap;
    // 从头到尾均匀排列
    justify-content: space-between;
    // margin-left:20px;

    .friendCard{
        width: 46%;
        margin-bottom: 20px;
        background-color: rgb(245, 245, 246);
        // border-radius: 10px;
        cursor:pointer;
    }
}
img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 10px;
    // margin-right: 40px;
}
.friendInfo {
    width: 250px;
    .friendName {
        font-size: 20px;
        margin: 10px;
    }
    .signature {
        color: #999999;
        overflow:hidden; 
        text-overflow:ellipsis;
        white-space:nowrap
    }
}

</style>