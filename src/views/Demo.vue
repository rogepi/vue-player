<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="8">
          <img
            src="http://p1.music.126.net/axewGX7u9P9Iuqjep-3mmQ==/109951165601796681.jpg"
            width="60%"
            height="60%"
          />
        </el-col>
        <el-col :span="16">
          <h1>歌单名歌单名歌单名歌单名歌单名歌单名歌单名</h1>
          <div>
            <el-row>
              <el-col :span="1">
                <el-avatar
                  src="http://p1.music.126.net/axewGX7u9P9Iuqjep-3mmQ==/109951165601796681.jpg"
                ></el-avatar
              ></el-col>
              <el-col class="author" :span="2"><h4>rogepi</h4> </el-col>
              <el-col class="create-time" :span="4"
                ><h5>2010-10-22创建</h5></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="2"><h3>歌曲:100</h3></el-col>
              <el-col :span="2"><h3>播放量:100</h3></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-table :data="tableData" stripe>
          <el-table-column prop="num" width="100%"></el-table-column>
          <el-table-column prop="title" label="音乐标题" width="900%">
          </el-table-column>
          <el-table-column prop="author" label="歌手" width="300%">
          </el-table-column>
          <el-table-column prop="album" label="专辑" width="300%">
          </el-table-column>
          <el-table-column
            prop="time"
            label="时长"
            width="250%"
          ></el-table-column>
        </el-table>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "player-list",
};
</script>

<style scoped>
.author h4 {
  margin: 0px;
  margin-top: 10px;
}
.create-time h5 {
  margin-top: 10px;
}
</style>
