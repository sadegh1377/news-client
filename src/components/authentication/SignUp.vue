<template>
    <div id="SignUp" class="container">
        <div class="myform form mt-5">
            <div class="logo mb-3">
                <div class="col-md-12 text-center">
                    <h1>Signup</h1>
                </div>
            </div>
            <form @submit.prevent="signUp()" name="registration">
                <div class="form-group text-left">
                    <label>Name</label>
                    <input type="text" name="name" class="form-control" id="firstname" aria-describedby="emailHelp"
                           placeholder="Enter name"
                           v-model="name">
                </div>
                <div class="form-group text-left">
                    <label>Email address</label>
                    <input type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp"
                           placeholder="Enter email"
                           v-model="email">
                </div>
                <div class="form-group text-left">
                    <label>Password</label>
                    <input type="password" name="password" id="password" class="form-control"
                           aria-describedby="emailHelp" placeholder="Enter Password"
                           v-model="password">
                </div>
                <div class="col-md-12 text-center mb-3" v-if="feedback">
                    <p>{{feedback}}</p>
                </div>
                <div class="col-md-12 text-center mb-3">
                    <button type="submit" class=" btn btn-block mybtn btn-primary tx-tfm">SignUp</button>
                </div>
                <div class="col-md-12 ">
                    <div class="form-group">
                        <p class="text-center">
                            <router-link to="/" id="signin">Already have an account?</router-link>
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
                feedback: null
            }
        },
        methods: {

            signUp() {
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
                })
                    .catch((err) => {
                        console.log(err)
                        // let error = err.response;
                        // if (error.status === 409) {
                        //     this.feedback = error.data.message;
                        // } else {
                        //     this.feedback = error.data.err.message;
                        // }
                    })
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/loginSingUp.css";
</style>