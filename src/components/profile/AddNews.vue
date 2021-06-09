<template>
  <div id="AddNews" class="container">
    <form @submit.prevent="save()" class="myform shadow">
      <div class="form-row">
        <div class="form-group col-md-8">
          <label for="title">عنوان</label>
          <input type="text" class="form-control" id="title"
                 v-model="title">
        </div>
        <div class="form-group col-md-4">
          <label for="inputState">موضوع</label>
          <select id="inputState" class="form-control" v-model="newsClass">
            <option v-for="c in newsClasses" :value="c">
              {{ c }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">متن خبر</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="8"
                  v-model="body"></textarea>
      </div>
      <label>عکس سر تیتر</label>
      <file-pond
          name="test"
          ref="pond"
          label-idle="عکس تان را اینجا رها کنید یا جستجو"
          v-bind:allow-multiple="true"
          accepted-file-types="image/jpeg, image/png"
          server="/api"
          v-bind:files="myFiles"
          v-on:init="handleFilePondInit"
      />
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
      myFiles: ["cat.jpeg"],
      title: null,
      body: null,
      newsClass: "تکنولوژی",
      newsClasses: ["تکنولوژی", "ورزش", "اقتصاد", "سیاست", "سلامت"],
      feedback: null,
      success: null,
      user: null,
      uploadedFiles: [],
      uploadError: null,
      dragAndDropCapable: false,
      files: []
    }
  },
  computed: {},
  methods: {
    handleFilePondInit: function () {
      console.log("FilePond has initialized");
    },
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
          author: this.user.name
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