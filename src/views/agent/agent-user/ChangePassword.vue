<template>
  <div>
    <!-- Table Container Card -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="9"
            class="d-flex align-items-center justify-content-start mb-1"
          >
            <h3>Change Password for Super Admin</h3>
          </b-col>
        </b-row>
        <b-form-group label="Password" label-for="vi-password">
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text>
              <feather-icon icon="LockIcon" />
            </b-input-group-prepend>
            <b-form-input
              id="vi-password"
              v-model="password"
              type="password"
              placeholder="Password"
            />
          </b-input-group>
        </b-form-group>
        <!-- <b-form-group
          label-for="input-formatter"
          description="We will convert your name to lowercase instantly"
        >
          <label for="" class="mt-2">Password</label>
          <b-form-input
            id="input-formatter"
            v-model="text1"
            placeholder="Password"
            :formatter="formatter"
          />
        </b-form-group> -->
        <!-- <b-form-group
          label-for="input-formatter"
          description="We will convert your name to lowercase instantly"
        >
          <label for="" class="mt-2">Password Confirmation</label>
          <b-form-input
            id="input-formatter"
            v-model="text1"
            placeholder="Password Confirmation"
            :formatter="formatter"
          />
        </b-form-group> -->
        <b-form-group label="Password Confirmation" label-for="vi-password">
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text>
              <feather-icon icon="LockIcon" />
            </b-input-group-prepend>
            <b-form-input
              id="vi-password"
              v-model="password_confirmation"
              type="password"
              placeholder="Password Confirmation"
            />
          </b-input-group>
        </b-form-group>
        <div class="mt-2 mb-1">
          <b-row>
            <b-col
              cols="12"
              md="9"
              class="d-flex align-items-center justify-content-start"
            >
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                @click="$router.push({ name: 'agent-agent-user' })"
              >
                Back
              </b-button>
              <b-button
                variant="primary"
                class="ml-1"
                @click="updatePassword"
              >
                Update Password
              </b-button>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BTooltip,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BFormGroup,
  BForm,
  BInputGroup,
  BInputGroupPrepend,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import { mapActions } from 'vuex';

export default {
  components: {
    ToastificationContent,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BTooltip,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BFormGroup,
    BForm,
    BInputGroup,
    BInputGroupPrepend,
    vSelect,
  },
  data() {
    return {
      password: null,
      password_confirmation: null,
      userId: null,
      user: {},
      currentPage: 1,
      fields: [
        {
          key: 'No',
        },
        {
          key: 'userReferral',
        },
        {
          key: 'lastActivity',
        },
        {
          key: 'bonusReferral',
          label: 'Bonus Referral (Total)',
        },
      ],
      items: [
        {
          No: '1',
          userReferral: 'Admin',
          lastActivity: '04 Feb 2022 14:30:33',
          bonusReferral: '04 Feb 2022 14:30:33',
        },
        {
          No: '3',
          userReferral: 'Admin',
          lastActivity: '04 Feb 2022 14:30:33',
          bonusReferral: '04 Feb 2022 14:30:33',
        },
      ],
    }
  },
  mounted() {
    this.userId = this.$route.params.id;
  },
  methods: {
    ...mapActions('admin', ['changePassword',]),

    async updatePassword() {
      const validation = this.formValidation()
      if (!validation.state) {
        validation.errors.forEach(item => {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                text: item,
                variant: 'danger',
              },
            },
            {
              position: 'top-center',
            },
          )
        })

        return
      }

      const userResponse = await this.$swal({
        title: 'Are you sure?',
        text: 'Data will be Updated.',
        confirmButtonText: 'Update',
        cancelButtonText: 'No, I changed my mind!',
        showCancelButton: true,
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-secondary ml-1',
        },
        showClass: {
          popup: 'animate__animated animate__flipInX',
        },
        buttonsStyling: true,
      })

      if (!userResponse.isConfirmed) {
        await this.$swal({
          title: 'Cancelled',
          text: 'Ok your data is still there and safe',
          confirmButtonText: 'Ok',
          customClass: {
            cancelButton: 'btn btn-secondary',
          },
        })

        return
      }

      const requestsPayload = {
        id: this.userId,
        password: this.password,
        password_confirmation: this.password_confirmation
      }

      const response = await this.changePassword(requestsPayload)

      if (response.status) {
        await this.$toast(
          {
            component: ToastificationContent,
            props: {
              title: 'Success',
              icon: 'CheckIcon',
              text: response.data.message,
              variant: 'success',
            },
          },
          {
            position: 'top-center',
          },
        )

        await this.$router.push({ name: 'agent-agent-user' })
      } else {
        const { data } = response.data

        if (data.errors) {
          // eslint-disable-next-line guard-for-in
          for (const error in data.errors) {
            data.errors[error].forEach(text => {
              this.$toast(
                {
                  component: ToastificationContent,
                  props: {
                    title: 'Error',
                    icon: 'error',
                    text,
                    variant: 'error',
                  },
                },
                {
                  position: 'top-center',
                },
              )
            })
          }
        }
      }
    },

    formValidation() {
      const unAllowedValuesArray = [
        '',
        ' ',
        null,
        false,
      ]

      const validation = {
        state: true,
        errors: [],
      }

      if (unAllowedValuesArray.includes(this.password)) {
        validation.errors.push('Password Field Is Empty')
        validation.state = false
      }

      if (this.password.length < 8) {
        validation.errors.push('Password Is less than 8')
        validation.state = false
      }

      if (this.password !== this.password_confirmation) {
        validation.errors.push('Password Is Different from password confirmation')
        validation.state = false
      }

      return validation
    },
  },
  setup() {
    const isAddNewUserSidebarActive = ref(false)
    return {
      isAddNewUserSidebarActive,
    }
  },
}
</script>

<style lang="scss" scoped>
.btns {
  display: flex;
  justify-content: end;
}
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
