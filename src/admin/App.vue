<template>
  <div class="bg-container" v-bind:class="{ loggedOut: !loggedIn }">
    <div class="app-container" v-bind:class="{ loggedOut: !loggedIn }">
      <router-view name="header" v-if="loggedIn"/>
      <router-view/>
      <div :class="['notify-container', {active: isTooltipShown}]">
        <div class="notification">
          <notification
              :text="tooltipText"
              :type="tooltipType"
              @click="hideTooltip"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
@import "./app.pcss";
@import "./normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";
@import '../styles/blocks/*.pcss';
</style>
<script>
import notification from "./components/notification/notification";
import {mapState, mapActions} from "vuex";
import {loggedIn} from "./pages/login";


export default {
  components: {notification},
  methods: {
    ...mapActions({
      hideTooltip: "tooltips/hide"
    })
  },

  created() {
    //this.isTooltipShown = false;
  },

  computed: {
    ...mapState("tooltips", {
      isTooltipShown: state => state.isShown,
      tooltipText: state => state.text,
      tooltipType: state => state.type,
    }),
    ...mapState("login", {
      loggedIn: state => {
           //this.$router.replace("/login");
         return state.isLoggedIn;
        }
    })
  }
}
</script>
