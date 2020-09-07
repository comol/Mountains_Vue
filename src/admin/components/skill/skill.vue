<template>
  <div class="skill-component" v-if="editmode === false">
      <div class="title">{{skill.title}}</div>
      <div class="buttons-value">
        <div class="percent">{{skill.percent}}    %</div>
        <div class="buttons">
          <icon symbol = "pencil" class="btn btn--pencil" @click="editmode = true" grayscale/>
          <icon symbol = "trash" class="btn" @click="$emit('remove', skill.id)" grayscale/>
        </div>
      </div>
  </div>

    <div class="skill-component" v-else>
        <div class="title">
            <app-input noSidePaddings v-model="currentSkill.title" ref="skill"/>
        </div>
        <div class="percent">
          <app-input v-model="currentSkill.percent" type="number" min="0" max="100" maxlength="3" ref="percent"/>  <div class="percentsign">%</div>
        </div>

        <div class="buttons">
            <icon symbol = "tick" class="btn" @click="onChange"/>
            <icon symbol = "cross" class="btn" @click="editmode = false"/>
        </div>
    </div>
</template>

<script>
    import input from "../input";
    import icon from "../icon";

    export default {
        props: {
          skill: {
              type: Object,
              default: () => {

              },
              required: true
          }
        },
        data() {
            return {
                editmode: false,
                currentSkill: {
                    id: 0,
                    title: this.skill.title,
                    percent: this.skill.percent
                }
            }
        },
        components: {
            icon,
            appInput: input
        },
        methods: {
          onChange() {
            if (this.currentSkill.title.trim().length === 0)
            {
              this.$refs.skill.errorMessage = "Не заполнено поле";
            }
            else if (this.currentSkill.percent > 100 || this.currentSkill.percent  < 0 || this.currentSkill.percent  === 0 )
            {
              this.$refs.percent.errorMessage = "Неправильное значение процента";
            }
            else {
              this.$emit('approve', this.currentSkill);
              this.editmode = false;
            }
          }
        }
    }
</script>

<style lang="postcss" scoped src="./skill.pcss"></style>
