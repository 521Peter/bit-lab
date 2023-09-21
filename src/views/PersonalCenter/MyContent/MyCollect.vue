<template>
    <div>
        <h3>我的收藏</h3>
        <br/>
        <div class="box">
          <div class="topBar">
              <span>文章列表</span>
              <span>发布时间</span>
          </div>
          <div class="nullBox" slot="empty" style="text-align: left;">
            <el-empty description="暂无收藏的文章" v-show="theText.length == 0"></el-empty>
            <div>
               <!--  -->
              <div class="textBox">
                <el-card 
                  shadow="hover"  
                  :body-style="{padding:'10px'}" 
                  v-for="item in theText" 
                  :key="item.artId"
                  @click.native="articleClick(item.artId)"
                >
                  <div class="content">
                      <div class="title">{{item.title}}</div>
                      <div class="text">{{item.authWork |filterHtmlTag}}</div>
                  </div>
                  <div class="time">{{item.upTime}}</div>
                  <div class="cancel" v-on:click.stop="cancelFollow(item)">取消收藏</div>
                  <!-- v-on:click="cancelFollow(item.id)" -->
                </el-card>
              </div>  
            </div>
          </div>   
        </div>
        
    </div>
</template>

<script>
import { collectText, getUserCollect } from '@/network/account/account';
export default {
    name:'MyCollect',
    data (){
        return{
            theText:[],
        }
    },
    created() {
      this.getText(this.collectorId);
    },
    computed: {
      // 上传图片需要携带session
      session() {
        return sessionStorage.getItem("session");
      },
       // 用户学号
      collectorId() {
      return this.userInfo.stuNum;
      },
      // 用户信息
      userInfo() {
        return JSON.parse(sessionStorage.getItem("userInfoList"));
      },
    },
    filters: {
      filterHtmlTag(t) {
        if (!t) return '';
        return t.toString().replace(/<.*?>/g, '');
      },
    },
    methods:{
        // 获得当前用户的收藏的文章
        getText(collectorId){
          getUserCollect(collectorId).then((res)=>{
            if(res.code==200){
              // .filter(item=>item)过滤掉数组空值
              this.theText = res.data.filter(item=>item);
              // console.log('获得当前用户的收藏的文章成功');
              // console.log(this.theText);
            }else{
              this.$message({
                showClose: true,
                message: res.msg,
                type: "error",
                center: true,
              }); 
            }
          }).catch((err)=>{
            console.log('获得当前用户的收藏的文章失败：'+err);
          })
        },

        //跳转文章详情
        articleClick(artId) {
          this.$router.push({
            path: '/articleDteail',
            query: { artId: artId }
          })
        },

        cancelFollow(item){
          // collectText(item.artId,item.collectorId).then
            this.$confirm('是否取消收藏该文件？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              console.log(item);
              collectText(item.artId,this.collectorId).then((res)=>{
                if(res.code==200){
                  this.$message({
                    type: 'success',
                    message: '取消收藏成功!',
                    center: true,
                  });
                  this.getText(this.collectorId);
                }else{
                  this.$message({
                    message: res.msg,
                    type: "error",
                    center: true,
                  }); 
                }
              }).catch((err)=>{
                console.log('取消收藏失败：'+err);
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });          
            });
        }
    },
    watch: {
    $route() {
      window.location.reload(); //监测到路由发生跳转时刷新一次页面
    },
  },

}
</script>

<style lang="scss" scoped>
.box {
  background-color: #ffffffd4;
}
.nullBox{
  background-color: #FFF9DE;
}
.topBar{
  height: 30px;
  background-color: #fff;
}
.topBar span{
    display: inline-block;
    height: 30px;
    width: 108px;
    margin-left: 136px;
    line-height: 30px;
    text-align: center;
}

.textBox{
    padding: 10px;
}
.el-card {
    cursor:pointer;
}
.imge {
  float: left;
  width: 50px;
  height: 60px;
  padding-bottom: 10px;
//   margin-top: 10px;
}
.imge img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content {
    float: left;
    height: 60px;
    width: 260px;
    margin-left: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
}
.title{
    height: 18px;
    font-weight:600;
    overflow:hidden; 
    text-overflow:ellipsis; 
    white-space:nowrap;
}
.text{
    margin-top: 4px;
    font-size: 10px;
    color: #827f7f;
    overflow: hidden;
    text-overflow: ellipsis; 
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.time{
    float: left;
    margin-left: 60px;
    margin-top: 20px;
    color: #827f7f;
}
.cancel{
    float: left;
    margin-left: 210px;
    margin-top: 20px;
    color: #827f7f;
}
.cancel:hover{
    color: #409EFF;
}
</style>