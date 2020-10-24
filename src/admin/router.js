import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import axios from "axios";

Vue.use(VueRouter);

// import header from "./components/header";
// import about from "./pages/about";
// import works from "./pages/works";
// import login from "./pages/login";

function loggedIn () {
    return !!localStorage.token
}

export function requireAuth (to, from, next) {
    if (!loggedIn()) {
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    } else {
        next()
    }
}

const routes = [
    {
        path: "/",
        components: {
            default: () => import("./pages/about"),
            header: () => import("./components/header")
        },
        beforeEnter: requireAuth
    },
    {
        path: "/works",
        components: {
            default: () => import("./pages/works"),
            header: () => import("./components/header")
        },
        beforeEnter: requireAuth
    },
    {
        path: "/reviews",
        components: {
            default: () => import("./pages/reviews"),
            header: () => import("./components/header")
        },
        beforeEnter: requireAuth
    },
    {
        path: "/login",
        component: () => import("./pages/login"),
        meta: {
            public: true
        }
    },
];

const router = new VueRouter({ base: '/mountains/admin/', routes });

const guard = axios.create({
    baseURL: "http://filippovoleg.ru/mountains"
});

router.beforeEach(async (to, from, next) => {
    const isPublicRoute = to.matched.some(route => route.meta.public);
    const isUserLoggedIn = store.getters["user/userIsLoggedIn"];

    next();
    return;

    if (isPublicRoute === false && isUserLoggedIn === false) {
        const token = localStorage.getItem("token");

        guard.defaults.headers["Authorization"] = `Bearer ${token}`;

        try {
            const response = await guard.get("/user");
            store.dispatch("user/login", await response.data.user)
            next();
        } catch (error) {
            router.replace("/login");
            localStorage.removeItem("token");
        }
    } else {
        next();
    }
});

export default router;
