<template>
  <div>
    <tambah-new
      :is-add-new-user-sidebar-active.sync="isAddNewUserSidebarActive"
      :role-options="roleOptions"
      :plan-options="planOptions"
      @refetch-data="refetchData"
    />

    <!-- Table Container Card -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="9"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>List Market</h2>
          </b-col>

          <!-- create List Market THIS -->
          <b-col cols="12" md="3" class="text-right">
            <b-button
              variant="primary"
              @click="isAddNewUserSidebarActive = true"
            >
              Create
            </b-button>
          </b-col>
        </b-row>
      </div>
      <b-table
        :fields="fields"
        :items="getListPasaran"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- NO -->
        <template #cell(nomor)="{ index }"> {{ index + 1 }}</template>

        <!-- NAMA ID -->
        <template #cell(namaId)="{ item }">
          <b-form-group>
            <b-form-input
              v-model="item.name"
              id="basicInput"
              placeholder="Enter Nama Id"
            /> </b-form-group
        ></template>

        <!-- NAMA PASARAN -->
        <template #cell(namaPasaran)="{ item }">
          <b-form-group>
            <b-form-input
              v-model="item.name_initial"
              id="basicInput"
              placeholder="Enter Nama Market"
            /> </b-form-group
        ></template>

        <!--WEB -->
        <template #cell(web)="{ item }">
          <b-form-group>
            <b-form-input
              v-model="item.website_url"
              id="basicInput"
              placeholder="Enter Web"
            /> </b-form-group
        ></template>

        <!--hari_diundi -->
        <template #cell(hariundi)="{ item }">
          <b-form-group>
            <b-form-input
              v-model="item.hari_diundi"
              id="basicInput"
              placeholder="Enter Hari Undi"
            />
          </b-form-group>
        </template>

        <!--libur -->
        <template #cell(libur)="{ item }">
          <b-form-group>
            <b-form-input
              v-model="item.libur"
              id="basicInput"
              placeholder="Enter Libur"
            />
          </b-form-group>
        </template>

        <!-- TUTUP -->
        <template #cell(tutup)="{ item }">
          <b-form-group>
            <b-form-select v-model="item.tutup" id="sortOptions">
              <option v-for="(time, index) in times" :key="index">
                {{ time }} <span>WIB</span>
              </option>
            </b-form-select>
          </b-form-group>
        </template>

        <!-- JADWAL -->
        <template #cell(jadwal)="{ item }">
          <b-form-group>
            <b-form-select v-model="item.jadwal" id="sortOptions">
              <option v-for="(time, index) in times" :key="index">
                {{ time }} <span>WIB</span>
              </option>
            </b-form-select>
          </b-form-group>
        </template>

        <!-- ACTIONS -->
        <template #cell(actions)="item">
          <div class="text-nowrap">
            <!-- save this -->
            <feather-icon
              :id="`invoice-row-${item.id}-save-icon`"
              icon="SaveIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="flipInSave('success', 'top-center', item)"
            />
            <b-tooltip
              title="Save"
              :target="`invoice-row-${item.id}-save-icon`"
            />

            <!-- Delete this -->
            <feather-icon
              @click="flipdeletePasaran(item, 'success', 'top-center')"
              :id="`invoice-row-${item.id}-delete-icon`"
              icon="Trash2Icon"
              class="cursor-pointer"
              size="16"
            />
            <b-tooltip
              title="Delete"
              class="cursor-pointer"
              :target="`invoice-row-${item.id}-delete-icon`"
            />

            <!-- endaction this -->
          </div>
        </template>
      </b-table>
      <div class="mx-2 mb-2 mt-2"></div>
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
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BFormCheckbox,
  BFormSelect,
  BTooltip,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import TambahNew from './TambahNew.vue'
import { mapActions, mapGetters } from 'vuex'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'

export default {
  components: {
    BTooltip,
    ToastificationContent,
    TambahNew,
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
  },

  computed: {
    ...mapGetters('settings', ['getListPasaran']),

    // TIMES THIS
    times() {
      let startTime = new Date(`1/1/1970 ${this.start_time}`)
      const endTime = new Date(`1/1/1970 ${this.end_time}`)
      const interval = this.x * 60000
      const results = []
      while (startTime.getTime() <= endTime.getTime()) {
        results.push(`${this.formatTime(startTime)}`)
        startTime = new Date(startTime.getTime() + interval)
      }
      return results
    },
  },

  created() {
    this.MarketList()
  },

  methods: {
    ...mapActions('settings', ['MarketList', 'pasaranUpdate']),

    // SET TIME THIS
    formatTime(date) {
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      return `${hours}:${minutes}`
    },

    // flipInSave
    async flipInSave(variant, position, item) {
      const res = await this.$swal({
        title: 'Are you sure?',
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
        if (await this.pasaranUpdate(item)) {
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
      }
    },

    // flipInDelete
    flipdeletePasaran(pasarans, variant, position) {
      this.$swal({
        title: 'Are you sure?',
        confirmButtonText: 'Delete',
        cancelButtonText: 'No, I changed my mind!',
        showCancelButton: true,
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-secondary ml-1',
        },
        showClass: {
          popup: 'animate__animated animate__flipInX',
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('settings/deletePasaran', pasarans)
          // toast notification this
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: `Deleted successfully!`,
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
  },

  data() {
    return {
      // SET TIME THIS
      start_time: '00:00',
      end_time: '23:30',
      x: 15,
      result: '',
      currentPage: 1,
      selected: null,
      fields: [
        {
          key: 'nomor',
          label: 'no',
        },
        {
          key: 'namaId',
          label: 'Nama ID',
        },
        {
          key: 'namaPasaran',
          label: 'Nama Pasaran',
        },
        {
          key: 'web',
        },
        {
          key: 'hariundi',
          label: 'Hari Di Undi',
        },
        {
          key: 'Libur',
        },
        {
          key: 'tutup',
        },

        {
          key: 'jadwal',
          label: 'Jadwal',
        },
        {
          key: 'actions',
        },
      ],
    }
  },

  setup() {
    const isAddNewUserSidebarActive = ref(false)
    return {
      isAddNewUserSidebarActive,
    }
  },
}
</script>

<style lang="scss" scoped>
.btns {
  display: flex;
  justify-content: end;
}
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
