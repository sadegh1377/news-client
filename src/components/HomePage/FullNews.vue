<template>
  <div id="FullNews" class="container mt-5 pb-5">
    <div class="card h-100 ">
      <div class="card-img-top">
        <img class="img-fluid img" src="../../assets/newsClasses/technology.png" :alt="fullNews.newsClass">
      </div>
      <div class="card-body">
        <h5 class="card-title  border-bottom pb-3" :title="fullNews.newsTitle">
          {{ fullNews.newsTitle }}
        </h5>
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
  </div>
</template>

<script>
export default {
  name: "FullNews",
  data() {
    return {
      fullNews: ""
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
        console.log(res.data)
        let s = res.data.createdAt
        let date = new Date(s)
        // console.log(date.toLocaleString())

        this.fullNews = res.data
        this.fullNews.createdAt = date.toLocaleString()
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
.img {
  height: 300px !important;
}

.background {
  background-color: #e50303 !important;
  color: white !important;
}
</style>