<template>
  <b-card class="blog-edit-wrapper">
    <h1>{{ title }}</h1>

    <b-form v-show="content !== null" class="mt-2">
      <b-row>
        <b-col md="12">
          <b-form-group label="Title" label-for="blog-edit-title" class="mb-2">
            <b-form-input
              id="blog-edit-title"
              v-model="content.title"
              placeholder="title"
            />
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group
            label="Page Content"
            label-for="blog-content"
            class="mb-2"
          >
            <quill-editor id="blog-content" v-model="content.contents" />
          </b-form-group>
        </b-col>
        <b-col cols="12" class="mb-2" />
        <b-col cols="12" class="mt-50">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mr-1"
            @click="flipIn('success', 'top-center', fetchRule)"
          >
            Save
          </b-button>
        </b-col>
      </b-row>
    </b-form>
    <!--/ form -->
  </b-card>
</template>

<script>
import {
  BCard,
  BForm,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BButton,
} from 'bootstrap-vue'
import { quillEditor } from 'vue-quill-editor'
import Ripple from 'vue-ripple-directive'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ref } from '@vue/composition-api'

export default {
  components: {
    BCard,
    BForm,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    quillEditor,
  },
  directives: {
    Ripple,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      snowOption: {
        theme: 'snow',
      },
    }
  },

  computed: {
    content: {
      get() {
        let data = {
          title: '',
          contents: '',
        }
        const res = this.$store.state.cms.gameRules[this.slug]
        if (res) data = res
        return data
      },
      set(title, contents) {
        const data = {
          title,
          contents,
        }
        return data
      },
    },
  },

  async mounted() {
    await this.fetchRule()
  },

  setup() {
    const refInputEl = ref(null)
    const refPreviewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(
      refInputEl,
      (base64) => {
        refPreviewEl.value.src = base64
      }
    )

    return {
      refInputEl,
      refPreviewEl,
      inputImageRenderer,
    }
  },
  methods: {
    async fetchRule() {
      await this.$store.dispatch('cms/fetchGameRule', this.slug)
    },

    async updateRule() {
      await this.$store.dispatch('cms/updateGameRule', this.slug)
    },
    // flip in sweet alert this
    async flipIn(variant, position, item) {
      const res = await this.$swal({
        title: 'Are you sure?',
        confirmButtonText: 'Ok',
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
      if (res.value) {
        if (await this.updateRule(item)) {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'Updated Success!',
                variant,
              },
            },
            {
              position,
            }
          )
        } else if (res.dismiss === 'cancel') {
          this.$swal({
            title: 'Cancelled',
            text: 'Ok your data is not Updated.',
            confirmButtonText: 'Ok',
            customClass: {
              cancelButton: 'btn btn-secondary',
            },
          })
        }
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/quill.scss';
@import '@core/scss/vue/pages/page-blog.scss';
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
