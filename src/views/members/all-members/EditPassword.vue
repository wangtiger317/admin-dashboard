<template>
  <div>
    <!-- Table Container Card -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="9"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Edit Password</h2>
          </b-col>
        </b-row>
      </div>
      <b-table :fields="fields" :items="items">
        <!-- ip -->
        <template #cell(username)> {{ getMemberDepoWd.username }} </template>

        <!-- password/withdraw -->
        <template #cell(password)>
          <b-form-group>
            <b-form-input v-model="password" type="password" value="1234456">
            </b-form-input> </b-form-group
        ></template>
        <!-- Bank Asal -->
        <template #cell(confirm)>
          <b-form-group>
            <b-form-input v-model="confirm" type="password">
            </b-form-input> </b-form-group
        ></template>

        <!-- actions -->
        <template #cell(action)>
          <!-- Save this icon -->
          <feather-icon
            icon="SaveIcon"
            size="16"
            class="cursor-pointer mx-1"
            @click="flipInSave(password, confirm, 'success', 'top-center')"
          />
          <b-tooltip title="Save" />
        </template>
      </b-table>

      <b-row>
        <b-col cols="10" md="10" class="text-left ml-2 py-2">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            @click="$router.push({ name: 'members-all-members' })"
          >
            Back
          </b-button>
        </b-col>
      </b-row>
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
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import { mapActions, mapGetters } from 'vuex'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import useJwt from '@/auth/jwt/useJwt'

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
    vSelect,
  },
  computed: {
    ...mapGetters('members', ['getMemberDepoWd']),
  },
  created() {
    let id = this.$route.params.id
    const payload = {
      id,
    }
    this.memberDepoWd(payload)
  },
  methods: {
    ...mapActions('members', ['memberDepoWd', 'changePassword']),

    // flipInSave
    flipInSave(password, confirm, variant, position) {
      this.$swal({
        title: 'Are you sure?',
        text: 'Data will be updated.',
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
          let id = this.$route.params.id
          const body = {
            password,
            confirmPassword: confirm,
          }
          useJwt
            .updateData('allMembers', '/password-update', body, {
              params: {
                id,
              },
            })
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
                },
                this.$router.push({
                  name: 'members-all-members',
                })
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
                  position: 'top-center',
                }
              )
            })
        } else if (result.dismiss === 'cancel') {
          this.$swal({
            title: 'Cancelled',
            text: 'Ok your data is still there and safe',
            confirmButtonText: 'Ok',
            customClass: {
              cancelButton: 'btn btn-secondary',
            },
          })
        }
      })
    },
  },
  data() {
    return {
      fields: [
        {
          key: 'username',
          label: 'username',
        },

        {
          key: 'password',
          label: 'Password',
        },
        {
          key: 'confirm',
          label: 'Confirm Password',
        },

        {
          key: 'action',
          label: '',
        },
      ],
      items: [
        {
          username: null,
          password: null,
          confirm: null,
        },
      ],
    }
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
