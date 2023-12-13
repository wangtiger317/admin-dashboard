<template>
  <b-card-code title="My Account">
    <!-- left align -->
    <div class="mb-3 mt-2 mx-3">
      <b-tabs pills>
        <!-- my profile -->
        <b-tab active>
          <template #title>
            <span class="font-weight-bold">My Profile</span>
          </template>
          <my-profile />
        </b-tab>
        <!-- password -->
        <b-tab>
          <template #title>
            <span class="font-weight-bold">Password</span>
          </template>
          <password />
        </b-tab>
      </b-tabs>
    </div>
  </b-card-code>
</template>

<script>
import BCardCode from '@core/components/b-card-code'
import { BTabs, BTab } from 'bootstrap-vue'
import MyProfile from './MyProfile.vue'
import Password from './Password.vue'

export default {
  components: {
    BCardCode,
    BTabs,
    BTab,
    MyProfile,
    Password,
  },
}
</script>
