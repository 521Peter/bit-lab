<template>
    <div class="article">

        <!-- //内容 -->
        <div class="main">
            <div class="title">{{ list.title }}</div>
            <div class="author">
                <span>{{ list.author }}</span>
                <span>{{ list.upTime }}</span>
                <span class="editor" @click="editorClick">编辑</span>
            </div>
            <div class="info">
                <span><i class="el-icon-view"></i>{{ list.downNum }}</span>
                <span><i class="el-icon-star-on"></i>{{ list.collectNum }}</span>
                <span><i class="el-icon-edit-outline"></i>{{ list.replyNum }}</span>
            </div>
            <div class="content">
                <!-- {{ list.authWork }} -->
                <p v-html="list.authWork"></p>
            </div>
        </div>
        <!-- 评论区 -->
        <div class="review">
            <div class="num">{{ list.replyNum }} 评论</div>
            <div class="publish">
                <div class="avatar"><img :src=this.userAvatar alt="" v-if="this.userAvatar"><img
                        src="../../assets/img/home/tx.jpg" alt="" v-if="!this.userAvatar"></div>
                <el-input type="textarea" resize="none" :autosize="{ minRows: 3, maxRows: 4 }" placeholder="宫廷玉液酒，评论走一走"
                    v-model="textarea2">
                </el-input>
                <el-button type="primary" @click="postReview">发表评论</el-button>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="按时间升序" name="first">
                    <div class="deatil" v-for="item in review " :key="item.id">
                        <div class="username">{{ item.userId }}</div>
                        <div class="review_con">{{ item.repWork }}</div>
                        <div class="time">{{ item.repTime }}</div>
                    </div>
                    <div>
                        <el-empty description="暂无评论" v-if="!this.review.length"></el-empty>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="按时间倒序" name="second">
                    <div class="deatil" v-for="item in NewReview" :key="item.id">
                        <div class="username">{{ item.userId }}</div>
                        <div class="review_con">{{ item.repWork }}</div>
                        <div class="time">{{ item.repTime }}</div>
                    </div>
                    <div>
                        <el-empty description="暂无评论" v-if="!this.review.length"></el-empty>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!-- 侧边收藏点赞 -->
        <div class="side">
            <span @click="upNum"><i class="iconfont icon-like"
                    :style="{ color: this.upNumColor ? 'red' : 'orange' }"></i></span>
            <span @click="collect"><i class="iconfont icon-star"
                    :style="{ color: this.collectColor ? 'red' : 'orange' }"></i></span>

        </div>
    </div>
</template>
  
<script>

import { getArticleByid } from "network/getArticleByid/getArticleByid.js";
import { getReview } from "network/getReview/getReview.js";
import { articleUpNum } from "network/articleUpNum/articleUpNum.js";
import { articlecollect } from "network/articlecollect/articlecollect.js";
import { articleReview } from 'network/review/review.js'


export default {
    name: 'articleDteail',
    data() {
        return {
            list: {},
            artId: 8,
            review: [],
            newReview: [],
            activeName: 'first',
            textarea2: '',
            collectColor: false,
            upNumColor: false,
        };
    },
    computed: {
        // 用户头像
        userAvatar() {
            return this.userInfo.imgUrl;
        },
        // 用户名
        userName() {
            return this.userInfo.nickName || "用户" + this.userInfo.phone;
        },
        // 用户学号
        userNum() {
            return this.userInfo.stuNum;
        },
        // 用户信息
        userInfo() {
            return JSON.parse(sessionStorage.getItem("userInfoList")) || "";
        },
        //编辑按钮显示隐藏
        editor() {
            return this.list.author == this.userNum ? true : false
        },
        NewReview() {
            this.review.forEach(element => {
                this.newReview.unshift(element);
            });
            return this.newReview;
        }

    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        //获取文章信息
        async getArticleByidArr() {
            const res = await getArticleByid(this.artId);
            if (res.code === 200) {
                this.list = res.data

            }


        },
        //获取文章评论
        async getReviewList() {
            const res = await getReview(this.artId);
            if (res.code === 200) {
                this.review = res.data
            }
        },
        //点赞
        async upNum() {
            if (this.userInfo) {
                const res = await articleUpNum(this.userNum, this.artId);
                if (res.code == 13004 || res.code == 13005) {
                    console.log(res);
                    this.upNumColor = !this.upNumColor
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                } else {
                    this.$message({
                        message: '点赞失败',
                        type: 'warning'
                    })
                }
            } else {
                this.$message({
                    message: '请先登录',
                    type: 'warning'
                });
            }
        },


        // 收藏
        async collect() {
            if (this.userInfo) {
                const res = await articlecollect(this.artId, this.userNum);
                if (res.code == 200) {
                    this.collectColor = !this.collectColor
                    console.log(res);
                    this.$message({
                        message: res.data,
                        type: res.msg
                    });
                } else {
                    this.$message({
                        message: '收藏失败',
                        type: res.msg
                    });
                }
            } else {
                this.$message({
                    message: '请先登录',
                    type: 'warning'
                });
            }
        },

        // 评论
        async postReview() {
            if (this.userInfo) {
                if (this.textarea2 == '') {
                    this.$message({
                        message: '评论不能为空',
                        type: 'warning'
                    })
                    return
                }
                const res = await articleReview(this.artId, this.textarea2)
                if (res.code == 200) {
                    this.$message({
                        message: '评论成功',
                        type: 'success'
                    })
                    this.getReviewList()
                    this.getArticleByidArr()
                    this.textarea2 = ''
                } else {
                    this.$message({
                        message: '评论失败',
                        type: 'warning'
                    });
                }
            } else {
                this.$message({
                    message: '请先登录',
                    type: 'warning'
                });
            }
        },

        //编辑文章
        editorClick() {
            if (!this.editor) {
                this.$message({
                    message: '没有编辑权限',
                    type: 'warning'
                })
            } else {
                this.$router.push({ path: '/editArticle', query: { id: this.artId } })
            }
        }


    },
    mounted() {
        this.artId = this.$route.query.artId
        this.getArticleByidArr()
        this.getReviewList()
        // console.log(this.userInfo,324324324);
    },

}
</script>
  
