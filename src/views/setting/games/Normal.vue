<template>
  <b-card-code>
    <b-form @submit.prevent>
      <h3 class="mt-3 ml-3">4D/3D/2D Setting</h3>
      <b-row class="mx-2 mt-3" v-for="data in dataSettings" :key="data">
        <!-- Setting -->
        <!-- Min Bet -->
        <b-col cols="2">
          <b-form-group label="Min Bet">
            <b-form-input
              v-model="data.min_bet"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Min Bet"
            />
          </b-form-group>
        </b-col>

        <!-- Max Bet 4D -->
        <b-col cols="2">
          <b-form-group label="Max Bet 4D">
            <b-form-input
              v-model="data.max_bet_4d"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Max Bet 4D"
            />
          </b-form-group>
        </b-col>

        <!-- Max Bet 3D -->
        <b-col cols="2">
          <b-form-group label="Max Bet 3D">
            <b-form-input
              v-model="data.max_bet_3d"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Max Bet 3D"
            />
          </b-form-group>
        </b-col>

        <!-- Max Bet 2D -->
        <b-col cols="2">
          <b-form-group label="Max Bet 2D">
            <b-form-input
              v-model="data.max_bet_2d"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Max Bet 2D"
            />
          </b-form-group>
        </b-col>

        <!-- Max Bet 2DD -->
        <b-col cols="2">
          <b-form-group label="Max Bet 2DD">
            <b-form-input
              v-model="data.max_bet_2d_depan"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Max Bet 2DD"
            />
          </b-form-group>
        </b-col>

        <!-- Max Bet 2DT -->
        <b-col cols="2">
          <b-form-group label="Max Bet 2DT">
            <b-form-input
              v-model="data.max_bet_2d_tengah"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Max Bet 2DT"
            />
          </b-form-group>
        </b-col>

        <!-- Win 4D (x) -->
        <b-col cols="2">
          <b-form-group label="Win 4D (x)">
            <b-form-input
              v-model="data.win_4d_x"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Win 4D"
            />
          </b-form-group>
        </b-col>

        <!-- Win 3D (x) -->
        <b-col cols="2">
          <b-form-group label="Win 3D (x)">
            <b-form-input
              v-model="data.win_3d_x"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Win 3D"
            />
          </b-form-group>
        </b-col>

        <!-- Win 2D (x) -->
        <b-col cols="2">
          <b-form-group label="Win 2D (x)">
            <b-form-input
              v-model="data.win_2d_x"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Win 2D"
            />
          </b-form-group>
        </b-col>

        <!-- Win 2DD (x) -->
        <b-col cols="2">
          <b-form-group label="Win 2DD (x)">
            <b-form-input
              v-model="data.win_2d_depan_x"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Win 2DD"
            />
          </b-form-group>
        </b-col>

        <!-- Win 2DT (x) -->
        <b-col cols="2">
          <b-form-group label="Win 2DT (x)">
            <b-form-input
              v-model="data.win_2d_tengah_x"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Win 2DT"
            />
          </b-form-group>
        </b-col>

        <!-- Disc 4D (%) -->
        <b-col cols="2">
          <b-form-group label="Disc 4D (%)">
            <b-form-input
              v-model="data.disc_4d"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Disc 4D"
            />
          </b-form-group>
        </b-col>

        <!-- Disc 3D (%) -->
        <b-col cols="2">
          <b-form-group label="Disc 3D (%)">
            <b-form-input
              v-model="data.disc_3d"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Disc 3D"
            />
          </b-form-group>
        </b-col>

        <!-- Disc 2D (%) -->
        <b-col cols="2">
          <b-form-group label="Disc 2D (%)">
            <b-form-input
              v-model="data.disc_2d"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Disc 2D"
            />
          </b-form-group>
        </b-col>

        <!-- Disc 2DD (%) -->
        <b-col cols="2">
          <b-form-group label="Disc 2DD (%)">
            <b-form-input
              v-model="data.disc_2d_depan"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Disc 2DD"
            />
          </b-form-group>
        </b-col>

        <!-- Disc 2DT (%) -->
        <b-col cols="2">
          <b-form-group label="Disc 2DT (%)">
            <b-form-input
              v-model="data.disc_2d_tengah"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Disc 2DT"
            />
          </b-form-group>
        </b-col>

        <!-- Limit Buang 4D -->
        <b-col cols="2">
          <b-form-group label="Limit Buang 4D">
            <b-form-input
              v-model="data.limit_buang_4d"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Limit Buang 4D"
            />
          </b-form-group>
        </b-col>

        <!-- Limit Buang 3D -->
        <b-col cols="2">
          <b-form-group label="Limit Buang 3D">
            <b-form-input
              v-model="data.limit_buang_3d"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Limit Buang 3D"
            />
          </b-form-group>
        </b-col>

        <!-- Limit Buang 2D -->
        <b-col cols="2">
          <b-form-group label="Limit Buang 2D">
            <b-form-input
              v-model="data.limit_buang_2d"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Limit Buang 2D"
            />
          </b-form-group>
        </b-col>

        <!-- Limit Buang 2DD -->
        <b-col cols="2">
          <b-form-group label="Limit Buang 2DD">
            <b-form-input
              v-model="data.limit_buang_2d_depan"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Limit Buang 2DD"
            />
          </b-form-group>
        </b-col>

        <!-- Limit Buang 2DT -->
        <b-col cols="2">
          <b-form-group label="Limit Buang 2DT">
            <b-form-input
              v-model="data.limit_buang_2d_tengah"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Limit Buang 2DT"
            />
          </b-form-group>
        </b-col>

        <!-- Limit Total 4D -->
        <b-col cols="2">
          <b-form-group label="Limit Total 4D">
            <b-form-input
              v-model="data.limit_total_4d"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Limit Total 4D"
            />
          </b-form-group>
        </b-col>

        <!-- Limit Total 3D -->
        <b-col cols="2">
          <b-form-group label="Limit Total 3D">
            <b-form-input
              v-model="data.limit_total_3d"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Limit Total 3D"
            />
          </b-form-group>
        </b-col>

        <!-- Limit Total 2D -->
        <b-col cols="2">
          <b-form-group label="Limit Total 2D">
            <b-form-input
              v-model="data.limit_total_2d"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Limit Total 2D"
            />
          </b-form-group>
        </b-col>

        <!-- Limit Total 2DD -->
        <b-col cols="2">
          <b-form-group label="Limit Total 2DD">
            <b-form-input
              v-model="data.limit_total_2d_depan"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Limit Total 2DD"
            />
          </b-form-group>
        </b-col>

        <!-- Limit Total 2DT -->
        <b-col cols="2">
          <b-form-group label="Limit Total 2DT">
            <b-form-input
              v-model="data.limit_total_2d_tengah"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Limit Total 2DT"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <!-- submit -->
      <b-col class="mb-3 mt-2 ml-2">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          type="submit"
          variant="primary"
          class="mr-1"
          @click="updateOnClick4d3d2d('success', 'top-center', dataSettings)"
        >
          Submit Settings
        </b-button>
      </b-col>
    </b-form>
  </b-card-code>
