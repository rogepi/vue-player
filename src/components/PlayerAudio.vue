<template>
  <div>
    <audio :src="psrc" controls autoplay loop class="myaudio"></audio>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "player-audio",
  props: ["asrc"],
  data() {
    return {
      psrc: "123",
    };
  },
  watch: {
    asrc: function () {
      this.getSrc(this.asrc);
    },
  },
  methods: {
    getSrc(id) {
      id = this.asrc;
      this.psrc = id;
      var that = this;
      axios
        .get("http://musicapi.rogepi.xyz/song/url?id=" + this.asrc)
        .then(function (response) {
          // console.log(response.data.data[0].url);
          that.psrc = response.data.data[0].url;
        });
    },
  },
};
</script>

<style>
.myaudio {
  width: 100%;
  height: 40px;
  margin-top: 5px;
  outline: none;
  background-color: #f1f3f4;
}
</style>