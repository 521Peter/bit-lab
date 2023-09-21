<template>
    <div class="MyBox">
        <h3>历史记录</h3>
        <br/>
        <div class="box" slot="empty" style="text-align: left;">
            <el-empty description="暂无浏览记录" v-show="history.length == 0"></el-empty>
            <ul class="list">
                <li  v-for="item in history" :key="item.id">
                    <div class="myRecord">
                        <div class="content">
                            <div class="title">{{item.title}}</div>
                            <div class="text">{{item.authWork |filterHtmlTag}}</div>
                        </div>
                        <div class="time">{{item.nowTime}}</div>
                        <el-button class="delect" type="danger" size="small" v-on:click="delectFollow(item.id)">删除</el-button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:'MyRecord',
    data(){
        return{
            history:[]
        }
        
    },
    filters: {
      filterHtmlTag(t) {
        if (!t) return '';
        return t.toString().replace(/<.*?>/g, '');
      },
    },
    created(){
        this.getHistory();
    },
    methods:{
        // 获得历史记录
        getHistory(){
            this.history = JSON.parse(localStorage.getItem("history"));
            // console.log('this.history',this.history);
        },

        delectFollow(id){
            this.$confirm('此操作将永久删除该记录，是否继续？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.history = this.history.filter( item => item.id !== id ),
              localStorage.setItem('history', JSON.stringify(history));
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
        }
    }
}
</script>

<style lang="scss" scoped>

.box{
    height: 820px;
    width: 840px;

}
.myRecord{
    height: 60px;
    padding: 10px;
    margin-top: 5px;
    background-color: #fff;
}
.content {
    float: left;
    height: 60px;
    width: 250px;
    margin-left: 10px;
    margin-top: 5px;
    cursor:pointer;
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
    margin-left: 140px;
    margin-top: 20px;
    color: #827f7f;
}
.delect{
    float: left;
    margin-left: 180px;
    margin-top: 13px;
}
</style>