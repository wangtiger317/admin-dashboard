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
    >
      <template #default="{ hide }">
        <div
          class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1"
        >
          <b-button :variant="'outline-success'">
            <feather-icon
              class="cursor-pointer"
              icon="DollarSignIcon"
              size="15"
            />
            <span class="text-capitalize">
              {{ kind }}
            </span>
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
          @click="goToView(kind)"
        >
          <ul v-for="item in list" :key="item.id" class="email-media-list">
            <b-media tag="li" no-body>
              <b-media-body>
                <div class="mail-details">
                  <div class="mail-items">
                    <h5 class="mb-25">
                      {{ item.token }}
                    </h5>
                    <span class="text-truncate">{{ item.account }}</span>
                  </div>
                  <div class="mail-meta-item">
                    <span
                      :class="
                        kind === 'deposit' ? 'bullet-success' : 'bullet-danger'
                      "
                      class="mx-50 bullet bullet-sm"
                    />
                    <span class="mail-date">{{
                      formatDate(new Date(item.createdAt))
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
import { BSidebar, BButton, BMedia, BMediaBody } from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Ripple from 'vue-ripple-directive'
import { required, email, url } from '@validations'

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
    kind: {
      type: String,
      required: true,
      validator(value) {
        return ['deposit', 'withdraw'].includes(value)
      },
    },
  },
  data() {
    return {
      required,
      email,
      url,
      perfectScrollbarSettings: {
        maxScrollbarLength: 150,
      },
    }
  },

  computed: {
    list() {
      return this.$store.state.services[this.kind]
    },
  },
  methods: {
    goToView(kind) {
      this.$router.push(`/services/${kind}`)
    },
    padTo2Digits(num) {
      return num.toString().padStart(2, '0')
    },
    formatDate(date) {
      return [
        this.padTo2Digits(date.getDate()),
        this.padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join('/')
    },
  },
}
</script>

<style lang="scss" scoped></style>

<style lang="scss">
// sccs files
@import '~@core/scss/base/deposit/depo-wd.scss';
</style>
