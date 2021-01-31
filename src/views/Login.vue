<template>
  <div>
    <el-form ref="loginForm" :model="form" :rules="rules" class="login-box">
      <h3 class="login-title">Vue-Player<sub>@rogepi</sub></h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          placeholder="手机号"
          v-model="form.username"
          clearable
        >
          <i slot="prefix" class="el-icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          placeholder="密码"
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
      :visible.sync="errorDialog"
      width="30%"
      :before-close="handleClose"
      ><span>账号或密码输入错误</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="errorDialog = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
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
      errorDialog: false,
      msg: "",
    };
  },
  methods: {
    onSubmit(formName) {
      //为表单绑定验证功能
      this.$refs[formName].validate((valid) => {
        var that = this;
        if (valid) {
          console.log(that.loginCheck(that.form.username, that.form.password));
        }
      });
    },
    loginCheck(phone, password) {
      var that = this;
      axios
        .get(
          "http://musicapi.rogepi.xyz/login/cellphone?phone=" +
            phone +
            "&password=" +
            password
        )
        .then(function (response) {
          // console.log(response);
          if (response.data.code != 200) {
            that.errorDialog = true;
          } else {
            that.$router.push("/Home/" + response.data.account.id);
            // that.$router.push({name:"home",params:{response.data.account.id}});
            // 测试id：4875671908
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
div {
  text-align: center;
}
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
  margin: 0 auto 40px auto;
  color: #303133;
}
.login-button {
  width: 120px;
}
</style>
