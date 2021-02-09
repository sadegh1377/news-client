<template>
    <div id="Login" class="container">
        <div class="myform form mt-5">
            <div class="logo mb-3">
                <div class="col-md-12 text-center">
                    <h1>Login</h1>
                </div>
            </div>
            <form @submit.prevent="login()" name="login">
                <div class="form-group text-left">
                    <label>Email address</label>
                    <input type="email" name="email" class="form-control" aria-describedby="emailHelp"
                           placeholder="Enter email">
                </div>
                <div class="form-group text-left">
                    <label>Password</label>
                    <input type="password" name="password" id="password" class="form-control"
                           aria-describedby="emailHelp" placeholder="Enter Password">
                </div>
                <div class="col-md-12 text-center ">
                    <button type="submit" class=" btn btn-block mybtn btn-primary tx-tfm">Login
                    </button>
                </div>
                <div class="col-md-12 ">
                    <div class="login-or">
                        <hr class="hr-or">
                        <span class="span-or">or</span>
                    </div>
                </div>
                <div class="form-group">
                    <p class="text-center">Don't have account?
                        <router-link to="/sign-up" id="signup">Sign up here</router-link>
                    </p>
                </div>
            </form>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {}
        },
        methods: {
            login() {
                this.$router.push({name: "Home"})
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/loginSingUp.css";
</style>