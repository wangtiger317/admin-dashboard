<template>
  <b-card class="blog-edit-wrapper">
    <h1>50-50 Kombinasi</h1>
    <!-- form test -->
    <b-form class="mt-2">
      <b-row>
        <b-col md="12">
          <b-form-group label="Title" label-for="blog-edit-title" class="mb-2">
            <b-form-input
              v-model="getFiftyKombinasi.title"
              id="blog-edit-title"
              placeholder="50-50 Umum"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="Page Content"
            label-for="blog-content"
            class="mb-2"
          >
            <quill-editor
              id="blog-content"
              v-model="getFiftyKombinasi.contents"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" class="mb-2"></b-col>
        <b-col cols="12" class="mt-50">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mr-1"
            @click="updatesData('success', 'top-center', getFiftyKombinasi)"
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
      slugs: '50-50-kombinasi',
      blogEdit: {},
      snowOption: {
        theme: 'snow',
      },
    }
  },

  computed: {
    ...mapGetters('cms', ['getFiftyKombinasi']),
  },

  created() {
    const payload = {
      slug: this.slugs,
    }
    this.gameFiftyKombinasilist(payload)
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
    ...mapActions('cms', ['gameFiftyKombinasilist', 'updateAll']),
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
