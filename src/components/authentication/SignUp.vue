<template>
  <div id="SignUp" class="container">
    <div class="myform form mt-5">
      <div class="logo mb-3">
        <div class="col-md-12 text-center">
          <h1>ثبت نام</h1>
        </div>
      </div>
      <form @submit.prevent="signUp()" name="registration">
        <div class="form-group text-right">
          <label>نام</label>
          <input type="text" name="name" class="form-control" id="firstname" aria-describedby="emailHelp"
                 placeholder="نام خود را وارد کنید"
                 v-model="name">
        </div>
        <div class="form-group text-right">
          <label>ایمیل</label>
          <input type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp"
                 placeholder="example@example.com"
                 v-model="email">
        </div>
        <div class="form-group text-right">
          <label>رمز عبور</label>
          <input type="password" name="password" id="password" class="form-control"
                 aria-describedby="emailHelp" placeholder=""
                 v-model="password">
        </div>
        <div class="form-group text-right">
          <label>تکرار رمز عبور</label>
          <input type="password" name="confirm password" id="confirm password" class="form-control"
                 aria-describedby="emailHelp" placeholder=""
                 v-model="confirmPassword">
        </div>
        <div class="col-md-12 text-center mb-3">
          <button type="submit" class=" btn btn-block mybtn tx-tfm">ثبت نام</button>
        </div>
        <div class="col-md-12 text-center mb-3" v-if="feedback">
          <p class="btn btn-block nonePointer alert-danger">{{ feedback }}</p>
        </div>
        <div class="col-md-12 ">
          <div class="form-group">
            <p class="text-center">قبلا عضو شده اید؟
              "
              <router-link to="/" id="signin"> ورود به حساب</router-link>
              "
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "SignUp",
  data() {
    return {
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
      feedback: null
    }
  },
  methods: {

    signUp() {

      if (this.name === null || this.name === "" ||
          this.email === null || this.email === "" ||
          this.password === null || this.password === "" ||
          this.confirmPassword === null || this.confirmPassword === "") {
        this.feedback = "جاهای خالی را پر کنید"
      } else if (this.password.length < 5) {
        this.feedback = "رمز عبور باید حداقل ۵ کاکتر باشد"
      } else {
        if (this.password === this.confirmPassword) {
          this.feedback = null;
          this.$http.post("user/register", {
            name: this.name,
            email: this.email,
            password: this.password,
            favClasses: []
          }).then((res) => {
            let token = res.data.token;
            if (token) {
              localStorage.setItem("jwt", token);
              this.$router.push({name: "Profile"})
            } else {
              this.feedback = "Something Went Wrong"
            }
          }).then(() => {
            location.reload()
          }).catch((err) => {
            let error = err.response;
            if (error.status === 409) {
              this.feedback = error.data.message;
            } else {
              this.feedback = error.data.err.message;
            }
          })
        } else {
          this.feedback = "رمزهای عبور یکسان نیستند"
        }
      }
    }
  }
}
</script>

<style scoped>
@import "../../assets/loginSingUp.css";
</style>