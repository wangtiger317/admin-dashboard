<template>
  <div>
    <!-- History Table Container Card -->
    <b-card no-body class="mb-0 px-3">
      <div class="mt-2 ml-2">
        <b-row>
          <b-col
            cols="12"
            md="12"
            class="d-flex align-items-center justify-content-start mt-2"
          >
            <h2>Profile: {{ getSingleProfile.username }}</h2>
          </b-col>
        </b-row>
      </div>

      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="12"
            class="d-flex align-items-center justify-content-start mb-2"
          >
            <table id="customers" class="">
              <tr>
                <th class="px-2">Username</th>
                <th class="px-2">Email</th>
                <th class="px-2">Telepone</th>
                <th class="px-2">Referral</th>
                <th class="px-2"></th>
              </tr>
              <tr>
                <!-- USERNAME -->
                <td>
                  <b-col cols="12" md="12" class="mb-md-0 mb-2">
                    <b-form-input
                      v-model="getSingleProfile.username"
                      class="d-inline-block"
                      readonly
                      placeholder="Username"
                    />
                  </b-col>
                </td>

                <!-- EMAIL -->
                <td>
                  <b-col cols="12" md="12" class="mb-md-0 mb-2">
                    <b-form-input
                      v-model="getSingleProfile.email"
                      placeholder="Email"
                    />
                  </b-col>
                </td>

                <!-- TELEPONE -->
                <td>
                  <b-col cols="12" md="12" class="mb-md-0 mb-2">
                    <b-form-input
                      type="number"
                      v-model="getSingleProfile.phone"
                      placeholder="No Telepon"
                    />
                  </b-col>
                </td>

                <!-- REFERRAL -->
                <td>
                  <b-col cols="12" md="12" class="mb-md-0 mb-2">
                    <b-form-group>
                      <b-form-input
                        v-if="getSingleProfile.memberReferral"
                        v-model="getSingleProfile.memberReferral"
                        class="d-inline-block"
                        placeholder="Member Referral"
                        readonly
                      />
                      <b-form-input
                        v-else
                        class="d-inline-block"
                        placeholder="Nothing Member Referral"
                        readonly
                      />
                    </b-form-group>
                  </b-col>
                </td>
                <td>
                  <b-col cols="12" md="12" class="mb-md-0 mb-2">
                    <feather-icon
                      icon="SaveIcon"
                      size="16"
                      class="cursor-pointer mx-1"
                      @click="
                        flipInSaveProfile(
                          getSingleProfile.email,
                          getSingleProfile.phone,
                          'success',
                          'top-center'
                        )
                      "
                    />
                    <b-tooltip title="Save" />
                  </b-col>
                </td>
              </tr>
            </table>
          </b-col>
        </b-row>
      </div>
    </b-card>

    <!-- Limit Line Togel This -->
    <b-card no-body class="mb-0 mt-2 px-3">
      <div class="m-2 pb-0">
        <b-row class="wrapper py-0">
          <b-col
            cols="12"
            md="3"
            class="d-flex align-items-center justify-content-start mt-2"
          >
            <h2>Limit Line Togel</h2>
          </b-col>
        </b-row>
      </div>
      <table id="customers" class="">
        <tr>
          <th class="px-2">Pasaran</th>
          <th class="px-2">Limit Line 4D</th>
          <th class="px-2">Limit Line 3D</th>
          <th class="px-2">Limit Line 2D</th>
          <th class="px-2">Limit Line 2D Depan</th>
          <th class="px-2">Limit Line 2D Tengah</th>
        </tr>

        <tr v-for="datas in getLimitLine.data" :key="datas">
          <td>
            <b-col cols="12" md="12" class="mb-md-0 mb-2">
              <b-form-group>
                <b-form-input
                  v-model="datas.name"
                  class="d-inline-block"
                  placeholder="Enter Social Media"
                  readonly
                />
              </b-form-group>
            </b-col>
          </td>
          <td>
            <b-col cols="12" md="12" class="mb-md-0 mb-2">
              <b-form-group>
                <cleave
                  v-model="datas.limit_4d"
                  id="number"
                  class="form-control text-left"
                  @keypress="onlyNumber"
                  :raw="false"
                  :options="options.number"
                  placeholder="Limit line 4D"
                />
              </b-form-group>
            </b-col>
          </td>
          <td>
            <b-col cols="12" md="12" class="mb-md-0 mb-2">
              <b-form-group>
                <b-form-input
                  v-model="datas.limit_3d"
                  @keypress="onlyNumber"
                  id="number"
                  class="form-control text-left"
                  :raw="false"
                  :options="options.number"
                  placeholder="Limit line 3D"
                />
              </b-form-group>
            </b-col>
          </td>
          <td>
            <b-col cols="12" md="12" class="mb-md-0 mb-2">
              <b-form-group>
                <b-form-input
                  v-model="datas.limit_2d"
                  @keypress="onlyNumber"
                  id="number"
                  class="form-control text-left"
                  :raw="false"
                  :options="options.number"
                  placeholder="Limit line 2D"
                />
              </b-form-group>
            </b-col>
          </td>
          <td>
            <b-col cols="12" md="12" class="mb-md-0 mb-2">
              <b-form-group>
                <b-form-input
                  v-model="datas.limit_2d_depan"
                  @keypress="onlyNumber"
                  id="number"
                  class="form-control text-left"
                  :raw="false"
                  :options="options.number"
                  placeholder="Limit line 2 Depan"
                />
              </b-form-group>
            </b-col>
          </td>
          <td>
            <b-col cols="12" md="12" class="mb-md-0 mb-2">
              <b-form-group>
                <b-form-input
                  v-model="datas.limit_2d_tengah"
                  @keypress="onlyNumber"
                  id="number"
                  class="form-control text-left"
                  :raw="false"
                  :options="options.number"
                  placeholder="Limit line 2 Tengah"
                />
              </b-form-group>
            </b-col>
          </td>
        </tr>

        <v-row class="d-flex ml-1 my-2">
          <v-col>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mt-2"
              @click="
                $router.push({
                  name: 'members-all-members',
                })
              "
            >
              Back
            </b-button>
          </v-col>

          <b-col cols="12" md="9" class="my-2">
            <b-button
              variant="primary"
              @click="
                flipInSaveLimits(getLimitLine.data, 'success', 'top-center')
              "
            >
              Update
            </b-button>
          </b-col>
        </v-row>
      </table>
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
  BFormSelect,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import BCardCode from '@core/components/b-card-code'
