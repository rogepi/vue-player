<template>
  <div>
    <el-row>
      <player-header :uid="uid"></player-header>
    </el-row>
    <el-row>
      <el-col :span="4" class="aside">
        <player-aside :uid="uid" :lid="lid" @getId="setId"></player-aside
      ></el-col>
      <el-col :span="20" class="main">
        <player-list :uid="uid" :lid="lid" @playSrc="setSrc"></player-list
      ></el-col>
    </el-row>
    <el-row>
      <player-audio :asrc="asrc"></player-audio>
    </el-row>
  </div>
</template>

<script>
import PlayerHeader from "../components/PlayerHeader.vue";
import PlayerAside from "../components/PlayerAside.vue";
import PlayerList from "../components/PlayerList.vue";
import PlayerAudio from "../components/PlayerAudio.vue";
export default {
  name: "Home",
  props: ["uid"],
  // provide: { lid: this.lid },
  data() {
    return {
      lid: "",
      asrc: "",
    };
    // lid: "";
  },
  methods: {
    setId(lid) {
      // console.log(lid);
      this.lid = lid;
    },
    setSrc(asrc) {
      this.asrc = asrc;
    },
  },
  components: { PlayerHeader, PlayerAside, PlayerList, PlayerAudio },
};
</script>

<style scoped>
.aside {
  height: 850px;
  overflow: auto;
  overflow-x: hidden;
  scrollbar-width: 2px;
}

.main {
  height: 850px;
  overflow: auto;
  overflow-x: hidden;
  scrollbar-width: 2px;
}

.aside::-webkit-scrollbar {
  width: 1px;
}

.main::-webkit-scrollbar {
  width: 1px;
}
</style>