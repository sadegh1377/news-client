<template>
    <div id="Profile" class="mt-5">
        <div class="row">
            <div class="col-sm-2 col-md-2 col-lg-2">
                <ul class="list-group">
                    <li class="list-group-item" :class="{active:pageName=== 'favorite'}"
                        @click="changePage('favorite')">favorite
                    </li>
                    <li class="list-group-item"
                        :class="{active:pageName=== 'profile'}"
                        @click="changePage('profile')">change profile
                    </li>
                </ul>
            </div>

            <div class="col-sm-10 col-md-10 col-lg-10">
                <transition name="fade" mode="out-in">
                    <Favorite v-if="pageName === 'favorite'"/>
                    <ChangeProfile v-if="pageName === 'profile'"/>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import ChangeProfile from "./ChangeProfile";
    import Favorite from "./Favorite";

    export default {
        name: "Profile",
        components: {
            Favorite,
            ChangeProfile
        },
        data() {
            return {
                pageName: "favorite"
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