<style lang="scss" scoped>
@import url(../../fonts/iconfont.css);

.article {
    width: 1440px;
    background: linear-gradient(to top right, #75f9f9, #ffd404);
    margin: 0 auto;
    padding-top: 30px;
}

.main {
    width: 1000px;
    background-color: rgb(246, 247, 249);
    margin: 0px auto 10px;
    position: relative;
    padding-bottom: 10px;
    border-radius: 10px;

    .title {
        display: flex;
        justify-content: center;
        padding-top: 40px;
        font-size: 30px;
        font-weight: 700;
    }

    .author {
        position: absolute;
        top: 100px;
        right: 200px;
        font-size: 14px;
        font-family: 'Courier New', Courier, monospace;
        color: #292626;

        span {
            margin-left: 40px;
        }

        .editor {
            font-size: 14px;
            cursor: pointer;
            font-weight: 700;
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            color: rgb(177, 233, 144)
        }
    }

    .info {
        position: absolute;
        top: 100px;
        left: 300px;
        font-size: 14px;
        font-family: 'Courier New', Courier, monospace;

        span {
            margin-right: 20px;
        }
    }

    .content {
        width: 800px;

        margin: 80px auto;
        text-indent: 2em;
        line-height: 24px;
        overflow: wrap;

        p {

            overflow: hidden;
        }
    }
}

.review {
    width: 1000px;
    background-color: rgb(246, 247, 249);


    margin: 10px auto;
    border-radius: 10px;

    .num {
        font-size: 22px;
        padding: 20px 0 10px 30px;
    }

    .publish {
        width: 900px;
        height: 100px;
        margin: 10px auto 20px;
        position: relative;

        .avatar {
            position: absolute;
            top: 20px;
            left: 20px;

            img {
                width: 60px;
                height: 60px;
                border-radius: 50%;
            }
        }


        ::v-deep .el-textarea__inner {
            width: 650px;
            position: absolute;
            top: -6px;
            left: 100px;
        }

        .el-button {
            height: 74px;
            position: absolute;
            top: 13px;
            right: 30px;
        }
    }

    .el-tabs {
        width: 950px;
        margin: 10px auto;

        .el-tabs__nav-wrap::after {
            height: 1px;
            background-color: #eee;
        }
    }

    .deatil {
        width: 800px;
        margin: 20px auto;
        border-top: 1px solid #eee;



        .username {
            font-size: 20px;
            padding: 40px 0 10px 30px;
        }

        .review_con {
            font-size: 16px;
            line-height: 20px;
            margin: 0 0 0 50px;
        }

        .time {
            font-size: 10px;
            padding: 20px 0 20px 40px;
        }
    }
}

//侧边
.side {
    width: 80px;
    height: 200px;
    background-color: #eee;
    z-index: 99;
    position: fixed;
    top: 300px;
    right: 340px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 10px;

    span {
        font-size: 20px;
        width: 100%;
        height: 100%;
        align-items: center;
        display: flex;
        justify-content: space-evenly;
        border-radius: 10px;

        &:hover {
            background-color: rgb(0, 0, 0, .1);
        }

        i {
            font-size: 30px;
            color: orange;
        }
    }
}

// 切换颜色
</style>