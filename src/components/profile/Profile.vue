<template>
    <div id="Profile" class="mt-5 container">
        <div class="row">
            <div class="col-sm-4 col-md-4 col-lg-3">
                <ul class="list-group">
                    <li class="list-group-item" :class="{active:pageName === 'favorite'}"
                        @click="changePage('favorite')">
                        مورد علاقه
                    </li>
                    <li class="list-group-item"
                        :class="{active:pageName === 'profile'}"
                        @click="changePage('profile')">اطلاعات حساب
                    </li>
                    <li class="list-group-item"
                        :class="{active:pageName === 'addNews'}"
                        @click="changePage('addNews')">افزودن خبر
                    </li>
                </ul>
            </div>

            <div class="col-sm-8 col-md-8 col-lg-9 mt-sm">
                <transition name="fade" mode="out-in">
                    <Favorite v-if="pageName === 'favorite'"/>
                    <ChangeProfile v-if="pageName === 'profile'"/>
                    <AddNews v-if="pageName ==='addNews'"/>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import ChangeProfile from "./ChangeProfile";
    import Favorite from "./Favorite";
    import VueJwtDecode from "vue-jwt-decode";
    import AddNews from "./AddNews";

    export default {
        name: "Profile",
        components: {
            AddNews,
            Favorite,
            ChangeProfile
        },
        data() {
            return {
                pageName: "favorite",
            }
        },
        methods: {
            changePage(page) {
                this.pageName = page;
            }
        }, created() {
            // let token = localStorage.getItem("jwt");
            // this.user = VueJwtDecode.decode(token);
            // console.log(this.user);
            // this.$http("user/me", {
            //     headers: {
            //         'Authorization': `Bearer ${token}`
            //     }
            // }).then((res) => {
            //     this.user = res.data
            // })

        }
    }
</script>

<style scoped>

    @media (max-width: 575px) {
        .mt-sm {
            margin-top: 3rem !important;
        }
    }

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