</template>

<script>
import BCardCode from '@core/components/b-card-code'
import Cleave from 'vue-cleave-component'
import 'cleave.js/dist/addons/cleave-phone.us'
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import { mapActions } from 'vuex'
import days from 'dayjs'

export default {
  components: {
    Cleave,
    BCardCode,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    ToastificationContent,
  },
  directives: {
    Ripple,
  },

  computed: {
    dataSettings() {
      return this.$store.getters['settings/getGameList']
    },
  },

  methods: {
    ...mapActions('settings', ['update4d3d2d']),
    // number only

    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 190) {
        $event.preventDefault()
      }
    },

    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    async updateOnClick4d3d2d(variant, position, item) {
      const res = await this.$swal({
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
      })

      if (res.value) {
        if (await this.update4d3d2d(item)) {
          // toast notification this
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: `Updated successfully!`,
                variant,
              },
            },
            {
              position,
            }
          )
        }
      } else if (res.dismiss === 'cancel') {
        this.$swal({
          title: 'Cancelled',
          text: 'Ok your data is still there and safe',
          confirmButtonText: 'Ok',
          customClass: {
            cancelButton: 'btn btn-secondary',
          },
        })
      }
    },
  },
  data() {
    return {
      form: {
        cardNumber: null,
        date: null,
        phone: null,
      },
      // cuurency input this is for cleave
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

<style lang="scss">
@import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
