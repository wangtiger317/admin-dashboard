<template>
  <div>
    <b-card
      v-bind="cardAttrs"
      no-body
      v-on="$listeners"
    >
      <b-card-body>
        <slot name="default">
          No data
        </slot>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
} from 'bootstrap-vue'
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

export default {
  components: {
    BCard,
  },
  inheritAttrs: false,
  props: {
    codeLanguage: {
      default: 'markup',
      type: String,
    },
  },
  data() {
    return {
      parentID: '',
      code_visible: false,
    }
  },
  computed: {
    cardAttrs() {
      const cardAttrs = JSON.parse(JSON.stringify(this.$attrs))
      delete cardAttrs.title
      delete cardAttrs['sub-title']
      return cardAttrs
    },
  },
  created() {
    this.parentID = String(Math.floor(Math.random() * 10) + 1)
  },
}
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import '~@core/scss/base/bootstrap-extended/variables';
@import 'bootstrap/scss/variables';
@import '~@core/scss/base/components/variables-dark';



.card-code {
  pre[class*='language-'] {
    margin: 0;
    max-height: 350px;
    border-radius: 0.5rem;
  }

    /* width */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background: #2d2d2d;
      border-radius: 100%;

      .dark-layout & {
        background-color: $theme-dark-body-bg !important;
      }
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: transparent;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      border-radius: 0.5rem;
      background: rgba(241,241,241,.4);
    }

    /* Handle on hover */
    // ::-webkit-scrollbar-thumb:hover {
    // }

    ::-webkit-scrollbar-corner {
      display: none;
    }
}

.code-toggler {
  border-bottom: 1px solid transparent;

  &[aria-expanded='false'] {
    border-bottom-color: $primary;
  }
}

// HTML
.card {
  .card-header .heading-elements {
    position: static;
    background: red;
  }
}

</style>
