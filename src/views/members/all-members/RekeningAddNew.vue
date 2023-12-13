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
        <h5 class="mb-0">Create Rekening</h5>
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
          <!-- BANK OPTION -->
          <b-form-group label="Bank">
            <b-form-select v-model="bankName">
              <option :value="null">Pilih Bank</option>
              <option
                v-for="datas in getConstantRekeningList"
                :key="datas"
                :value="datas.id"
              >
                {{ datas.name }}
              </option>
            </b-form-select>
          </b-form-group>

          <!-- NAMR -->
          <b-form-group label="Name">
            <b-form-input
              v-model="Name"
              class="d-inline-block mr-1"
              readonly
              :value="Name"
            />
          </b-form-group>

          <!-- ACCOUNT -->
          <b-form-group label="Rekening">
            <b-form-input
              id="basicInput"
              v-model="Rrkening"
              placeholder="Enter Rekening"
            />
            <span v-if="!required" class="text-danger">{{
              RrkeningRequired
            }}</span>
          </b-form-group>

          <!-- BUUTON -->
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
  BFormInvalidFeedback,
  BButton,
  BFormSelect,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required, alphaNum, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import countries from '@/@fake-db/data/other/countries'
import store from '@/store'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import { mapActions, mapGetters } from 'vuex'
import { bus } from '../../../main'

export default {
  components: {
    ToastificationContent,
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
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
  computed: {
    ...mapGetters('members', ['getConstantRekeningList']),
  },
  created() {
    this.ConstantRekeningList()
    bus.$on('create', (data) => {
      this.Name = data.name
      this.id = data.id
    })
  },
  methods: {
    ...mapActions('members', ['ConstantRekeningList']),

    // flip in sweet alert this
    async flipIn(variant, position) {
      if (this.Rrkening !== null) {
        this.required = true
        this.$swal({
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
        }).then((result) => {
          if (result.value) {
            const payload = {
              id: this.id,
              bankID: this.bankName,
              name: this.Name,
              rekening: this.Rrkening,
            }
            if (this.$store.dispatch('members/createRekening', payload)) {
              this.$toast(
                {
                  component: ToastificationContent,
                  props: {
                    title: 'Success',
                    icon: 'CheckIcon',
                    text: 'Rekening bank test created',
                    variant,
                  },
                },
                {
                  position,
                }
              )
              this.isAddNewUserSidebarActive = false
              // this.$router.push({ name: 'members-all-members' })
            }
            // toast notification this
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
        })
      } else {
        this.required = false
        this.RrkeningRequired = 'This field is required'
      }
    },
  },

  data() {
    return {
      bankName: null,
      required,
      alphaNum,
      email,
      countries,
      Name: null,
      Rrkening: null,
      id: null,
    }
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
