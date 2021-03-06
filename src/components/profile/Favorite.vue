<template>
    <div id="Favorite" class="container">
        <div class="row">
            <div v-for="(c,index) in classes" class="col-md-6 col-lg-4 col-sm-12 mb-4" :key="index">
                <div class="bg-image rounded"
                     :class="{picked:c.picked === true}"
                     :style="{ 'background-image': 'url(' + c.img + ')' }"
                     @click="addToFavorite(c)">
                    <div class="bg-text">
                        <h5 class="card-title">{{c.name}}</h5>
                    </div>
                </div>
            </div>
        </div>
        <button class="btn btn-lg btn-primary" @click="submitFavorites()">Add To Favorites</button>
    </div>
</template>

<script>

    import VueJwtDecode from "vue-jwt-decode";

    export default {
        name: "Favorite",
        props: ["user"],
        data() {
            return {
                favClasses: [],
                classes: [
                    {
                        name: "Technology",
                        img: require('../../assets/newsClasses/unnamed.jpg'),
                        picked: false
                    },
                    {
                        name: "Sports",
                        img: require('../../assets/newsClasses/sports.png'),
                        picked: false
                    },
                    {
                        name: "Economics",
                        img: require('../../assets/newsClasses/economics.jpeg'),
                        picked: false
                    },
                    {
                        name: "Politics",
                        img: require('../../assets/newsClasses/politics.jpeg'),
                        picked: false
                    },
                    {
                        name: "Health",
                        img: require('../../assets/newsClasses/health.jpg'),
                        picked: false
                    }]
            }
        },
        methods: {
            addToFavorite(c) {
                if (c.picked === true) {
                    let index = this.favClasses.indexOf(c.name);
                    this.favClasses.splice(index, 1);
                    c.picked = false
                } else {
                    this.favClasses.push(c.name);
                    c.picked = true;
                }

            },
            submitFavorites() {
                this.$http.put("user/add-fav-class", {
                    name: this.$props.user.name,
                    email: this.$props.user.email,
                    password: this.$props.user.password,
                    _id: this.$props.user._id,
                    faClasses: this.favClasses,
                }).then((user, token) => {
                    console.log(token)
                    // let token = localStorage.getItem("jwt")
                    // localStorage.removeItem(token)
                    // localStorage.setItem("jwt", user.data.tokens[user.data.tokens.length - 1].token);
                }).then(() => {
                    // location.reload()
                }).catch((err) => {
                    console.log(err);
                })
            }
        },
        created() {
            this.classes.forEach((c) => {
                this.$props.user.favClasses.forEach((fc) => {
                    if (c.name === fc) {
                        c.picked = true
                    }
                })
            })
        }
    }
</script>

<style scoped>
    .picked {
        border: 5px solid #6ae7af;
    }

    .bg-image {
        /*width: 300px;*/
        height: 200px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        /*filter: blur(1px);*/
        cursor: pointer;
        box-shadow: 0px 0px 15px 1px #c9c9c9;
    }

    .bg-image:hover {
        transform: rotate(5deg);
    }

    .bg-text {
        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
        color: white;
        font-weight: bold;
        /*border: 3px solid #f1f1f1;*/
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        width: 87%;
        padding: 20px;
        text-align: center;
    }


</style>