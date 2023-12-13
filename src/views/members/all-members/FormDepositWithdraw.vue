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
            <h2>Form Deposit / Withdraw</h2>
          </b-col>
        </b-row>
      </div>
      <b-table :fields="fields" :items="items">
        <template #cell(username)> {{ getMemberDepoWd.username }} </template>
        <template #cell(credit)>
          {{ formatPrice(getMemberDepoWd.credit) }}
        </template>

        <!-- deposit/withdraw -->
        <template #cell(deposit)>
          <b-form-select
            v-model="formOption"
            @change="getRekeningTujuans(formOption)"
          >
            <option value="formDepo">Pembayaran (Desposit)</option>
            <option value="formWd">Penarikan (Withdraw)</option>
          </b-form-select>
        </template>
        <!-- Bank Asal -->
        <template #cell(bank)>
          <b-form-select v-model="bankOptions" id="bankOptions">
            <option value="">--Pilih Bank--</option>
            <option
              v-for="datas in getRekMember"
              :key="datas"
              :value="datas.id"
            >
              {{ datas.rekening }}
            </option>
          </b-form-select>
        </template>
        <!-- Bank tujuan -->
        <template #cell(bankTujuan)>
          <b-form-select v-model="bankTujuanOptions">
            <option value="">--Pilih Bank--</option>
            <option
              v-for="datas in getRekeningTujuan"
              :key="datas"
              :value="datas.id"
            >
              {{ datas.rekening }}
            </option>
          </b-form-select>
        </template>

        <!-- jumlah -->
        <template #cell(jumlah)>
          <b-form-group>
            <cleave
              id="number"
              v-model="jumlah"
              class="form-control"
              :raw="false"
              :options="optionsss.number"
            />
          </b-form-group>
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
                formOption,
                bankOptions,
                bankTujuanOptions,
                jumlah,
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
    ...mapGetters('members', ['getMemberDepoWd']),
    ...mapGetters('members', ['getRekMember']),
    ...mapGetters('members', ['getRekeningTujuan']),
  },
  created() {
    let id = this.$route.params.id
    const payload = {
      id,
      form: 'formDepo',
    }
    this.memberDepoWd(payload)
    this.memberRekening(payload)
    this.rekeningTujuanMember(payload)
  },
  methods: {
    ...mapActions('members', ['memberRekening']),
    ...mapActions('members', ['memberDepoWd']),
    ...mapActions('members', ['rekeningTujuanMember']),

    getRekeningTujuans(form) {
      const payload = {
        form,
      }
      this.rekeningTujuanMember(payload)
    },

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    // flipInSave
    flipInSave(form, bankAsal, banktujuan, jumlah, variant, position) {
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
          let jumlahc = jumlah ? jumlah.replace(/,/g, '') : ''
          const body = {
            rekMember_id: bankAsal,
            rekening_id: banktujuan,
            jumlah: jumlahc,
            formdepowd: form,
          }
          useJwt
            .createData('allMembers', '/deposit-withdraw-create', body, {
              params: { id },
            })
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
  data() {
    return {
      bankOptions: '',
      bankTujuanOptions: '',
      formOption: 'formDepo',
      optionsss: {
        number: {
          numeral: true,
          numeralThousandsGroupStyle: 'thousand',
        },
      },
      fields: [
        {
          key: 'username',
        },
        {
          key: 'credit',
        },

        {
          key: 'deposit',
          label: 'Deposit/withdraw',
        },
        {
          key: 'bank',
          label: 'Bank Asal',
        },
        {
          key: 'bankTujuan',
          label: 'Bank tujuan',
        },
        {
          key: 'jumlah',
          label: 'jumlah',
        },
        {
          key: 'action',
          label: '',
        },
      ],
      items: [
        {
          username: 'Admin',
          credit: '0',
          deposit: '04 Feb 2022 14:30:33',
          Bank: 'test',
          BankTuj: 'test',
          jumlah: 'test',
          action: 'test',
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
