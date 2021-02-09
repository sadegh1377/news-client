<template>
    <div id="Favorite">
        <div class="row">
            <div v-for="i in 8" class="col-md-6 col-lg-4 col-sm-12 mb-4">
                <div class="card pointer" @click="addToFavorite()">
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Favorite",
        data() {
            return {
                subjects: []
            }
        },
        methods: {
            addToFavorite() {

            }
        }
    }
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }
</style>