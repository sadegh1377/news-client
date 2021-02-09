<template>
    <div id="Home" class="container mt-5">
        <div class="row">
            <div class="col-md-12 ">
                <div class="login-or">
                    <hr class="hr-or">
                    <span class="span-or">Technology</span>
                </div>
            </div>
            <div v-for="(n,index) in news" class="col-sm-12 col-md-4 col-lg-3 mb-3 pointer" :key="index">
                <div class="card h-100" @click="viewNews(n._id)">
                    <div class="card-header text-center">{{n.NewsClass}}</div>
                    <div class="card-footer row m-0">
                        <div class="text-left col-6">id: {{n._id}}</div>
                        <div class="text-right col-6">
                            <font-awesome-icon icon="eye"></font-awesome-icon>
                            {{n.ViewCounter}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12 ">
                <div class="login-or">
                    <hr class="hr-or">
                    <span class="span-or">Sports</span>
                </div>
            </div>
            <div v-for="(n,index) in news" class="col-sm-12 col-md-4 col-lg-3 mb-3 pointer" :key="index">
                <div class="card h-100" @click="viewNews(n._id)">
                    <div class="card-header text-center">{{n.NewsClass}}</div>
                    <div class="card-footer row m-0">
                        <div class="text-left col-6">id: {{n._id}}</div>
                        <div class="text-right col-6">
                            <font-awesome-icon icon="eye"></font-awesome-icon>
                            {{n.ViewCounter}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12 ">
                <div class="login-or">
                    <hr class="hr-or">
                    <span class="span-or">Economics</span>
                </div>
            </div>
            <div v-for="(n,index) in news" class="col-sm-12 col-md-4 col-lg-3 mb-3 pointer" :key="index">
                <div class="card h-100" @click="viewNews(n._id)">
                    <div class="card-header text-center">{{n.NewsClass}}</div>
                    <div class="card-footer row m-0">
                        <div class="text-left col-6">id: {{n._id}}</div>
                        <div class="text-right col-6">
                            <font-awesome-icon icon="eye"></font-awesome-icon>
                            {{n.ViewCounter}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12 ">
                <div class="login-or">
                    <hr class="hr-or">
                    <span class="span-or">Politics</span>
                </div>
            </div>
            <div v-for="(n,index) in news" class="col-sm-12 col-md-4 col-lg-3 mb-3 pointer" :key="index">
                <div class="card h-100" @click="viewNews(n._id)">
                    <div class="card-header text-center">{{n.NewsClass}}</div>
                    <div class="card-footer row m-0">
                        <div class="text-left col-6">id: {{n._id}}</div>
                        <div class="text-right col-6">
                            <font-awesome-icon icon="eye"></font-awesome-icon>
                            {{n.ViewCounter}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12 ">
                <div class="login-or">
                    <hr class="hr-or">
                    <span class="span-or">Health</span>
                </div>
            </div>
            <div v-for="(n,index) in news" class="col-sm-12 col-md-4 col-lg-3 mb-3 pointer" :key="index">
                <div class="card h-100" @click="viewNews(n._id)">
                    <div class="card-header text-center">{{n.NewsClass}}</div>
                    <div class="card-footer row m-0">
                        <div class="text-left col-6">id: {{n._id}}</div>
                        <div class="text-right col-6">
                            <font-awesome-icon icon="eye"></font-awesome-icon>
                            {{n.ViewCounter}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Home",
        data() {
            return {
                news: null,
                newsClasses: null
            }
        },
        methods: {
            viewNews(id) {
                this.$router.push("/news/" + id)
            }
        },
        created() {
            axios.get("http://localhost:3000/all-news").then((res) => {
                this.news = res.data
            }).catch((err) => {
                console.log(err)
            });
            // axios.get("http://localhost:3000/all-news-classes").then((res) => {
            //     this.newsClasses = res.data
            // }).catch((err) => {
            //     console.log(err)
            // });
        }
    }
</script>

<style scoped>
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

    .pointer {
        cursor: pointer;
    }
</style>