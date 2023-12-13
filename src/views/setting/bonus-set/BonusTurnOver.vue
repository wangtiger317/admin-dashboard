<template>
  <b-card-text>
    <!-- Setting Time and Date -->
    <b-card no-body class="mb-0 pb-2 mt-3">
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="9"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Setting Time and Date</h2>
          </b-col>
        </b-row>
      </div>

      <!-- TABLE THIS -->
      <b-table
        :fields="fields"
        :items="getSetTurnover.setting"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- TYPE -->
        <template #cell(type)="{ item }">
          <b-form-group>
            <b-form-input v-model="item.type" id="basicInput" disabled />
          </b-form-group>
        </template>

        <!-- DATE GENERATE -->
        <template #cell(date_gen)="{ item }">
          <b-form-group>
            <flat-pickr v-model="item.date_generate" class="form-control" />
          </b-form-group>
        </template>

        <!-- TIME GENERATE -->
        <template #cell(time_gen)="{ item }">
          <b-form-group>
            <flat-pickr
              v-model="item.time_generate"
              class="form-control"
              :config="{
                enableTime: true,
                noCalendar: true,
                dateFormat: 'H:i',
              }"
            />
          </b-form-group>
        </template>

        <!-- DATE SEND -->
        <template #cell(date_send)="{ item }">
          <b-form-group>
            <flat-pickr v-model="item.date_send" class="form-control" />
          </b-form-group>
        </template>

        <!-- TIME SEND -->
        <template #cell(time_send)="{ item }">
          <b-form-group>
            <flat-pickr
              v-model="item.time_send"
              class="form-control"
              :config="{
                enableTime: true,
                noCalendar: true,
                dateFormat: 'H:i',
              }"
            />
          </b-form-group>
        </template>

        <!-- ACTIONS -->
        <template #cell(actions)="item">
          <div class="text-nowrap">
            <feather-icon
              :id="`invoice-row-${item.id}-save-icon`"
              icon="SaveIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="SaveSet('success', 'top-center', item)"
            />
            <b-tooltip
              title="Save"
              :target="`invoice-row-${item.id}-save-icon`"
            />
          </div>
        </template>
      </b-table>
    </b-card>
    <!-- List Bonus Turnover -->
    <b-card no-body class="mb-0 mt-4">
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="9"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>List Bonus Turnover</h2>
          </b-col>
        </b-row>
      </div>
      <b-table
        :fields="turnfields"
        :items="getSetTurnover.listBonus.data"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <template #cell(title)="{ item }">
          <b-form-group>
            <b-form-input
              v-model="item.judul"
              id="basicInput"
              placeholder="Enter title"
            /> </b-form-group
        ></template>

        <!-- VALUE BONUS (RP) -->
        <template #cell(valuebonus)="{ item }">
          <b-form-group>
            <cleave
              id="number"
              v-model="item.value"
              class="form-control"
              :raw="false"
              :options="options.number"
            />
          </b-form-group>
        </template>

        <!-- UANG / BARANG -->
        <template #cell(uang)="{ item }">
          <b-form-select v-model="item.type">
            <option value="uang">Uang</option>
            <option value="barang">Barang</option>
          </b-form-select>
        </template>

        <!-- HADIAH (RP / BARANG) -->
        <template #cell(hadiah)="{ item }">
          <b-form-group>
            <cleave
              v-if="item.type === 'uang'"
              id="number"
              v-model="item.give"
              class="form-control"
              :raw="false"
              :options="options.number"
            />
            <b-form-input
              v-if="item.type === 'barang'"
              v-model="item.give"
              id="basicInput"
              placeholder="Hadiah / Barang"
            />
          </b-form-group>
        </template>

        <!-- ACTIONS -->
        <template #cell(actions)="{ item }">
          <div class="text-nowrap">
            <feather-icon
              :id="`invoice-row-${item.id}-save-icon`"
              icon="SaveIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="updateTurnover(item, 'success', 'top-center')"
            />
            <b-tooltip
              title="Save"
              :target="`invoice-row-${item.id}-save-icon`"
            />
          </div>
        </template>
      </b-table>

      <!-- PAGINATION THIS -->
      <div class="mx-2 mb-2 mt-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="
              d-flex
              align-items-center
              justify-content-center justify-content-sm-start
            "
          >
            <!-- <span class="text-muted">Showing 1 to {{ allTotal }} entries</span> -->
          </b-col>
          <b-col
            v-if="getSetTurnover"
            cols="12"
            sm="6"
            class="
              d-flex
              align-items-center
              justify-content-center justify-content-sm-end
            "
          >
            <b-pagination
              v-if="allTotal > perPage"
              v-model="currentPage"
              :total-rows="allTotal"
              :per-page="perPage"
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
import days from 'dayjs'

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
import { re } from 'semver'
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
      currentPage: 1,
      options: {
        number: {
          numeral: true,
          numeralThousandsGroupStyle: 'thousand',
        },
      },
      fields: [
        {
          key: 'type',
          label: 'type',
        },
        {
          key: 'date_gen',
          label: 'Date Generate',
        },
        {
          key: 'time_gen',
          label: 'Time Generate',
        },
        {
          key: 'date_send',
        },
        {
          key: 'time_send',
          label: 'Time Send',
        },
        {
          key: 'actions',
        },
      ],
      turnfields: [
        {
          key: 'title',
          label: 'title',
        },
        {
          key: 'valuebonus',
          label: 'Value Bonus (Rp)',
        },
        {
          key: 'uang',
          label: 'Uang / Barang',
        },
        {
          key: 'hadiah',
          label: 'Hadiah (Rp / Barang)',
        },
        {
          key: 'actions',
        },
      ],
    }
  },
  // computed
  computed: {
    ...mapGetters('bonus', ['getSetTurnover']),

    allTotal() {
      const list = this.getSetTurnover.listBonus
      const arr = []
      let max = 0
      if (list) {
        arr.push(list.total)
        max = Math.max(...arr)
      }
      return max
    },

    perPage() {
      const list = this.getSetTurnover.listBonus
      let perPage = 0
      if (list) {
        perPage = list.per_page
      }
      return perPage
    },
  },

  // created
  async created() {
    const payload = {
      page: 1,
    }
    await this.fetchDataList(payload)
  },

  // methods
  methods: {
    ...mapActions('bonus', ['fetchTurnoverList', 'updateCronTurn']),

    // fetchDataList store
    async fetchDataList(payload) {
      await this.fetchTurnoverList(payload)
    },

    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    // Change Pagination
    async changePage(number) {
      const payload = {
        page: number,
      }
      await this.fetchTurnoverList(payload)
    },

    // updateTurnover
    updateTurnover(bonus, variant, position) {
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
          this.$store.dispatch('bonus/updateTurnover', bonus)
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
        } else if (result.dismiss === 'cancel') {
          this.$swal({
            title: 'Cancelled',
            text: 'Ok your data is not Updated.',
            confirmButtonText: 'Ok',
            customClass: {
              cancelButton: 'btn btn-secondary',
            },
          })
        }
      })
    },

    // flipInSave Setting Time and Date
    async SaveSet(variant, position, item) {
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
        if (await this.updateCronTurn(item)) {
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
