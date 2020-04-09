<template>
  <div class="home">
    <div id="frontpage">
      <div id="front-container">
        <img src="@/assets/logo.png" id="logo" class="animated bounceInLeft">
        <br>
        <h1 class="animated fadeInRight">BEEP BOT</h1>
        <a id="loginButton" class="animated" href="/auth">Sign in with Discord</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../styles/_login.scss";
</style>


<script>
export default {
  name: "login",
  components: {},
  methods: {
    init
  },
  mounted() {
    this.init();
  }
};

//! This is shit..
function init() {


    // Show front container after 1s
    setTimeout(() => {
      $("#front-container").css("display", "flex");

      // Slide up front container after 1,5s
      setTimeout(() => {
        $("#front-container").addClass("slideUp");

        // Slide in loginButton
        setTimeout(() => {
          $("#loginButton").css({
            visibility: "visible",
            transform: "scale(1)",
            opacity: "1"
          });
        }, /*500*/5);
      }, /*1500*/15);
    }, /*1000*/10);

  // Click animation for logo
  $("#logo").click(() => {
    const effectArray = [
      "bounce",
      "pulse",
      "rubberBand",
      "shake",
      "swing",
      "tada",
      "jello"
    ];
    const classArray = $("#logo")
      .attr("class")
      .split(/\s+/);

    // Remove initial effect
    $("#logo").removeClass("bounceInLeft");

    let currentEffect;
    let nextEffect =
      effectArray[Math.floor(Math.random() * effectArray.length)];

    // If one of the effects in effectArray is present as a current class, remove it
    classArray.forEach(elem => {
      let index = effectArray.indexOf(elem);
      if (index > -1) {
        currentEffect = effectArray[index];
        $("#logo").removeClass(currentEffect);
      }
    });

    // Get a new, random effect until nextEffect is a new effect
    while (currentEffect === nextEffect)
      nextEffect = effectArray[Math.floor(Math.random() * effectArray.length)];

    // Add new, unique, random effect
    $("#logo").addClass(nextEffect);
  });
}
</script>
