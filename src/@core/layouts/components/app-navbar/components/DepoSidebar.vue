<template>
  <div>
    <b-sidebar
      id="sidebar-task-handler"
      sidebar-class="sidebar-lg"
      :visible="isTaskHandlerSidebarActive"
      bg-variant="white"
      shadow
      backdrop
      no-header
      right
      @change="(val) => $emit('update:is-task-handler-sidebar-active', val)"
      @hidden="clearForm"
    >
      <template #default="{ hide }">
        <div
          class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1"
        >
          <b-button :variant="taskLocal.isCompleted ? '' : 'outline-success'">
            <feather-icon
              class="cursor-pointer"
              icon="DollarSignIcon"
              size="15"
            />
            Deposit
          </b-button>
          <div>
            <feather-icon
              class="ml-1 cursor-pointer"
              icon="XIcon"
              size="18"
              @click="hide"
            />
          </div>
        </div>

        <!-- Body Deposit -->
        <vue-perfect-scrollbar
          :settings="perfectScrollbarSettings"
          class="email-user-list scroll-area"
          @click="goToDeposit"
        >
          <ul class="email-media-list" v-for="datas in depoCount" :key="datas">
            <b-media tag="li" no-body>
              <b-media-body>
                <div class="mail-details">
                  <div class="mail-items">
                    <h5 class="mb-25">{{ formatPrice(datas.amount) }}</h5>
                    <span class="text-truncate"
                      >{{ datas.bank }} - {{ datas.noRek }} -
                      {{ datas.nameRek }}</span
                    >
                  </div>
                  <div class="mail-meta-item">
                    <span class="mx-50 bullet bullet-success bullet-sm" />
                    <span class="mail-date">{{
                      formateDate(datas.created_at)
                    }}</span>
                  </div>
                </div>
              </b-media-body>
            </b-media>
          </ul>
        </vue-perfect-scrollbar>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import days from 'dayjs'
import { BSidebar, BButton, BMedia, BMediaBody } from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Ripple from 'vue-ripple-directive'
import { required, email, url } from '@validations'
import { avatarText } from '@core/utils/filter'
import formValidation from '@core/comp-functions/forms/form-validation'
import { toRefs } from '@vue/composition-api'
import useTaskHandler from './useTaskHandler'

export default {
  components: {
    BMedia,
    BMediaBody,
    BButton,
    BSidebar,
    VuePerfectScrollbar,
  },

  directives: {
    Ripple,
  },
  model: {
    prop: 'isTaskHandlerSidebarActive',
    event: 'update:is-task-handler-sidebar-active',
  },
  props: {
    isTaskHandlerSidebarActive: {
      type: Boolean,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
    clearTaskData: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      notify: null,
      required,
      email,
      url,
    }
  },

  computed: {
    depoCount() {
      return this.$store.getters['services/getDepoCount']
    },
  },

  created() {
    this.pollData()
    this.fetchDeposit()
  },

  // async mounted() {
  //   await this.$store.dispatch('services/fetchDeposit')
  // },

  methods: {
    goToDeposit() {
      this.$router.push('/services/deposit')
    },

    pollData() {
      this.notify = setInterval(() => {
        this.$store.dispatch('services/fetchDeposit')
      }, 2000)
    },
    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
  },

  setup(props, { emit }) {
    const {
      taskLocal,
      resetTaskLocal,
      // UI
      assigneeOptions,
      onSubmit,
      tagOptions,
      resolveAvatarVariant,
    } = useTaskHandler(toRefs(props), emit)

    const { refFormObserver, getValidationState, resetForm, clearForm } =
      formValidation(resetTaskLocal, props.clearTaskData)

    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }

    const editorOption = {
      modules: {
        toolbar: '#quill-toolbar',
      },
      placeholder: 'Write your description',
    }

    return {
      perfectScrollbarSettings,
      // Add New
      taskLocal,
      onSubmit,
      assigneeOptions,
      tagOptions,

      // Form Validation
      resetForm,
      clearForm,
      refFormObserver,
      getValidationState,

      // UI
      editorOption,
      resolveAvatarVariant,

      // Filter/Formatter
      avatarText,
    }
  },
}
</script>

<style lang="scss" scoped></style>

<style lang="scss">
// sccs files
@import '~@core/scss/base/deposit/depo-wd.scss';
</style>
