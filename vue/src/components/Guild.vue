<template>
    
</template>

<style lang="scss">

</style>

<script>
import ApiService from "../services/api";

import TextChannel from "@/components/TextChannel";
import VoiceChannel from "@/components/VoiceChannel";

export default {
    name: "guild",
    components: {
        TextChannel,
        VoiceChannel
    },
    data() {
        return {
            sounds: null
        }
    },
    async mounted() {
        var apiRes = await ApiService.getSounds();
        if (apiRes == 401) this.$router.redirect('/auth');
        this.sounds = apiRes.data;
    }
}
</script>


