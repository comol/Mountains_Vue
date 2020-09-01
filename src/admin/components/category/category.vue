<template>
    <card slim>
        <edit-line slot="title" @lineedited="onLineEdited" v-model="categoryTitle" :editModeByDefault="empty" @remove="$emit('remove', $event)"/>
        <template slot="content">
            <ul class="skills-category">
                <li class="category-item" v-for="skill in skills" :key="skill.id">
                    <skill :skill="skill" @remove="onRemove" @approve="onApprove" />
                </li>
            </ul>
            <div class="bottom-line">
                <skill-add-line @addSkill="onAddSkill" :blocked="empty" />
            </div>
        </template>
    </card>
</template>

<script>
    import card from "../Card";
    import editLine from "../editLine";
    import skill from "../skill";
    import skillAddLine from "../skillAddLine";

    const skills = [
        {id: 0, title: "html", percent: 80},
        {id: 1, title: "css", percent: 20},
        {id: 2, title: "Javascript", percent: 50}
    ]

    export default {
        components: {
            card, editLine, skill, skillAddLine
        },
      props: {
        empty: Boolean,
        title: {
          type: String,
        },
        skills: {
          type: Array,
          default: () => []
        }
      },
        data() {
            return {
                categoryTitle: this.title
            }
        },
      methods: {
          onAddSkill(data) {
            var skill = {
              id: this.skills.length,
              title: data.title,
              percent: data.percent
            }
            this.skills.push(skill);
          },

        onLineEdited() {
            this.$emit("onLineEdited", this.categoryTitle);
            this.empty = false;
        },

        onApprove(skillinfo) {
            this.skills.forEach(function (currentskill) {
              if (currentskill.id === skillinfo.id)
              {
                currentskill.title = skillinfo.title;
                currentskill.percent = skillinfo.percent;
              }
            });
        },

        onRemove(skillid) {

          let skillarray = this.skills;
          skillarray.forEach(function (currentskill) {
            if (currentskill.id === skillid)
            {
              let index = skillarray.indexOf(currentskill);
              skillarray.splice(index, 1);
            }
          });
          this.skills = skillarray;
        }

      }
    }
</script>

<style lang="postcss" scoped src="./category.pcss"></style>
