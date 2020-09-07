export default {
    namespaced: true,
    state: {
        data: [],
    },
    mutations: {
        ADD_REVIEW(state, newReview) {
            state.data.push(newReview);
        },
        SET_REVIEWS(state, reviews) {
            state.data = reviews
        }
    },
    actions: {
        async add({ commit }, newReview) {
            const formData = new FormData();

            Object.keys(newReview).forEach(item => {
                formData.append(item, newReview[item]);
            })

            try {
                const { data } = await this.$axios.post("/reviews", formData);
                commit("ADD_REVIEW", data);
            } catch (error) {
                console.log("error");
            }
        },

        async fetch({commit}) {
            try {
                const { data } = await this.$axios.get("/reviews/382");
                commit("SET_REVIEWS", data);
            } catch (error) {
                console.log("error");
            }
        }
    },
};
