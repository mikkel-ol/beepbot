<template>

</template>

<style lang="scss">

</style>

<script>
import ApiService from "../services/api";

export default {
  name: "guild",
  components: {},
  data() {
    return {
      sounds: null
    };
  },
  async mounted() {
    var apiRes = await ApiService.getSounds();
    if (apiRes == 401) this.$router.redirect("/auth");
    this.sounds = apiRes.data;
  }
};
</script>


