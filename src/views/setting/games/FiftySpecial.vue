<template>
  <b-card-code>
    <b-form @submit.prevent>
      <h3 class="mt-3 ml-3">50-50 Special Setting</h3>
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

        <!--Max Bet -->
        <b-col cols="2">
          <b-form-group label="Max Bet">
            <b-form-input
              v-model="data.max_bet"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Max Bet"
            />
          </b-form-group>
        </b-col>

        <!-- Win (x) -->
        <b-col cols="2">
          <b-form-group label="Win (x)">
            <b-form-input
              v-model="data.win_x"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Win"
            />
          </b-form-group>
        </b-col>

        <!-- Kei As Ganjil (%) -->
        <b-col cols="2">
          <b-form-group label="Kei As Ganjil (%)">
            <b-form-input
              v-model="data.kei_as_ganjil"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Kei As Ganjil"
            />
          </b-form-group>
        </b-col>

        <!-- Kei As Genap (%) -->
        <b-col cols="2">
          <b-form-group label="Kei As Genap (%)">
            <b-form-input
              v-model="data.kei_as_genap"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Kei As Genap"
            />
          </b-form-group>
        </b-col>

        <!-- Kei As Besar (%) -->
        <b-col cols="2">
          <b-form-group label="Kei As Besar (%)">
            <b-form-input
              v-model="data.kei_as_besar"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Kei As Besar"
            />
          </b-form-group>
        </b-col>

        <!-- Kei As Kecil (%) -->
        <b-col cols="2">
          <b-form-group label="Kei As Kecil (%)">
            <b-form-input
              v-model="data.kei_as_kecil"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Kei As Kecil"
            />
          </b-form-group>
        </b-col>

        <!-- Kei Kop Ganjil (%) -->
        <b-col cols="2">
          <b-form-group label="Kei Kop Ganjil (%)">
            <b-form-input
              v-model="data.kei_kop_ganjil"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Kei Kop Ganjil"
            />
          </b-form-group>
        </b-col>

        <!-- Kei Kop Genap (%) -->
        <b-col cols="2">
          <b-form-group label="Kei Kop Genap (%)">
            <b-form-input
              v-model="data.kei_kop_genap"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Kei Kop Genap"
            />
          </b-form-group>
        </b-col>

        <!-- Kei Kop Besar (%) -->
        <b-col cols="2">
          <b-form-group label="Kei Kop Besar (%)">
            <b-form-input
              v-model="data.kei_kop_besar"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Kei Kop Besar"
            />
          </b-form-group>
        </b-col>

        <!-- Kei Kop Kecil (%) -->
        <b-col cols="2">
          <b-form-group label="Kei Kop Kecil (%)">
            <b-form-input
              v-model="data.kei_kop_kecil"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Kei Kop Kecil"
            />
          </b-form-group>
        </b-col>

        <!-- Kei Kepala Ganjil (%) -->
        <b-col cols="2">
          <b-form-group label="Kei Kepala Ganjil (%)">
            <b-form-input
              v-model="data.kei_kepala_ganjil"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Kei Kepala Ganjil"
            />
          </b-form-group>
        </b-col>

        <!-- Kei Kepala Genap (%) -->
        <b-col cols="2">
          <b-form-group label="Kei Kepala Genap (%)">
            <b-form-input
              v-model="data.kei_kepala_genap"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Kei Kepala Genap"
            />
          </b-form-group>
        </b-col>

        <!-- Kei Kepala Besar (%) -->
        <b-col cols="2">
          <b-form-group label="Kei Kepala Besar (%)">
            <b-form-input
              v-model="data.kei_kepala_besar"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Kei Kepala Besar"
            />
          </b-form-group>
        </b-col>

        <!-- Kei Kepala Kecil (%) -->
        <b-col cols="2">
          <b-form-group label="Kei Kepala Kecil (%)">
            <b-form-input
              v-model="data.kei_kepala_kecil"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Kei Kepala Kecil"
            />
          </b-form-group>
        </b-col>

        <!-- Kei Ekor Ganjil (%) -->
        <b-col cols="2">
          <b-form-group label="Kei Ekor Ganjil (%)">
            <b-form-input
              v-model="data.kei_ekor_ganjil"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Kei Ekor Ganjil"
            />
          </b-form-group>
        </b-col>

        <!-- Kei Ekor Genap (%) -->
        <b-col cols="2">
          <b-form-group label="Kei Ekor Genap (%)">
            <b-form-input
              v-model="data.kei_ekor_genap"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Kei Ekor Genap"
            />
          </b-form-group>
        </b-col>

        <!-- Kei Ekor Besar (%) -->
        <b-col cols="2">
          <b-form-group label="Kei Ekor Besar (%)">
            <b-form-input
              v-model="data.kei_ekor_besar"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Kei Ekor Besar"
            />
          </b-form-group>
        </b-col>

        <!-- Kei Ekor Kecil (%) -->
        <b-col cols="2">
          <b-form-group label="Kei Ekor Kecil (%)">
            <b-form-input
              v-model="data.kei_ekor_kecil"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Kei Ekor Kecil"
            />
          </b-form-group>
        </b-col>

        <!-- Limit Buang -->
        <b-col cols="2">
          <b-form-group label="Limit Buang">
            <b-form-input
              v-model="data.limit_buang"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Limit Buang"
            />
          </b-form-group>
        </b-col>

        <!-- Limit Total -->
        <b-col cols="2">
          <b-form-group label="Limit Total">
            <b-form-input
              v-model="data.limit_total"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Limit Total"
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
          @click="updateFiftySpecial('success', 'top-center', dataSettings)"
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
    ...mapActions('settings', ['updateFiftyFiftySpecial']),
    // number only
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 190) {
        $event.preventDefault()
      }
    },

    async updateFiftySpecial(variant, position, item) {
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
        if (await this.updateFiftyFiftySpecial(item)) {
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
