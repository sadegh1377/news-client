<template>
  <div id="Home" class="">
    <HomePage/>
  </div>
</template>

<script>
import HomePage from "../components/HomePage/HomePage";

export default {
  name: "Home",
  components: {
    HomePage
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
#Home {
  background-color: #f8f8f8;
}
</style>