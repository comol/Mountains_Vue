<template>
    <nav class="navigation-component">
        <div class="container">
            <ul class="list">
                <li class="item item__navigation" v-for="link in links" :key="link.id" :class="['item', {active: link.active}]">
                    <a :href="link.alias" class="link">{{link.title}}</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>

    export default {
        props: {
          skills: {
            type: Array,
            default: () => []
          }
        },
        data() {
            return {
                links: [{id: 0, title: "Обо мне", alias: "", active: true},
                  {id: 1, title: "Работы", alias: "admin#/works", active: false},
                  {id: 2, title: "Отзывы", alias: "admin#/reviews", active: false},]
            }
        }
    }
</script>

<style lang="postcss" scoped src="./navigation.pcss"></style>
