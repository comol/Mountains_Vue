<template>
  <div class="about-page-component">

    <div class="page-content">
      <div class="container" v-if="categories.length || emptyCatIsShown === false">
        <div class="page-header">
          <div class="block-title">Блок "Обо мне"</div>
          <iconed-button type="iconed" @click="addCategoryButton" title="Добавить группу"
                         v-if="emptyCatIsShown === false && categories.length > 0"/>
        </div>
        <ul class="skills" v-if="empty===false">
          <li class="item" v-if="emptyCatIsShown || categories.length === 0">
            <category
                @remove="emptyCatIsShown = false"
                @onLineEdited="oncategoryEdited"
                empty/>
          </li>
          <li class="item" v-for="category in categories" :key="category.id">
            <category :title="category.category" :skills="category.skills" :id="category.id"
                      @create-skill="createSkill($event, category.id)"
                      @edit-skill="editSkill"
                      @remove-skill="removeSkill"
                      @onLineEdited="oncategoryEdited" />
          </li>
        </ul>
      </div>

      <div class="container" v-else>
        loading...
      </div>

    </div>
  </div>
</template>

<script>

import button from "../../components/button";
import category from "../../components/category";
import { mapActions, mapState } from "vuex";

export default {
  components: {
     iconedButton: button,
    category
  },
  data() {
    return {
      //categories: [],
      emptyCatIsShown: false
    }
  },
  computed: {
    ...mapState("categories", {
      categories: state => state.data
    })
  },
  created() {
    this.fetchCategoryAction();
    if ( this.categories.length === 0)
    {
      this.emptyCatIsShown = false;
    }
  },
  props: {
    empty: Boolean,
    skills: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    ...mapActions({
      createCategoryAction: "categories/create",
      fetchCategoryAction: "categories/fetch",
      addSkillAction: "skills/add",
      editSkillAction: "skills/edit",
      removeSkillAction: "skills/remove",
    }),
    addCategoryButton() {
      if (this.categories.length > 0) {
        this.emptyCatIsShown = true;
      }
    },
    async createSkill(skill, categoryId) {
      const newSkill = {
        ...skill,
        category: categoryId
      }
      await this.addSkillAction(newSkill);
    },
    async removeSkill(skill) {
      await this.removeSkillAction(skill);
    },
    async editSkill(skill) {
      await this.editSkillAction(skill);
    },

    oncategoryEdited(categoryobj) {
        this.emptyCatIsShown = false;
        this.createCategory(categoryobj);
    },
    async createCategory(categoryobj) {
      try {
        await this.createCategoryAction(categoryobj);
        await this.fetchCategoryAction();
      } catch (error) {
         console.log(error.message);
      }
    }
  }
};
</script>

<style src="./about.pcss" scoped></style>
