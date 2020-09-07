<template>
    <div class="headline-component">
        <div class="container header-container">
           <slot />
            <div class="title">{{title}}</div>
            <div class="buttons">
                <button type="button" class="btn" @click="exitapp">Выйти</button>
            </div>
        </div>
    </div>
</template>

<script>

    import {logout} from "../../pages/login";
    import {mapActions} from "vuex";

    export default {
       props: {
           title: {
               type: String,
               default: "Панель администрирования"
           }
       },
      methods: {
        ...mapActions({
          loginAction: "login/login"
        }),
         exitapp() {
           logout();
           this.loginAction();
           this.$router.replace("/login");
         },

      }
    }
</script>

<style lang="postcss" scoped src="./headline.pcss">

</style>
