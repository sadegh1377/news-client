<template>
  <div id="EditPage" class="container mt-5">
    <form @submit.prevent="edit(news._id)" class="myform shadow" enctype="multipart/form-data">
      <div class="form-row">
        <div class="form-group col-md-8">
          <label>عنوان</label>
          <input type="text" class="form-control"
                 v-model="news.newsTitle">
        </div>
        <div class="form-group col-md-4">
          <label>موضوع</label>
          <select class="form-control" v-model="news.newsClass">
            <option v-for="c in newsClasses" :value="c">
              {{ c }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>متن خبر</label>
        <textarea class="form-control" rows="8"
                  v-model="news.newsBody"></textarea>
      </div>
      <div class="hover align-self-center">
        <label>عکس سر تیتر
          <font-awesome-icon icon="info-circle"/>
        </label>
        <span
            class="tooltipText">ابتدا عکس سر تیتر را در یک آپلود سنتر آپلود کرده سپس URL عکس را در فیلد زیر کپی کنید
        </span>
      </div>
      <input type="text" class="form-control text-left mb-2" v-model="news.imageUrl">
      <div class="col-12 text-center mb-2">
        <label>تعداد بازدید</label>
        <input type="number" class="form-control w-25 m-auto" min="0" v-model="news.viewCounter">
      </div>
      <div class="col-md-12 text-center mt-2 mb-3">
        <button type="submit" class=" btn btn-block mybtn btn-primary tx-tfm">ذخیره</button>
      </div>
      <div class="col-md-12 text-center mb-3" v-if="feedback">
        <p class="btn btn-block nonePointer  alert-danger">{{ feedback }}</p>
      </div>
      <div class="col-md-12 text-center mb-3" v-if="success">
        <p class="btn btn-block  nonePointer  alert-success">{{ success }}</p>
      </div>

    </form>
    <div class="col-12 mt-2">
      <h4>نظرات</h4>
    </div>
    <Comments :fullNews="news"/>

  </div>
</template>

<script>
import Comments from "./Comments";

export default {
  components: {
    Comments
  },
  name: "EditPage",
  data() {
    return {
      news: null,
      newsClasses: ["تکنولوژی", "ورزش", "اقتصاد", "سیاست", "سلامت"],
      feedback: null,
      success: null,
      user: null
    }
  },
  methods: {
    edit(newsId) {
      let token = localStorage.getItem("jwt");
      if (this.news.newsTitle === null || this.news.newsTitle === "" ||
          this.news.newsBody === null || this.news.newsBody === "" ||
          this.news.viewCounter === null || this.news.viewCounter === "") {
        this.feedback = "جاهای خالی را پر کنید"
      } else {
        this.$http.put("news/edit-news", {
          newsId: this.news._id,
          newsTitle: this.news.newsTitle,
          newsBody: this.news.newsBody,
          newsClass: this.news.newsClass,
          viewCounter: this.news.viewCounter,
          author: this.user.name,
          imageUrl: this.news.imageUrl,
          comments: this.news.comments
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then((res) => {
          if (res.status === 201) {
            this.success = res.data.message
          } else if (res.status === 409) {
            this.feedback = res.data.message
          }
        }).catch((err) => {
          console.log(err)
        })
      }
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
    }).catch((err) => {
      console.log(err)
    })

    let id = this.$route.params.news_id;
    this.$http.get("news/full-news", {
      params: {
        id: id
      }
    }).then(res => {
      this.news = res.data
      console.log(this.news)
    })
  }
}
</script>

<style scoped>
label {
  font-weight: bold;
}

.hover {
  position: relative;
  display: inline-block;
  width: 130px;
}

.tooltipText {
  visibility: hidden;
  width: 300px;
  background-color: #929292;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 3px;
  position: absolute;
  z-index: 1;
  top: -5px;
  right: 110%;
  opacity: 0;
  transition: opacity 1s;
}

.hover:hover .tooltipText {
  visibility: visible;
  opacity: 1;
}

.form {
  display: block;
  height: 100px;
  width: 100%;
  background: #95f197;
  text-align: center;
  line-height: 100px;
  border-radius: 4px;
}

.myform {
  max-width: 1000px;
}
</style>