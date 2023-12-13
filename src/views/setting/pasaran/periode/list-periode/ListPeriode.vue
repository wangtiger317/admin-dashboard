<template>
  <div>
    <!-- Table Container Card -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="9"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Lottery Market</h2>
          </b-col>
        </b-row>
      </div>

      <!-- THIS TABLE -->
      <b-table
        :fields="fields"
        :items="getListPeriode"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- NO -->
        <template #cell(nomor)="{ index }">{{ index + 1 }}</template>

        <!-- NAMA PASARAN -->
        <template #cell(pasaran)="{ item }">{{ item.name }}</template>

        <!-- NAMA ID -->
        <template #cell(namaId)="{ item }">{{ item.name_initial }}</template>

        <!-- PERIODE -->
        <template #cell(periode)="{ item }">{{ item.period }}</template>

        <!-- STATUS -->
        <template #cell(status)="{ item }">
          <b-form-select v-model="item.status">
            <option value="1">Online</option>
            <option value="0">Offline</option>
          </b-form-select>
        </template>

        <!--AUTO ONLINE -->
        <template #cell(enabled)="{ item }">
          <b-form-checkbox
            v-if="item.id == 1 || item.id == 7 || item.id == 10"
            v-model="item.auto_online"
            checked="true"
            name="check-button"
            switch
            inline
          >
          </b-form-checkbox
        ></template>

        <!-- ACTION -->
        <template #cell(actions)="{ item }">
          <div class="text-nowrap">
            <!-- save this -->
            <feather-icon
              :id="`invoice-row-${item.id}-save-icon`"
              icon="SaveIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="
                flipInSaveProfile(
                  item.id,
                  item.status,
                  item.auto_online,
                  'success',
                  'top-center'
                )
              "
            />
            <b-tooltip
              title="Save"
              :target="`invoice-row-${item.id}-save-icon`"
            />
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
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import { mapActions, mapGetters } from 'vuex'
import useJwt from '@/auth/jwt/useJwt'

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

  computed: {
    ...mapGetters('settings', ['getListPeriode']),
  },

  created() {
    this.periodeList()
  },

  methods: {
    ...mapActions('settings', ['periodeList']),

    // SAVE THIS NEWW
    flipInSaveProfile(id, status, auto_online, variant, position) {
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
            id,
            status,
            auto_online: auto_online === 'true' || auto_online === true ? 1 : 0,
          }
          useJwt
            .updateData('settingAll', '/update-status', body, {})
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
                },
                this.periodeList()
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
      selecteds: null,
      options: [{ text: 'Online' }, { value: 'a', text: 'Offline' }],
      currentPage: 1,
      fields: [
        {
          key: 'nomor',
          label: 'no',
        },
        {
          key: 'pasaran',
          label: 'Nama pasaran',
        },
        {
          key: 'namaId',
          label: 'Nama ID',
        },
        {
          key: 'periode',
        },
        {
          key: 'status',
        },
        {
          key: 'enabled',
          label: 'Auto online',
        },
        {
          key: 'actions',
        },
      ],
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
