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
        <h5 class="mb-0">Create Bank Account</h5>
        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />
      </div>

      <!-- BODY -->
      <validation-observer ref="refFormObserver">
        <!-- Form -->
        <b-form
          class="p-2"
          @submit.prevent="() => {}"
          @reset.prevent="resetForm"
        >
          <b-form-group label="Bank">
            <v-select
              v-model="form.namaProviderBank"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="name"
              placeholder="Select Bank"
              :options="options"
            />
          </b-form-group>

          <!-- name -->
          <b-form-group label="Name">
            <b-form-input
              id="basicInput"
              v-model="form.namaRekeningBank"
              placeholder="Enter name"
            />
          </b-form-group>

          <!-- account -->
          <b-form-group label="Account">
            <b-form-input
              id="basicInput"
              v-model="form.nomor_rekening"
              type="number"
              placeholder="Enter the account number... account"
            />
          </b-form-group>

          <!-- Form Actions Add type="submit"-->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
              @click="flipIn('success', 'top-center', form)"
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
import { BSidebar, BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue'
import { ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required, alphaNum, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import countries from '@/@fake-db/data/other/countries'
import store from '@/store'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'

export default {
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    vSelect,

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
      selected: null,
      form: {
        namaProviderBank: null,
        namaRekeningBank: '',
        nomor_rekening: null,
      },
      required,
      alphaNum,
      email,
      countries,
    }
  },
  computed: {
    options() {
      return this.$store.getters['services/getRekeningConstantList']
    },
  },
  async mounted() {
    await this.$store.dispatch('services/fetchRekeningConstantList')
  },
  methods: {
    // flip in sweet alert this
    async flipIn(variant, position, item) {
      const action = await this.$swal({
        title: 'Are you sure?',
        text: 'Data will Created.',
        confirmButtonText: 'Save',
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
      if (action.value) {
        const { namaProviderBank, ...data } = item
        const payload = {
          namaProviderBank: namaProviderBank.id,
          ...data,
        }
        if (await this.$store.dispatch('services/createBankAccount', payload)) {
          // toast notification this
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'Created successfully!',
                variant,
              },
            },
            {
              position,
            }
          )
          this.$emit('update:is-add-new-user-sidebar-active', false)
        }
      } else if (action.dismiss === 'cancel') {
        this.$swal({
          title: 'Cancelled',
          text: 'Ok your data is not created',
          confirmButtonText: 'Ok',
          customClass: {
            cancelButton: 'btn btn-secondary',
          },
        })
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

    const { refFormObserver, resetForm } = formValidation(resetuserData)

    return {
      userData,
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
