<template>
  <div id="FullNews">
    <div class="container mt-5 pb-5">
      <div class="card h-100 ">
        <div class="card-img-top">
          <img class="img-fluid img" v-if="fullNews.imageUrl == null || fullNews.imageUrl === undefined"
               src="../../assets/newsClasses/technology.png"
               :alt="fullNews.newsClass">
          <img v-else class="img-fluid img" :src="fullNews.imageUrl"
               :alt="fullNews.newsClass">
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
      <div class="col-12 mt-2">
        <h4>نظرات</h4>
      </div>
      <todo-list :fullNews="fullNews"/>
      <!--    <div class="container col-12  border p-3">-->
      <!--      <h5>نظرات</h5>-->
      <!--      <hr>-->
      <!--      <div class="text-right pr-5" v-for="comment in comments">-->
      <!--        <div class="row">-->
      <!--          <h5>{{ comment.name }}</h5>-->
      <!--          <p class="border w-75 h-100 mr-3 p-2">{{ comment.text }}</p>-->
      <!--          <button class="btn mybtn h-50 align-self-center mr-5">پاسخ</button>-->
      <!--          <div class="text-right w-75 " v-for="reply in comment.reply">-->
      <!--            <div class="row">-->
      <!--              <h5>{{ reply.name }}</h5>-->
      <!--              <p>{{ reply.text }}</p>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <form class="row pr-5">-->
      <!--        <textarea cols="8"></textarea>-->
      <!--        <button class="mr-3">ارسال</button>-->
      <!--      </form>-->
      <!--    </div>-->
    </div>
  </div>
</template>

<script>
import TodoList from "./Comments";

export default {
  name: "FullNews",
  components: {TodoList},
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

#FullNews {
  background-color: #f8f8f8;
}
</style>