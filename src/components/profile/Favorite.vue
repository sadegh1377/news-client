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
        <button class="btn btn-lg mybtn" @click="submitFavorites()">افرودن به علاقه مندی ها</button>
    </div>
</template>

<script>

    export default {
        name: "Favorite",
        // props: ["user"],
        data() {
            return {
                user: null,
                favClasses: [],
                classes: [
                    {
                        name: "تکنولوژی",
                        img: require('../../assets/newsClasses/unnamed.jpg'),
                        picked: false
                    },
                    {
                        name: "ورزش",
                        img: require('../../assets/newsClasses/sports.png'),
                        picked: false
                    },
                    {
                        name: "اقتصاد",
                        img: require('../../assets/newsClasses/economics.jpeg'),
                        picked: false
                    },
                    {
                        name: "سیاست",
                        img: require('../../assets/newsClasses/politics.jpeg'),
                        picked: false
                    },
                    {
                        name: "سلامت",
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
                    email: this.user.email,
                    favClasses: this.favClasses,
                }).then((res) => {
                    let token = res.data.token;
                    let key = localStorage.getItem("jwt");
                    localStorage.removeItem(key)
                    localStorage.setItem("jwt", token)
                    location.reload()
                }).catch((err) => {
                    console.log(err);
                })
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
            }).then(() => {
                this.classes.forEach((c) => {
                    this.user.favClasses.forEach((fc) => {
                        if (c.name === fc) {
                            c.picked = true
                        }
                    })
                })
                this.favClasses = this.user.favClasses
            }).catch((err) => {
                console.log(err)
            })
        }
    }
</script>

<style scoped>
    .picked {
        border: 5px solid #6ae7af;
    }

    .bg-image {
        width: 100%;
        height: 200px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        /*filter: blur(1px);*/
        cursor: pointer;
        box-shadow: 0px 0px 15px 1px #c9c9c9;
        overflow: hidden;
    }

    .bg-image:hover {
        transform: rotate(5deg);
        transition-duration: .5s;
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
        transition-duration: .5s;
        overflow: hidden;
    }

</style>