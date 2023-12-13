<template>
  <li
    v-if="canViewVerticalNavMenuLink(item)"
    class="nav-item"
    :class="{
      active: isActive,
      disabled: item.disabled,
    }"
  >
    <b-link v-bind="linkProps" class="d-flex align-items-center">
      <span class="menu-title">
        <feather-icon :icon="item.icon || 'CircleIcon'"
      /></span>
      <span class="menu-title text-truncate">{{ t(item.title) }}</span>
      <b-badge
        v-if="item.tag"
        pill
        :variant="item.tagVariant || 'primary'"
        class="mr-1 ml-auto"
      >
        {{ item.tag }}
      </b-badge>
    </b-link>
  </li>
</template>

<script>
import { useUtils as useAclUtils } from '@core/libs/acl'
import { BLink, BBadge } from 'bootstrap-vue'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import useVerticalNavMenuLink from './useVerticalNavMenuLink'
import mixinVerticalNavMenuLink from './mixinVerticalNavMenuLink'

export default {
  components: {
    BLink,
    BBadge,
  },
  mixins: [mixinVerticalNavMenuLink],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { isActive, linkProps, updateIsActive } = useVerticalNavMenuLink(
      props.item
    )
    const { t } = useI18nUtils()
    const { canViewVerticalNavMenuLink } = useAclUtils()
    return {
      isActive,
      linkProps,
      updateIsActive,
      // ACL
      canViewVerticalNavMenuLink,
      // i18n
      t,
    }
  },
}
</script>

<style scoped>
/* this active */
.router-link-active {
  background: linear-gradient(118deg, #7367f0, rgba(115, 103, 240, 0.7));
  box-shadow: 0 0 10px 1px rgb(115 103 240 / 70%);
  border-radius: 4px;
}

.router-link-active .menu-title {
  color: #fff;
}
</style>
