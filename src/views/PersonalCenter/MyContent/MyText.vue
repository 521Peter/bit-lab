<template>
  <div>
    <h3>我的作品</h3>
    <br />
    <div
      class="blogs"
      data-scroll-reveal="enter bottom over 1s"
      data-scroll-reveal-id="1"
      style="
        -webkit-transform: translatey(0);
        transform: translatey(0);
        opacity: 1;
        -webkit-transition: -webkit-transform 1s ease-in-out 0s,
          opacity 1s ease-in-out 0s;
        transition: transform 1s ease-in-out 0s, opacity 1s ease-in-out 0s;
        -webkit-perspective: 1000;
        -webkit-backface-visibility: hidden;
      "
      data-scroll-reveal-initialized="true"
      v-for="item in articleList"
      :key="item.artId"
    >
    <div class="myTitle" @click="articleClick(item)">
      <h3 class="blogtitle" @click="articleClick(item)">
        {{item.title}}
      </h3>
    </div>
      
        <!-- <router-link :to="{ path: '/articleDteail', query: { artId: item.artId } }">
          {{item.title}}
        </router-link> -->
      
      <p class="blogtext">
        {{item.authWork |filterHtmlTag}}
      </p>
      <div class="bloginfo">
        <ul>
          <li class="el-icon-user-solid"><a href="/">{{item.author}}</a></li>
          <li class="el-icon-mouse"><a href="/">{{item.upNum}}点赞</a></li>
          <li class="el-icon-time">{{item.upTime}}</li>
          <li class="el-icon-view"><span>{{item.accessNum}}</span>已阅读</li>
          <li class="el-icon-star-on">{{item.collectNum}}</li>
        </ul>
      </div>
    </div>
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getUserText } from '@/network/account/account';

export default {
  name: "MyText",
  data() {
    return {
      // 当前页 默认是第一页
      currentPage: 1,
      // 每页大小 默认每页3条数据
      pageSize: 3,
      // total: 3,
      articleList: [],
      history:[]
    };
  },
  filters: {
    filterHtmlTag(t) {
      if (!t) return '';
      return t.toString().replace(/<.*?>/g, '');
    },
  },
  created() {
    this.getText(this.author);
  },
  computed: {
    // 上传图片需要携带session
    session() {
      return sessionStorage.getItem("session");
    },
     // 用户头像
    author() {
    return this.userInfo.stuNum;
    },
    // 用户信息
    userInfo() {
      return JSON.parse(sessionStorage.getItem("userInfoList"));
    },

    // 总数
    total(){
      return this.articleList.length
    }
  },
  methods: {
    //跳转文章详情
    articleClick(item) {
      var dt = new Date();
      let year = dt.getFullYear();
      let month = (dt.getMonth() + 1).toString().padStart(2,'0');
      let date = dt.getDate().toString().padStart(2,'0');
      let hour = dt.getHours().toString().padStart(2,'0');
      let minute = dt.getMinutes().toString().padStart(2,'0');
      let nowTime = `${year}-${month}-${date} ${hour}:${minute}`;
      this.$set(item, 'nowTime', nowTime)
      this.history.unshift(item)
      var myHistory = this.history.filter(function(item, index, arr) {
        //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
        return arr.indexOf(item, 0) === index;
      });
      // 记录点击历史
      localStorage.setItem('history', JSON.stringify(myHistory));
      this.$router.push({
        path: '/articleDteail',
        query: { artId: item.artId }
      })
    },

    // 获得当前用户的作品
    getText(author){
      getUserText(author).then((res)=>{
        if(res.code==200){
          // .filter(item=>item)过滤掉数组空值
          this.articleList = res.data.filter(item=>item);
          // console.log('获得当前用户发表的文章成功！');
          // console.log(this.articleList);
        }else{
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error",
            center: true,
          }); 
        }
      }).catch((err)=>{
        console.log('获得当前用户发表的文章失败：'+err);
      })
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageData = this.queryByPage()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.pageData = this.queryByPage()
    },
    // 实现分页的方法
    queryByPage() {
      // 起始位置 = (当前页 - 1) x 每页的大小
      const start = (this.currentPage - 1) * this.pageSize
      // 结束位置 = 当前页 x 每页的大小
      const end = this.currentPage * this.pageSize
      return this.tableData.slice(start, end)
    },
  },
  watch: {
    $route() {
      window.location.reload(); //监测到路由发生跳转时刷新一次页面
    },
  },
};
</script>

<style lang="scss" scoped>
/*blogsbox*/
.blogs {
  overflow: hidden;
  margin-bottom: 20px;
  padding: 20px;
  // background: #d3d8df87;
  background: #f1f1f3dd;
  border-radius: 10px;
  -webkit-box-shadow: 0 2px 5px 0 rgba(146, 146, 146, 0.1);
  -moz-box-shadow: 0 2px 5px 0 rgba(146, 146, 146, 0.1);
  box-shadow: 0 2px 5px 0 rgba(146, 146, 146, 0.1);
  -webkit-transition: all 0.6s ease;
  -moz-transition: all 0.6s ease;
  -o-transition: all 0.6s ease;
  transition: all 0.6s ease;
  position: relative;
}
.blogs a {
  text-decoration: none;
  color: #3f4041;
}
.blogs:before {
  position: absolute;
  content: "";
  width: 5px;
  height: 26px;
  background: #3690cf;
  left: 0;
  top: 20px;
}
.blogs .blogtitle {
  margin: 0 0 10px 0;
  font-size: 20px;
  overflow: hidden;
}
.myTitle:hover {
  cursor: pointer;
}
.blogs .blogtext {
  font-size: 14px;
  color: #566573;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  margin-top: 20px;
}
.blogs .bloginfo {
  overflow: hidden;
  margin-top: 30px;
  display: block;
}
.blogs ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 5px;
}

.blogs .bloginfo li {
  float: left;
  font-size: 14px;
  padding: 0 0 0 8px;
  margin: 0 15px 0 0;
  color: #748594;
  line-height: 1.5;
  list-style: none;
  display: inline-block;
}
.el-pagination {
  margin: 45px 0 0px 280px;
}
</style>