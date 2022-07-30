<template>
  <TheHeader />
  <div class="content">
    <TheAbout />
    <TheGet />
    <ThePost />
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheAbout from './components/TheAbout.vue'
import TheGet from './components/TheGet.vue'

import ThePost from './components/ThePost.vue'

export default {
  components: {
    TheHeader,
    TheAbout,
    TheGet,
    ThePost,
  },
}
</script>
