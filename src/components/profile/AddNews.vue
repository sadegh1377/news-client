<template>
  <div id="AddNews" class="container">
    <form @submit.prevent="save()" class="myform shadow" enctype="multipart/form-data">
      <div class="form-row">
        <div class="form-group col-md-8">
          <label>عنوان</label>
          <input type="text" class="form-control"
                 v-model="title">
        </div>
        <div class="form-group col-md-4">
          <label>موضوع</label>
          <select class="form-control" v-model="newsClass">
            <option v-for="c in newsClasses" :value="c">
              {{ c }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>متن خبر</label>
        <textarea class="form-control" rows="8"
                  v-model="body"></textarea>
      </div>
      <div class="hover align-self-center">
        <span >عکس سر تیتر
        <font-awesome-icon icon="info-circle"/>
         </span>
        <span
            class="tooltipText">ابتدا عکس سر تیتر را در یک آپلود سنتر آپلود کرده سپس URL عکس را در فیلد زیر کپی کنید
        </span>
      </div>
      <input type="text" class="form-control text-left mb-2" v-model="imageUrl">
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
  </div>
</template>

<script>

export default {
  name: "AddNews",
  data() {
    return {
      title: null,
      body: null,
      newsClass: "تکنولوژی",
      newsClasses: ["تکنولوژی", "ورزش", "اقتصاد", "سیاست", "سلامت"],
      imageUrl: null,
      feedback: null,
      success: null,
      user: null,
      uploadedFiles: [],
      uploadError: null,
      dragAndDropCapable: false,
      files: []
    }
  },
  methods: {

    save() {
      let token = localStorage.getItem("jwt");
      if (this.title === null || this.title === "" || this.body === null || this.body === "") {
        this.feedback = "جاهای خالی را پر کنید"
      } else {
        this.$http.post("news/add-news", {
          newsTitle: this.title,
          newsBody: this.body,
          newsClass: this.newsClass,
          viewCounter: 0,
          author: this.user.name,
          imageUrl: this.imageUrl,
          replies: []
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
        this.title = null;
        this.body = null;
        this.newsClass = "تکنولوژی";
        this.imageUrl = null;
        this.feedback = null;
      }
    },

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
  }

}
</script>

<style scoped>
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
  max-width: 700px;
}
</style>