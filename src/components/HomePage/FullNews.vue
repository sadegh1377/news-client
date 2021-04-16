<template>
    <div id="FullNews" class="container mt-5">
        <div class="card">
            <div class="card-header">{{fullNews.newsTitle}}</div>
            <div class="card-body">{{fullNews.newsBody}}</div>
            <div class="card-footer">{{fullNews.createdAt}}
                <p>{{fullNews.viewCounter}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FullNews",
        data() {
            return {
                fullNews: ""
            }
        },
        methods: {},
        created() {
            let id = this.$route.params.news_id;
            this.$http.get("news/full-news", {
                params: {
                    id: id
                }
            }).then((res) => {
                this.$http.put("news/inc-view", {
                    _id: res.data._id
                }).then((res) => {
                    console.log(res.data)
                    let s = res.data.createdAt
                    let date = new Date(s)
                    // console.log(date.toLocaleString())

                    this.fullNews = res.data
                    this.fullNews.createdAt = date.toLocaleString()
                }).catch((err) => {
                    console.log(err);
                })
            }).catch((err) => {
                console.log(err)
            })
        },
    }
</script>

<style scoped>

</style>