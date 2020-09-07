export {default} from "./login.vue"

export function getToken () {
    return localStorage.token
}

export function logout () {
    delete localStorage.token
}

export function loggedIn () {
    return !localStorage.token
}
