<template>
    <div id="Home" class="container mt-5">
        <div class="row">
            <div class="col-md-12" v-if="technology.length!==0">
                <div class="login-or text-center">
                    <hr class="hr-or">
                    <span class="span-or">تکنولوژی</span>
                </div>
            </div>
            <router-link :to="{name:'FullNews' , params:{news_id:news._id}}"
                         class="col-lg-4 col-md-5 col-sm-6 mt-3 rounded py-2 cards"
                         v-for="(news,id) in technology"
                         @click="viewNews(news)"
                         :key="news._id">
                <div class="card h-100">
                    <div class="card-img-top">
                        <img class="img-fluid img" src="../../assets/newsClasses/technology.png" :alt="news.newsClass">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title h-25 border-bottom ">
                            {{news.newsTitle}}
                        </h5>
                        <p class="card-text">{{news.newsBody}}</p>


                    </div>
                    <div class="card-footer background">
                        <div class="text-right">
                            <font-awesome-icon icon="eye"></font-awesome-icon>
                            {{news.viewCounter}}
                        </div>
                    </div>
                </div>
            </router-link>
            <!--            <div v-if="technology.length!==0"-->
            <!--                 v-for="n in technology"-->
            <!--                 class="col-sm-12 col-md-4 col-lg-3 mb-3 bg-image"-->
            <!--                 :key="n._id">-->
            <!--                <div class="card h-100" @click="viewNews(n._id)">-->
            <!--                    <div class="card-header text-center">{{n.newsClass}}</div>-->
            <!--                    <div class="card-footer row m-0">-->
            <!--                        <div class="text-left col-6">id: {{n._id}}</div>-->
            <!--                        <div class="text-right col-6">-->
            <!--                            <font-awesome-icon icon="eye"></font-awesome-icon>-->
            <!--                            {{n.viewCounter}}-->
            <!--                        </div>-->
            <!--                    </div>-->
            <!--                </div>-->
            <!--            </div>-->
            <!--            <div class="col-md-12" v-if="sports.length!==0">-->
            <!--                <div class="login-or">-->
            <!--                    <hr class="hr-or">-->
            <!--                    <span class="span-or">Sports</span>-->
            <!--                </div>-->
            <!--            </div>-->
            <!--            <div v-if="sports.length!==0"-->
            <!--                 v-for="(n,index) in sports"-->
            <!--                 class="col-sm-12 col-md-4 col-lg-3 mb-3 bg-image"-->
            <!--                 :key="n._id">-->
            <!--                <div class="card h-100" @click="viewNews(n._id)">-->
            <!--                    <div class="card-header text-center">{{n.newsClass}}</div>-->
            <!--                    <div class="card-footer row m-0">-->
            <!--                        <div class="text-left col-6">id: {{n._id}}</div>-->
            <!--                        <div class="text-right col-6">-->
            <!--                            <font-awesome-icon icon="eye"></font-awesome-icon>-->
            <!--                            {{n.viewCounter}}-->
            <!--                        </div>-->
            <!--                    </div>-->
            <!--                </div>-->
            <!--            </div>-->
            <!--            <div class="col-md-12" v-if="economics.length!==0">-->
            <!--                <div class="login-or">-->
            <!--                    <hr class="hr-or">-->
            <!--                    <span class="span-or">Economics</span>-->
            <!--                </div>-->
            <!--            </div>-->
            <!--            <div v-for="(n,index) in economics"-->
            <!--                 v-if="economics.length!==0"-->
            <!--                 class="col-sm-12 col-md-4 col-lg-3 mb-3 bg-image"-->
            <!--                 :key="n._id">-->
            <!--                <div class="card h-100" @click="viewNews(n._id)">-->
            <!--                    <div class="card-header text-center">{{n.newsClass}}</div>-->
            <!--                    <div class="card-footer row m-0">-->
            <!--                        <div class="text-left col-6">id: {{n._id}}</div>-->
            <!--                        <div class="text-right col-6">-->
            <!--                            <font-awesome-icon icon="eye"></font-awesome-icon>-->
            <!--                            {{n.viewCounter}}-->
            <!--                        </div>-->
            <!--                    </div>-->
            <!--                </div>-->
            <!--            </div>-->
            <!--            <div class="col-md-12" v-if="politics.length!==0">-->
            <!--                <div class="login-or">-->
            <!--                    <hr class="hr-or">-->
            <!--                    <span class="span-or">Politics</span>-->
            <!--                </div>-->
            <!--            </div>-->
            <!--            <div v-if="politics.length!==0"-->
            <!--                 v-for="(n,index) in politics"-->
            <!--                 class="col-sm-12 col-md-4 col-lg-3 mb-3 bg-image"-->
            <!--                 :key="n._id">-->
            <!--                <div class="card h-100" @click="viewNews(n._id)">-->
            <!--                    <div class="card-header text-center">{{n.newsClass}}</div>-->
            <!--                    <div class="card-footer row m-0">-->
            <!--                        <div class="text-left col-6">id: {{n._id}}</div>-->
            <!--                        <div class="text-right col-6">-->
            <!--                            <font-awesome-icon icon="eye"></font-awesome-icon>-->
            <!--                            {{n.viewCounter}}-->
            <!--                        </div>-->
            <!--                    </div>-->
            <!--                </div>-->
            <!--            </div>-->
            <!--            <div class="col-md-12" v-if="health.length!==0">-->
            <!--                <div class="login-or">-->
            <!--                    <hr class="hr-or">-->
            <!--                    <span class="span-or">Health</span>-->
            <!--                </div>-->
            <!--            </div>-->
            <!--            <div v-if="health.length!==0"-->
            <!--                 v-for="(n,index) in health"-->
            <!--                 class="col-sm-12 col-md-4 col-lg-3 mb-3 bg-image"-->
            <!--                 :key="n._id">-->
            <!--                <div class="card h-100" @click="viewNews(n._id)">-->
            <!--                    <div class="card-header text-center">{{n.newsClass}}</div>-->
            <!--                    <div class="card-footer row m-0">-->
            <!--                        <div class="text-left col-6">id: {{n._id}}</div>-->
            <!--                        <div class="text-right col-6">-->
            <!--                            <font-awesome-icon icon="eye"></font-awesome-icon>-->
            <!--                            {{n.viewCounter}}-->
            <!--                        </div>-->
            <!--                    </div>-->
            <!--                </div>-->
            <!--            </div>-->
        </div>
    </div>
