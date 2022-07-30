<template>
  <div class="get" id="users">
    <h2 class="title">Working with GET request</h2>
    <h2 v-if="errorStatus" class="err" v>
      Failed to fetch data. Try again later.
    </h2>
    <div class="cards">
      <div class="cards_item" v-for="user in allResults" :key="user.id">
        <img
          class="cards_item_img"
          :src="user.photo"
          :alt="user.name + ' photo'"
        />
        <p class="cards_item_name">
          {{ user.name }}
        </p>
        <p class="cards_item_position">{{ user.position }}</p>
        <a :href="`mailto: ${user.email}`" class="cards_item_mail">{{
          user.email
        }}</a>
        <p class="cards_item_phone">{{ user.phone }}</p>
      </div>
    </div>
    <a v-if="hideBtn" href="#" class="btn btn--long" @click.prevent="addUsers"
      >Show more</a
    >
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['allResults', 'hideBtn', 'errorStatus']),
  },
  mounted() {
    this.$store.dispatch('loadData')
  },
  methods: {
    addUsers() {
      this.$store.dispatch('addUsers')
    },
  },
}
</script>
