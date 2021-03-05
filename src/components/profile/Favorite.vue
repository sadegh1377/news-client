<template>
    <div id="Favorite" class="container">
        <div class="row">
            <div v-for="(c,index) in classes" class="col-md-6 col-lg-4 col-sm-12 mb-4" :key="index">
                <div class="card pointer" @click="addToFavorite(c)">
                    <div class="card-body"
                         :class="{picked:c.picked === true}">
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
                        // img: require('../../assets/Technology.jpeg'),
                        picked: false
                    },
                    {
                        name: "Sports",
                        picked: false
                    },
                    {
                        name: "Economics",
                        picked: false
                    },
                    {
                        name: "Politics",
                        picked: false
                    },
                    {
                        name: "Health",
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
                    id: this.$props.user._id,
                    favClasses: this.favClasses
                }).then((user) => {
                    let token = localStorage.getItem("jwt")
                    localStorage.removeItem(token)
                    localStorage.setItem("jwt", user.data.tokens[user.data.tokens.length - 1].token);
                }).then(() => {
                    location.reload()
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
        background-color: #6ae7af;
    }

    .pointer {
        cursor: pointer;
    }

</style>