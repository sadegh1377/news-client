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
        name: "Login",
        path: "/login",
        component: Login
    },
    {
        name: "SignUp",
        path: "/sign-up",
        component: SignUp
    },
    {
        name: "Home",
        path: "/",
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: "Profile",
        path: "/profile",
        component: Profile,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: "FullNews",
        path: "/news/:id",
        component: FullNews,
        meta: {
            requiresAuth: true
        }
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    if (to.matched.some(rec => rec.meta.requiresAuth)) {
        if (localStorage.getItem("jwt")) {
            next();
        } else {
            next({
                name: "Login"
            })
        }
    } else {
        next();
    }
})

export default router
