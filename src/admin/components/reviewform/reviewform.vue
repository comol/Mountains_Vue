<template>
  <div class="form-component">
    <form class="form">
      <card title="Новый отзыв">
        <div class="form-container" slot="content">
          <div class="form-cols">
            <div class="form-col form-col--image">
              <div class="form-row">
                <label
                    :style="{background: `url(${newReview.preview}) center center / contain no-repeat`}"
                    :class="[ 'uploader', {active: newReview.preview}, {
                  hovered: hovered
                }]"
                    @dragover="handleDragOver"
                    @dragleave="hovered = false"
                    @drop="handleChange"
                >

                </label>

                </div>
              <div class="form-row">
                <div class="uploader-btn">
                  <app-button typeAttr="file" title="Добавить фото" @change="handleChange"></app-button>
                </div>

              </div>

            </div>
            <div class="form-col form-col--content">
              <div class="form-row-int">
                <div class="form-col-int">
                  <app-input v-model="newReview.author" title="Имя автора"
                             :errorMessage="validation.firstError('newReview.author')"/>
                </div>
                <div class="form-col-int">
                  <app-input v-model="newReview.occ" title="Титул автора"
                             :errorMessage="validation.firstError('newReview.occ')"/>
                </div>
              </div>

              <div class="form-row form-row-textarea">
                <div class="int-textarea">
                <app-input v-model="newReview.text" field-type="textarea" title="Отзыв"
                           :errorMessage="validation.firstError('newReview.text')"/>
                </div>
              </div>
            </div>
          </div>
          <div class="form-btns">
            <div class="btn">
              <app-button title="Отмена" plain typetoshow="reset"></app-button>
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
  validators: {
    "newReview.author": (value) => {
      return Validator.value(value).required("Заполните имя автора");
    },
    "newReview.occ": (value) => {
      return Validator.value(value).required("Заполните титул автора");
    },
    "newReview.text": (value) => {
      return Validator.value(value).required("Заполните текст отзыва");
    }
  },
  components: {card, appButton, appInput, tagsAdder},
  data() {
    return {
      hovered: false,
      newReview: {
        author: "",
        text: "",
        occ: "",
        photo: {},
        preview: "user.png",
        id: 0,
      },
    };
  },

  computed: {
    ...mapState("reviews", {
      currentReview: state => state.currentReview
    })
  },

  watch: {
    currentReview(newValue, oldValue) {
      console.log("changed");
      this.newReview.author = newValue.author;
      this.newReview.text = newValue.text;
      this.newReview.occ = newValue.occ;
      this.newReview.photo = newValue.photo;
      this.newReview.preview = "https://webdev-api.loftschool.com/" + newValue.photo;
      this.newReview.id = newValue.id;
      window.scrollTo(0, 0);
    },
  },

  methods: {
    ...mapActions({
      addNewReview: "reviews/add",
      editNewReview: "reviews/editreview",
      fetchReviews: "reviews/fetch"
    }),

    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async handleSubmit() {
      if ((await this.$validate()) === false) return;

      if (this.newReview.id === 0)
      { await this.addNewReview(this.newReview); }
      else {
        await this.editNewReview(this.newReview);
        await this.fetchReviews();
      }

      this.hovered = false;
      this.newReview.author = "";
      this.newReview.text = "";
      this.newReview.occ = "";
      this.newReview.preview = "user.png";
      this.newReview.photo = {};
      this.validation.reset()
    },

    handleChange(event) {
      event.preventDefault();
      const file = event.dataTransfer
          ? event.dataTransfer.files[0]
          : event.target.files[0];
      this.newReview.photo = file;
      this.renderPhoto(file);
      this.hovered = false;
    },
    renderPhoto(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.newReview.preview = reader.result;
      };
    },
  },
};
</script>

<style src="./reviewform.pcss" lang="postcss" scoped></style>
