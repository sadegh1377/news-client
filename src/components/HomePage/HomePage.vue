<template>
  <div id="Home" class="container mt-5">
    <div class="row">
      <div class="col-sm-4 col-md-4 col-lg-3">
        <ul class="list-group sticky-top">
          <li class="list-group-item"
              v-for="(classes,index) in sideBarClasses"
              :class="{active:pageName === classes}"
              :key="index"
              @click="changePage(classes)">
            {{ classes }}
          </li>
        </ul>
      </div>
      <div class="col-sm-8 col-md-8 col-lg-9">
        <transition name="fade" mode="out-in">
          <news-page v-if="pageName === 'تکنولوژی'" :news="technology"/>
          <news-page v-if="pageName === 'اقتصاد'" :news="economics"/>
          <news-page v-if="pageName === 'سلامت'" :news="health"/>
          <news-page v-if="pageName === 'سیاست'" :news="politics"/>
          <news-page v-if="pageName === 'ورزش'" :news="sports"/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import NewsPage from "./newsPage";

export default {
  name: "Home",
  components: {NewsPage},
  data() {
    return {
      user: null,
      technology: [],
      sports: [],
      economics: [],
      politics: [],
      health: [],
      sideBarClasses: [],
      pageName: null,
      news: []

    }
  },
  methods: {
    changePage(page) {
      this.pageName = page;
      window.scrollTo(0, 0);
    }
  },
  created() {
    let token = localStorage.getItem("jwt");
    this.$http("user/me", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      this.user = res.data
      this.$http.get("news/fav-news", {
        params: {
          favClasses: this.user.favClasses
        }
      }).then((res) => {
        // console.log(res.data[0][0].newsClass)

        for (let i = 0; i < res.data.length; i++) {
          switch (res.data[i][0].newsClass) {
            case "تکنولوژی":
              this.sideBarClasses.push("تکنولوژی");
              this.technology = res.data[i];
              break;
            case "اقتصاد":
              this.sideBarClasses.push("اقتصاد");
              this.economics = res.data[i];
              break;
            case "سلامت":
              this.sideBarClasses.push("سلامت");
              this.health = res.data[i];
              break;
            case "سیاست":
              this.sideBarClasses.push("سیاست");
              this.politics = res.data[i];
              break;
            case "ورزش":
              this.sideBarClasses.push("ورزش");
              this.sports = res.data[i];
              break;
          }
        }
        this.pageName = this.sideBarClasses[0];
        // }).then(() => {
        //   // gsap.from('.cards', {
        //   //   duration: 0.5,
        //   //   opacity: 0,
        //   //   scale: 0,
        //   //   y: 300,
        //   //   ease: 'power1',
        //   //   stagger: {
        //   //     from: 'start',
        //   //     each: 0.2,
        //   //   }
        //   })
      }).catch((err) => {
        console.log(err)
      });
    }).catch((err) => {
      console.log(err)
    })


    // axios.get("http://localhost:3000/all-news-classes").then((res) => {
    //     this.newsClasses = res.data
    // }).catch((err) => {
    //     console.log(err)
    // });
  }
}
</script>

<style scoped>
.sticky-top {
  top: 50px !important;
}

.list-group-item {
  cursor: pointer;
}

.active {
  background-color: #ff0000 !important;
  border-color: #ff0000 !important
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

.bg-image {
  cursor: pointer;
}

.background {
  background-color: #2991c8 !important;
  color: white !important;
}
</style>