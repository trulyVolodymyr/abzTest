import { createStore } from 'vuex'
const store = createStore({
  state: {
    results: [], //array of users
    error: null, //current state of error
    userAmount: 12, // amount of users added with "show more" btn
    maxUsers: 0, //amount of registered users

    positions: [], //job positions from api
    token: '', //token from api
    formData: new FormData(), //form to store new users data before send to api
    img: '', //img file to send
    name: '', //name to send
    email: '', //email to send
    phone: '', // phoe to send
    pos: '', //position to send
    filename: 'Upload your photo', //img name to render on layout
    imgValid: false, //is img valid
    nameValid: false, //is name valid
    emailValid: false, //is email valid
    phoneValid: false, //is phone valid
    posValid: false, //is positions valid
    nameInvalid: null, //var to render name invalid styles
    nameTouched: null, //var to move name placeholder
    emailInvalid: null, //var to render email invalid styles
    emailTouched: null, //var to move email placeholder
    phoneInvalid: null, //var to render phone invalid styles
    phoneTouched: null, //var to move phone placeholder
    imgInvalid: null, //var to render img invalid styles
  },

  getters: {
    errorStatus(state) {
      return state.error
    },
    //sort result by creation data
    allResults(state) {
      return state.results.sort((a, b) => {
        a.registration_timestamp - b.registration_timestamp
      })
    },
    //hide btn after displayed all users
    hideBtn(state) {
      return state.maxUsers > state.results.length
    },
    allPositions(state) {
      return state.positions
    },
    //define img to send
    setImg(state) {
      state.img = document.getElementById('img').files[0]
    },
    //define img name to render
    getFileName(state) {
      state.filename = document.getElementById('img').files[0].name
    },
    //validate img
    isImgValid(state) {
      const size = parseFloat(state.img.size / (1024 * 1024)).toFixed(2)
      if (size < 5) {
        state.formData.append('photo', state.img)
        state.imgValid = true

        state.imgInvalid = false
      } else {
        state.imgInvalid = true
      }
    },
    //validate name
    isNameValid(state) {
      if (state.name.length > 2 && state.name.length < 60) {
        state.formData.append('name', state.name)
        state.nameValid = true

        state.nameInvalid = false
      } else {
        state.nameInvalid = true
      }
    },
    //validate email
    isEmailValid(state, getters) {
      if (
        getters.mailValidation &&
        state.email.length > 2 &&
        state.email.length < 100
      ) {
        state.formData.append('email', state.email)
        state.emailValid = true

        state.emailInvalid = false
      } else {
        state.emailInvalid = true
      }
    },
    //email validation rule
    mailValidation(state) {
      return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        state.email
      )
    },
    //validate phone
    isPhoneValid(state, getters) {
      if (getters.phoneValidation) {
        state.formData.append('phone', state.phone)
        state.phoneValid = true

        state.phoneInvalid = false
      } else {
        state.phoneInvalid = true
      }
    },
    //phone validation name
    phoneValidation(state) {
      return /^[\+]{0,1}380([0-9]{9})$/.test(state.phone)
    },
    //postion validation
    isPosValid(state) {
      if (state.pos > 0 && state.pos < state.positions.length + 1) {
        state.formData.append('position_id', state.pos)
        state.posValid = true
      }
    },
    //form validation
    isFormValid(state) {
      return (
        state.nameValid &&
        state.emailValid &&
        state.phoneValid &&
        state.posValid &&
        state.imgValid
      )
    },
  },

  actions: {
    //load first 6 items before render and after new user added
    loadData(context) {
      fetch(
        'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6'
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            context.commit('updateResults', [])
            context.commit('updateResults', data.users)
            context.commit('updateMaxUsers', data.total_users)
          }
          if (!data.success) {
            throw new Error('Failed to fetch data. Try again later.')
          }
        })
        .catch(() => {
          context.commit('updateError', true)
        })
    },
    //add user to api
    addUsers(context) {
      context.commit('errorToNull', null)
      fetch(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=${this.state.userAmount}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            context.commit('updateResults', data.users)
            context.commit('updateUserAmount', 6)
          }
          if (!data.success) {
            throw new Error('Failed to fetch data. Try again later.')
          }
        })
        .catch(() => {
          context.commit('updateError', true)
        })
    },
    //get positions from api
    getPositions(context) {
      fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
        .then((response) => response.json())
        .then((data) => {
          context.commit('updatePositons', data.positions)
        })
        .catch(() => {
          context.commit('updateError', true)
        })
    },
    //get token from api
    getToken(context) {
      fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          context.commit('updateToken', data.token)
        })
    },
    //send new user to api
    sendUser(context) {
      if (context.getters.isFormValid) {
        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
          method: 'POST',
          body: this.state.formData,
          headers: { Token: this.state.token },
        })
          .then(function (response) {
            return response.json()
          })
          .then(function (data) {})
      }
    },
  },

  mutations: {
    updateToken(state, token) {
      state.token = token
    },
    updatePositons(state, positions) {
      state.positions = positions
    },
    setUserAmount(state, initialAmount) {
      state.userAmount = initialAmount
    },
    updateResults(state, results) {
      state.results = results
    },
    updateError(state, res) {
      state.error = res
    },
    errorToNull(state, status) {
      state.error = status
    },
    updateMaxUsers(state, userAmount) {
      state.maxUsers = userAmount
    },
    updateUserAmount(state, number) {
      state.userAmount += number
    },
  },
})

export default store
