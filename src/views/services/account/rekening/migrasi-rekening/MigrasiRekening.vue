<template>
  <div>
    <bank-add-new
      :is-add-new-user-sidebar-active.sync="isAddNewUserSidebarActive"
      :role-options="roleOptions"
      :plan-options="planOptions"
      @refetch-data="refetchData"
    />

    <!-- Filters -->
    <bank-filters
      :role-filter.sync="roleFilter"
      :plan-filter.sync="planFilter"
      :status-filter.sync="statusFilter"
      :role-options="roleOptions"
      :plan-options="planOptions"
      :status-options="statusOptions"
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
            <h2>Migrasi Rekening</h2>
          </b-col>
        </b-row>
      </div>

      <b-table :fields="fields" :items="items">
        <!-- number -->

        <!-- rekening asal -->
        <template #cell(asal)>
          <b-form-select
            v-model="selectedRekeningAsal"
            :options="rekeningAsal"
          ></b-form-select>
          <!-- <v-select
            v-model="selected"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            :options="option"
        /> -->
        </template>

        <!-- rekening tujuan -->
        <template #cell(tujuan)>
          <b-form-select
            v-model="selectedRekeningTujuan"
            :options="rekeningTujuan"
          ></b-form-select>
          <!-- <v-select
            v-model="selected1"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            :options="option1"
        /> -->
        </template>

        <!-- jumlah -->
        <template #cell(jumlah)>
          <b-form-group>
            <b-form-input
              id="basicInput"
              v-model="migrasiTotal"
              @keypress="onlyNumber"
              placeholder="Enter jumlah..."
            /> </b-form-group
        ></template>

        <!-- rekening urutan -->
        <template #cell(urutan)>
          <b-form-select v-model="order" :options="option2"></b-form-select>
          <!-- <v-select
            v-model="selected2"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            :options="option2"
        /> -->
        </template>
        <!-- actions -->
        <template #cell(actions)>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="primary"
            class="mr-1"
            @click="migrate('success', 'top-center')"
          >
            Migrasi
          </b-button>
        </template>
        <!-- action -->
      </b-table>
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
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    ToastificationContent,
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
  data() {
    return {
      // selected rekening tujuan
      selectedRekeningAsal: null,
      selectedRekeningTujuan: null,
      migrasiTotal: null,
      order: 'ASC',
      selected2: null,
      option2: [
        { text: 'Awal', value: 'ASC' },
        { text: 'Akhir ', value: 'DESC' },
      ],
      currentPage: 1,
      fields: [
        {
          key: 'asal',
          label: 'Rekening Asal',
        },
        {
          key: 'tujuan',
          label: 'Rekening Tujuan',
        },
        {
          key: 'jumlah',
          label: 'Jumlah Rek. Player',
        },
        {
          key: 'urutan',
        },
        {
          key: 'actions',
        },
      ],
      items: [
        {
          asal: 'BCA',
          tujuan: 'test',
          jumlah: 42,
          urutan: 'test',
          actions: 'test',
        },
      ],
    }
  },

  watch: {
    selectedRekeningAsal(value) {
      this.rekeningTujuanList({ id: value })
    },
  },

  computed: {
    ...mapGetters('services', [
      'getRekeningAsal',
      'getRekeningTujuan',
      'getBankAccount',
    ]),

    rekeningAsal() {
      const rekeningAsal = this.getRekeningAsal?.map((item) => ({
        value: item.id,
        text: item.rekening,
      }))

      rekeningAsal.unshift({ text: 'Pilih Rekening Asal', value: null })

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.selectedRekeningAsal = null

      return rekeningAsal
    },

    rekeningTujuan() {
      const rekeningTujuan = this.getRekeningTujuan?.map((item) => ({
        value: item.id,
        text: item.rekening,
      }))

      rekeningTujuan.unshift({ text: 'Pilih Rekening Tujuan', value: null })

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.selectedRekeningTujuan = null

      return rekeningTujuan
    },
  },

  mounted() {
    this.rekeningAsalList()
    this.selectedRekeningAsal = this.rekeningAsal[0].value ?? null
  },

  methods: {
    ...mapActions('services', [
      'rekeningTujuanList',
      'rekeningAsalList',
      'migrateRekining',
      'bankAccountlist',
    ]),

    async migrate(variant, position) {
      if (!(await this.dialog())) return

      const payload = {
        asalRekId: this.selectedRekeningAsal,
        tujuanRekId: this.selectedRekeningTujuan,
        migrasiTotal: this.migrasiTotal,
        orderBy: this.order,
      }
      const payload1 = {
        nameAccount: '',
        page: 1,
      }

      const response = await this.migrateRekining(payload)
      await this.bankAccountlist(payload1)

      if (response.status) {
        await this.$toast(
          {
            component: ToastificationContent,
            props: {
              title: 'success',
              icon: 'CheckIcon',
              text: 'Updated Successfully.',
              variant,
            },
          },
          {
            position,
          }
        )
      }
      this.migrasiTotal = null
      await this.rekeningAsalList()
    },

    async dialog() {
      if (!this.selectedRekeningAsal) {
        await this.$toast(
          {
            component: ToastificationContent,
            props: {
              title: 'Error',
              icon: 'AlertCircleIcon',
              text: 'Please Select Rekening Asal',
              variant: 'danger',
            },
          },
          {
            position: 'top-center',
          }
        )

        return false
      }

      if (!this.selectedRekeningTujuan) {
        await this.$toast(
          {
            component: ToastificationContent,
            props: {
              title: 'Error',
              icon: 'AlertCircleIcon',
              text: 'Please Select Rekening Tujuan',
              variant: 'danger',
            },
          },
          {
            position: 'top-center',
          }
        )

        return false
      }

      if (!this.migrasiTotal) {
        await this.$toast(
          {
            component: ToastificationContent,
            props: {
              title: 'Error',
              icon: 'AlertCircleIcon',
              text: 'jumlah Is Empty',
              variant: 'danger',
            },
          },
          {
            position: 'top-center',
          }
        )

        return false
      }

      const userResponse = await this.$swal({
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

      if (userResponse.isConfirmed) {
        return true
      }

      await this.$swal({
        title: 'Cancelled',
        text: 'Ok your data is not Updated.',
        confirmButtonText: 'Ok',
        customClass: {
          cancelButton: 'btn btn-secondary',
        },
      })

      return false
    },

    onlyNumber($event) {
      const keyCode = $event.keyCode ? $event.keyCode : $event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 190) {
        $event.preventDefault()
      }
    },
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
