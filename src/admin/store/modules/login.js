export default {
    namespaced: true,
    state: {
        isLoggedIn: false
    },
    mutations: {
        SET_LOGIN: (state, loggedIn) => {
            state.isLoggedIn = loggedIn;
        }
    },
    actions: {
        login({commit}) {
            if (!localStorage.token) {
                commit("SET_LOGIN", false);
            }
            else {
                commit("SET_LOGIN", true);
            }
        }
    }
}
