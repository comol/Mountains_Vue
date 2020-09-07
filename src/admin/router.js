import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import header from "./components/header";
import about from "./pages/about";
import login from "./pages/login";


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
            default: about,
            header: header
        },
        beforeEnter: requireAuth
    },
    {
        path: "/about",
        components: {
            default: about,
            header: header
        },
        beforeEnter: requireAuth
    },
    {
        path: "/login",
        components: {
            default: login,
            header: header
        }
    },
];

export default new VueRouter({routes});
