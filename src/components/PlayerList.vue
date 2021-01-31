<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="8">
          <img :src="listImgSrc" width="60%" height="60%" />
        </el-col>
        <el-col :span="16">
          <h1>{{ listname }}</h1>
          <div>
            <el-row>
              <el-col :span="1">
                <el-avatar :src="avatarSrc"></el-avatar
              ></el-col>
              <el-col class="author" :span="3"
                ><h4>{{ author }}</h4>
              </el-col>
              <el-col class="create-time" :span="4"
                ><h5>{{ getTime(createTime) }}创建</h5></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="3"
                ><h3>歌曲:{{ songNum }}</h3></el-col
              >
              <el-col :span="4"
                ><h3>播放量:{{ playNum }}</h3></el-col
              >
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-table
          :data="songLists"
          stripe
          highlight-current-row
          @current-change="playSrc"
        >
          <el-table-column type="index" width="100"></el-table-column>
          <el-table-column prop="title" label="音乐标题" width="600">
          </el-table-column>
          <el-table-column prop="author" label="歌手" width="250">
          </el-table-column>
          <el-table-column prop="album" label="专辑" width="300">
          </el-table-column>
          <el-table-column
            prop="time"
            label="时长"
            width="250"
          ></el-table-column>
        </el-table>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  name: "player-list",
  props: ["uid", "lid"],
  data() {
    return {
      listId: "",
      idLists: [],
      songLists: [],
      listImgSrc: "",
      avatarSrc: "",
      listname: "",
      author: "",
      createTime: "",
      songNum: "",
      playNum: "",
    };
  },
  watch: {
    lid: function () {
      this.songLists.push(this.getList(this.lid));
    },
  },
  created() {
    var that = this;
    // console.log(this.uid);
    axios
      .get("http://musicapi.rogepi.xyz/user/playlist?uid=" + this.uid)
      .then(function (response) {
        console.log(response.data.playlist[0].id);
        that.listId = response.data.playlist[0].id;
        console.log(that.listId);
        var thus = that;
        axios
          .get("http://musicapi.rogepi.xyz/playlist/detail?id=" + that.listId)
          .then(function (response) {
            // console.log(response);
            thus.idLists = response.data.playlist.trackIds;
          });
        // that.lid= response.data.playlist[0].id;
        console.log(that.idLists);
        that.listImgSrc = response.data.playlist[0].coverImgUrl;
        that.listname = response.data.playlist[0].name;
        that.avatarSrc = response.data.playlist[0].creator.avatarUrl;
        that.author = response.data.playlist[0].creator.nickname;
        that.createTime = response.data.playlist[0].createTime;
        that.songNum = response.data.playlist[0].trackCount;
        that.playNum = response.data.playlist[0].playCount;
      });
    for (var item of this.idLists) {
      that.getSong(item.id);
    }
    that.songLists.shift();
    console.log(that.songLists);
    // console.log(this.songLists);
  },
  methods: {
    getList(lid) {
      var that = this;
      axios
        .get("http://musicapi.rogepi.xyz/playlist/detail?id=" + lid)
        .then(function (response) {
          // console.log(response.data);
          that.idLists = response.data.playlist.trackIds;
          // console.log(that.idLists);
          that.listImgSrc = response.data.playlist.coverImgUrl;
          that.listname = response.data.playlist.name;
          that.avatarSrc = response.data.playlist.creator.avatarUrl;
          that.author = response.data.playlist.creator.nickname;
          that.createTime = response.data.playlist.createTime;
          that.songNum = response.data.playlist.trackCount;
          that.playNum = response.data.playlist.playCount;
        });
      for (var item of this.idLists) {
        that.getSong(item.id);
      }
      this.songLists.splice(0, 1);
      console.log(that.songLists);
    },
    getTime(time) {
      var date = new Date(time);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      return Y + M + D;
    },
    getSong(id) {
      var that = this;
      that.songLists.splice(0, this.songLists.length);
      axios
        .get("http://musicapi.rogepi.xyz/song/detail?ids=" + id)
        .then(function (response) {
          var temp = { id: "", title: "", author: "", alubm: "" };
          // console.log(response.data.songs[0].id);
          temp.id = response.data.songs[0].id;
          // console.log(response.data.songs[0].name);
          temp.title = response.data.songs[0].name;
          // console.log(response.data.songs[0].ar[0].name);
          temp.author = response.data.songs[0].ar[0].name;
          // console.log(response.data.songs[0].al.name);
          temp.alubm = response.data.songs[0].al.name;
          // console.log(temp);
          that.songLists.push(temp);
        });
    },
    playSrc(currentRow) {
      this.$emit("playSrc", currentRow.id);
      // console.log(currentRow.id);
    },
  },
};
</script>

<style scoped>
.author h4 {
  margin: 0px;
  margin-top: 10px;
}
.create-time h5 {
  color: darkgray;
  margin-top: 10px;
}
</style>
