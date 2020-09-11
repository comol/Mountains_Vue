import skill from "../../components/skill";
import {mapActions} from "vuex";



export default {

    namespaced: true,
    state: {
        data: []
    },

    mutations: {
        SET_CATEGORIES: (state, categories) => (state.data = categories),
        ADD_CATEGORY: (state, category) => state.data.unshift(category),
        ADD_SKILL: (state, newSkill) => {
            state.data = state.data.map(category => {
                if (category.id === newSkill.category) {
                    category.skills.push(newSkill);
                }
                return category;
            })
        },
        REMOVE_SKILL: (state, skillToRemove) => {
            state.data = state.data.map(category => {
                if (category.id === skillToRemove.category) {
                    category.skills = category.skills.filter(skill =>skill.id !== skillToRemove.id)
                }
                return category;
            })
        },
        EDIT_SKILL: (state, skillToEdit) => {
            const editSkillCategory = category => {
                category.skills = category.skills.map(skill => {
                    return skill.id === skillToEdit.id ? skillToEdit : skill;
                })
            }
            const findCategory = category => {
                if (category.id === skillToEdit.category) {
                    editSkillCategory(category);
                }
                return category;
            }
            state.data = state.data.map(findCategory)
        }
    },
    actions: {
        ...mapActions({
            loginAction: "login/login"
        }),
        async create({commit}, objcategory) {
            try {

                let data = {};
                if (objcategory.id === 0) {
                    data = await this.$axios.post("/categories", {title: objcategory.title});
                }
                else {
                    data = await this.$axios.post("/categories/" + objcategory.id, {title: objcategory.title});
                };
                commit("ADD_CATEGORY", data);
            } catch (error) {
                throw new Error("Произошла ошибка");
            }
        },
        async delete({commit}, categoryid)  {
            try {
                    data = await this.$axios.delete("/categories/" + categoryid);

            } catch (error) {
                throw new Error("Произошла ошибка");
            }
        },
        async fetch({commit}) {
            try {
                const userdata = await this.$axios.get("/user");
                const userid = userdata.data.user.id;
                const {data} = await this.$axios.get("/categories/" + userid);
                commit("SET_CATEGORIES", data);
            } catch (error) {
                if (error.response.status === 401) {
                    delete localStorage.token;
                    await this.loginAction();
                }
                throw new Error("Произошла ошибка");
            }
        },
    }
}
