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
        <quill-editor
          v-model="model.authWork"
          :options="editorOption"
          class="mdEditor"
        ></quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import { marked } from "marked";
import { uploadArticle } from "network/article";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import "quill/dist/quill.bubble.css"; // for bubble theme

export default {
  data() {
    return {
      model: {},
      categories: [
        { label: "学习", value: "0" },
        { label: "生活", value: "1" },
        { label: "娱乐", value: "2" },
      ],
      md: "",
      // 富文本编辑器配置
      editorOption: {
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
              ["blockquote", "code-block"], // 引用  代码块
              [{ header: 1 }, { header: 2 }], // 1、2 级标题
              [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
              [{ script: "sub" }, { script: "super" }], // 上标/下标
              [{ indent: "-1" }, { indent: "+1" }], // 缩进
              [{ direction: "rtl" }], // 文本方向
              [{ header: [1, 2, 3, 4, 5, 6] }], // 标题
              [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
              // [{ font: ['songti'] }], // 字体种类
              [{ align: [] }], // 对齐方式
              ["clean"], // 清除文本格式
              ["image", "video"], // 链接、图片、视频
            ], // 工具栏
            handlers: {
              //   //编辑器-上传图片
              // image: function (value) {
              //   console.log(value);
              // },
              //   //编辑器-上传文件
              // upload: (value) => {
              //   if (value) {
              //     console.log(value);
              //   }
              // },
            },
          },
        },
        placeholder: "请上传md文件或者直接填写内容",
      },
    };
  },
  components: { quillEditor },
  methods: {
    // 保存
    async save() {
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
    // 上传文件
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

.mdEditor {
  height: 480px;
  overflow: hidden;
  padding-bottom: 50px;
}
</style>
