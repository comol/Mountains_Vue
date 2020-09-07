<template>
    <card slim>
        <edit-line slot="title" @lineedited="onLineEdited" v-model="categoryTitle" :editModeByDefault="empty"
                   @remove="$emit('remove', $event)"
                   @approve="$emit('approve', $event)"
        />
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

    export default {
        components: {
            card, editLine, skill, skillAddLine
        },
      props: {
        empty: Boolean,
        title: {
          type: String,
        },
        id: {
          type: Number,
          default: 0
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
             let skill = {
               id: this.skills.length,
               title: data.title,
               percent: data.percent
             };
            this.$emit("create-skill", skill);
          },

        onLineEdited() {
            this.$emit("onLineEdited", {title: this.categoryTitle, id: this.id});
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
            this.$emit("edit-skill", skillinfo);
        },

        onRemove(skillid) {
           let skillarray = this.skills;
           let skilltoremove;
           skillarray.forEach(function (currentskill) {
             if (currentskill.id === skillid)
             {
               let index = skillarray.indexOf(currentskill);
               skillarray.splice(index, 1);
               skilltoremove = currentskill;
             }
           });
          this.$emit("remove-skill", skilltoremove);
          this.skills = skillarray;
        }
      }
    }
</script>

<style lang="postcss" scoped src="./category.pcss"></style>
