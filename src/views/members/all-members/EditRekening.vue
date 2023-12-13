<template>
  <div>
    <rekening-add-new
      :is-add-new-user-sidebar-active.sync="isAddNewUserSidebarActive"
      :role-options="roleOptions"
      :plan-options="planOptions"
      @refetch-data="refetchData"
    />
    <!-- Table Container Card -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="9"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>User Rekening</h2>
          </b-col>

          <!-- create Bank account -->
          <b-col cols="12" md="3" class="text-right">
            <b-button variant="primary" @click="CreateRekening()">
              Create
            </b-button>
          </b-col>
        </b-row>
      </div>
      <b-table
        :fields="fields"
        :items="getmemberRekeningList"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <template #cell(bank)="{ item }">
          <b-form-input v-model="item.name_bank" readonly />
        </template>
        <template #cell(name)="{ item }">
          {{ item.nama_rekening }}
        </template>
        <template #cell(rekening)="{ item }">
          <b-form-input
            v-model="item.nomor_rekening"
            readonly
            @keypress="onlyNumber"
          />
        </template>
        <template #cell(withdraw)="{ item }">
          <b-form-checkbox
            v-model="item.status"
            checked="true"
            name="check-button"
            switch
            inline
          />
        </template>
        <template #cell(tujuan)="{ item }">
          <b-form-select v-model="item.rekIdTujuan">
            <option
              v-for="datas in item.rekTujuan.original.data"
              :key="datas"
              :value="datas.id"
            >
              {{ datas.rekening }}
            </option>
          </b-form-select>
        </template>
        <template #cell(actions)="{ item }">
          <b-row>
            <b-col cols="6" md="6" class="mb-md-0 mb-2 text-right">
              <feather-icon
                icon="SaveIcon"
                size="16"
                class="cursor-pointer mx-1"
                @click="
                  updateUser(
                    item.id,
                    item.status,
                    item.rekIdTujuan,
                    'success',
                    'top-center'
                  )
                "
              />
              <b-tooltip title="Save" />
            </b-col>
            <!-- DELETE -->
            <b-col cols="6" md="6" class="mb-md-0 mb-2">
              <feather-icon
                icon="Trash2Icon"
                size="16"
                class="cursor-pointer mx-1"
                @click="deleteUser(item, 'success', 'top-center')"
              />
              <b-tooltip title="Save" />
            </b-col>
          </b-row>
        </template>
      </b-table>

      <v-col class="px-2">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          class="ml-1 my-2"
          @click="
            $router.push({
              name: 'members-all-members',
            })
          "
        >
          Back
        </b-button>
      </v-col>
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
import { ref } from '@vue/composition-api'
import RekeningAddNew from './RekeningAddNew.vue'
import useJwt from '@/auth/jwt/useJwt'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import { mapActions, mapGetters } from 'vuex'
import { bus } from '../../../main'

export default {
  probs: {
    id: Number,
  },
  components: {
    ToastificationContent,
    RekeningAddNew,
    BFormCheckbox,
    BCard,
    BFormSelect,
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

    vSelect,
  },
  computed: {
    ...mapGetters('members', ['getmemberRekeningList']),
    ...mapGetters('members', ['getRekening']),
    ...mapGetters('members', ['getConstantRekeningList']),
    ...mapGetters('members', ['getConstantRekeningTujuanList']),
  },

  data() {
    return {
      fields: [
        {
          key: 'bank',
        },
        {
          key: 'name',
        },
        {
          key: 'rekening',
          label: 'Rekening',
        },
        {
          key: 'withdraw',
          label: 'Rek.Withdraw',
        },
        {
          key: 'tujuan',
          label: 'Rekening Tujuan',
        },

        {
          key: 'actions',
          label: '',
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

  created() {
    const constantId = this.$route.params.id
    const payload = {
      id: constantId,
    }
    const payload1 = {
      constantId,
    }
    this.memberAccountList(payload)
    this.fetchRekening(payload1)
    this.ConstantRekeningList()
  },

  methods: {
    ...mapActions('members', ['memberAccountList']),
    ...mapActions('members', ['fetchRekening']),
    ...mapActions('members', ['ConstantRekeningList']),
    ...mapActions('members', ['ConstantRekeningTujuanList']),

    // number only
    onlyNumber($event) {
      const keyCode = $event.keyCode ? $event.keyCode : $event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 190) {
        $event.preventDefault()
      }
    },

    getRekeningTujuan(constId) {
      const payload = {
        constId,
      }

      this.ConstantRekeningTujuanList(payload)
    },

    updateUser(id, status, rekIdTujuan, variant, position) {
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
            rekening_id: rekIdTujuan,
            is_wd: status === true || status === 'true' ? 1 : 0,
          }
          useJwt
            .updateData('allMembers', `/member-update-rekening/${id}`, body)
            .then((response) => {
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

    deleteUser(user, variant, position) {
      this.$swal({
        title: 'Are you sure?',
        confirmButtonText: 'Delete',
        cancelButtonText: 'No, I changed my mind!',
        showCancelButton: true,
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-secondary ml-1',
        },
        showClass: {
          popup: 'animate__animated animate__flipInX',
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('members/deleteUserList', user)
          // toast notification this
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'Deleted successfully!',
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
            text: 'Ok your data is not Updated.',
            confirmButtonText: 'Ok',
            customClass: {
              cancelButton: 'btn btn-secondary',
            },
          })
        }
      })
    },
    CreateRekening() {
      const data = this.getmemberRekeningList.find(
        (item) => item.status === 'true'
      )
      const item = {
        id: data.id,
        name: data.nama_rekening,
      }
      bus.$emit('create', item)

      this.isAddNewUserSidebarActive = true
    },
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
.btns {
  display: flex;
  justify-content: end;
}
.table__row {
  margin: 200px 0px;
}
.per-page-selector {
  width: 90px;
}
.total__content {
  display: flex;
  justify-content: end;
  padding-right: 100px;
}
.total {
  padding: 8px 0px;
  border-bottom: 1px solid #404656;
}
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  padding: 8px;
}
.header-color {
  background-color: #f3f2f7;
  border-bottom: 2px solid #ebe9f1;
  font-size: 0.857rem;
  letter-spacing: 0.5px;
}
#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
}
.table-rekening td {
  padding: 13px !important;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