</template>

<script>
    import VueJwtDecode from "vue-jwt-decode";
    import gsap from 'gsap'

    export default {
        name: "Home",
        data() {
            return {
                newsClasses: null,
                user: null,
                technology: [],
                sports: [],
                economics: [],
                politics: [],
                health: [],

            }
        },
        methods: {},
        created() {
            let token = localStorage.getItem("jwt");
            this.$http("user/me", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                this.user = res.data
                this.$http.get("news/fav-news", {
                    params: {
                        favClasses: this.user.favClasses
                    }
                }).then((res) => {
                    // console.log(res)
                    if (res.data[0].length !== 0) {
                        this.technology = res.data[0];
                    }
                    if (res.data[1].length !== 0) {
                        this.sports = res.data[1];
                    }
                    if (res.data[2].length !== 0) {
                        this.economics = res.data[2];
                    }
                    if (res.data[3].length !== 0) {
                        this.politics = res.data[3];
                    }
                    if (res.data[4].length !== 0) {
                        this.health = res.data[4];
                    }
                    // console.log(res)
                }).then(() => {
                    gsap.from('.cards', {
                        duration: 0.5,
                        opacity: 0,
                        scale: 0,
                        y: 300,
                        ease: 'power1',
                        stagger: {
                            from: 'start',
                            each: 0.2,
                        }
                    })
                }).catch((err) => {
                    console.log(err)
                });
            }).catch((err) => {
                console.log(err)
            })


            // axios.get("http://localhost:3000/all-news-classes").then((res) => {
            //     this.newsClasses = res.data
            // }).catch((err) => {
            //     console.log(err)
            // });
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
        color: black;
    }

    a:hover {
        color: black;
    }

    .card-text {
        max-height: 200px;
        overflow: hidden;
        text-overflow: clip;
    }

    .img {
        height: 170px !important;
    }

    .fade-enter-active {
        transition: max-height .3s ease-in, opacity .9s ease-in-out;
        max-height: 1000px;
    }

    .fade-leave-active {
        transition: max-height 0.4s ease-out, opacity 0.2s ease-in-out;
        max-height: 1000px;
    }

    .fade-enter, .fade-leave-to {
        max-height: 0;
        opacity: 0;
    }

    .bg-image {
        cursor: pointer;
    }

    .background {
        background-color: #2991c8 !important;
        color: white !important;
    }
</style>