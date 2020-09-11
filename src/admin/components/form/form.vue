<template>
  <div class="form-component">
    <form class="form">
      <card title="Добавление работы">
        <div class="form-container" slot="content">
          <div class="form-cols">
            <div class="form-col">
              <label
                  :style="{backgroundImage: `url(${newWork.preview})`}"
                  :class="[ 'uploader', {active: newWork.preview}, {
                  hovered: hovered
                }]"
                  @dragover="handleDragOver"
                  @dragleave="hovered = false"
                  @drop="handleChange"
              >
                <div class="uploader-title">Перетащите или загрузите картинку</div>
                <div class="uploader-btn">
                  <app-button typeAttr="file" title="Загрузить" @change="handleChange"></app-button>
                </div>
              </label>
            </div>
            <div class="form-col">
              <div class="form-row">
                <app-input v-model="newWork.title" title="Название"
                           :errorMessage="validation.firstError('newWork.title')"/>
              </div>
              <div class="form-row">
                <app-input v-model="newWork.link" title="Ссылка" :errorMessage="validation.firstError('newWork.link')"/>
              </div>
              <div class="form-row">
                <app-input v-model="newWork.description" field-type="textarea" title="Описание"
                           :errorMessage="validation.firstError('newWork.description')"/>
              </div>
              <div class="form-row">
                <tags-adder v-model="newWork.techs" :errorMessage="validation.firstError('newWork.techs')"
                            :currentTags="newWork.techs"/>
              </div>
            </div>
          </div>
          <div class="form-btns">
            <div class="btn">
              <app-button title="Отмена" @click="clearform" plain typetoshow="reset"></app-button>
            </div>
            <div class="btn">
              <app-button title="Сохранить" @click="handleSubmit"></app-button>
            </div>
          </div>
        </div>
      </card>
    </form>
  </div>
</template>

<script>
import card from "../card";
import appButton from "../button";
import appInput from "../input";
import tagsAdder from "../tagsAdder";
import {mapActions, mapState} from "vuex";
import {Validator, mixin as ValidatorMixin} from "simple-vue-validator";

export default {
  mixins: [ValidatorMixin],
  components: {card, appButton, appInput, tagsAdder},
  data() {
    return {
      hovered: false,
      newWork: {
        title: "",
        link: "",
        description: "",
        techs: "",
        photo: {},
        preview: "",
        id: 0
      },
    };
  },
  validators: {
    "newWork.title": (value) => {
      return Validator.value(value).required("Заполните название работы");
    },
    "newWork.link": (value) => {
      return Validator.value(value).required("Заполните ссылку на работу");
    },
    "newWork.description": (value) => {
      return Validator.value(value).required("Заполните описание работы");
    },
    "newWork.techs": (value) => {
      return Validator.value(value).required("Заполните тэги");
    }
  },

  computed: {
    ...mapState("works", {
      currentWork: state => state.currentWork
    })
  },

  watch: {
    currentWork(newValue, oldValue) {
      this.newWork.title = newValue.title;
      this.newWork.link = newValue.link;
      this.newWork.description = newValue.description;
      this.newWork.techs = newValue.techs;
      this.newWork.photo = newValue.photo;
      this.newWork.preview = "https://webdev-api.loftschool.com/" + newValue.photo;
      this.newWork.id = newValue.id;
      window.scrollTo(0, 0);
    },
  },

  methods: {
    ...mapActions({
      addNewWork: "works/add",
      editNewWork: "works/editwork",
      fetchWorks: "works/fetch"
    }),
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async handleSubmit() {
      if ((await this.$validate()) === false) return;
      if (this.newWork.id === 0)
      { await this.addNewWork(this.newWork); }
      else {
        await this.editNewWork(this.newWork);
        await this.fetchWorks();
      }

      this.hovered = false;
      this.newWork.title = "";
      this.newWork.link = "";
      this.newWork.description = "";
      this.newWork.techs = "";
      this.newWork.photo = {};
      this.validation.reset();
    },

    clearform() {
      this.newWork.techs = "";
    },

    handleChange(event) {
      event.preventDefault();
      const file = event.dataTransfer
          ? event.dataTransfer.files[0]
          : event.target.files[0];
      this.newWork.photo = file;
      this.renderPhoto(file);
      this.hovered = false;
    },

    renderPhoto(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.newWork.preview = reader.result;
      };
    },
  },
};
</script>

<style src="./form.pcss" lang="postcss" scoped></style>
