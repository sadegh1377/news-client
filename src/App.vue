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
    @import url('https://fonts.googleapis.com/css2?family=Markazi+Text:wght@700&display=swap');
    /*@import url('https://fonts.googleapis.com/css2?family=Almarai:wght@800&display=swap');*/
    /*@import url('https://fonts.googleapis.com/css2?family=Almarai:wght@400&display=swap');*/
    /*@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@600&display=swap');*/

    #app {
        font-family: Avenir, Helvetica, Arial, 'Markazi Text', 'Almarai', 'Cairo', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
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