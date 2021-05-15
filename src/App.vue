<template>
  <div id="app">
    <Navbar/>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style>
/*@import url('https://fonts.googleapis.com/css2?family=Markazi+Text&display=swap');*/
/*@import url('https://fonts.googleapis.com/css2?family=Markazi+Text:wght@700&display=swap');*/
/*@import url('https://fonts.googleapis.com/css2?family=Almarai:wght@800&display=swap');*/
/*@import url('https://fonts.googleapis.com/css2?family=Almarai:wght@400&display=swap');*/
/*@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@600&display=swap');*/
/*@font-face {*/
/*  font-family: iranSans;*/
/*  src: url("/src/assets/font/FontsFree-Net-ir_sans.ttf");*/
/*}*/

/*@font-face {*/
/*  font-family: vazirLight;*/
/*  src: url("/src/assets/font/FontsFree-Net-Vazir-Light.ttf");*/
/*}*/
@font-face {
  font-family: "iranSans";
  src: local("iranSans"),
  url(assets/font/FontsFree-Net-ir_sans.ttf) format("truetype");
}
@font-face {
  font-family: "vazirLight";
  src: local("vazirLight"),
  url(assets/font/FontsFree-Net-Vazir-Light.ttf) format("truetype");
}

#app {
  font-family: "vazirLight", Avenir, Helvetica, Arial, 'Markazi Text',
  'Almarai', 'Cairo', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f8f8f8;
  height: 100vh;
}

.fade-enter-active {
  transition: opacity 0.2s ease-in;
}

.fade-leave-active {
  transition: opacity 0.2s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
<script>
import Navbar from "./views/Navbar";

export default {
  components: {Navbar}
}
</script>