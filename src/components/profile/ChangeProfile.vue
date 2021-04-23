<template>
  <div id="SignUp" class="container">
    <div class="myform form">
      <form @submit.prevent="save()" name="registration">
        <div class="form-group text-right">
          <label>نام</label>
          <input type="text" name="name" class="form-control" id="name" aria-describedby="emailHelp"
                 placeholder="نام خود را وارد کنید"
                 v-model="user.name">
        </div>
        <div class="form-group text-right">
          <label>ایمیل</label>
          <input type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp"
                 placeholder="example@example.com"
                 v-model="user.email">
        </div>
        <div class="form-group text-right">
          <label>رمز عبور</label>
          <input type="password" name="password" id="password" class="form-control"
                 aria-describedby="emailHelp" placeholder="">
        </div>
        <div class="form-group text-right">
          <label>تکرار رمز عبور</label>
          <input type="password" name="password" id="" class="form-control"
                 aria-describedby="emailHelp" placeholder="">
        </div>
        <div class="col-md-12 text-center mb-3">
          <button type="submit" class=" btn btn-block mybtn btn-primary tx-tfm">ذخیره</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      user: null
    }
  },
  methods: {
    save() {
      this.$router.push({name: "Home"})
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
@import "../../assets/loginSingUp.css";
</style>