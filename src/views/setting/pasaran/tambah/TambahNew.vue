<template>
  <b-sidebar
    id="add-new-user-sidebar"
    :visible="isAddNewUserSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-user-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header ADD -->
      <div
        class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1"
      >
        <h5 class="mb-0">Create Pasaran</h5>
        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />
      </div>

      <!-- BODY -->
      <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
        <!-- Form -->
        <b-form
          class="p-2"
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <!-- Nama ID -->
          <b-form-group label="Nama ID">
            <b-form-input
              id="basicInput"
              v-model="pasaranData.nama_id"
              placeholder="Enter Nama ID"
            />
          </b-form-group>

          <!-- Nama Market -->
          <b-form-group label="Nama Market">
            <b-form-input
              id="basicInput "
              v-model="pasaranData.nama_pasaran"
              placeholder="Enter Nama Market"
            />
          </b-form-group>

          <!-- Web -->
          <b-form-group label="Web">
            <b-form-input
              id="basicInput"
              v-model="pasaranData.web"
              placeholder="Enter Web"
            />
          </b-form-group>

          <!-- Hari Di Undi -->
          <b-form-group label="Hari Di Undi">
            <b-form-input
              id="basicInput"
              v-model="pasaranData.hari_di_undi"
              placeholder="Enter Hari Di Undi"
            />
          </b-form-group>

          <!-- Libur -->
          <b-form-group label="Libur">
            <b-form-input
              id="basicInput"
              placeholder="Enter Libur"
              v-model="pasaranData.libur"
            />
          </b-form-group>

          <!-- Tutup -->
          <b-form-group label="Tutup">
            <b-form-select v-model="pasaranData.tutup" id="sortOptions">
              <option value="">Select Hour</option>
              <option v-for="(time, index) in times" :key="index">
                {{ time }} <span>WIB</span>
              </option>
            </b-form-select>
          </b-form-group>

          <!-- Jadwal -->
          <b-form-group label="Jadwal">
            <b-form-select v-model="pasaranData.jadwal" id="sortOptions">
              <option value="">Select Hour</option>
              <option v-for="(time, index) in times" :key="index">
                {{ time }} <span>WIB</span>
              </option>
            </b-form-select>
          </b-form-group>

          <!-- Form Actions Add type="submit"-->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
              @click="flipIn('success', 'top-center')"
            >
              Create
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-secondary"
              @click="hide"
            >
              Cancel
            </b-button>
          </div>
        </b-form>
      </validation-observer>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BSidebar,
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
  BFormSelect,
} from 'bootstrap-vue'
import { ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import useJwt from '@/auth/jwt/useJwt'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    BFormSelect,
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,

    // Form Validation
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewUserSidebarActive',
    event: 'update:is-add-new-user-sidebar-active',
  },
  props: {
    isAddNewUserSidebarActive: {
      type: Boolean,
      required: true,
    },
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

  data() {
    return {
      // SET TIME THIS
      start_time: '00:00',
      end_time: '23:30',
      x: 15,
      result: '',
      required,
    }
  },

  methods: {
    ...mapActions('settings', ['MarketList']),
    // SET TIME THIS
    formatTime(date) {
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      return `${hours}:${minutes}`
    },

    flipIn(variant, position) {
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
          useJwt
            .createData('betsAll', '/lottery-market-create', this.pasaranData)
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
                this.MarketList(),
                this.$emit('update:is-add-new-user-sidebar-active', false)
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
            text: 'Ok your data is still there and safe',
            confirmButtonText: 'Ok',
            customClass: {
              cancelButton: 'btn btn-secondary',
            },
          })
        }
      })
    },
  },

  setup() {
    const blankAdminData = {
      // name: '',
      // status: '',
      nama_id: '',
      nama_pasaran: '',
      web: '',
      hari_di_undi: '',
      libur: '',
      tutup: '',
      jadwal: '',
    }
    const pasaranData = ref(JSON.parse(JSON.stringify(blankAdminData)))
    const resetIpData = () => {
      pasaranData.value = JSON.parse(JSON.stringify(blankAdminData))
    }
    const { refFormObserver, resetForm } = formValidation(resetIpData)

    const onSubmit = () => {
      store.dispatch('services/createBankName', pasaranData.value).then(() => {
        emit('refetch-data')
        emit('update:is-add-new-user-sidebar-active', false)
      })
    }

    return {
      pasaranData,
      onSubmit,
      refFormObserver,
      resetForm,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-sweetalert.scss';
#add-new-user-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
