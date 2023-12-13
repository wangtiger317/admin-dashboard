<template>
  <b-card-code>
    <b-form @submit.prevent>
      <h3 class="mt-3 ml-3">Shio Setting</h3>
      <b-row class="mx-2 mt-3" v-for="data in dataSettings" :key="data">
        <!-- shio Tahun ini -->
        <b-col cols="12 mb-2">
          <div class="mb-1">Shio Tahun ini</div>
          <v-select
            v-model="selected"
            :clearable="false"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            :options="shioList"
          />
        </b-col>

        <!-- Min Bet -->
        <b-col cols="2">
          <b-form-group label="Min Bet">
            <b-form-input
              v-model="data.min_bet"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
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
              placeholder="Enter Win"
            />
          </b-form-group>
        </b-col>

        <!-- Discount (%) -->
        <b-col cols="2">
          <b-form-group label="Discount (%)">
            <b-form-input
              v-model="data.disc"
              id="number"
              class="form-control"
              :raw="false"
              :options="options.number"
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
              placeholder="Enter Limit Total"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <!-- submit toas and sweet alert-->
      <b-col class="mb-3 mt-2 ml-2 demo-inline-spacing">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          type="submit"
          variant="primary"
          class="mr-1"
          @click="updateShioGame('success', 'top-center')"
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
import vSelect from 'vue-select'
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
import { mapActions, mapGetters } from 'vuex'

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
    vSelect,
    ToastificationContent,
  },
  directives: {
    Ripple,
  },

  watch: {
    async getSelectedProvider(value) {
      await this.fetchGameList({
        id: value?.id,
        slug: 'shio',
      })
    },

    dataSettings(value) {
      if (value[0]?.togel_shio_name_id) {
        this.selected = this.shioList.find(
          (item) => item.id == value[0]?.togel_shio_name_id
        ) ?? { title: 'Select Shio' }
      }
    },
  },

  computed: {
    ...mapGetters('settings', ['getSelectedProvider', 'getShioList']),
    dataSettings() {
      return this.$store.getters['settings/getGameList']
    },

    shioList() {
      return this.getShioList.map((item) => {
        return {
          id: item.id,
          title: item.name,
        }
      })
    },
  },

  async mounted() {
    await this.fetchShioList()
    await this.fetchGameList({
      id: this.getSelectedProvider?.id,
      slug: 'shio',
    })
  },

  methods: {
    ...mapActions('settings', ['fetchShioList', 'fetchGameList', 'updateShio']),

    async updateShioGame(variant, position) {
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
      const payload = this.dataSettings
      payload[0].togel_shio_name_id =
        this.selected.id ?? payload[0].togel_shio_name_id
      if (await this.updateShio(payload)) {
        await this.$toast(
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

        return
      }

      this.$toast(
        {
          component: ToastificationContent,
          props: {
            title: 'Error',
            icon: 'error',
            text: 'Sorry, An Error Occured!',
            variant: 'error',
          },
        },
        {
          position,
        }
      )
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
      selected: { title: 'Select Shio' },
      option: [
        { title: 'Monyet' },
        { title: 'Ayam' },
        { title: 'Babi' },
        { title: 'Harimau' },
        { title: 'Kambing' },
        { title: 'Kelinci' },
        { title: 'Kerbau' },
        { title: 'Kuda' },
        { title: 'Kuda' },
      ],
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
