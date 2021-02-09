import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/authentication/Login";
import SignUp from "../components/authentication/SignUp";
import Profile from "../components/profile/Profile";
import Home from "../views/Home";
import FullNews from "../components/HomePage/FullNews";

Vue.use(VueRouter)

const routes = [
    {
        name: "login",
        path: "/",
        component: Login
    },
    {
        name: "SignUp",
        path: "/sign-up",
        component: SignUp
    },
    {
        name: "Home",
        path: "/home",
        component: Home
    },
    {
        name: "Profile",
        path: "/profile",
        component: Profile
    },
    {
        name: "FullNews",
        path: "/news/:id",
        component: FullNews
    }
]

const router = new VueRouter({
    routes
})

export default router
