<template>
  <div class="container">
    <div class="row">
      <router-link :to="{name:'FullNews' , params:{news_id:news._id}}"
                   class="col-lg-4 col-md-6 col-sm-12 rounded py-2 pt-0 cards"
                   v-for="(news,id) in news"
                   :key="news._id">
        <div class="card h-100 ">
          <div class="card-img-top">
            <img class="img-fluid img" src="../../assets/newsClasses/technology.png" :alt="news.newsClass">
          </div>
          <div class="card-body">
            <h5 class="card-title  border-bottom" :title="news.newsTitle">
              {{ news.newsTitle }}
            </h5>
            <p class="card-text line-clamp">{{ news.newsBody }}</p>


          </div>
          <div class="card-footer background">
            <div class="text-right">
              <font-awesome-icon icon="eye"></font-awesome-icon>
              {{ news.viewCounter }}
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  name: "newsPage",
  props: ['news'],
  mounted() {
    // gsap.from('.cards', {
    //   duration: 0.5,
    //   opacity: 0,
    //   scale: 0,
    //   y: 300,
    //   ease: 'power1',
    //   stagger: {
    //     from: 'start',
    //     each: 0.2,
    //   }
    // })
  }
}
</script>

<style scoped>
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

h5 {
  padding: 5px;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  color: black;
}

.card-text {
  max-height: 200px;
  overflow: hidden;
  text-overflow: clip;
}

.img {
  height: 170px !important;
}

.fade-enter-active {
  transition: max-height .3s ease-in, opacity .9s ease-in-out;
  max-height: 1000px;
}

.fade-leave-active {
  transition: max-height 0.4s ease-out, opacity 0.2s ease-in-out;
  max-height: 1000px;
}

.fade-enter, .fade-leave-to {
  max-height: 0;
  opacity: 0;
}

.background {
  background-color: #e50303 !important;
  color: white !important;
}

</style>