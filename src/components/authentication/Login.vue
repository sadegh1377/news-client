<template>
  <div id="Login" class="container">
    <div class="myform form mt-5 shadow">
      <div class="logo mb-3">
        <div class="col-md-12 text-center">
          <h1>ورود</h1>
        </div>
      </div>
      <form @submit.prevent="login()" name="login">
        <div class="form-group text-right">
          <label>ایمیل</label>
          <input type="email" name="email" class="form-control" aria-describedby="emailHelp"
                 placeholder="example@example.com"
                 v-model="email"
                 v-focus>
        </div>
        <div class="form-group text-right">
          <label>رمز عبور</label>
          <div class="input-group">
            <input :type="visibility" name="password" id="password"
                   class="form-control "
                   aria-describedby="emailHelp" placeholder=""
                   v-model="password">
            <span v-if="visibility === 'password'" class="input-group-btn  border p-1 rounded"
                  @click="showPassword()">
               <font-awesome-icon class="reveal align-content-center" icon="eye"></font-awesome-icon>
          </span>
            <span v-if="visibility === 'text'" class="input-group-btn border-right-0 border p-1 rounded"
                  @click="hidePassword()">
               <font-awesome-icon class="reveal align-content-center" icon="eye-slash"></font-awesome-icon>
          </span>
          </div>
        </div>
        <div class="col-md-12 text-center mb-3 ">
          <button type="submit" class="btn btn-block mybtn tx-tfm">ورود
          </button>
        </div>
        <div class="col-md-12 text-center mb-3" v-if="feedback">
          <p class="btn btn-block nonePointer  alert-danger">{{ feedback }}</p>
        </div>
        <div class="col-md-12 ">
          <div class="login-or">
            <hr class="hr-or">
            <span class="span-or">یا</span>
          </div>
        </div>
        <div class="form-group">
          <p class="text-center">حساب کاربری ندارید؟
            "
            <router-link to="/sign-up" id="signup">اینجا ثبت نام کنید</router-link>
            "
          </p>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
      visibility: "password"
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
    login() {
      if (this.email === null || this.email === "" ||
          this.password === null || this.password === "") {
        this.feedback = "جاهای خالی را پر کنید";
      } else {
        this.feedback = null;
        this.$http.post("user/login", {
          email: this.email,
          password: this.password
        }).then((res) => {
          let token = res.data.token;
          localStorage.setItem("jwt", token);
          if (token) {
            this.$router.push({name: "Home"});
          }
        }).then(() => {
          location.reload()
        }).catch((err) => {
          console.log(err)
          let error = err.response;
          // if (error.status === 401) {
          //   this.feedback = error.data.message;
          // } else {
          //   this.feedback = error.data.err.message;
          // }
        })
      }
    },
    showPassword() {
      this.visibility = "text"
      console.log(this.visibility)
    },
    hidePassword() {
      this.visibility = "password"
      console.log(this.visibility)
    }
  }
}
</script>

<style scoped>
@import "../../assets/loginSingUp.css";

</style>