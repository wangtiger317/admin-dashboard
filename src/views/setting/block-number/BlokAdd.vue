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
        <h5 class="mb-0">Add Block Number</h5>
        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />
      </div>

      <!-- BODY -->
      <validation-observer #default="{ hide }" ref="refFormObserver">
        <!-- Form -->
        <b-form class="p-2" @submit.prevent>
          <!-- Pasaran -->
          <b-form-group label="Pasaran">
            <b-form-select
              v-model="selectedPasaran"
              :options="pasaran"
            ></b-form-select>
          </b-form-group>

          <!-- Games -->
          <b-form-group label="Games" label-for="readOnlyInput">
            <b-form-input id="readOnlyInput" :value="game" readonly />
          </b-form-group>

          <!-- Nomor 1 -->
          <b-form-group label="Nomor" class="d-flex">
            <v-row class="d-flex">
              <!--INPUT NUMBER 1 -->
              <b-form-input
                v-model="number3"
                data-index="0"
                maxlength="1"
                class="input-cust text-center"
                @keypress="onlyNumber"
                @keyup="focusNext($event, 1)"
              />

              <!-- INPUT NUMBER 2 -->
              <b-form-input
                v-model="number4"
                data-index="1"
                maxlength="1"
                class="input-cust text-center"
                @keypress="onlyNumber"
                @keyup="focusNext($event, 1)"
              />

              <!-- INPUT NUMBER 3 -->
              <b-form-input
                v-model="number5"
                data-index="2"
                maxlength="1"
                class="input-cust text-center"
                @keypress="onlyNumber"
                @keyup="focusNext($event, 1)"
              />

              <!-- INPUT NUMBER 4 -->
              <b-form-input
                v-model="number6"
                data-index="3"
                maxlength="1"
                class="input-cust text-center"
                @keypress="onlyNumber"
                @keyup="focusNext($event, 1)"
              />
            </v-row>
          </b-form-group>

          <!-- Form Actions Add type="submit"-->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
              @click="create"
            >
              Add
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
  BFormInvalidFeedback,
  BButton,
  BFormSelect,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required, alphaNum, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import countries from '@/@fake-db/data/other/countries'
import store from '@/store'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    ToastificationContent,
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
    vSelect,
    BFormSelect,
    // Form Validation
    ValidationProvider,
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
    roleOptions: {
      type: Array,
      required: true,
    },
    planOptions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedPasaran: null,
      nomor: null,
      number3: null,
      number4: null,
      number5: null,
      number6: null,
      required,
      alphaNum,
      email,
      countries,
    }
  },
  computed: {
    ...mapGetters('settings', ['getListPasaran']),
    pasaran() {
      const market = this.getListPasaran?.map((item) => ({
        value: item.id,
        text: `${item.name_initial} - ${item.name}`,
      }))

      market.unshift({ text: 'Pilih Pasaran' })
      return market
    },

    game() {
      if (
        this.number3 != null &&
        this.number4 != null &&
        this.number5 != null &&
        this.number6 != null
      ) {
        return '4D'
      }
      if (
        this.number3 == null &&
        this.number4 != null &&
        this.number5 != null &&
        this.number6 != null
      ) {
        return '3D'
      }
      if (
        this.number3 == null &&
        this.number4 == null &&
        this.number5 != null &&
        this.number6 != null
      ) {
        return '2D'
      }
      if (
        this.number3 != null &&
        this.number4 != null &&
        this.number5 == null &&
        this.number6 == null
      ) {
        return '2D Depan'
      }
      if (
        this.number3 == null &&
        this.number4 != null &&
        this.number5 != null &&
        this.number6 == null
      ) {
        return '2D Tengah'
      }

      return 'Game'
    },
  },
  watch: {
    nomor(value) {
      const numbers = value.split('')
      this.number3 = numbers[0] ?? null
      this.number4 = numbers[1] ?? null
      this.number5 = numbers[2] ?? null
      this.number6 = numbers[3] ?? null
    },
    number3(value) {
      if (!value.length) this.number3 = null
    },
    number4(value) {
      if (!value.length) this.number4 = null
    },
    number5(value) {
      if (!value.length) this.number5 = null
    },
    number6(value) {
      if (!value.length) this.number6 = null
    },
  },
  mounted() {
    this.MarketList()
  },
  methods: {
    ...mapActions('settings', ['createBlok', 'MarketList']),

    // next input
    focusNext(event, max) {
      if (event.target.value.length === max) {
        let target = event.target
        let index = target.getAttribute('data-index')

        if (index != target.parentElement.children.lenght - 1) {
          target.nextElementSibling.focus()
        }
      }
    },

    async create() {
      if (!(await this.dialog())) return

      const payload = {
        id: this.selectedPasaran,
        number3: this.number3,
        number4: this.number4,
        number5: this.number5,
        number6: this.number6,
      }

      const response = await this.createBlok(payload)
      if (response.status) {
        this.number3 = null
        this.number4 = null
        this.number5 = null
        this.number6 = null
        this.game = null
        await this.$toast(
          {
            component: ToastificationContent,
            props: {
              title: 'Success',
              icon: 'CheckIcon',
              text: response.data.message,
              variant: 'success',
            },
          },
          {
            position: 'top-center',
          }
        )

        this.isAddNewUserSidebarActive = false
      } else {
        const data = response
        if (data.errors) {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                text: data.errors.data.message,
                variant: 'danger',
              },
            },
            {
              position: 'top-center',
            }
          )
        }
      }
    },

    async dialog() {
      if (!this.selectedPasaran) {
        await this.$toast(
          {
            component: ToastificationContent,
            props: {
              title: 'Error',
              icon: 'AlertCircleIcon',
              text: 'Please Select Pasaran',
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
  setup(props, { emit }) {
    const blankUserData = {
      fullName: '',
      username: '',
      email: '',
      role: null,
      currentPlan: null,
      company: '',
      country: '',
      contact: '',
    }

    const userData = ref(JSON.parse(JSON.stringify(blankUserData)))
    const resetuserData = () => {
      userData.value = JSON.parse(JSON.stringify(blankUserData))
    }

    const onSubmit = () => {
      store.dispatch('app-user/addUser', userData.value).then(() => {
        emit('refetch-data')
        emit('update:is-add-new-user-sidebar-active', false)
      })
    }

    const { refFormObserver, getValidationState, resetForm } =
      formValidation(resetuserData)

    return {
      userData,
      onSubmit,

      refFormObserver,
      getValidationState,
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
