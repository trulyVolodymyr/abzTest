<template>
  <div id="post" class="post">
    <h2 class="title">Working with POST request</h2>
    <form class="post_form" @submit.prevent>
      <div
        class="input_wrp"
        :class="{
          invalid: this.$store.state.nameInvalid,
          touched: this.$store.state.nameTouched,
        }"
      >
        <label class="label" for="name">Your name</label>
        <input
          id="name"
          class="post_input"
          type="text"
          v-model="this.$store.state.name"
          @blur="isNameValid"
          @click="touchName"
          autocomplete="off"
        />
        <p class="name" v-if="this.$store.state.nameInvalid">
          Name must contain at least 2 characters
        </p>
      </div>
      <div
        class="input_wrp"
        :class="{
          invalid: this.$store.state.emailInvalid,
          touched: this.$store.state.emailTouched,
        }"
      >
        <input
          class="post_input"
          type="email"
          v-model="this.$store.state.email"
          @blur="isMailValid"
          @click="touchEmail"
          autocomplete="off"
        />
        <label class="label" for="name">Email</label>
        <p class="name" v-if="this.$store.state.emailInvalid">
          Enter a valid email
        </p>
      </div>
      <div
        class="input_wrp"
        :class="{
          invalid: this.$store.state.phoneInvalid,
          touched: this.$store.state.phoneTouched,
        }"
      >
        <input
          class="post_input"
          type="tel"
          id="tel"
          v-model="this.$store.state.phone"
          @blur="isPhoneValid"
          @click="touchPhone"
          autocomplete="off"
        />
        <label class="label" for="name">Phone</label>
      </div>
      <p class="post_input_label" for="tel">+38 (XXX) XXX - XX - XX</p>
      <div class="post_radios">
        <p class="post_text">Select your position</p>
        <div
          class="post_radios_item"
          v-for="position in allPositions"
          :key="position.id"
        >
          <input
            :id="'pos' + position.id"
            type="radio"
            name="position"
            :value="position.id"
            v-model="this.$store.state.pos"
            @change="isPosValid"
          />
          <label :for="'pos' + position.id">{{ position.name }}</label>
        </div>
      </div>
      <label class="post_file" for="img">
        <div
          class="post_file_wrp"
          :class="{ invalid: this.$store.state.imgInvalid }"
        >
          <p class="post_btn">Upload</p>
          <p class="post_placeholder">
            {{ this.$store.state.filename }}
          </p>
        </div>
      </label>
      <p v-if="this.$store.state.imgInvalid" class="img_label">
        Maximum image size 5 mb
      </p>

      <input
        class="post_img"
        @change="imgChangeEvent"
        type="file"
        id="img"
        name="img"
        accept="image/jpeg,image/jpg"
      />
      <button
        class="btn"
        :class="{ btnInactive: btnValidStyle }"
        @click.prevent="post"
      >
        Sign up
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  mounted() {
    this.getPositions()

    this.$store.dispatch('getToken')
    this.$store.getters.isFormValid
  },
  methods: {
    touchName() {
      this.$store.state.nameTouched = true
    },
    touchEmail() {
      this.$store.state.emailTouched = true
    },
    touchPhone() {
      this.$store.state.phoneTouched = true
    },
    getPositions() {
      this.$store.dispatch('getPositions')
    },
    imgChangeEvent() {
      this.$store.getters.setImg
      this.$store.getters.getFileName
      this.$store.getters.isImgValid
    },
    isNameValid() {
      this.$store.getters.isNameValid
    },
    isMailValid() {
      this.$store.getters.isEmailValid
    },

    isPhoneValid() {
      this.$store.getters.isPhoneValid
    },

    isPosValid() {
      this.$store.getters.isPosValid
    },
    post() {
      this.$store.dispatch('sendUser')
      setTimeout(() => {
        this.$store.dispatch('loadData')
      }, 1000)
    },
  },
  computed: {
    ...mapGetters(['allPositions']),

    btnValidStyle() {
      if (this.$store.getters.isFormValid) {
        return false
      } else {
        return true
      }
    },
  },
}
</script>
