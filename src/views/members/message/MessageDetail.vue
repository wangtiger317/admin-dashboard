<template>
  <b-card>
    <b-form @submit.prevent>
      <h3 class="mb-2">Detail Message</h3>
      <!-- To -->
      <b-row>
        <!-- members, category, subject, content, -->
        <b-col cols="12">
          <b-form-group label="To" label-for="To">
            <b-form-input
              id="To"
              v-model="getMemoDetail.member.id"
              disabled
              hidden
              placeholder="To"
            />
            <b-input-group class="input-group-merge">
              <b-form-input
                id="To"
                v-model="getMemoDetail.member.username"
                disabled
                placeholder="To"
              />
            </b-input-group>
          </b-form-group>
        </b-col>

        <!-- Subject -->
        <b-col cols="12">
          <b-form-group label="Subject" label-for="Subject">
            <b-form-input
              id="Subject"
              v-model="getMemoDetail.subject"
              disabled
              placeholder="Subject"
            />
          </b-form-group>
        </b-col>

        <!--Message -->
        <b-col cols="12">
          <b-form-group label="Message" label-for="Message">
            <b-form-textarea
              v-model="content"
              id="textarea-default"
              placeholder="Message"
              rows="3"
            />
          </b-form-group>
        </b-col>

        <hr />

        <!--Message -->
        <b-col
          cols="12"
          style="height: 20rem"
          class="overflow-y-scroll mt-1 mb-2"
        >
          <div>
            <b-row v-for="datas in getMemoDetail.sub_memos" :key="datas">
              <b-col cols="12"
                >===============================================================</b-col
              >
              <b-col class="mail-meta-item" cols="12">
                <span class="mx-50 bullet bullet-success bullet-sm" />
                <span
                  >{{ formateDate(datas.created_at) }}
                  {{ datas.send_type }} Wrote</span
                >
              </b-col>

              <b-col cols="12" class="mx-2">{{ datas.content }}</b-col>
            </b-row>
            <b-row>
              <b-col cols="12"
                >===============================================================</b-col
              >
              <b-col class="mail-meta-item" cols="12">
                <span class="mx-50 bullet bullet-success bullet-sm" />
                <span
                  >{{ formateDate(getMemoDetail.created_at) }}
                  {{ getMemoDetail.username }} Wrote</span
                >
              </b-col>
              <b-col
                cols="12"
                class="mx-2"
                v-html="getMemoDetail.content"
              ></b-col>
            </b-row>
          </div>
        </b-col>

        <!-- BUTTON -->
        <b-col class="my-2">
          <b-button
            @click="$router.push({ name: 'members-message' })"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="primary"
            class="mr-1"
          >
            Back
          </b-button>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="primary"
            class="mr-1"
            @click="
              ReplyMessages(
                getMemoDetail.member.id,
                getMemoDetail.subject,
                content,
                'success',
                'top-center'
              )
            "
          >
            Reply
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import {
  BFormSelect,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  BFormText,
  BFormDatalist,
  BFormInvalidFeedback,
  BInputGroup,
  BInputGroupPrepend,
  BFormValidFeedback,
  BFormTextarea,
  BInputGroupAppend,
  BCard,
} from 'bootstrap-vue'
import days from 'dayjs'
import Ripple from 'vue-ripple-directive'
import { mapActions, mapGetters } from 'vuex'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useJwt from '@/auth/jwt/useJwt'
import 'animate.css'

export default {
  components: {
    ToastificationContent,
    BFormSelect,
    BFormTextarea,
    BInputGroupAppend,
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BInputGroup,
    BInputGroupPrepend,
    BFormInput,
    BFormCheckbox,
    BForm,
    BFormText,
    BButton,
    BFormDatalist,
    BFormInvalidFeedback,
    BFormValidFeedback,
  },

  directives: {
    Ripple,
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters('members', ['getMemoDetail']),
  },

  created() {
    const id = this.$route.params.id
    const payload = {
      id,
    }
    this.detailMemoList(payload)
  },

  methods: {
    ...mapActions('members', ['detailMemoList']),

    // DATE
    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    // REPLY MESSAGE THIS
    ReplyMessages(members, subject, content, variant, position) {
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
          const id = this.$route.params.id
          const body = {
            members: members,
            subject,
            content,
          }
          useJwt
            .createData('allMembers', `/memo-reply/${id}`, body)
            .then(() => {
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
                },
                this.$router.push({
                  name: 'members-message',
                })
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
  },
}
</script>
