<template>
  <div class="page403">
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
  name: "page403",
  data() {
    return {
      state: "403",
      message: "你没有权限访问当前页面",
    };
  },
  methods: {
    goHome() {
      this.$router.push("/home"); //回到首页
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
