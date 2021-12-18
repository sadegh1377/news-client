<template>
  <div id="TodoList" class="">
    <div class="container col-sm-12 col-md-8 col-lg-6 mainBackground border roundedظ p-3">
      <div class="row p-1 m-0 border listBackground mt-2 rounded"
           v-for="(comment,index) in comments" :key="index">
        <div class="col-sm-6 col-md-8 col-lg-8 text-right">
          <div class="font-weight-bold">{{ comment.name }}</div>
          <div v-if="!comment.editing" class="border p-2 rounded">
            <p class="mr-3 text-break d-inline p-2"
            >{{ comment.text }}</p>
            <div class="text-left font-italic text-secondary">{{ comment.date.toLocaleString() }}</div>
          </div>
          <textarea type="text"
                    class=" rounded mr-3 d-inline"
                    v-else
                    v-focus
                    @blur="doneEditing(comment)"
                    @keyup.enter="doneEditing(comment)"
                    @keyup.esc="cancelEditing(comment)"
                    v-model="comment.text">
          </textarea>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-4 text-left">
          <font-awesome-icon icon="reply-all" class="mt-2 hover subTaskColor"
                             @click="openSubReply(index)"></font-awesome-icon>
          <!--          |-->
          <!--          <font-awesome-icon icon="edit" class="mt-2 hover editColor"-->
          <!--                             @click="editTask(comment)"></font-awesome-icon>-->
          |
          <font-awesome-icon v-if="user.isAdmin" icon="trash" class="mt-2 hover deleteColor"
                             @click="deleteComment(index,null,comment.text,null)"></font-awesome-icon>
        </div>
        <transition name="fade">
          <div v-show="comment.isReplyOn" class="w-100 subTaskAnime">
            <div class="row p-1 w-75 center border subListBackground mt-2 rounded"
                 v-for="(reply,replyIndex) in comments[index].replies" :key="replyIndex">
              <div class="col-sm-6 col-md-8 col-lg-8 text-right p-0">
                <div class="font-weight-bold">{{ reply.name }}</div>
                <div v-if="!reply.editing" class="border p-2 rounded">
                  <p class="mr-3 d-inline text-break p-2">{{ reply.text }}</p>
                  <div class="text-left font-italic text-secondary">{{ reply.date.toLocaleString() }}</div>
                </div>
                <textarea type="text"
                          class="mr-3 rounded"
                          v-else
                          v-focus
                          @blur="doneEditing(reply)"
                          @keyup.enter="doneEditing(reply)"
                          @keyup.esc="cancelEditing(reply)"
                          v-model="reply.text">
                </textarea>
              </div>
              <div class="col-sm-6 col-md-4 col-lg-4 text-left">
                <!--                <font-awesome-icon icon="edit" class="mt-2 hover editColor"-->
                <!--                                   @click="editTask(reply)"></font-awesome-icon>-->
                <!--                |-->
                <font-awesome-icon v-if="user.isAdmin" icon="trash" class="mt-2 hover deleteColor"
                                   @click="deleteComment(index,replyIndex,comment.text,reply.text)"></font-awesome-icon>
              </div>
            </div>
            <textarea type="text" class="center  mt-2 text-center"
                      v-model="comment.replyText"
                      @keyup.ctrl.enter="addReply(index,comment)"
                      placeholder="پاسخ خود را وارد کنید و ctrl+enter بزنید">
            </textarea>
          </div>
        </transition>
      </div>


      <div class="mt-2">
                <textarea type="text" class="w-75 text-center "
                          v-model="text"
                          @keyup.ctrl.enter="addComment"
                          placeholder="نظرات خود را اینجا وارد کنید و ctrl+enter بزنید">
                </textarea>
        <p class="text-danger" v-if="feedback">{{ feedback }}</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "TodoList",
  props: {
    fullNews: {
      require: true
    }
  },
  data() {
    return {
      text: null,
      beforeEditComment: null,
      user: null,
      comments: [],
      feedback: null

    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      }
    }
  },
  methods: {
    addComment() {
      if (this.text === null ||
          this.text === "" ||
          this.text.match(/^ *$/) !== null) {
        this.feedback = "نظر نمیتواند خالی باشد"
      } else {
        this.comments.push(
            {
              name: this.user.name,
              text: this.text,
              editing: false,
              isReplyOn: false,
              date: new Date(),
              replies: [],
              replyText: null
            })
        this.$http.put("news/add-comment", {
          _id: this.$route.params.news_id,
          comments: this.comments
        }).then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
        this.text = null;
        this.feedback = null;
      }
    },
    addReply(index, comment) {
      if (comment.replyText === null ||
          comment.replyText === "" ||
          comment.replyText.match(/^ *$/) !== null) {
        this.feedback = "پاسخ نمیتواند خالی باشد"
      } else {
        this.comments[index].replies.push(
            {
              name: this.user.name,
              text: comment.replyText,
              editing: false,
              date: new Date()
            })
        this.$http.put("news/add-replies", {
          _id: this.$route.params.news_id,
          text: comment.text,
          replies: this.comments[index].replies
        }).then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
        this.comments[index].replyText = null;
        this.feedback = null;
      }
    },
    openSubReply(index) {
      this.comments[index].isReplyOn = !this.comments[index].isReplyOn;
    },
    deleteComment(index, replyIndex, commentText, replyText) {
      if (replyIndex === null) {
        this.$http.delete("news/delete-comment", {
          data: {
            _id: this.$route.params.news_id,
            text: commentText
          }
        }).then((res) => {
          this.comments.splice(index, 1);
          console.log(res)
        })

      } else {
        this.$http.delete("news/delete-reply", {
          data: {
            _id: this.$route.params.news_id,
            commentText: commentText,
            replyText: replyText
          }
        }).then((res) => {
          console.log(res)
          this.comments[index].replies.splice(replyIndex, 1);
        })
      }
      if (this.comments.length === 0) {
        this.feedback = null;
      }
    },
    editTask(task) {
      this.beforeEditComment = task.text;
      task.editing = true;
    },
    doneEditing(comment) {
      if (comment.text.trim() === "") {
        comment.text = this.beforeEditComment;
      }
      comment.editing = false;
    },
    cancelEditing(comment) {
      comment.text = this.beforeEditComment;
      comment.editing = false;
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

    this.$http.get("news/full-news", {
      params: {
        id: this.$route.params.news_id
      }
    }).then((res) => {
      // console.log(res.data.comments)
      this.comments = res.data.comments
    })
  },
}
</script>

<style scoped>
.center {
  margin-left: auto;
  margin-right: auto;
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

.deleteColor {
  color: #f84949;
}

.subTaskColor {
  color: #0d86ff;
}

.mainBackground {
  background-color: #f9f9f9;
}

.listBackground {
  background-color: #f1f1f1;
}

.subListBackground {
  background-color: #f9f9f9;
}

.hover {
  cursor: pointer;
}

input {
  /*text-align: center;*/
  opacity: 0.8;
  padding: 5px;
  border: 1px solid #333333;
  border-radius: 10px;
  outline: none;
  width: 210px;
  /*font-weight: 400;*/
}
</style>