export default [
  {
    path: '/setting/setting',
    name: 'setting-games',
    component: () => import('@/views/setting/games/Games.vue'),
  },
  {
    path: '/setting/bonus-setting',
    name: 'bonus-bonus-set',
    component: () => import('@/views/setting/bonus-set/BonusSet.vue'),
  },
  {
    path: '/setting/market',
    name: 'setting-lottery',
    component: () => import('@/views/setting/pasaran/Pasaran.vue'),
  },
  {
    path: '/setting/maintenance',
    name: 'setting-maintenance',
    component: () => import('@/views/setting/maintenance/Maintenance.vue'),
  },
  {
    path: '/setting/block-number',
    name: 'setting-block-number',
    component: () => import('@/views/setting/block-number/BlockNumber.vue'),
  },
  {
    path: '/setting/lotery-limit',
    name: 'setting-lotery-limit',
    component: () => import('@/views/setting/lotery-limit/LoteryLimit.vue'),
  },
  {
    path: '/setting/social-media',
    name: 'setting-social-media',
    component: () => import('@/views/setting/social-media/SocialMedia.vue'),
  },
  {
    path: '/setting/transaction-limit',
    name: 'setting-transaction-limit',
    component: () => import('@/views/setting/transaction-limit/Limit.vue'),
  },
  {
    path: '/setting/web-setting',
    name: 'setting-web-setting',
    component: () => import('@/views/setting/web-setting/WebSetting.vue'),
  },
]
