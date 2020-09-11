<template>
  <card simple>
    <div class="works-wrapper">
      <div class="header">
        <div class="authorgroup">
          <div class="avatar">
            <img class="image" :src="cover"/>
          </div>
          <div class="textname">
            <div class="author">{{ review.author }}</div>
            <div class="occ">{{ review.occ }}</div>
          </div>
        </div>
      </div>

      <div class="data">
        <div class="text">
          <p>{{ review.text }}</p>
        </div>
        <div class="btns">
          <icon symbol="pencil" title="Править" @click="edreview"></icon>
          <icon symbol="trash" title="Удалить" @click="delreview"></icon>
        </div>
      </div>
    </div>
  </card>
</template>

<script>
import card from "../card";
import icon from "../icon";
import tagsList from "../tagsList";
import {mapActions} from "vuex";

export default {
  components: {card, icon, tagsList},
  props: {
    review: Object,
  },
  methods: {
    ...mapActions({
      deletereview: "reviews/delete",
      fetchReviews: "reviews/fetch",
      editreview: "reviews/edit",
    }),

    async delreview(review) {
      await this.deletereview(this.review.id);
      await this.fetchReviews();
    },

    async edreview(review) {
      await this.editreview(this.review);
    }

  },
  computed: {
    cover() {
      return `https://webdev-api.loftschool.com/${this.review.photo}`
    }
  },
};
</script>

<style scoped lang="postcss" src="./reviewCard.pcss"></style>
