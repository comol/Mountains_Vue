<template>
  <div class="works-page-component page-component">
    <div class="page-content">
      <div class="container">
        <div class="page-header">
          <div class="page-title">
            Блок "Отзывы"
          </div>
        </div>
        <div class="form">
          <review-form />
        </div>
        <ul class="cards">
          <li class="item" v-for="review in reviews" :key="review.id">
            <review-card
                :review="review"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import reviewForm from "../../components/reviewform";
import { mapState, mapActions } from "vuex";
import reviewCard from "../../components/reviewCard";
export default {
  components: {reviewCard, reviewForm },
  computed: {
    ...mapState("reviews", {
      reviews: (state) => state.data,
    }),
  },
  methods: {
    ...mapActions({
      fetchReviews: "reviews/fetch"
    }),
  },
  mounted() {
    this.fetchReviews();
  }
};
</script>

<style scoped lang="postcss" src="./reviews.pcss"></style>
