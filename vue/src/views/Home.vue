<template>
  <div class="container">
    <div id="topbar">
      <div id="server-name">
        <span v-if="current">{{current.name}}</span>
      </div>
      <div id="top-etc">
        <span>Soundboard</span>
      </div>
    </div>

    <div id="server-list">
      <div id="server-separator">
        <div id="addBotButton" class="guild-container" @click="addBot">
          <div class="guild button">
            <svg
              name="Nova_Add"
              class="circleIcon-LvPL6c"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M21 11.001H13V3.00098H11V11.001H3V13.001H11V21.001H13V13.001H21V11.001Z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div v-if="servers" class="guild-container">
        <div v-for="(server, index) in servers" :key="server.id" class="guild-container">
          <div
            class="guild"
            v-html="generateAvatar(server)"
            @click="changeCurrentGuild(index, $event)"
          ></div>
        </div>
      </div>
    </div>

    <div id="sidebar">
      <div id="channels-container">
        <!-- TODO: This should be a foldable list -->
        <div class="text-channel-category">
          <!-- TODO: Title should be updated -->
          <span>⌨ &nbsp; -- &nbsp; TEXT CHANNELS</span>

          <div v-if="servers">
            <div v-for="channel in current.channels" :key="channel.id">
              <div v-if="channel.type === 'text'" class="text-channel">
                <svg width="24" height="24" viewBox="0 0 24 24" class="text-channel-icon">
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"
                  />
                </svg>
                <div class="channel-entry">{{channel.name}}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- TODO: This should be a foldable list -->
        <div class="voice-channel-category">
          <!-- TODO: Title should be updated -->
          <span>🎤 &nbsp; -- &nbsp; VOICE CHANNELS</span>

          <div v-if="servers">
            <div v-for="channel in current.channels" :key="channel.id">
              <div v-if="channel.type == 'voice'" class="voice-channel">
                <svg
                  name="Speaker"
                  class="voice-channel-icon"
                  aria-hidden="false"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195ZM14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z"
                  />
                </svg>
                <a @click="changeVoiceChannel(channel.id)" class="channel-entry">{{channel.name}}</a>
              </div>
            </div>
          </div>
        </div>
        <div v-if="connected" id="connection-status-container">
          <div id="connection-status-bars">
            <!-- Ping hover effect (Client.ping) -->
          </div>
          <div id="connection-status-description"></div>
          <button id="disconnect-button" v-on:click="stop()">
            <svg
              class="buttonIcon-3yYVOH"
              name="Nova_CallLeave"
              aria-hidden="false"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.1169 1.11603L22.8839 2.88403L19.7679 6.00003L22.8839 9.11603L21.1169 10.884L17.9999 7.76803L14.8839 10.884L13.1169 9.11603L16.2329 6.00003L13.1169 2.88403L14.8839 1.11603L17.9999 4.23203L21.1169 1.11603ZM18 22H13C6.925 22 2 17.075 2 11V6C2 5.447 2.448 5 3 5H7C7.553 5 8 5.447 8 6V10C8 10.553 7.553 11 7 11H6C6.063 14.938 9 18 13 18V17C13 16.447 13.447 16 14 16H18C18.553 16 19 16.447 19 17V21C19 21.553 18.553 22 18 22Z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div id="user-bar" v-if="user">
        <img :src="`https://cdn.discordapp.com/avatars/${this.user.id}/a_a765d9f18091817029760eb739c1ec1d.webp?size=256`" alt=" ">
        <div id="name-tag">
          <div id="username"><span>{{this.user.username}}</span></div>
          <div id="user-tag">#{{this.user.tag}}</div>
        </div>
        <button @click="logout()">Log out</button>
      </div>
    </div>

    <div id="soundboard">
      <div class="soundbutton">
        <div v-if="sounds" id="soundboard-container">
          <div v-for="(sound, index) in sounds" :key="sound">
            <a v-on:click="play(sound)" class="btn-two red rounded">{{index}}</a>
          </div>
        </div>
      </div>
    </div>

    <div id="people-list">
      <h2>WIP</h2>
    </div>
  </div>
</template>

<style lang="scss">
@import "../styles/_home.scss";
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
      servers: null,
      current: null,
      user: null,
      connected: false
    };
  },
  methods: {
    addBot: function() {
      window.location =
        "https://discordapp.com/oauth2/authorize?client_id=352214774479847435&scope=bot&permissions=8";
    },

    changeVoiceChannel: function(channelId) {
      // TODO: Handle error
      ApiService.changeVoiceChannel(this.current.id, channelId);
      if (document.getElementById("selectedVoiceChannel"))
        document.getElementById("selectedVoiceChannel").removeAttribute("id");
      event.target.id = "selectedVoiceChannel";
      this.connected = true;
    },

    changeCurrentGuild: function(index) {
      this.current = this.servers[index];
      if (document.getElementById("selectedGuild"))
        document.getElementById("selectedGuild").removeAttribute("id");
      event.target.parentElement.id = "selectedGuild";
    },

    generateAvatar: function(server) {
      if (server.icon === null)
        // Get first three letters in server name
        // TODO: Handle if name is smaller than 3 words
        return server.name
          .split(" ")
          .reduce((response, word) => (response += word.slice(0, 1)), "")
          .substr(0, 3)
          .toUpperCase();
      else
        return `<a style="background-image: url('https://cdn.discordapp.com/icons/${server.id}/${server.icon}.webp')"></a>`;
    },

    play: function(file) {
      // TODO: Handle "voice channel not selected"
      ApiService.play(file);
    },

    stop: function() {
      // TODO: Handle "bot not playing"
      ApiService.stop();
      if (document.getElementById("selectedVoiceChannel"))
        document.getElementById("selectedVoiceChannel").removeAttribute("id");
      this.connected = false;
    },

    logout: function() {
      ApiService.logout();
    }
  },
  async mounted() {
    var res1 = await ApiService.getServers().catch(err => {
      if (err.response.status === 401) this.$router.push("/login");
    });
    this.servers = res1 ? res1.data : undefined;

    // TODO: Save current server in Vuex
    this.current = this.servers ? this.servers[0] : undefined;

    var res2 = await ApiService.getSounds().catch(err => {
      if (err.response.status === 401) this.$router.push("/login");
    });

    this.sounds = res2 ? res2.data : undefined;

    var res3 = await ApiService.getUser().catch(err => {
      if (err.response.status === 401) this.$router.push("/login");
    });

    this.user = res3 ? res3.data : undefined;
  }
};
</script>
