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
        <h5 class="mb-0">Create Agent IP</h5>
        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />
      </div>

      <!-- BODY -->
      <validation-observer ref="refFormObserver">
        <b-form class="p-2" @submit.prevent="" @reset.prevent="resetForm">
          <b-form-group label="IP Adress" class="d-flex">
            <v-row class="d-flex">
              <!--INPUT NUMBER 1 -->
              <b-form-input
                v-model="ipData.number1"
                data-index="0"
                maxlength="3"
                class="input-cust text-center"
                required
                @keypress="onlyNumber"
                @keyup="focusNext($event, 3)"
              />
              <span class="input-coms">.</span>

              <!-- INPUT NUMBER 2 -->
              <b-form-input
                v-model="ipData.number2"
                data-index="1"
                maxlength="3"
                class="input-cust text-center"
                required
                @keypress="onlyNumber"
                @keyup="focusNext($event, 3)"
              />
              <span class="input-coms">.</span>

              <!-- INPUT NUMBER 3 -->
              <b-form-input
                v-model="ipData.number3"
                data-index="2"
                maxlength="3"
                class="input-cust text-center"
                @keypress="onlyNumber"
                @keyup="focusNext($event, 3)"
              />
              <span class="input-coms">.</span>

              <!-- INPUT NUMBER 4 -->
              <b-form-input
                v-model="ipData.number4"
                data-index="3"
                maxlength="3"
                class="input-cust text-center"
                @keypress="onlyNumber"
                @keyup="focusNext($event, 3)"
              />
            </v-row>
          </b-form-group>

          <!-- description -->
          <b-form-group label="Description">
            <b-form-input
              id="basicInput"
              required
              v-model="ipData.description"
              placeholder="Enter Description"
            />
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
import { BSidebar, BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue'
import { ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'

export default {
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
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

    // number only
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 190) {
        $event.preventDefault()
      }
    },

    // flip in sweet alert this
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
        // toast notification this
        if (await this.$store.dispatch('admin/createAdminIp', this.ipData)) {
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
    checkIpFormat() {
      if (!this.ipAddressFormat()) {
        this.$toast(
          {
            component: ToastificationContent,
            props: {
              title: 'Error',
              icon: 'AlertCircleIcon',
              text: 'Format IP salah',
              variant: 'danger',
            },
          },
          {
            position: 'top-center',
          }
        )
        return false
      }
      return true
    },
  },
  setup() {
    const blankIpData = {
      // address: '',
      number1: '',
      number2: '',
      number3: '',
      number4: '',
      description: '',
    }

    const ipData = ref(JSON.parse(JSON.stringify(blankIpData)))

    const ipAddressFormat = () =>
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(\*|25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(\*|25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        ipData.value.address
      )

    const resetIpData = () => {
      ipData.value = JSON.parse(JSON.stringify(blankIpData))
    }

    const { refFormObserver, resetForm } = formValidation(resetIpData)

    return {
      ipData,
      ipAddressFormat,

      refFormObserver,
      resetForm,
    }
  },
}
</script>

<style lang="scss" scoped>
.b-form-input {
  display: flex;
}
.input-cust {
  width: 93px;
}
.input-coms {
  margin-top: 6px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-sweetalert.scss';
#add-new-user-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
