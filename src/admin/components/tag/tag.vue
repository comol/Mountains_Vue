<template>
  <div :class="['tag', {interactive:interactive}]">
    <span>{{title}}</span>
    <button v-on="$listeners" v-if="interactive" class="remove" type="button"></button>
  </div>
</template>

<script>
import icon from "../icon"
import Button from "../button/button";
export default {

  components: {Button, icon},
  props: {
    title: {
      type: String,
      default: ""
    }
  }
}
</script>

<style lang="postcss" scoped src="./tag.pcss"></style>
