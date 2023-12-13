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
            <h3>Create New Agent User</h3>
          </b-col>
        </b-row>
        <hr />

        <b-row>
          <b-col cols="12" md="6" class="mb-3">
            <b-form-group label-for="basicInput">
              <label for="basicInput">Name</label>
              <b-form-input id="basicInput" v-model="name" placeholder="Name" />
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" class="mb-3">
            <b-form-group label-for="basicInput">
              <label for="basicInput">User Name</label>
              <b-form-input
                v-on:keypress="isLetter($event)"
                id="basicInput"
                v-model="username"
                placeholder="Username"
              />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" md="6" class="mb-3">
            <b-form-group label-for="basicInput">
              <label for="basicInput">Password</label>
              <b-form-input
                id="basicInput"
                type="password"
                v-model="password"
                placeholder="Password"
              />
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" class="mb-3">
            <b-form-group label-for="basicInput">
              <label for="basicInput">Password Confirmation</label>
              <b-form-input
                id="basicInput"
                type="password"
                v-model="password_confirmation"
                placeholder="Password Confirmation"
              />
            </b-form-group>
          </b-col>
        </b-row>

        <!-- PERMISION THIS -->
        <b-row>
          <b-col cols="12" md="12">
            <h4>Permission</h4>
            <hr />
            <b-col
              cols="12"
              md="12"
              class="align-items-center justify-content-start mb-2 mt-1"
            >
              <b-col
                v-for="role in rolesComputed"
                :key="role.id"
                cols="12"
                md="2"
              >
                <b-form-checkbox
                  v-model="selectedRole"
                  :value="role.id"
                  class="mt-1"
                  name="check-button"
                  switch
                  inline
                >
                  {{ role.name }}
                </b-form-checkbox>
              </b-col>
            </b-col>
          </b-col>
        </b-row>
        <!--======= AGENT ========-->
        <template v-for="permission in modulesPermissionComputed">
          <b-row>
            <b-col cols="12" md="12">
              <h4>{{ permission.module_name }}</h4>
              <hr />
            </b-col>
          </b-row>
          <div>
            <template v-for="(item, key) in permission.items">
              <!-- user -->
              <b-row>
                <h5 class="pl-5 py-1">
                  {{ key }}
                </h5>
                <hr />
                <b-col
                  cols="12"
                  md="12"
                  class="d-flex align-items-left justify-content-left ml-5"
                >
                  <template v-for="chunked in chunkArray(item, 5)">
                    <b-col cols="12" md="3">
                      <template v-for="permission in chunked">
                        <b-form-checkbox
                          v-model="permissions"
                          disabled
                          name="check-button"
                          class="custom-control-primary mt-1"
                          :value="
                            permission.items[Object.keys(permission.items)[0]]
                              .id
                          "
                          switch
                          inline
                        >
                          <div>
                            {{
                              permission.items[Object.keys(permission.items)[0]]
                                .description
                            }}
                          </div>
                        </b-form-checkbox>
                      </template>
                    </b-col>
                  </template>
                </b-col>
              </b-row>
            </template>

            <hr />
          </div>
        </template>

        <hr />
        <div>
          <!--======= Back ========-->
          <div class="mt-3 mb-1">
            <b-row>
              <b-col
                cols="12"
                md="9"
                class="d-flex align-items-center justify-content-start"
              >
                <!-- back  -->
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="primary"
                  @click="$router.push({ name: 'agent-agent-user' })"
                >
                  Back
                </b-button>
                <!-- update -->
                <b-button variant="primary" class="ml-1" @click="createUser">
                  Create
                </b-button>
              </b-col>
            </b-row>
          </div>
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
  BFormCheckbox,
  BFormCheckboxGroup,
  BFormGroup,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    BFormCheckbox,
    BFormCheckboxGroup,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BFormGroup,
  },

  data() {
    return {
      name: '',
      username: '',
      password: '',
      password_confirmation: '',
      selectedRole: 0,
      permissions: [],
    }
  },

  watch: {
    selectedRole(value) {
      const role = this.rolesComputed.find(({ id }) => value == id)
      const permissions = role?.permissions.map((item) => item.id)
      this.permissions = permissions
    },
  },

  computed: {
    ...mapGetters('admin', ['getAdminRoles', 'getmodulePermissions']),
    rolesComputed() {
      return this.getAdminRoles
    },

    modulesPermissionComputed() {
      const items = this.getmodulePermissions ?? {}

      const module_permissions = Object.keys(items).map((key, index) => {
        let item = items[key]
        item = this.groupBy(item, (item) => item.sub_module_name)

        return {
          module_name: items[key][0]?.module_name ?? '',
          items: item,
        }
      })

      return module_permissions
    },
  },

  created() {
    this.adminRolesList()
  },

  mounted() {
    this.fetchModulePermissions()
  },

  methods: {
    ...mapActions('admin', [
      'adminRolesList',
      'fetchModulePermissions',
      'createAdminUser',
    ]),

    // REGEX ONLY ALPHABET
    isLetter(e) {
      let char = String.fromCharCode(e.keyCode)
      if (/^[A-Za-z0-9]+$/.test(char)) return true
      else e.preventDefault()
    },

    groupBy(items, callback) {
      const groupBy = (x, f) =>
        x.reduce((a, b) => ((a[f(b)] ||= []).push(b), a), {})

      items = groupBy(items, callback)

      return items
    },

    chunkArray(array, size) {
      const res = []

      for (let i = 0; i < array.length; i += size) {
        const chunk = array.slice(i, i + size)
        res.push(chunk)
      }
      return res
    },

    // flipInCreate
    flipInCreate(variant, position) {
      this.$swal({
        title: 'Are you sure?',
        text: 'Data will be Created.',
        confirmButtonText: 'Create',
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
      }).then((result) => {
        if (result.value) {
          // toast notification this
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'Created successfully!',
                variant,
              },
            },
            {
              position,
            }
          )
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

    async createUser() {
      const validation = this.createFormValidation()
      if (!validation.state) {
        validation.errors.forEach((item) => {
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
            }
          )
        })

        return
      }

      const userResponse = await this.$swal({
        title: 'Are you sure?',
        text: 'Data will be Created.',
        confirmButtonText: 'Create',
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
        name: this.name,
        username: this.username,
        password: this.password,
        password_confirmation: this.password_confirmation,
        roles: this.selectedRole == 0 ? [] : [this.selectedRole],
        permission: this.permissions,
      }

      const response = await this.createAdminUser(requestsPayload)

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
          }
        )

        await this.$router.push({ name: 'agent-agent-user' })
      } else {
        const { data } = response.data

        if (data.errors) {
          // eslint-disable-next-line guard-for-in
          for (const error in data.errors) {
            data.errors[error].forEach((text) => {
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
                }
              )
            })
          }
        }
      }
    },

    createFormValidation() {
      const unAllowedValuesArray = ['', ' ', null, false]

      const validation = {
        state: true,
        errors: [],
      }

      if (unAllowedValuesArray.includes(this.name)) {
        validation.errors.push('Name Field Is Empty')
        validation.state = false
      }

      if (unAllowedValuesArray.includes(this.username)) {
        validation.errors.push('Username Field Is Empty')
        validation.state = false
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
        validation.errors.push(
          'Password Is Different from password confirmation'
        )
        validation.state = false
      }

      return validation
    },
  },
  setup() {
    const isAddNewUserSidebarActive = ref(true)
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
