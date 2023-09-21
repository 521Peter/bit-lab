<template>
  <div style="padding: 20px">
    <label for="file" class="button"
      >上传<i class="el-icon-upload el-icon--right"></i
    ></label>
    <input
      type="file"
      id="file"
      @change="onFileChange"
      accept=".md"
      style="display: none"
      class="md"
    />

    <h3 style="margin: 0 0 10px 12px">新建文章</h3>
    <el-form label-width="80px" :model="model" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.type" placeholder="请选择">
          <el-option
            v-for="(item, i) in categories"
            :key="i"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor
          placeholder="请上传md文件或者直接填写内容"
          v-model="model.authWork"
          useCustomImageHandler
          @image-added="handleImageAdded"
          style="height: 470px; overflow: hidden"
          :render-markdown="true"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
    <!-- 实时预览 -->
    <!-- <div v-html="md" class="markdown-body"></div> -->
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
// import demo from "assets/网站文档.md";
import axios from "axios";
import { marked } from "marked";
import { uploadArticle } from "network/article";

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
  components: {
    VueEditor,
  },
  props: {
    id: {},
  },
  methods: {
    // 保存
    async save() {
      console.log("--this.model.type", typeof this.model.type);

      console.log(this.model);
      const res = await uploadArticle(this.model);
      console.log(res);
      if (res.code === 200) {
        this.$message({
          showClose: true,
          message: "保存成功",
          type: "success",
        });
      } else if (res.code === 20001) {
        this.$message({
          showClose: true,
          message: "请将信息填写完整！",
          type: "error",
        });
      } else {
        this.$message({
          showClose: true,
          message: "请先登录！",
          type: "error",
        });
      }
    },
    // 自定义上传图片
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("/upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    onFileChange(event) {
      console.log("event!!!!", event);
      const file = event.target.files[0];
      console.log("file!!!", file);
      if (file) {
        let title = file.name.split(".")[0];
        this.$set(this.model, "title", title);
        // 可以根据实际需求将文件上传到服务器，或者在客户端直接读取文件内容
        this.uploadedFile = URL.createObjectURL(file);
        console.log(this.uploadedFile);
        axios
          .get(this.uploadedFile)
          .then((response) => {
            // 使用marked解析MD文件为HTML
            this.$set(this.model, "authWork", marked.parse(response.data));
            // this.model.authWork = marked.parse(response.data);
            // this.md = response.data;
            console.log("this.model!!!!", this.model);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
  created() {
    // this.fetchCategories();
    // 如果要编辑，则向后端发送请求获取数据
    // this.id && this.fetch();
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
