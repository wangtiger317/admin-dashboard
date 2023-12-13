<template>
  <b-card-code>
    <b-form @submit.prevent>
      <h3 class="mt-3 ml-3">Colok Bebas Setting</h3>
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

        <!-- Disc (%) -->
        <b-col cols="2">
          <b-form-group label="Disc (%)">
            <b-form-input
              v-model="data.disc"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
              @keypress="onlyNumber"
              placeholder="Enter Disc"
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
          @click="updateBebas('success', 'top-center', dataSettings)"
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
    ...mapActions('settings', ['updateColokBebas']),
    // number only
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 190) {
        $event.preventDefault()
      }
    },

    async updateBebas(variant, position, item) {
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
        if (await this.updateColokBebas(item)) {
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
