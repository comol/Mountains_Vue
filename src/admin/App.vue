<template>
    <div class="app-container">
        <headline title="Панель администрирования">
            <user/>
        </headline>
        <navigation/>
        <div class="page-content">
            <div class="container">
                <div class="page-header">
                    <div class="block-title">Блок "Обо мне"</div>
                    <iconed-button type="iconed" @click="emptyCatIsShown = true" title="Добавить группу" v-if="emptyCatIsShown === false"/>
                </div>
                <ul class="skills" v-if="empty===false">
                    <li class="item" v-if="emptyCatIsShown">
                      <category
                          @remove="emptyCatIsShown = false"
                          @onLineEdited = "oncategoryEdited"
                          empty/>
                    </li>
                    <li class="item" v-for="category in categories" :key="category.id">
                        <category :title="category.category" :skills="category.skills"/>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import headline from "./components/headline";
    import user from "./components/user";
    import navigation from "./components/navigation";
    import button from "./components/button";
    import category from "./components/category";

    export default {
        components: {
            headline,
            user,
            navigation,
            iconedButton: button,
            category
        },
      data() {
          return {
            categories: [],
            emptyCatIsShown: false
          }
      },
      created() {
        this.categories = require("../data/categoriesskills.json")
      },
      props: {
            empty: Boolean,
            skills: {
              type: Array,
              default: () => []
            }
        },
      methods: {
        oncategoryEdited(categorytext) {
          var needtoAdd = true;
          this.categories.forEach(function (category)  {
            if (categorytext.trim() === category.category.trim())
            {
              needtoAdd = false;
            }
          });
          if (needtoAdd)
          {
            let newcat = {
              category: categorytext,
              id: categorytext,
              skills: []
            }
            this.categories.push(newcat);
            this.emptyCatIsShown = false;
          }
        }
      }
    };
</script>

<style lang="postcss">
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
    @import "./mixins.pcss";
    @import "./app.pcss";
    @import "./normalize.css";
    @import "../styles/mixins.pcss";
    @import "../styles/layout/base.pcss";
    @import '../styles/blocks/*.pcss';
</style>
