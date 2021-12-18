<template>
  <div id="FullNews">
    <div class="container mt-5 pb-5">
      <div class="card h-100 ">
        <div class="card-img-top">
          <div class="top-right"> شناسه یکتای خبر:<br>
            {{ fullNews._id }}
          </div>
          <img class="img-fluid img" v-if="fullNews.imageUrl == null || fullNews.imageUrl === undefined
          || fullNews.imageUrl === ''"
               src="../../assets/newsClasses/technology.png"
               :alt="fullNews.newsClass">
          <img v-else class="img-fluid img" :src="fullNews.imageUrl"
               :alt="fullNews.newsClass">
        </div>
        <div class="card-body">
          <h3 class="card-title  border-bottom pb-3" :title="fullNews.newsTitle">
            {{ fullNews.newsTitle }}
          </h3>
          <p class="card-text line-clamp">
            {{ fullNews.newsBody }}
          </p>
        </div>
        <div class="card-footer background row m-0">
          <div class="col-6 text-right">
            <font-awesome-icon icon="eye"></font-awesome-icon>
            {{ fullNews.viewCounter }}
          </div>
          <div class="col-6 text-left">
            {{ fullNews.createdAt }}
            <font-awesome-icon icon="clock"></font-awesome-icon>
          </div>
        </div>
      </div>
      <div class="col-12 mt-2">
        <h4>نظرات</h4>
      </div>
      <Comments :fullNews="fullNews"/>

    </div>
  </div>
</template>

<script>
import Comments from "./Comments";

export default {
  name: "FullNews",
  components: {Comments},
  data() {
    return {
      fullNews: "",
    }
  },
  methods: {},
  created() {
    let id = this.$route.params.news_id;
    this.$http.get("news/full-news", {
      params: {
        id: id
      }
    }).then((res) => {
      this.$http.put("news/inc-view", {
        _id: res.data._id
      }).then((res) => {
        // console.log(res.data)
        let s = res.data.createdAt
        let date = new Date(s)
        // console.log(date.toLocaleString())

        this.fullNews = res.data
        this.fullNews.createdAt = date.toLocaleString()
        console.log(this.fullNews)
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err)
    })
  },
}
</script>

<style scoped>
.top-right {
  position: absolute;
  top: 8px;
  right: 16px;
  text-align: right;
  color: #FFFFFF;
  padding: 10px;
  border-radius: 10px;
  background-color: #2F3242;
  opacity: .5;
}

.img {
  height: 300px !important;
}

.background {
  background-color: #e50303 !important;
  color: white !important;
}

#FullNews {
  background-color: #f8f8f8;
}
</style>