<template>
  <div style="padding: 20px">
    <label for="file" class="button">上传<i class="el-icon-upload el-icon--right"></i></label>
    <input type="file" id="file" @change="onFileChange" accept=".md" style="display: none" class="md" />

    <h3 style="margin: 0 0 10px 12px">编辑文章</h3>
    <el-form label-width="80px" :model="model" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.type" placeholder="请选择">
          <el-option v-for="(item, i) in categories" :key="i" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor placeholder="请上传md文件或者直接填写内容" v-model="model.authWork" useCustomImageHandler
          @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { update } from "network/article";
import { getArticleByid } from "network/getArticleByid/getArticleByid.js";


export default {
  data() {
    return {
      // 指定id的数据
      model: {},
      categories: [
        { label: "学习", value: "0" },
        { label: "生活", value: "1" },
        { label: "娱乐", value: "2" },
      ],
      data: "<h1>jsdkf</h1>",
      md: "",
    };
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },

  components: {
    VueEditor,
  },

  methods: {
    // 保存
    async save() {
      this.model.changeTime = new Date().toLocaleString().replaceAll("/", "-");
      console.log(this.model);
      const res = await update(this.model);
      console.log("--res", res);
      if (res.code === 200) {
        this.$message.success("修改成功！");
      } else if (res.code === 20001) {
        this.$message.error("请将信息填写完整！");
      } else {
        this.$message.error("请先登录！");
      }
    },
    // 获取指定id的文档
    async fetch() {
      // const res = await fetchAllArticle();
      // const articleList = res.data.list;
      // console.log("---articleList", articleList);
      // let obj = articleList[0]
      // console.log(obj);
      // this.model = obj;
      // this.model.label = this.categories.filter(({value})=>value==obj.type)[0].label 

      const res = await getArticleByid(this.id)
      const articleList = res.data;
      console.log("---articleList", articleList);
      this.model = articleList
      this.model.label = this.categories.filter(({ value }) => value == articleList.type)[0].label
    },
    // 自定义上传图片
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("/upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    onFileChange() { },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss" scoped>
.button {
  display: inline-block;
  margin: 12px;
  padding: 10px 20px;
  background-color: #4caf50;
  /* 背景颜色 */
  color: white;
  /* 文字颜色 */
  border-radius: 4px;
  /* 圆角 */
  font-size: 16px;
  /* 字体大小 */
  text-align: center;
  /* 文字居中 */
  cursor: pointer;
  /* 鼠标指针效果 */
  transition: background-color 0.3s ease;
  /* 过渡效果 */
}

.button:hover {
  background-color: #45a049;
  /* 鼠标悬停时的背景颜色 */
}
</style>