import Cleave from 'vue-cleave-component'
import 'cleave.js/dist/addons/cleave-phone.us'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import { mapActions, mapGetters } from 'vuex'
import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    Cleave,
    BCardCode,
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
    BFormSelect,
    BDropdownItem,
    BPagination,
    vSelect,
  },

  data() {
    return {
      currentPage: 1,
      selecteds: null,
      options: {
        number: {
          numeral: true,
          numeralThousandsGroupStyle: 'thousand',
        },
      },
    }
  },

  computed: {
    ...mapGetters('members', ['getSingleProfile']),
    ...mapGetters('members', ['getLimitLine']),
  },

  created() {
    const id = this.$route.params.id
    const payload = {
      id,
    }
    this.singleProfile(payload)
    this.fetchLimitLine(payload)
  },

  methods: {
    ...mapActions('members', ['singleProfile']),
    ...mapActions('members', ['fetchLimitLine']),

    // number only
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 190) {
        $event.preventDefault()
      }
    },

    // FLIP SAVE
    flipInSaveProfile(email, phone, variant, position) {
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
            email,
            phone,
          }
          useJwt
            .updateData('allMembers', `/profile-update/${id}`, body, {})
            .then(() => {
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
                  position,
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

    flipInSaveLimits(datas, variant, position) {
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
            data: datas,
          }
          useJwt
            .updateData(
              'allMembers',
              `/limit-line-togel-update/${id}`,
              body,
              {}
            )
            .then(() => {
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
                  position,
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
}
</script>

<style lang="scss" scoped>
.btns {
  display: flex;
  justify-content: end;
}
.table__row {
  margin: 200px 0px;
}
.per-page-selector {
  width: 90px;
}
.total__content {
  display: flex;
  justify-content: end;
  padding-right: 100px;
}
.total {
  padding: 8px 0px;
  border-bottom: 1px solid #404656;
}
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  padding: 8px;
}
#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
