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
        name: "PageNotFound",
        path: "*",
        component: () => import("../components/errors/PageNotFound"),
        meta: {
            title: 'PageNotFound',
            metaTags: [
                {
                    name: 'PageNotFound',
                    content: 'صفحه یافت نشد'
                }
            ]
        }
    },
    {
        name: "Login",
        path: "/login",
        component: Login,
        meta: {
            title: 'ورور',
            metaTags: [
                {
                    name: 'Login',
                    content: 'ورود'
                }
            ]
        }
    },
    {
        name: "SignUp",
        path: "/sign-up",
        component: SignUp,
        meta: {
            title: 'ثبت نام',
            metaTags: [
                {
                    name: 'SingUp',
                    content: 'ثبت نام'
                }
            ]
        }
    },
    {
        name: "Home",
        path: "/",
        component: Home,
        meta: {
            requiresAuth: true,
            title: 'صفحه اصلی',
            metaTags: [
                {
                    name: 'Home',
                    content: 'صفحه اصلی'
                }
            ]

        }
    },
    {
        name: "Profile",
        path: "/profile",
        component: Profile,
        meta: {
            requiresAuth: true,
            title: 'حساب کاربری',
            metaTags: [
                {
                    name: 'Profile',
                    content: 'حساب کاربری'
                }
            ]
        }
    },
    {
        name: "FullNews",
        path: "/news/:news_id",
        component: FullNews,
        meta: {
            requiresAuth: true,
            title: 'خبر',
            metaTags: [
                {
                    name: 'FullNews',
                    content: 'خبر'
                }
            ]
        }
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {


    if (to.matched.some(rec => rec.meta.requiresAuth)) {
        const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

        // Find the nearest route element with meta tags.
        const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

        // If a route with a title was found, set the document (page) title to that value.
        if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

        // Remove any stale meta tags from the document using the key attribute we set below.
        Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

        // Skip rendering meta tags if there are none.
        if (!nearestWithMeta) return next();

        // Turn the meta tag definitions into actual elements in the head.
        nearestWithMeta.meta.metaTags.map(tagDef => {
            const tag = document.createElement('meta');

            Object.keys(tagDef).forEach(key => {
                tag.setAttribute(key, tagDef[key]);
            });

            // We use this to track which meta tags we create so we don't interfere with other ones.
            tag.setAttribute('data-vue-router-controlled', '');

            return tag;
        })
            // Add the meta tags to the document head.
            .forEach(tag => document.head.appendChild(tag));

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
