<template>
  <el-container>
    <el-header class="title">
      <el-row>
        <el-col :span="8" class="logo">
          <div class="grid-content">
            <h3>Vue-Player<sub>@rogepi</sub></h3>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-input
              type="text"
              placeholder="请输入你想要搜索的歌曲"
              class="search-bar"
              v-model="query"
            >
              <!-- <i slot="suffix" class="el-input__icon el-icon-search"></i> -->
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="4" class="avatar">
          <div class="grid-content">
            <el-dropdown @command="exit">
              <span class="el-dropdown-link">
                <el-avatar :src="avatarSrc"> </el-avatar>
              </span>
              <el-dropdown-menu>
                <el-dropdown-item @click="exit">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <h3>{{ username }}</h3>
          </div>
        </el-col>
      </el-row>
    </el-header>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  name: "player-header",
  props: ["uid"],
  data() {
    return {
      query: "",
      username: "",
      avatarSrc: "",
    };
  },
  methods: {
    exit() {
      axios.get("http://musicapi.rogepi.xyz/logout").then(function (response) {
        console.log(response);
      });
      this.$router.push("/");
    },
  },
  mounted() {
    var that = this;
    axios
      .get("http://musicapi.rogepi.xyz/user/detail?uid=" + that.uid)
      .then(function (response) {
        // console.log(response);
        that.username = response.data.profile.nickname;
        that.avatarSrc = response.data.profile.avatarUrl;
      });
  },
};
</script>

<style scoped>
.title {
  background-color: #ec4141;
  color: white;
}

.logo {
  padding-left: 50px;
}

.search-bar {
  margin-top: 10px;
  border-radius: 20px;
}

.avatar {
  padding: 10px;
  text-align: end;
}
</style>
