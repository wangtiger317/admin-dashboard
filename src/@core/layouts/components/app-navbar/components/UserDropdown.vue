<template>
  <b-nav-item-dropdown
    right
    toggle-class="d-flex align-items-center dropdown-user-link"
    class="dropdown-user"
  >
    <!-- icons user  -->
    <template #button-content>
      <!-- :src="userData.avatar" -->
      <b-avatar
        size="40"
        variant="light-primary"
        badge
        class="badge-minimal"
        badge-variant="success"
      >
        <feather-icon icon="UserIcon" size="22" />
      </b-avatar>
    </template>

    <!-- dropdown menu -->
    <b-dropdown-item
      :to="{ name: 'my-acount-profile' }"
      link-class="d-flex align-items-center"
    >
      <feather-icon size="16" icon="UserIcon" class="mr-50" />
      <span>My Account</span>
    </b-dropdown-item>
    <b-dropdown-item link-class="d-flex align-items-center" @click="logout">
      <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
      <span>Logout</span>
    </b-dropdown-item></b-nav-item-dropdown
  >
</template>

<script>
import { BNavItemDropdown, BDropdownItem, BAvatar } from 'bootstrap-vue'
import { initialAbility } from '@/libs/acl/config'
import useJwt from '@/auth/jwt/useJwt'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BAvatar,
  },
  data() {
    return {
      password: '',
      username: '',
    }
  },
  methods: {
    // logout() {
    //   // Remove userData from localStorage
    //   // ? You just removed token from localStorage. If you like, you can also make API call to backend to  blacklist      used token
    //   localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
    //   localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)
    //   // Remove userData from localStorage
    //   localStorage.removeItem('userData')
    //   // Reset ability
    //   this.$ability.update(initialAbility)
    //   // Redirect to login page
    //   this.$router.push({ name: 'auth-login' })
    // },

    // please dont deleted this
    logout() {
      useJwt
        .logout({
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          // Reset ability
          this.$ability.update(initialAbility)
          // Remove userData from localStorage
          localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
          localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)
          // Remove userData from localStorage
          localStorage.removeItem('userData')
          // Redirect to login pages
          this.$router.push({ name: 'auth-login' })
          // Toastification
          this.$toast({
            component: ToastificationContent,
            position: 'top-center',
            props: {
              title: `Success`,
              icon: 'CheckIcon',
              variant: 'success',
              text: response.data.message,
            },
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>
