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
            <h3>Update Agent Role</h3>
          </b-col>
        </b-row>
        <hr />

        <b-row>
          <b-col cols="6" md="6" class="mb-3">
            <b-form-group label="Basic Input" label-for="basicInput">
              <label for="basicInput">Name</label>
              <b-form-input
                id="basicInput"
                v-model="ReceiveData.name"
                placeholder="Name"
              />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" md="12">
            <h3>Permission</h3>
            <hr />
          </b-col>
        </b-row>

        <b-row v-for="(data, key) in PermissionsUser" :key="data">
          <b-col cols="12" md="12">
            <h5>{{ key }}</h5>

            <hr />
          </b-col>
          <div
            v-for="(datas, subkey) in data"
            :key="datas"
            class="col-md-12 col-12"
          >
            <!-- user -->
            <h5 class="pl-5 py-1">
              {{ subkey }}
            </h5>
            <div class="container">
              <b-col
                cols="12"
                md="12"
                class="d-flex align-items-center flex-wrap m-auto"
              >
                <b-col v-for="item in datas" :key="item" cols="12" md="3">
                  <b-form-checkbox-group
                    v-model="realSelectedData"
                    name="check-button"
                    switches
                  >
                    <b-form-checkbox class="mt-1" :value="item.id" switch inline
                      >{{ item.description }}
                    </b-form-checkbox>
                  </b-form-checkbox-group>
                </b-col>
              </b-col>
            </div>
            <hr />
          </div>
        </b-row>
        <div>
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
                  @click="$router.push({ name: 'agent-agent-role' })"
                >
                  Back
                </b-button>
                <!-- update -->
                <b-button
                  variant="primary"
                  class="ml-1"
                  @click="flipInCreate('success', 'top-center')"
                >
                  Update
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
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BFormCheckbox,
  BFormCheckboxGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import { mapActions, mapGetters } from 'vuex'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'

export default {
  components: {
    ToastificationContent,
    BFormCheckbox,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BFormCheckboxGroup,
    vSelect,
  },
  computed: {
    ...mapGetters('admin', ['GetPermissionList']),
    PermissionsUser() {
      const data = this.GetPermissionList
      return data
    },
    ReceiveData() {
      const params = this.item
      return params
    },
  },
  created() {
    this.fetchPermissionList()
  },

  mounted() {
    const { item } = this.$route.params
    this.item = item
    this.renderSelectedData()
  },
  methods: {
    // flip in sweet alert this
    ...mapActions('admin', ['fetchPermissionList']),
    // flipInDeactivate
    flipInCreate(variant, position) {
      const payload = {
        name: this.ReceiveData.name,
        id: this.ReceiveData.id,
        permissions: this.realSelectedData,
      }
      this.$swal({
        title: 'Are you sure?',
        text: 'Role will be Created.',
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
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          if (this.$store.dispatch('admin/UpdateAgentRole', payload)) {
            // toast notification this
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
              this.$router.push({ name: 'agent-agent-role' })
            )
          }
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
    renderSelectedData() {
      const params = this.item
      const permissions = []
      params.permissions.map((item) => {
        permissions.push(item.id)
      })
      this.realSelectedData = permissions
    },
  },

  data() {
    return {
      currentPage: 1,
      data: null,
      item: null,
      realSelectedData: [],
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
