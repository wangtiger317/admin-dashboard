<template>
  <div>
    <!-- TurnOver -->
    <b-card class="blog-edit-wrapper">
      <b-row class="mx-1">
        <b-col md="4">
          <h1>Bonus Referral</h1>
          <p>Format 900px x 180px JPG (.jpg / .jpeg / .png) < 500KB</p>
        </b-col>
        <b-col cols="8" class="text-right mt-2">
          <b-form-group v-model="getPromoReferral.enabled">
            <b-form-checkbox
              name="check-button"
              switch
              inline
              v-model="getPromoReferral.enabled"
            >
            </b-form-checkbox>
          </b-form-group>
        </b-col>

        <!-- INPUT FILE THIS -->
        <b-col md="6">
          <b-form-file
            v-model="fileImage"
            :state="Boolean(file)"
            @change="previewImage"
            placeholder="choose file..."
            drop-placeholder="drop file..."
            accept="image/png, image/jpeg, image/jpg"
          ></b-form-file>
        </b-col>
      </b-row>

      <!-- PHOTO PREVIEW -->
      <b-col md="12" class="py-4 ml-1">
        <h3>Photo preview :</h3>
        <b-img
          :src="previeImg"
          v-if="previeImg"
          width="1200px"
          height="232px"
        ></b-img>
        <b-img
          :src="image + getPromoReferral.image"
          v-else
          alt="Responsive image"
          width="1200px"
          height="232px"
        ></b-img>
      </b-col>

      <v-row class="d-flex mx-1">
        <b-col md="6">
          <b-form-group
            label="ALT IMG Attribute"
            label-for="blog-edit-title"
            class="mb-2"
          >
            <b-form-input
              v-model="getPromoReferral.alt"
              id="blog-edit-title"
              placeholder="ALT IMG"
            />
            <b-form-input
              hidden
              v-model="getPromoReferral.image"
              id="blog-edit-title"
              placeholder="PATH IMG"
            />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group
            label="Judul Promosi"
            label-for="blog-edit-title"
            class="mb-2"
          >
            <b-form-input
              v-model="getPromoReferral.title"
              id="blog-edit-title"
              placeholder="Tittle"
            />
          </b-form-group>
        </b-col>
      </v-row>
      <!-- form -->
      <b-form class="mt-2 mx-2">
        <b-row>
          <b-col cols="12">
            <b-form-group
              label="Page Content"
              label-for="blog-content"
              class="mb-2"
            >
              <quill-editor
                id="blog-content"
                v-model="getPromoReferral.content"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" class="mb-2"> </b-col>
          <b-col cols="12" class="mt-50">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-1"
              @click="
                updateData(getPromoReferral, fileImage, 'success', 'top-center')
              "
            >
              Save
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BFormCheckbox,
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
import Ripple from 'vue-ripple-directive'
import BCardCode from '@core/components/b-card-code'
import Cleave from 'vue-cleave-component'
import { mapActions, mapGetters } from 'vuex'
import 'cleave.js/dist/addons/cleave-phone.us'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useJwt from '@/auth/jwt/useJwt'
import 'animate.css'

export default {
  components: {
    BCard,
    Cleave,
    BCardCode,
    BMedia,
    BFormCheckbox,
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
      types: 'referral',
      fileImage: null,
      previeImg: null,
      file: null,
      image: process.env.IMAGE_AGENT_API,
    }
  },
  computed: {
    imagesBaseUrl() {
      return process.env.AGENT_URL_IMAGE
    },
    ...mapGetters('cms', ['getPromoReferral']),
  },

  created() {
    const payload = {
      type: this.types,
    }
    this.promoReferrallist(payload)
  },

  methods: {
    ...mapActions('cms', ['promoReferrallist']),

    previewImage(e) {
      const nameImage = e.target.files[0].name
      this.fileImage = nameImage
      this.previeImg = URL.createObjectURL(e.target.files[0])
      this.file = e.target.files[0]
    },

    updateData(data, image, variant, position) {
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
          let id = data.id
          const body = {
            path: this.file,
            alt: data.alt,
            title: data.title,
            content: data.content,
            enabled: data.enabled === true || data.enabled === 'true' ? 1 : 0,
          }
          const getFormData = (object) =>
            Object.entries(object).reduce((fd, [key, val]) => {
              if (Array.isArray(val)) {
                val.forEach((v) => fd.append(key, v))
              } else {
                fd.append(key, val)
              }
              return fd
            }, new FormData())

          useJwt
            .createData(
              'cms',
              `/promo-page-bonus-referral-update/${id}`,
              getFormData(body),
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
            )
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
            text: 'Ok your data is still there and safe.',
            confirmButtonText: 'Ok',
            customClass: {
              cancelButton: 'btn btn-secondary',
            },
          })
        }
      })
    },
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
