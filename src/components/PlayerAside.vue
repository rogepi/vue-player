<template>
  <el-container class="contrainer">
    <el-aside>
      <el-row class="tac">
        <el-col :span="24">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            active-text-color=" #ec4141"
            unique-opened
          >
            <el-menu-item index="1">
              <i class="el-icon-location"></i>
              <span slot="title">发现音乐</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>我的音乐</span>
              </template>
              <el-submenu index="2-1">
                <template slot="title">
                  <i class="el-icon-tickets"></i>
                  我创建的歌单</template
                >
                <el-menu-item
                  v-for="(item, index) in mylist"
                  :key="index"
                  :index="item.id.toString()"
                  @click="getId(item.id)"
                >
                  <!-- <i class="el-icon-headset"></i> -->
                  {{ namectl(item.name) }}
                </el-menu-item>
              </el-submenu>
              <el-submenu index="2-2">
                <template slot="title">
                  <i class="el-icon-star-off"></i>
                  我收藏的歌单</template
                >
                <el-menu-item
                  v-for="(item, index) in favlist"
                  :key="index"
                  :index="item.id.toString()"
                  @click="getId(item.id)"
                >
                  <!-- <i class="el-icon-star-off"></i> -->
                  {{ namectl(item.name) }}
                </el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  name: "player-aside",
  props: ["uid", "lid"],
  data() {
    return {
      mylist: [],
      favlist: [],
    };
  },

  methods: {
    namectl(name) {
      if (name.length > 15) {
        // return nslice(name, 10) + "...";
        return (
          name
            .slice(0, 15)
            .replace(/([^x00-xff])/g, "$1a")
            .slice(0, 15)
            .replace(/([^x00-xff])a/g, "$1") + ".."
        );
      } else {
        return name;
      }
    },
    nslice(string, n) {
      return string
        .slice(0, n)
        .replace(/([^x00-xff])/g, "$1a")
        .slice(0, n)
        .replace(/([^x00-xff])a/g, "$1");
    },
    getId(lid) {
      // console.log(lid);
      this.$emit("getId", lid);
    },
  },
  mounted() {
    var that = this;
    axios
      .get(
        "http://musicapi.rogepi.xyz/user/playlist?uid=" +
          this.uid +
          "&limit=100"
      )
      .then(function (response) {
        // console.log(response.data.playlist);

        for (let item of response.data.playlist) {
          if (item.userId == that.uid) {
            that.mylist.push(item);
          } else {
            that.favlist.push(item);
          }
        }
      });
  },
};
</script>

<style scoped>
.container {
  overflow: hidden;
}
</style>
