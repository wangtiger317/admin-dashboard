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
        <h5 class="mb-0">Create Bank Name</h5>
        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />
      </div>

      <!-- BODY -->
      <validation-observer #default="{ hide }" ref="refFormObserver">
        <b-form
          class="p-2"
          @submit.prevent="() => {}"
          @reset.prevent="resetForm"
        >
          <!-- name -->
          <b-form-group label="Bank Name">
            <b-form-input
              id="basicInput"
              v-model="adminData.name"
              placeholder="Enter Bank Name"
              required
            />
          </b-form-group>

          <b-form-group label="Bank / Non Bank">
            <b-form-select v-model="adminData.status" id="sortOptions">
              <option value="">Select Type Bank</option>
              <option value="1">Bank</option>
              <option value="0">Non Bank</option>
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

  data() {
    return {
      required,
    }
  },

  methods: {
    async flipIn(variant, position) {
      const result = await this.$swal({
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
      if (result.value) {
        if (
          await this.$store.dispatch('services/createBankName', this.adminData)
        ) {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: `Created successfully!`,
                variant,
              },
            },
            {
              position,
            }
          )
          this.$emit('update:is-add-new-user-sidebar-active', false)
        }
      } else if (result.dismiss === 'cancel') {
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

  setup() {
    const blankAdminData = {
      name: '',
      status: '',
    }
    const adminData = ref(JSON.parse(JSON.stringify(blankAdminData)))
    const resetIpData = () => {
      adminData.value = JSON.parse(JSON.stringify(blankAdminData))
    }
    const { refFormObserver, resetForm } = formValidation(resetIpData)

    const onSubmit = () => {
      store.dispatch('services/createBankName', adminData.value).then(() => {
        emit('refetch-data')
        emit('update:is-add-new-user-sidebar-active', false)
      })
    }

    return {
      adminData,
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
