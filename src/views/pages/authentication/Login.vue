<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <b-link class="brand-logo">
        <!-- <vuexy-logo /> -->
        <h2 class="brand-text text-primary ml-1">{{ appName }}</h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col lg="6" class="d-none d-lg-flex align-items-center p-5">
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        >
          <b-img fluid :src="imgUrl" alt="Login V2" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="6" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title class="mb-1 font-weight-bold" title-tag="h2">
            <h2>{{ appName }}</h2>
          </b-card-title>
          <b-card-text class="mb-2">
            Please sign-in to your account
          </b-card-text>
          <!-- form username && password -->
          <validation-observer ref="loginForm" #default="{ invalid }">
            <b-form class="auth-login-form mt-2" @submit.prevent="login">
              <!-- username -->
              <b-form-group label="Username" label-for="username">
                <validation-provider
                  #default="{ errors }"
                  name="Username"
                  rules="required"
                >
                  <b-form-input
                    id="username"
                    v-model="username"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Username"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">Password</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="Password"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group class="input-group-merge">
                <div class="d-flex justify-content-between">
                  <label for="login-password">Captcha</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="captcha"
                  vid="captcha"
                  rules="required"
                >
                  <b-input-group>
                    <b-form-input
                      v-model="captcha"
                      maxlength="4"
                      @keypress="onlyNumber"
                      placeholder="Captcha"
                    />
                    <!-- <b-form-input v-model="captcha" /> -->
                    <b-input-group-append is-text>
                      {{ userCaptcha }}
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger"> {{ errors[0] }} </small>
                </validation-provider>
              </b-form-group>

              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary"
                block
                :disabled="invalid"
              >
                Sign in
              </b-button>
            </b-form>
          </validation-observer>
        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BButton,
  BAlert,
  VBTooltip,
} from 'bootstrap-vue'
import useJwt from '@/auth/jwt/useJwt'
import { required } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BAlert,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      username: '',
      password: '',
      captcha: '',
      userCaptcha: '',
      required,
      sideImg: require('@/assets/images/pages/login-v2.svg'),
    }
  },

  mounted() {
    window.setTimeout(() => {
      this.userCaptcha = this.makeid(4)
      window.setInterval(() => {
        this.userCaptcha = this.makeid(4)
      }, 60000)
    }, 1)
  },
  computed: {
    appName() {
      return process.env.VUE_APP_NAME
    },
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    // number only
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 190 && keyCode !== 13) {
        $event.preventDefault()
      }
    },

    login() {
      this.$refs.loginForm.validate().then((success) => {
        if (this.userCaptcha === this.captcha) {
          if (success) {
            useJwt
              .login({
                username: this.username,
                password: this.password,
              })
              .then((response) => {
                const { token } = response.data.data
                localStorage.setItem('userData', JSON.stringify(response.data))
                useJwt.setToken(token)
                this.$router.push({ name: 'dashboard-status' })

                this.$toast(
                  {
                    component: ToastificationContent,
                    props: {
                      title: `Welcome ${this.username}`,
                      icon: 'CheckIcon',
                      variant: 'success',
                      text: response.data.message,
                    },
                  },
                  {
                    position: 'top-center',
                  }
                )
              })
              .catch((error) => {
                this.$toast(
                  {
                    component: ToastificationContent,
                    props: {
                      title: 'Error',
                      icon: 'AlertCircleIcon',
                      variant: 'danger',
                      text: error.response.data.message,
                    },
                  },
                  {
                    position: 'top-center',
                  }
                )
              })
          }
        } else {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: "Captcha Don't Match",
              },
            },
            {
              position: 'top-center',
            }
          )
        }
      })
    },

    makeid(length) {
      var result = ''
      var characters = '0123456789'
      var charactersLength = characters.length
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        )
      }

      return result
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
.font-bold {
  font-weight: bold;
}
</style>
