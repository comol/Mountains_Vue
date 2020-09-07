<template>
  <card simple>
    <div class="works-wrapper">
      <div class="pic">
        <img class="image" :src="cover"/>
        <div class="tag">
          <tags-list :tags="review.techs"/>
        </div>
      </div>
      <div class="data">
        <div class="title">{{review.title}}</div>
        <div class="text">
          <p>{{review.description}}</p>
        </div>
        <a :href="review.link" class="link">{{review.link}}</a>
        <div class="btns">
          <icon symbol="pencil" title="Править"></icon>
          <icon symbol="trash" title="Удалить"></icon>
        </div>
      </div>
    </div>
  </card>
</template>

<script>
import card from "../card";
import icon from "../icon";
import tagsList from "../tagsList";
export default {
  components: { card, icon, tagsList },
  props: {
    review: Object,
  },
  computed: {
    cover() {
      return `http://home.filippovoleg.ru:9000/${this.review.photo}`
    }
  },
};
</script>

<style scoped lang="postcss" src="./reviewCard.pcss"></style>
