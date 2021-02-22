<template>
    <div id="Navbar">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item dropdown" v-if="isAuthenticated">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                           @click="open()">
                            {{user.name}}
                        </a>
                        <div class="dropdown-menu text-center" v-show="isOpen">
                            <button class="dropdown-item" @click="goToProfile()">Profile</button>
                            <div class="dropdown-divider"></div>
                            <button class="dropdown-item" @click="logOut()">Logout!</button>
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
                isAuthenticated: false
            }
        },
        methods: {
            open() {
                console.log(this.isOpen)
                this.isOpen = !this.isOpen;
            },
            logOut() {
                localStorage.removeItem("jwt");
                this.$router.push({name: "Login"});
            },
            goToProfile() {
                if (localStorage.getItem("jwt")) {
                    this.$router.push({name: "Profile"})
                }
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

</style>