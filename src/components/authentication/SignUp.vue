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
                    <label>First Name</label>
                    <input type="text" name="firstname" class="form-control" id="firstname" aria-describedby="emailHelp"
                           placeholder="Enter Firstname">
                </div>
                <div class="form-group text-left">
                    <label>Last Name</label>
                    <input type="text" name="lastname" class="form-control" id="lastname" aria-describedby="emailHelp"
                           placeholder="Enter Lastname">
                </div>
                <div class="form-group text-left">
                    <label>Email address</label>
                    <input type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp"
                           placeholder="Enter email">
                </div>
                <div class="form-group text-left">
                    <label>Password</label>
                    <input type="password" name="password" id="password" class="form-control"
                           aria-describedby="emailHelp" placeholder="Enter Password">
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
    export default {
        name: "SignUp",
        data() {
            return {}
        },
        methods: {
            signUp() {
                this.$router.push({name: "Home"})
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/loginSingUp.css";
</style>