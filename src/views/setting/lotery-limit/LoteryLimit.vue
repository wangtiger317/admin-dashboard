<template>
  <div>
    <!-- THIS LIMIT LINE -->
    <!-- THIS LIMIT LINE -->
    <!-- THIS LIMIT LINE -->
    <!-- THIS LIMIT LINE -->
    <!-- THIS LIMIT LINE -->
    <!-- Table Container Card -->
    <b-card no-body class="mb-0 mt-2 px-3">
      <div class="m-2">
        <b-row class="wrapper mt-1">
          <b-col
            cols="12"
            md="3"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Lottery Limit</h2>
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
        <tr v-for="datas in getWebLimit" :key="datas">
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
                  id="number"
                  v-model="datas.limit_4d"
                  class="form-control"
                  :raw="false"
                  :options="options.number"
                />
              </b-form-group>
            </b-col>
          </td>
          <td>
            <b-col cols="12" md="12" class="mb-md-0 mb-2">
              <b-form-group>
                <cleave
                  id="number"
                  v-model="datas.limit_3d"
                  class="form-control"
                  :raw="false"
                  :options="options.number"
                />
              </b-form-group>
            </b-col>
          </td>
          <td>
            <b-col cols="12" md="12" class="mb-md-0 mb-2">
              <b-form-group>
                <cleave
                  id="number"
                  v-model="datas.limit_2d"
                  class="form-control"
                  :raw="false"
                  :options="options.number"
                />
              </b-form-group>
            </b-col>
          </td>
          <td>
            <b-col cols="12" md="12" class="mb-md-0 mb-2">
              <b-form-group>
                <cleave
                  id="number"
                  v-model="datas.limit_2d_depan"
                  class="form-control"
                  :raw="false"
                  :options="options.number"
                />
              </b-form-group>
            </b-col>
          </td>
          <td>
            <b-col cols="12" md="12" class="mb-md-0 mb-2">
              <b-form-group>
                <cleave
                  id="number"
                  v-model="datas.limit_2d_tengah"
                  class="form-control"
                  :raw="false"
                  :options="options.number"
                />
              </b-form-group>
            </b-col>
          </td>
        </tr>
        <b-col cols="12" md="9" class="my-2 mx-1">
          <b-button
            variant="primary"
            @click="flipInSaveLimits(getWebLimit, 'success', 'top-center')"
          >
            Update
          </b-button>
        </b-col>
      </table>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormTextarea,
  BFormInput,
  BFormGroup,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BFormCheckbox,
  BImg,

  // test
  BForm,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import BCardCode from '@core/components/b-card-code'
import { mapActions, mapGetters } from 'vuex'
import Cleave from 'vue-cleave-component'
import 'cleave.js/dist/addons/cleave-phone.us'
import useJwt from '@/auth/jwt/useJwt'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'

export default {
  components: {
    BImg,
    BForm,
    Cleave,
    BCardCode,
    BFormCheckbox,
    BFormGroup,
    BFormTextarea,
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
    BPagination,

    vSelect,
  },

  computed: {
    ...mapGetters('settings', ['getWebLimit']),
  },

  created() {
    this.webLimitlist()
  },

  methods: {
    ...mapActions('settings', ['webLimitlist']),
    // flip in sweet alert this

    // number only
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 190) {
        $event.preventDefault()
      }
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
          const body = {
            data: datas,
          }
          useJwt
            .updateData('settingAll', `/limit-line-update`, body, {})
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
      currentPage: 1,
      options: {
        number: {
          numeral: true,
          numeralThousandsGroupStyle: 'thousand',
        },
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.images {
  width: 200%;
  height: 200%;
}
.btns {
  display: flex;
  justify-content: center;
}
// .wrapper {
//   border-bottom: 1px solid #404656;
//   margin: 10px 0px;
// }
.table__row {
  margin: 200px 0px;
}
// .btn {
//   background-color: transparent;
// }
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
  // border: 1px solid #ddd;
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
