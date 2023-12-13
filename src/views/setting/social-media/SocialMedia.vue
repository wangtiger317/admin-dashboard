<template>
  <div>
    <!-- SOCIAL MEDIA -->
    <b-card no-body class="mb-0 mt-2 px-3">
      <div class="m-2">
        <b-row class="wrapper mt-1">
          <b-col cols="12" md="3" class="">
            <h2>Social Media</h2>
          </b-col>
        </b-row>
      </div>
      <b-row class="mx-1">
        <b-col md="1">
          <h5>Setting</h5>
          <div v-for="datas in getWebSosmed" :key="datas">
            <h6 class="mt-3 mt-2">{{ datas.name }}</h6>
          </div>
          <b-button
            class="my-2"
            variant="primary"
            @click="flipInSosmed(getWebSosmed, 'success', 'top-center')"
          >
            Update
          </b-button>
        </b-col>
        <b-col md="5" class="ml-3">
          <h5 class="pb-1 ml-1">Value</h5>
          <b-col class="mb-2" v-for="datas in getWebSosmed" :key="datas">
            <b-form-input
              v-model="datas.value"
              class="d-inline-block"
              placeholder="Enter Social Media"
            />
          </b-col>
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
    ...mapGetters('settings', ['getWebSosmed']),
  },
  created() {
    this.webSosmedlist()
  },
  methods: {
    ...mapActions('settings', ['webSosmedlist']),
    // flip in sweet alert this

    flipInSosmed(datas, variant, position) {
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
            .updateData('settingAll', `/web-update?type=social_media`, body, {})
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
