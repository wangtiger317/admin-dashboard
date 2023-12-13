<template>
  <b-card>
    <b-form @submit.prevent>
      <h3 class="mb-2">Create Message</h3>
      <b-row>
        <b-col cols="12">
          <!-- USERNAME -->
          <b-form-group label="To" label-for="To">
            <v-select
              v-model="members"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              multiple
              label="username"
              item-value="id"
              placeholder="To"
              :options="filter"
            />
          </b-form-group>
        </b-col>

        <!--Categoryy -->
        <b-col cols="12">
          <b-form-group label="Category" label-for="Category">
            <b-form-select v-model="category">
              <option value="">Select Bank</option>
              <option
                v-for="datas in getConstantRekeningList"
                :key="datas"
                :value="datas.id"
              >
                {{ datas.name }}
              </option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <!-- Subject -->
        <b-col cols="12">
          <b-form-group label="Subject" label-for="Subject">
            <b-form-input
              id="Subject"
              v-model="subject"
              placeholder="Subject"
            />
          </b-form-group>
        </b-col>

        <!--Message -->
        <b-col cols="12">
          <b-form-group label="Message" label-for="Message">
            <b-form-textarea id="textarea-default" v-model="content" rows="3" />
          </b-form-group>
        </b-col>

        <!-- test -->
        <!-- submit and reset -->
        <b-col>
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
              CreateMessages(
                'success',
                'top-center',
                members,
                category,
                subject,
                content
              )
            "
          >
            Create
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
import Ripple from 'vue-ripple-directive'
import { mapActions, mapGetters } from 'vuex'
import useJwt from '@/auth/jwt/useJwt'
import vSelect from 'vue-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'

export default {
  components: {
    vSelect,
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
    return {
      category: '',
      members: 'All Member',
    }
  },
  computed: {
    ...mapGetters('members', ['getConstantRekeningList']),

    filter() {
      return this.$store.getters['members/getMemberDrop']
    },
  },

  async mounted() {
    await this.fetchFilter()
  },

  created() {
    this.ConstantRekeningList()
  },
  methods: {
    ...mapActions('members', ['ConstantRekeningList']),

    async fetchFilter() {
      await this.$store.dispatch('members/fetchMemberlist')
    },

    // TOAST AND NOTIFCATION
    CreateMessages(variant, position, members, category, subject, content) {
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
          const testArr = members
          const body = {
            members:
              testArr === 'All Member' ? [] : testArr.map(({ id }) => id),
            category,
            subject,
            content,
          }
          useJwt
            .createData('allMembers', '/memo-create', body)
            .then(() => {
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
