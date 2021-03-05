<template>
    <div id="Navbar">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="https://github.com/sadegh1377" target="_blank">Sadegh News</a>
            <button class="navbar-toggler" type="button" @click="showNav()">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse  navbar-collapse" id="navbarSupportedContent"
                 :class="{show:isShown===true,'text-left':isShown===true}">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active" v-if="isAuthenticated">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item dropdown" v-if="isAuthenticated">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                           @click="open()">
                            {{user.name}}
                        </a>
                        <div class="dropdown-menu " v-show="isOpen">
                            <button class="dropdown-item" @click="goToProfile()" @blur="close()">Profile</button>
                            <div class="dropdown-divider"></div>
                            <button class="dropdown-item" @click="logOut()" @blur="close()">Logout</button>
                        </div>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    </div>
</template>

<script>
    import VueJwtDecode from "vue-jwt-decode";

    export default {
        name: "Navbar",
        data() {
            return {
                user: null,
                isOpen: false,
                isAuthenticated: false,
                isShown: false
            }
        },
        methods: {
            open() {
                this.isOpen = !this.isOpen;
            },
            close() {
                this.isOpen = false;
            },
            logOut() {
                localStorage.removeItem("jwt");
                this.$router.push({name: "Login"});
                location.reload();
            },
            goToProfile() {
                if (localStorage.getItem("jwt")) {
                    this.$router.push({name: "Profile"})
                }
            },
            showNav() {
                console.log(this.isShown)
                this.isShown = !this.isShown;
            }
        },
        created() {
            if (localStorage.getItem("jwt")) {
                let token = localStorage.getItem("jwt");
                this.user = VueJwtDecode.decode(token)
                this.isAuthenticated = true
            } else {
                this.isAuthenticated = false
            }
        }
    }
</script>

<style scoped>
    .dropdown-menu {
        display: block;
    }

    .display {
        display: block;
        z-index: 10000;
    }

</style>