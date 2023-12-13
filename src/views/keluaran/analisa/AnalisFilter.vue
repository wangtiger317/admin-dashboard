<template>
  <div>
    <b-card no-body>
      <b-card-body>
        <b-row>
          <!-- PASARAn -->
          <b-col cols="12" md="7" class="mb-md-0 mb-2">
            <b-form-group>
              <label>Pasaran</label>
              <b-form-select v-model="id_pasaran" id="sortOptions">
                <option value="">Pilih Pasaran</option>
                <option
                  v-for="datas in getListPeriode"
                  :key="datas"
                  :value="datas.id"
                >
                  {{ datas.name }} - {{ datas.name_initial }}
                </option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <!-- INPUT NUMBER  -->
          <b-col cols="12" md="3" class="mb-md-0 mb-2">
            <b-form-group>
              <label>Input</label>
              <b-form-input
                v-model="hasil"
                maxlength="4"
                @keypress="onlyNumber"
                placeholder="Input Number"
              />
            </b-form-group>
          </b-col>

          <!-- BUTTON SEARCH THIS -->
          <b-col class="mb-md-0 mb-2 mt-2">
            <b-button
              v-model="id_pasaran"
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              @click="searchPicker(id_pasaran, hasil)"
              @click.prevent="showDataCon()"
            >
              Analisa
            </b-button>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BFormGroup,
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
  BCardHeader,
  BCardBody,
  BTooltip,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { mapActions, mapGetters } from 'vuex'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'

export default {
  components: {
    BTooltip,
    BCardHeader,
    BCardBody,
    BFormSelect,
    ToastificationContent,
    BFormCheckbox,
    BFormGroup,
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
    vSelect,
  },

  computed: {
    ...mapGetters('kelauran', ['getAnalisaKeluaran']),
    ...mapGetters('settings', ['getListPeriode']),

    allTotal() {
      const total = this.getAnalisaKeluaran.data
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    totalPage() {
      const perpage = this.getAnalisaKeluaran.data
      let perPage = 0
      if (perpage) {
        perPage = perpage.per_page
      }
      return perPage
    },
  },

  created() {
    const payload = {
      id_pasaran: '',
      hasil: '',
      page: 1,
    }
    this.analisaKeluaranList(payload)
    this.periodeList()
  },

  methods: {
    ...mapActions('kelauran', ['analisaKeluaranList']),
    ...mapActions('settings', ['periodeList']),

    // Number Only
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 190) {
        $event.preventDefault()
      }
    },

    showDataCon() {
      this.$emit('showDataCon')
    },

    async changePage(number) {
      const payload = {
        page: number,
        id_pasaran: '',
        hasil: '',
      }
      await this.analisaKeluaranList(payload)
    },

    async searchPicker(id_pasaran, hasil) {
      const payload = {
        id_pasaran,
        hasil,
        page: 1,
      }
      await this.analisaKeluaranList(payload)
      this.currentPage = 1
    },
  },

  data() {
    return {
      currentPage: 1,
      id_pasaran: '',
      hasil: '',
      fields: [
        {
          key: 'no',
          label: 'no',
        },
        {
          key: 'Tanggal',
          label: 'Tanggal',
        },
        {
          key: 'Hari',
          label: 'Hari',
        },
        {
          key: 'Pasaran',
          label: 'Pasaran',
        },
        {
          key: 'Result',
          label: 'Result',
        },
        {
          key: 'actions',
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
.total__content {
  display: flex;
  justify-content: end;
  padding-right: 230px;
}
.total {
  padding: 8px 0px;
  border-bottom: 1px solid #404656;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
<style scoped>
.checkboxs {
  display: flex;
  align-items: center;
}
</style>
