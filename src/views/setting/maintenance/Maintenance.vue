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
            <h2>Maintenance</h2>
          </b-col>
        </b-row>
      </div>

      <!-- THIS TABLE -->
      <b-table
        :fields="fields"
        :items="getMaintenace"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- MAIN MAINTENANCE MESSAGE -->
        <template #cell(maintenanceMessage)="{ item }">
          <b-form-group>
            <b-form-input
              v-model="item.main_maintenance"
              id="basicInput"
              placeholder="Enter Maintenance Message..."
            /> </b-form-group
        ></template>

        <!-- ADDITIONAL MAINTENANCE DESCRIPTION -->
        <template #cell(description)="{ item }">
          <b-form-group>
            <b-form-input
              v-model="item.main_maintenance_description"
              id="basicInput"
              placeholder="Enter Additional Maintenance Description..."
            /> </b-form-group
        ></template>

        <!-- STATUS -->
        <template #cell(status)="{ item }">
          <b-form-select v-model="item.status" id="sortOptions">
            <option value="503">Maintence</option>
            <option value="200">No Maintence</option>
          </b-form-select>
        </template>

        <!-- ACTIONS MAINTENANCE -->
        <template #cell(action)="{ item }">
          <div class="text-nowrap">
            <!-- save this -->
            <feather-icon
              :id="`invoice-row-${item.id}-save-icon`"
              icon="SaveIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="ActionSaves('success', 'top-center', item)"
            />
            <b-tooltip
              title="Save"
              :target="`invoice-row-${item.id}-save-icon`"
            />
          </div>
        </template>
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
  BTooltip,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    BTooltip,
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
    ...mapGetters('settings', ['getMaintenace']),
  },

  created() {
    this.maintenanceList()
  },

  methods: {
    ...mapActions('settings', ['maintenanceList', 'updateMaintenance']),

    // ActionSaves THIS
    async ActionSaves(variant, position, item) {
      const res = await this.$swal({
        title: 'Are you sure?',
        confirmButtonText: 'Ok',
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
        if (await this.updateMaintenance(item)) {
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
      }
    },
  },

  data() {
    return {
      fields: [
        {
          key: 'maintenanceMessage',
          label: 'Main Maintenance Message',
        },
        {
          key: 'description',
          label: 'Additional Maintenance Description',
        },
        {
          key: 'status',
        },
        {
          key: 'action',
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
