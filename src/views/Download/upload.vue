<template>
  <div>
    <div class="main">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="资料名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="资料描述">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>

        <el-form-item label="资料类型">
          <el-select v-model="form.region" placeholder="请选择资料类型">
            <el-option label="公共课" value="gonggong"></el-option>
            <el-option label="专业课" value="zhuanye"></el-option>
            <el-option label="选修课" value="xuanxiu"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属学院">
          <el-select v-model="form.region" placeholder="请选择所属学院">
            <el-option label="计算机学院" value="gonggong"></el-option>
            <el-option label="艺术学院" value="zhuanye"></el-option>
            <el-option label="体育学院" value="xuanxiu"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否公开">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>

        <el-form-item label="文件格式">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="JPG" name="type"></el-checkbox>
            <el-checkbox label="Word" name="type"></el-checkbox>
            <el-checkbox label="TXT" name="type"></el-checkbox>
            <el-checkbox label="PDF" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>

        <el-form-item class="but">
          <el-button type="primary" @click="onSubmit">立即发布</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script >
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 900px;
  //   height: 1000px;
  margin: 0px auto;
  //   background-color: pink;
  margin-top: 60px;
}
</style>
<style>
.el-upload-dragger {
  width: 900px;
  margin-bottom: 20px;
}
.but {
  margin-left: 270px;
}
</style>