export default {
    namespaced: true,
    state: {
        data: [],
        currentWork: {}
    },
    mutations: {
        ADD_WORK(state, newWork) {
            state.data.push(newWork);
        },
        SET_WORKS(state, works) {
            state.data = works;
        },
        EDIT_WORK(state, work) {
            state.currentWork = work;
        }
    },
    actions: {
        async add({ commit }, newWork) {
            const formData = new FormData();

            Object.keys(newWork).forEach(item => {
                formData.append(item, newWork[item]);
            })

            try {
                const { data } = await this.$axios.post("/works", formData);
                commit("ADD_WORK", data);
            } catch (error) {
                console.log("error");
            }
        },

        async fetch({commit}) {
            try {
                const userdata = await this.$axios.get("/user");
                const userid = userdata.data.user.id;
                const { data } = await this.$axios.get("/works/" + userid);
                commit("SET_WORKS", data);
            } catch (error) {
                console.log("error");
            }
        },

        async delete({commit}, workid) {
            try {
                const { data } = await this.$axios.delete("/works/" + workid);
            } catch (error) {
                console.log("error");
            }
        },

        async edit({ commit }, newWork) {
            commit("EDIT_WORK", newWork);
        },

        async editwork({ commit }, newWork) {
            const formData = new FormData();

            Object.keys(newWork).forEach(item => {
                formData.append(item, newWork[item]);
            })

            try {
                const { data } = await this.$axios.post("/works/" + newWork.id, formData);
            } catch (error) {
                console.log("error");
            }
        },
    },
};
