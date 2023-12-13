<template>
  <div>
    <b-card-code>
      <div class="mx-4 my-2">
        <!-- title -->
        <h3>Banner Mobile</h3>
        <div>Recommended size is 600px X 200px</div>
        <b-form ref="form">
          <b-row>
            <!-- Item file -->
            <b-col md="4 mt-1">
              <b-form-group label="Choose file..." label-for="item-name">
                <b-form-file
                  v-model="fileImage"
                  :state="Boolean(file)"
                  @change="previewImage"
                  placeholder="choose file..."
                  drop-placeholder="drop file..."
                  accept="image/png, image/jpeg, image/jpg"
                ></b-form-file>
              </b-form-group>
            </b-col>

            <!-- Item ALT -->
            <b-col md="2 mt-1">
              <b-form-group label="ALT IMG Attribute" label-for="alt">
                <b-form-input
                  v-model="getSlideMobile[0].alt"
                  id="blog-edit-title"
                  placeholder="ALT IMG"
                />
              </b-form-group>
            </b-col>

            <!-- Item CHECk -->
            <b-col md="2 mt-1">
              <b-form-group v-model="getSlideMobile[0].enabled">
                <b-form-checkbox
                  name="check-button"
                  class="mt-2"
                  switch
                  inline
                  v-model="getSlideMobile[0].enabled"
                >
                </b-form-checkbox>
              </b-form-group>
            </b-col>

            <!-- Upload popup -->
            <b-col class="mt-1">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mx-3 mb-2 mt-2"
                @click="
                  updateData(
                    getSlideMobile[0],
                    fileImage,
                    'success',
                    'top-center'
                  )
                "
              >
                <span>Update</span>
              </b-button>
            </b-col>

            <!-- HR  -->
            <b-col cols="12">
              <hr />
            </b-col>

            <!-- PREVIEW IMAGES -->
            <b-col md="2" class="py-2">
              <h3>Photo preview :</h3>
              <b-img
                :src="previeImg"
                v-if="previeImg"
                width="700x"
                height="232px"
              ></b-img>
              <b-img
                :src="image + getSlideMobile[0].image"
                v-else
                alt="Responsive image"
                width="700x"
                height="232px"
              ></b-img>
            </b-col>
          </b-row>
        </b-form>
      </div>
    </b-card-code>
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
      types: 'mobile',
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
    ...mapGetters('cms', ['getSlideMobile']),
  },

  created() {
    const payload = {
      type: this.types,
    }
    this.slideMobilelist(payload)
  },

  methods: {
    ...mapActions('cms', ['slideMobilelist']),

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
              `/slide-popup-images-update?id=${id}&type=mobile`,
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
