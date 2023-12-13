<template>
  <div>
    <!-- Table Container Card -->
    <b-card no-body class="mb-0 mt-2 px-3">
      <div class="m-2">
        <b-row class="wrapper mt-1">
          <b-col
            cols="12"
            md="3"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Website Setting</h2>
          </b-col>
        </b-row>
      </div>

      <!-- test modal -->
      <div>
        <b-modal id="bv-modal-example" hide-footer>
          <div class="btns">
            <img
              class="images"
              src="@/assets/images/liveChat/livechat.png"
              alt=""
            />
          </div>
        </b-modal>
      </div>

      <table id="customers" class="">
        <tr>
          <th class="px-2">Setting</th>

          <th class="px-2">Value</th>
        </tr>
        <tr>
          <td class="px-2">Title</td>
          <td>
            <b-col cols="12" md="11" class="mb-md-0 mb-2">
              <b-form-input
                v-model="getWebPage[0].value"
                class="d-inline-block mr-1"
                placeholder="Cikaslot Agent"
              />
            </b-col>
          </td>
        </tr>
        <tr>
          <td class="px-2">Meta Tag</td>
          <td>
            <b-col cols="12" md="11" class="rounded mb-2">
              <b-form-textarea
                id="textarea"
                v-model="getWebPage[1].value"
                placeholder="Meta Tag"
                rows="3"
                max-rows="6"
              >
              </b-form-textarea>
            </b-col>
          </td>
        </tr>
        <tr>
          <td class="px-2">Free Script</td>
          <td>
            <b-col cols="12" md="11" class="rounded mb-2">
              <b-form-textarea
                id="textarea"
                v-model="getWebPage[2].value"
                placeholder="Meta Tag"
                rows="3"
                max-rows="6"
              >
              </b-form-textarea>
            </b-col>
          </td>
        </tr>
        <tr>
          <td class="px-2">Livechat URL</td>
          <td>
            <b-col cols="12" md="11" class="mb-2">
              <b-form-input
                v-model="getWebPage[3].value"
                class="d-inline-block mr-1"
                placeholder="Live Chat"
              />
            </b-col>
            <p class="mt-2 mx-1 text-primary">
              Format URL : https://direct.lc.chat/12345678 Replace the number
              with your License ID (an 8-digit number). How to find your license
              id? Click
              <b-link
                @click="$bvModal.show('bv-modal-example')"
                class="text-danger"
                >Link</b-link
              >
            </p>
          </td>
        </tr>
        <tr>
          <td class="px-2">WhatsApp URL</td>
          <td>
            <b-col cols="12" md="11" class="mb-2">
              <b-form-input
                v-model="getWebPage[4].value"
                class="d-inline-block mr-1"
                placeholder="WhatsApp Url"
              />
            </b-col>
          </td>
        </tr>
        <tr>
          <td class="px-2">APK URL</td>
          <td>
            <b-col cols="12" md="11" class="mb-2">
              <b-form-input
                v-model="getWebPage[5].value"
                class="d-inline-block mr-1"
                placeholder="APK Url"
              />
            </b-col>
          </td>
        </tr>
        <tr>
          <td class="px-2">Multi Media</td>
          <td>
            <b-col cols="12" md="11" class="mt-3 mb-2">
              <b-form-textarea
                id="textarea"
                v-model="getWebPage[6].value"
                placeholder="Multi Media"
                :value="content"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
              <p class="text-primary mt-2">
                If you want to add multi url link separate with comma (,). eg :
                https://----.com,https://----.com
              </p>
            </b-col>
          </td>
        </tr>
        <tr>
          <td class="px-2">Footer Tag</td>
          <td>
            <b-col cols="12" md="11" class="mb-2">
              <b-form-input
                v-model="getWebPage[7].value"
                class="d-inline-block mr-1"
                placeholder="Footer Tag"
              />
            </b-col>
          </td>
        </tr>
        <b-col cols="12" md="9" class="my-2">
          <b-button
            variant="primary"
            @click="flipInSetting(getWebPage, 'success', 'top-center')"
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
import Cleave from 'vue-cleave-component'
import { mapActions, mapGetters } from 'vuex'
import 'cleave.js/dist/addons/cleave-phone.us'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import useJwt from '@/auth/jwt/useJwt'

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
    ...mapGetters('settings', ['getWebPage']),
  },

  created() {
    this.webPagelist()
  },

  methods: {
    ...mapActions('settings', ['webPagelist']),
    // flip in sweet alert this

    flipInSetting(datas, variant, position) {
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
            .updateData('settingAll', `/web-update?type=web_page`, body, {})
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
