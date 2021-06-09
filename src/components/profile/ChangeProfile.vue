<template>
  <div id="ChangeProfile" class="container">
    <div class="myform form shadow">
      <div class="col-md-12 text-center mb-3">
        <p class="btn btn-block nonePointer alert-danger ">برای ایجاد تغییر روی نام یا ایمیل دوبار کلیک کنید</p>
      </div>
      <form @submit.prevent="save()" name="registration">
        <div class="form-group text-right">
          <label>نام</label>
          <div class="form-control" v-if="isDisable"
               @dblclick="setOldNameAndEmail">{{ oldName }}
          </div>
          <input v-else type="text" name="name" class="form-control" id="name" aria-describedby="emailHelp"
                 placeholder="نام خود را وارد کنید"
                 v-model="newName"
                 v-focus>
        </div>
        <div class="form-group text-right">
          <label>ایمیل</label>
          <div class="form-control" v-if="isDisable"
               @dblclick="setOldNameAndEmail">{{ oldEmail }}
          </div>
          <input v-else type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp"
                 placeholder="example@example.com"
                 v-model="newEmail">
        </div>
        <div class="form-group text-right">
          <label>رمز عبور</label>
          <input type="password" name="password" id="password" class="form-control"
                 aria-describedby="emailHelp" placeholder=""
                 v-model="password"
                 :disabled="isDisable">
        </div>
        <div class="form-group text-right">
          <label>تکرار رمز عبور</label>
          <input type="password" name="password" id="" class="form-control"
                 aria-describedby="emailHelp" placeholder=""
                 v-model="confirmPassword"
                 :disabled="isDisable">
        </div>
        <div class="col-md-12 text-center mb-3">
          <button type="submit" class=" btn btn-block mybtn btn-primary tx-tfm" :disabled="isDisable">ذخیره</button>
        </div>
        <div class="col-md-12 text-center mb-3" v-if="feedback">
          <p class="btn btn-block nonePointer alert-danger">{{ feedback }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangeProfile",
  data() {
    return {
      newName: "",
      newEmail: "",
      oldName: "",
      oldEmail: "",
      password: "",
      confirmPassword: "",
      isDisable: true,
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
    save() {
      if (this.newName === null || this.newName === "" ||
          this.newEmail === null || this.newEmail === "" ||
          this.password === null || this.password === "" ||
          this.confirmPassword === null || this.confirmPassword === "") {
        this.feedback = "جاهای خالی را پر کنید"
      } else if (this.password.length < 5) {
        this.feedback = "رمز عبور باید حداقل ۵ کاکتر باشد"
      } else {
        if (this.password === this.confirmPassword) {
          this.$http.put("user/change-profile", {
            oldEmail: this.oldEmail,
            newEmail: this.newEmail,
            newName: this.newName,
            password: this.password
          }).then((res) => {
            console.log(res)
            let token = res.data.token;
            let key = localStorage.getItem("jwt");
            localStorage.removeItem(key)
            localStorage.setItem("jwt", token)
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

      // this.$router.push({name: "Home"})
    },
    setOldNameAndEmail() {
      this.isDisable = false;
    },
    doneEditing() {
      this.isDisable = true;
    }
    // doneEditingName() {
    //   if (this.newName.trim() === "") {
    //     this.newName = this.oldName;
    //   }
    //   this.oldName = this.newName
    //   this.isDisable = true
    // },
    // doneEditingEmail(){
    //   if (this.newEmail.trim() === "") {
    //     this.newEmail = this.oldEmail;
    //   }
    //   this.oldEmail = this.newEmail
    //   this.isDisable = true
    // }
  },
  created() {
    let token = localStorage.getItem("jwt");
    this.$http("user/me", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      this.oldName = res.data.name;
      this.oldEmail = res.data.email
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
@import "../../assets/loginSingUp.css";

.myform {
  max-width: 700px !important;
}
</style>