<template>
  <b-card-text>
    <b-card no-body class="mb-0 pb-2 mt-3">
      <!-- TITLE THIS -->
      <div class="mx-2 my-2">
        <b-row>
          <b-col
            cols="12"
            md="9"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Referral Togel</h2>
          </b-col>
        </b-row>
      </div>
      <div>
        <!-- TITLE REFFERAL AND VALUE -->
        <b-row class="mx-2">
          <b-col cols="12" sm="6">
            <h5><b>Provider Togel</b></h5>
          </b-col>
          <b-col cols="12" sm="6">
            <h5><b>Value (%)</b></h5>
          </b-col>
        </b-row>

        <!-- CONTENT DATA  -->
        <b-row v-for="datas in getSetReferral.data" :key="datas" class="m-2">
          <b-col cols="6" sm="6">
            <p>{{ datas.name }}</p>
          </b-col>
          <b-col
            cols="6"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >
            <b-form-select v-model="datas.value">
              <option value="0">0</option>
              <option value="0.025">0.025</option>
              <option value="0.05">0.05</option>
              <option value="0.075">0.075</option>
              <option value="0.01">0.01</option>
              <option value="0.02">0.02</option>
              <option value="0.03">0.03</option>
              <option value="0.04">0.04</option>
              <option value="0.05">0.05</option>
              <option value="0.06">0.06</option>
            </b-form-select>
          </b-col>
        </b-row>

        <!-- THIS PAGINATIOn -->
        <!-- <div class="mx-2 mb-2 mt-2">
          <b-row>
            <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-start"
            >
              <span class="text-muted"
                >Showing 1 of {{ allTotal }} entries</span
              >
            </b-col>
            <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-end"
            >
              <b-col
                v-if="getSetReferral"
                cols="12"
                sm="6"
                class="d-flex align-items-center justify-content-center justify-content-sm-end"
              >
                <b-pagination
                  v-if="allTotal > totalPage"
                  v-model="currentPage"
                  :total-rows="allTotal"
                  :per-page="totalPage"
                  first-number
                  last-number
                  class="mb-0 mt-1 mt-sm-0"
                  prev-class="prev-item"
                  next-class="next-item"
                  @change="changePage"
                >
                  <template #prev-text>
                    <feather-icon icon="ChevronLeftIcon" size="18" />
                  </template>
                  <template #next-text>
                    <feather-icon icon="ChevronRightIcon" size="18" />
                  </template>
                </b-pagination>
              </b-col>
            </b-col>
          </b-row>
        </div> -->

        <!-- BUTTON UPDATED -->
        <b-row class="m-2">
          <b-col cols="12" sm="12" class="text-left">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              @click="
                updatePotongan(getSetReferral.data, 'success', 'top-center')
              "
            >
              Update
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </b-card-text>
</template>

<script>
import BCardCode from '@core/components/b-card-code'
import Cleave from 'vue-cleave-component'
import 'cleave.js/dist/addons/cleave-phone.us'
import flatPickr from 'vue-flatpickr-component'
import { mapActions, mapGetters } from 'vuex'

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
  BPagination,
  BFormCheckbox,
  BFormSelect,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
export default {
  components: {
    Cleave,
    BCardCode,
    flatPickr,
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
    BPagination,
    BFormSelect,
    vSelect,
    ToastificationContent,
  },

  data() {
    return {
      test: 'test',
    }
  },

  computed: {
    ...mapGetters('bonus', ['getSetReferral']),
    // Refferals total
    allTotal() {
      const total = this.getSetReferral
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    // Refferals perpage
    perPage() {
      const perpage = this.getSetReferral
      let perPage = 0
      if (perpage) {
        perPage = perpage.per_page
      }
      return perPage
    },
  },

  created() {
    const payload = {
      page: 1,
    }
    this.referrallist(payload)
  },

  methods: {
    ...mapActions('bonus', ['referrallist', 'updateReferral']),

    async changePage(number) {
      const payload = {
        page: number,
      }
      await this.referrallist(payload)
    },

    async updatePotongan(items, variant, position) {
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
        if (await this.updateReferral(items)) {
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
        } else if (res.dismiss === 'cancel') {
          this.$swal({
            title: 'Cancelled',
            text: 'Ok your data is not Updated.',
            confirmButtonText: 'Ok',
            customClass: {
              cancelButton: 'btn btn-secondary',
            },
          })
        }
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
