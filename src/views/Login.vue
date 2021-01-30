<template>
  <div>
    <el-form ref="loginForm" :model="form" :rules="rules" class="login-box">
      <h3 class="login-title">Vue Player</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          placeholder="请输入账号"
          v-model="form.username"
          clearable
        >
          <i slot="prefix" class="el-icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
          show-password
          clearable
        >
          <i slot="prefix" class="el-icon-lock"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="danger"
          autofocus
          @click="onSubmit('loginForm')"
          class="login-button"
          >登录</el-button
        >
      </el-form-item>
    </el-form>

    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      ><span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      //表单验证，需要再el-form-item 元素中增加prop属性
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
      //对话框显示和隐藏
      dialogVisible: false,
    };
  },
  methods: {
    onSubmit(formName) {
      //为表单绑定验证功能
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //使用 vue-router路由到指定页面，该方式称之为编程式导航
          this.$router.push("/Home/" + this.form.username);
        } else {
          this.dialogVisible = true;
          return false;
        }
      });
    },
    handleClose: function () {
      console.log("HandleClose, 空函数");
    },
  },
};
</script>


<style lang="scss" scoped>
.login-box {
  background-color: white;
  border: 1px solid #dcdfe6;
  width: 300px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
  font-size: 1.2em;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}

.login-button {
  width: 120px;
}
</style>
