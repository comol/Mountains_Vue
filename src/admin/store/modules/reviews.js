export default {
    namespaced: true,
    state: {
        data: [],
        currentReview: {}
    },
    mutations: {
        ADD_REVIEW(state, newReview) {
            state.data.push(newReview);
        },
        SET_REVIEWS(state, reviews) {
            state.data = reviews
        },
        EDIT_REVIEW(state, review) {
            state.currentReview = review;
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
                const userdata = await this.$axios.get("/user");
                const userid = userdata.data.user.id;
                const { data } = await this.$axios.get("/reviews/" + userid);
                commit("SET_REVIEWS", data);
            } catch (error) {
                console.log("error");
            }
        },


        async delete({commit}, reviewid) {
            try {
                const { data } = await this.$axios.delete("/reviews/" + reviewid);
            } catch (error) {
                console.log("error");
            }
        },

        async edit({ commit }, newReview) {
            commit("EDIT_REVIEW", newReview);
        },

        async editreview({ commit }, newReview) {
            const formData = new FormData();

            Object.keys(newReview).forEach(item => {
                formData.append(item, newReview[item]);
            })

            try {
                const { data } = await this.$axios.post("/reviews/" + newReview.id, formData);
            } catch (error) {
                console.log("error");
            }
        },
    },
};
