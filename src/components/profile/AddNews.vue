<template>
    <div id="AddNews" class="container">
        <form @submit.prevent="save()" class="myform">
            <div class="form-row">
                <div class="form-group col-md-8">
                    <label for="title">Title</label>
                    <input type="text" class="form-control" id="title"
                           v-model="title">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputState">Class</label>
                    <select id="inputState" class="form-control" v-model="newsClass">
                        <option v-for="c in newsClasses" :value="c">
                            {{c}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Body</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"
                          v-model="body"></textarea>
            </div>
            <div class="col-md-12 text-center mt-2 mb-3">
                <button type="submit" class=" btn btn-block mybtn btn-primary tx-tfm">save</button>
            </div>
            <div class="col-md-12 text-center mb-3" v-if="feedback">
                <p class="btn btn-block mybtn nonePointer  alert-danger">{{feedback}}</p>
            </div>
            <div class="col-md-12 text-center mb-3" v-if="success">
                <p class="btn btn-block mybtn nonePointer  alert-success">{{success}}</p>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "AddNews",
        props: ["user"],
        data() {
            return {
                title: null,
                body: null,
                newsClass: "Technology",
                newsClasses: ["Technology", "Sports", "Economics", "Politics", "Health"],
                feedback: null,
                success: null
            }
        },
        methods: {
            save() {
                let token = localStorage.getItem("jwt");
                if (this.title === null || this.title === "" || this.body === null || this.body === "") {
                    this.feedback = "Complete The Form"
                } else {
                    this.$http.post("news/add-news", {
                        newsTitle: this.title,
                        newsBody: this.body,
                        newsClass: this.newsClass,
                        viewCounter: 0,
                        author: this.$props.user.name
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }).then((res) => {
                        this.success = res.data.message
                    }).catch((err) => {
                        console.log(err)
                    })
                    this.title = null;
                    this.body = null;
                    this.newsClass = "Technology";
                    this.feedback = null;
                }
            }
        }
    }
</script>

<style scoped>

</style>