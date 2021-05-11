<template>
  <div id="AddNews" class="container">
    <form @submit.prevent="save()" class="myform">
      <div class="form-row">
        <div class="form-group col-md-8">
          <label for="title">تیتر</label>
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
      <div class="form" ref="fileform">
        <span class="drop-files">عکس را اینجا رها کنید!</span>
      </div>
      <div v-for="(file, key) in files" class="file-listing">
        <img class="preview" :ref="'preview'+parseInt( key )"/>
        {{ file.name }}
        <div class="remove-container">
          <a class="remove" v-on:click="removeFile( key )">Remove</a>
        </div>
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
      feedback: null,
      success: null,
      user: null,
      uploadedFiles: [],
      uploadError: null,
      dragAndDropCapable: false,
      files: []
    }
  },
  mounted() {
    /*
      Determine if drag and drop functionality is capable in the browser
    */
    this.dragAndDropCapable = this.determineDragAndDropCapable();

    /*
      If drag and drop capable, then we continue to bind events to our elements.
    */
    if (this.dragAndDropCapable) {
      /*
        Listen to all of the drag events and bind an event listener to each
        for the fileform.
      */
      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (evt) {
        /*
          For each event add an event listener that prevents the default action
          (opening the file in the browser) and stop the propagation of the event (so
          no other elements open the file in the browser)
        */
        this.$refs.fileform.addEventListener(evt, function (e) {
          e.preventDefault();
          e.stopPropagation();
        }.bind(this), false);
      }.bind(this));

      /*
        Add an event listener for drop to the form
      */
      this.$refs.fileform.addEventListener('drop', function (e) {
        /*
          Capture the files from the drop event and add them to our local files
          array.
        */
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          this.files.push(e.dataTransfer.files[i]);
        }
        this.getImagePreviews();
      }.bind(this));
    }
  },
  computed: {},
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
          author: this.user.name
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then((res) => {
          this.success = res.data.message
        }).catch((err) => {
          console.log(err)
        })
        this.title = null;
        this.body = null;
        this.newsClass = "تکنولوژی";
        this.feedback = null;
      }
    },
    getImagePreviews() {
      /*
        Iterate over all of the files and generate an image preview for each one.
      */
      for (let i = 0; i < this.files.length; i++) {
        /*
          Ensure the file is an image file
        */
        if (/\.(png|jpg|jpeg)$/i.test(this.files[i].name)) {
          /*
            Create a new FileReader object
          */
          let reader = new FileReader();

          /*
            Add an event listener for when the file has been loaded
            to update the src on the file preview.
          */
          reader.addEventListener("load", function () {
            this.$refs['preview' + parseInt(i)][0].src = reader.result;
          }.bind(this), false);

          /*
            Read the data for the file in through the reader. When it has
            been loaded, we listen to the event propagated and set the image
            src to what was loaded from the reader.
          */
          reader.readAsDataURL(this.files[i]);
        } else {
          /*
            We do the next tick so the reference is bound and we can access it.
          */
          this.$nextTick(function () {
            this.$refs['preview' + parseInt(i)][0].src = '/images/file.png';
          });
        }
      }
    },
    determineDragAndDropCapable() {
      /*
        Create a test element to see if certain events
        are present that let us do drag and drop.
      */
      var div = document.createElement('div');

      /*
        Check to see if the `draggable` event is in the element
        or the `ondragstart` and `ondrop` events are in the element. If
        they are, then we have what we need for dragging and dropping files.

        We also check to see if the window has `FormData` and `FileReader` objects
        present so we can do our AJAX uploading
      */
      return (('draggable' in div)
          || ('ondragstart' in div && 'ondrop' in div))
          && 'FormData' in window
          && 'FileReader' in window;
    },
    removeFile(key) {
      this.files.splice(key, 1);
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

div.file-listing {
  width: 400px;
  margin: auto;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

div.file-listing img {
  height: 100px;
}

div.remove-container {
  text-align: center;
}

div.remove-container a {
  color: red;
  cursor: pointer;
}

.myform {
  max-width: 700px;
}
</style>