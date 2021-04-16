<template>
    <div id="Login" class="container">
        <div class="myform form mt-5">
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
                           v-model="email">
                </div>
                <div class="form-group text-right">
                    <label>رمز عبور</label>
                    <input type="password" name="password" id="password" class="form-control"
                           aria-describedby="emailHelp" placeholder=""
                           v-model="password">
                </div>
                <div class="col-md-12 text-center mb-3 ">
                    <button type="submit" class=" btn btn-block mybtn btn-primary tx-tfm">ورود
                    </button>
                </div>
                <div class="col-md-12 text-center mb-3" v-if="feedback">
                    <p class="btn btn-block mybtn nonePointer  alert-danger">{{feedback}}</p>
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
                feedback: null
            }
        },
        methods: {
            login() {
                if (this.email === null || this.email === "" ||
                    this.password === null || this.password === "") {
                    this.feedback = "Please fill the form";
                } else {
                    this.feedback = null;
                    axios.post("http://localhost:4000/user/login", {
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
                        let error = err.response;
                        if (error.status === 401) {
                            this.feedback = error.data.message;
                        } else {
                            this.feedback = error.data.err.message;
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/loginSingUp.css";
</style>