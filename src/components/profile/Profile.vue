<template>
    <div id="Profile" class="mt-5 container">
        <div class="row">
            <div class="col-sm-3 col-md-3 col-lg-3">
                <ul class="list-group">
                    <li class="list-group-item" :class="{active:pageName === 'favorite'}"
                        @click="changePage('favorite')">favorite
                    </li>
                    <li class="list-group-item"
                        :class="{active:pageName === 'profile'}"
                        @click="changePage('profile')">change profile
                    </li>
                </ul>
            </div>

            <div class="col-sm-9 col-md-9 col-lg-9">
                <transition name="fade" mode="out-in">
                    <Favorite v-if="pageName === 'favorite'" :user="user"/>
                    <ChangeProfile v-if="pageName === 'profile'" :user="user"/>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import ChangeProfile from "./ChangeProfile";
    import Favorite from "./Favorite";
    import VueJwtDecode from "vue-jwt-decode";

    export default {
        name: "Profile",
        components: {
            Favorite,
            ChangeProfile
        },
        data() {
            return {
                pageName: "favorite",
                user: null
            }
        },
        methods: {
            changePage(page) {
                if (page === "profile") {
                    this.pageName = "profile"
                } else {
                    this.pageName = "favorite"
                }
            }
        }, created() {
            let token = localStorage.getItem("jwt");
            this.user = VueJwtDecode.decode(token)
            console.log(this.user)
        }
    }
</script>

<style scoped>

    .fade-enter-active {
        transition: opacity 0.2s ease-in;
    }

    .fade-leave-active {
        transition: opacity 0.2s ease-out;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>