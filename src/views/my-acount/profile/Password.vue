<template>
  <div class="mx-1">
    <b-form @submit.prevent>
      <b-row>
        <!-- Current Password -->
        <b-col cols="12">
          <b-form-group label="Current Password" label-for="vi-password">
            <b-input-group class="input-group-merge">
              <b-input-group-prepend is-text>
                <feather-icon icon="LockIcon" />
              </b-input-group-prepend>
              <b-form-input
                v-model="currentPassword"
                id="vi-password"
                type="password"
                placeholder="Password"
              />
            </b-input-group>
          </b-form-group>
        </b-col>

        <!-- New Password -->
        <b-col cols="12">
          <b-form-group label="New Password" label-for="vi-password">
            <b-input-group class="input-group-merge">
              <b-input-group-prepend is-text>
                <feather-icon icon="LockIcon" />
              </b-input-group-prepend>
              <b-form-input
                v-model="newPassword"
                id="vi-password"
                type="password"
                placeholder="New Password"
              />
            </b-input-group>
          </b-form-group>
        </b-col>

        <!-- New Password Confirmation -->
        <b-col cols="12">
          <b-form-group
            label="New Password Confirmation"
            label-for="vi-password"
          >
            <b-input-group class="input-group-merge">
              <b-input-group-prepend is-text>
                <feather-icon icon="LockIcon" />
              </b-input-group-prepend>
              <b-form-input
                v-model="confirmPassword"
                id="vi-password"
                type="password"
                placeholder="New Password Confirmation"
              />
            </b-input-group>
          </b-form-group>
        </b-col>

        <!-- reset and Update Password -->
        <b-col cols="12 mt-2">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="primary"
            class="mr-1"
            @click="
              updatePassword(
                currentPassword,
                newPassword,
                confirmPassword,
                'success',
                'top-center'
              )
            "
          >
            Update Password
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BButton,
  BInputGroup,
  BInputGroupPrepend,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import useJwt from '@/auth/jwt/useJwt'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    BForm,
    BButton,
  },
  methods: {
    updatePassword(
      currentPassword,
      newPassword,
      confirmPassword,
      variant,
      position
    ) {
      this.$swal({
        title: 'Are you sure?',
        text: 'Password will be updated.',
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
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          const body = {
            currentPassword: currentPassword,
            newPassword: confirmPassword,
            confirmPassword: newPassword,
          }
          useJwt
            .updateData('agentAll', '/update-password', body)
            .then((response) => {
              this.$toast(
                {
                  component: ToastificationContent,
                  props: {
                    title: 'Success',
                    icon: 'CheckIcon',
                    text: 'Updated successfully!',
                    variant,
                  },
                },
                {
                  position,
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
                    text: error.response.data.message,
                    variant: 'danger',
                  },
                },
                {
                  position,
                }
              )
            })
        } else if (result.dismiss === 'cancel') {
          this.$swal({
            title: 'Cancelled',
            text: 'Ok your password is still there and safe',
            confirmButtonText: 'Ok',
            customClass: {
              cancelButton: 'btn btn-secondary',
            },
          })
        }
      })
    },
  },
  directives: {
    Ripple,
  },
}
</script>
