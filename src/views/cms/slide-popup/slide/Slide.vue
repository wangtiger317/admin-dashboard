<template>
  <b-card-code title="Repeating Forms">
    <div class="mx-4 mt-2">
      <b-form ref="form" @submit.prevent="repeateAgain">
        <!-- Row Loop -->
        <b-row v-for="item in items" :id="item.id" :key="item.id" ref="row">
          <b-row v-for="(datas, index) in getSlide" :key="datas">
            <b-col cols="12" md="12" class="mb-2 mt-2">
              <h3>Slide #{{ index + 1 }}</h3>
              <div>Recommended size is 1920px X 400px</div>
            </b-col>

            <!-- Item file -->
            <b-col md="4">
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

            <!-- ALT -->
            <b-col md="2">
              <b-form-group label="ALT IMG Attribute" label-for="alt">
                <b-form-input
                  v-model="datas.alt"
                  id="blog-edit-title"
                  placeholder="ALT IMG"
                />
              </b-form-group>
            </b-col>

            <!-- Item file -->
            <b-col md="2">
              <b-form-group v-model="datas.enabled">
                <b-form-checkbox
                  name="check-button"
                  class="mt-2"
                  switch
                  inline
                  v-model="datas.enabled"
                >
                </b-form-checkbox>
              </b-form-group>
            </b-col>

            <!-- Upload Popup -->
            <b-col lg="4" md="4" class="mb-50 mt-2">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                @click="updateData(datas, fileImage, 'success', 'top-center')"
              >
                <span>Update</span>
              </b-button>
              <b-button
                v-if="index !== 0"
                v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                variant="danger"
                class="ml-2"
                @click="deleteAccount(datas, 'success', 'top-center')"
              >
                <feather-icon icon="XIcon" class="mr-25" />
                <span>Delete</span>
              </b-button>
            </b-col>
            <b-col cols="12">
              <hr />
            </b-col>
            <b-col md="2" class="py-2">
              <h3>Photo preview :</h3>
              <b-img
                :src="previeImg"
                v-if="previeImg"
                width="1200px"
                height="232px"
              ></b-img>
              <b-img
                :src="image + datas.image"
                v-if="!previewImg"
                alt="Responsive image"
                width="1200px"
                height="232px"
              ></b-img>
            </b-col>
          </b-row>
        </b-row>

        <!-- Form Add -->
        <b-row v-if="showForm">
          <b-col cols="12" md="12" class="mb-2 mt-2" ref="row">
            <h3>New Slide</h3>
            <div>Recommended size is 1920px X 400px</div>
          </b-col>
          <b-col md="4">
            <b-form-group label="Choose file..." label-for="item-name">
              <b-form-file
                v-model="imageAdd"
                :state="Boolean(file)"
                @change="previewImageAdd"
                placeholder="choose file..."
                drop-placeholder="drop file..."
                accept="image/png, image/jpeg, image/jpg"
              ></b-form-file>
            </b-form-group> </b-col
          ><b-col md="2">
            <b-form-group label="ALT IMG Attribute" label-for="alt">
              <b-form-input
                v-model="alt"
                id="blog-edit-title"
                placeholder="ALT IMG"
              />
            </b-form-group>
          </b-col>
          <b-col lg="4" md="4" class="mb-50 mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              @click="flipInAddNew(alt, imageAdd, 'success', 'top-center')"
            >
              <span>Create</span>
            </b-button>
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              variant="danger"
              class="ml-4"
              @click="deleteForm"
            >
              <feather-icon icon="XIcon" class="mr-25" />
              <span>Delete</span>
            </b-button>
          </b-col>
          <b-col cols="12">
            <hr />
          </b-col>
          <b-col md="2" class="py-2">
            <h3>Photo preview :</h3>
            <b-img
              :src="previeImgAdd"
              v-if="previeImgAdd"
              width="1200px"
              height="232px"
            ></b-img>
            <b-img
              src="@/assets/images/default/default.png"
              v-else
              alt="Responsive image"
              width="1200px"
              height="232px"
            ></b-img>
          </b-col>
        </b-row>
      </b-form>
    </div>
    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      class="mx-3 mb-2 mt-2"
      @click="addForm"
    >
      <feather-icon icon="PlusIcon" class="mr-25" />
      <span>Add New</span>
    </b-button>
  </b-card-code>
</template>

<script>
import BCardCode from '@core/components/b-card-code'
import {
  BForm,
  BImg,
  BFormGroup,
  BFormInput,
  BRow,
  BCol,
  BButton,
  BFormCheckbox,
  BFormFile,
} from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    BCardCode,
    BForm,
    BImg,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BFormFile,
    ToastificationContent,
  },
  directives: {
    Ripple,
  },

  mixins: [heightTransition],

  data() {
    return {
      types: 'slide',
      fileImage: null,
      fileImageAdd: null,
      previeImg: null,
      previeImgAdd: null,
      showForm: false,
      file: null,
      fileAdd: null,
      alt: null,
      imageAdd: null,
      image: process.env.IMAGE_AGENT_API,
      items: [
        {
          id: 1,
          selected: 'male',
          selected1: 'designer',
          prevHeight: 0,
        },
      ],
      nextTodoId: 2,
      // codeBasic,
    }
  },

  computed: {
    ...mapGetters('cms', ['getSlide']),
  },

  mounted() {
    this.initTrHeight()
  },

  created() {
    const payload = {
      type: this.types,
    }
    this.slidelist(payload)
    window.addEventListener('resize', this.initTrHeight)
  },

  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },

  methods: {
    ...mapActions('cms', ['slidelist']),
    // DELETE THIS
    deleteAccount(account, variant, position) {
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
          this.$store.dispatch('cms/deleteSlide', account)
          // toast notification this
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'Image Content Slide Deleted Successfully.',
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

    previewImage(e) {
      const nameImage = e.target.files[0].name
      this.fileImage = nameImage
      this.previeImg = URL.createObjectURL(e.target.files[0])
      this.file = e.target.files[0]
    },

    previewImageAdd(e) {
      const nameImage = e.target.files[0].name
      this.fileImageAdd = nameImage
      this.previeImgAdd = URL.createObjectURL(e.target.files[0])
      this.fileAdd = e.target.files[0]
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
              `/slide-popup-images-update?id=${id}&type=slide`,
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

    // Form
    addForm() {
      this.showForm = true
    },
    deleteForm() {
      this.showForm = false
    },

    // Repeat again
    repeateAgain() {
      this.items.push({
        id: (this.nextTodoId += this.nextTodoId),
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },

    // flip add

    flipInAddNew(alt, image, variant, position) {
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
          const body = {
            alt,
            path: this.fileAdd,
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
            .createData('cms', `/slide-create`, getFormData(body), {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then(() => {
              const payload = {
                type: this.types,
              }
              this.slidelist(payload)
              this.showForm = false
              ;(this.alt = null),
                (this.imageAdd = null),
                (this.previeImgAdd = null),
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

    flipInAdd(variant, position) {
      this.$swal({
        title: 'Are you sure?',
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel',
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
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'successful! add new slide',
                variant,
              },
            },
            {
              position,
            }
          )
          // this.items.push({
          //   id: (this.nextTodoId += this.nextTodoId),
          // })
          // this.$nextTick(() => {
          //   this.trAddHeight(this.$refs.row[0].offsetHeight)
          // })
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
      // Repeat again
    },

    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.repeater-form {
  overflow: hidden;
  transition: 0.35s height;
}
</style>
