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
            <h2>Edit Credit</h2>
          </b-col>
        </b-row>
      </div>
      <b-table :fields="fields" :items="items">
        <template #cell(username)>
          {{ getMemberEditCredit.username }}
        </template>
        <template #cell(credit)>
          {{ formatPrice(getMemberEditCredit.credit) }}
        </template>

        <!-- select plus minus -->
        <template #cell(tambahkurang)>
          <b-form-select
            v-model="selectedPlusMinus"
            :options="optionSelectPlusMinus"
          ></b-form-select
        ></template>

        <!-- jumlah -->
        <template #cell(jumlah)>
          <b-form-group>
            <cleave
              v-model="jumlah"
              id="number"
              class="form-control"
              :raw="false"
              :options="amounts.number"
            />
          </b-form-group>

          <b-form-group>
            <validation-provider
              #default="{ errors }"
              name="Jumlah"
              rules="required"
            >
              <b-form-input
                v-model="jumlah"
                :state="errors.length > 0 ? false : null"
                placeholder="Jumlah"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </template>

        <!-- Detail -->
        <template #cell(detail)>
          <b-form-select
            v-model="selectedDetail"
            :options="optionDetail"
          ></b-form-select
        ></template>

        <!-- Detail Description-->
        <template #cell(detailDescription)>
          <b-form-input v-model="detailDesc" class="form-control" />
        </template>

        <!-- actions -->
        <template #cell(action)>
          <!-- Save this icon -->
          <feather-icon
            icon="SaveIcon"
            size="16"
            class="cursor-pointer mx-1"
            @click="
              flipInSave(
                selectedPlusMinus,
                jumlah,
                selectedDetail,
                detailDesc,
                'success',
                'top-center'
              )
            "
          />
          <b-tooltip title="Save" />
        </template>
      </b-table>
      <b-row>
        <b-col cols="10" md="10" class="text-left ml-2 py-2">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            @click="$router.push({ name: 'members-all-members' })"
          >
            Back
          </b-button>
        </b-col>
      </b-row>
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
  BTooltip,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BFormSelect,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import BCardCode from '@core/components/b-card-code'
import Cleave from 'vue-cleave-component'
import 'cleave.js/dist/addons/cleave-phone.us'
import { mapActions, mapGetters } from 'vuex'
import useJwt from '@/auth/jwt/useJwt'
import { ref } from '@vue/composition-api'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
export default {
  components: {
    ToastificationContent,
    Cleave,
    BCardCode,
    BCard,
    BRow,
    BCol,
    BFormSelect,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BTooltip,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    vSelect,
  },

  computed: {
    ...mapGetters('members', ['getMemberEditCredit']),
    ...mapGetters('members', ['getRekMember']),
    // ...mapGetters('members', ['getRekeningTujuan']),
  },

  created() {
    let id = this.$route.params.id
    const payload = {
      id,
    }
    this.memberDepoWd(payload)
  },

  methods: {
    ...mapActions('members', ['memberDepoWd']),

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    // flipInSave
    flipInSave(
      selTambahKurang,
      amount,
      selDetail,
      detailDesc,
      variant,
      position
    ) {
      this.$swal({
        title: 'Are you sure?',
        text: 'Data will be created.',
        confirmButtonText: 'Create',
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
          let id = this.$route.params.id
          let jumlahc = amount ? amount.replace(/,/g, '') : ''
          const body = {
            selTamKur: selTambahKurang,
            jumlahMemberFormEditCredit: jumlahc,
            selDetail: selDetail,
            deskripsiMemberFormEditCredit: detailDesc,
          }
          useJwt
            .updateData('allMembers', `/member-update-credit/${id}`, body)
            .then((response) => {
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
                },
                this.$router.push({
                  name: 'members-all-members',
                })
              )
            })
            .catch((error) => {
              if (error.response.data.errors.jumlahMemberFormEditCredit) {
                this.$toast(
                  {
                    component: ToastificationContent,
                    props: {
                      title: 'Error',
                      icon: 'AlertCircleIcon',
                      text: error.response.data.errors
                        .jumlahMemberFormEditCredit[0],
                      variant: 'danger',
                    },
                  },
                  {
                    position: 'top-center',
                  }
                )
                return false
              }
              if (error.response.data.errors.deskripsiMemberFormEditCredit) {
                this.$toast(
                  {
                    component: ToastificationContent,
                    props: {
                      title: 'Error',
                      icon: 'AlertCircleIcon',
                      text: error.response.data.errors
                        .deskripsiMemberFormEditCredit[0],
                      variant: 'danger',
                    },
                  },
                  {
                    position: 'top-center',
                  }
                )
                return false
              }
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

  data() {
    return {
      jumlah: '',
      detail: '',
      detailDesc: '',

      amounts: {
        number: {
          numeral: true,
          numeralThousandsGroupStyle: 'thousand',
        },
      },

      optionSelectPlusMinus: [
        { value: 'formTambah', text: 'Tambah' },
        { value: 'formKurang', text: 'Kurang' },
      ],
      selectedPlusMinus: 'formTambah',

      optionDetail: [
        { value: 'new_member', text: 'New Member' },
        { value: 'deposit_harian', text: 'Deposit Harian' },
      ],
      selectedDetail: 'new_member',

      fields: [
        {
          key: 'username',
          label: 'username',
        },
        {
          key: 'credit',
          label: 'credit',
        },

        {
          key: 'tambahkurang',
          label: '+ / -',
        },
        {
          key: 'jumlah',
          label: 'jumlah',
        },
        {
          key: 'detail',
          label: 'Details',
        },
        {
          key: 'detailDescription',
          label: 'Detail description',
        },
        {
          key: 'action',
          label: '',
        },
      ],
      items: [
        {
          No: '1',
          username: '-',
          credit: '0',
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
