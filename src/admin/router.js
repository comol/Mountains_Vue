import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import axios from "axios";

Vue.use(VueRouter);

 import header from "./components/header";
 import about from "./pages/about";
 import works from "./pages/works";
 import login from "./pages/login";

const routes = [
    {
        path: "/",
        components: {
            default: () => import("./pages/about"),
            header: () => import("./components/header")
        },
    },
    {
        path: "/works",
        components: {
            default: () => import("./pages/works"),
            header: () => import("./components/header")
        },
    },
    {
        path: "/login",
        component: () => import("./pages/login"),
        meta: {
            public: true
        }
    },
];

const router = new VueRouter({ routes });

const guard = axios.create({
    baseURL: "https://webdev-api.loftschool.com"
});

router.beforeEach(async (to, from, next) => {
    const isPublicRoute = to.matched.some(route => route.meta.public);
    const isUserLoggedIn = store.getters["user/userIsLoggedIn"];

    next();

});

export default router;
