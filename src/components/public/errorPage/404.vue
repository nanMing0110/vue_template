<template>
  <div class="page404">
    <el-row>
      <el-col :span="8" class="page-state">
        {{ state }}
      </el-col>
      <el-col :span="6" class="page-message">
        {{ message }}
      </el-col>
      <el-col :span="10" class="page-btn">
        <el-button type="primary" @click="goHome">前往首页</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "page404",
  data() {
    return {
      state: "404",
      message: "找不到页面或页面出现问题",
    };
  },
  methods: {
    goHome() {
      this.$router.push("/home");
    },
  },
  computed: {},
};
</script>
<style scoped>
.page-state {
  font-size: 88px;
  margin: 10% auto;
  text-align: right;
  color: #a3aab6;
}
.page-message {
  font-size: 22px;
  padding-left: 3%;
  margin: 11% auto;
  color: #a0b8e3;
}
.page-btn {
  font-size: 22px;
  margin: 12% auto;
  color: #0953d7;
}
</style>
