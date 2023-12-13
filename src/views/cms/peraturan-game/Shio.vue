<template>
  <b-card class="blog-edit-wrapper">
    <h1>Shio</h1>
    <!-- form test -->
    <b-form class="mt-2">
      <b-row>
        <b-col md="12">
          <b-form-group label="Title" label-for="blog-edit-title" class="mb-2">
            <b-form-input
              v-model="getLainShio.title"
              id="blog-edit-title"
              placeholder="Shio"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="Page Content"
            label-for="blog-content"
            class="mb-2"
          >
            <quill-editor id="blog-content" v-model="getLainShio.contents" />
          </b-form-group>
        </b-col>
        <b-col cols="12" class="mb-2"></b-col>
        <b-col cols="12" class="mt-50">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mr-1"
            @click="updatesData('success', 'top-center', getLainShio)"
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
  BMedia,
  BAvatar,
  BCardText,
  BMediaAside,
  BMediaBody,
  BForm,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BImg,
  BFormFile,
  BLink,
  BButton,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { quillEditor } from 'vue-quill-editor'
import { mapActions, mapGetters } from 'vuex'
import Ripple from 'vue-ripple-directive'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ref } from '@vue/composition-api'

export default {
  components: {
    BCard,
    BMedia,
    BAvatar,
    BCardText,
    BMediaAside,
    BMediaBody,
    BForm,
    BLink,
    BImg,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    BFormFile,
    vSelect,
    quillEditor,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      slugs: 'shio',
      blogEdit: {},
      snowOption: {
        theme: 'snow',
      },
    }
  },

  computed: {
    ...mapGetters('cms', ['getLainShio']),
  },

  created() {
    const payload = {
      slug: this.slugs,
    }
    this.gameLainShio(payload)
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
    ...mapActions('cms', ['gameLainShio', 'updateAll']),
    async updatesData(variant, position, item) {
      const res = await this.$swal({
        title: 'Are you sure?',
        text: 'Data will be updated.',
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
        if (await this.updateAll(item)) {
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
