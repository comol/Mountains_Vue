<template>
    <div :class="[ 'skill-add-line-component', {blocked: blocked} ]" >
        <div class="title">
            <app-input v-model="textvalue" placeholder="Новый навык" ref="skill"/>
        </div>
        <div class="percent">
            <app-input v-model="percent" type="number" min="0" max="100" maxlength="3" ref="percent"/>
        </div>
        <div class="button">
            <round-button type="round" @click="addSkill"/>
        </div>
    </div>
</template>

<script>

    import input from "../input";
    import button from "../button";

    export default {
      data() {
          return {
          textvalue: "",
          percent: 0
        }

      },
      props: {
        blocked: Boolean
      },
      components: {
        appInput: input,
        roundButton: button,
      },
      methods: {
        addSkill()
        {
          if (this.textvalue.trim().length === 0)
          {
            this.$refs.skill.errorMessage = "Не заполнено поле";
          }
          else if (this.percent > 100 || this.percent < 0 || this.percent === 0 )
          {
            this.$refs.percent.errorMessage = "Неправильное значение процента";
          }
          else
          {
            this.$emit("addSkill", {title: this.textvalue, percent: this.percent});
            this.textvalue = "";
          }
        }
      }
    }
</script>

<style scoped src="./skillAddLine.pcss">

</style>
