<template>
  <div class="container">
    <div id="topbar">
      <div id="server-name">
        <span>Server name</span>
      </div>
      <div id="top-etc">
        <span>Send nudes</span>
      </div>
    </div>

    <div id="server-list">
      <div id="server-separator">
        <a href="#"></a>
      </div>

      <div class="guild-container">
        <div class="guild"></div>
      </div>
    </div>
    <div id="sidebar">
      <!-- TODO: This should be a foldable list -->
      <div class="text-channel-category">
        <!-- TODO: Title should be updated -->
        <span>⌨ &nbsp; -- &nbsp; TEXT CHANNELS</span>
      </div>
      <!-- TODO: This should be a foldable list -->
      <div class="voice-channel-category">
        <!-- TODO: Title should be updated -->
        <span>🎤 &nbsp; -- &nbsp; VOICE CHANNELS</span>

        <div class="voice-channel">
          <a href="#" onclick="changevc('')"></a>
        </div>
      </div>
    </div>
    <div id="soundboard">
      <div class="soundbutton">
        <img src="/img/soundboard/.jpg" class="button" onclick="play('')">
      </div>
    </div>
    <div id="people-list">
      <h2>
        WORK
        <br>IN
        <br>PROGRESS
      </h2>
    </div>
  </div>
</template>

<style lang="scss">
@import "../styles/_soundboard.scss";
</style>

<script>
import ApiService from "@/services/api";

import Guild from "@/components/Guild";

export default {
  name: "home",
  components: {
    Guild
  },
  data() {
    return {
      sounds: null,
      servers: null
    };
  },
  async mounted() {
    this.servers = ApiService.getServers().catch(err => {
      if(err.response.status === 401) this.$router.push('/login');
    }).data;
  }
};
</script>
