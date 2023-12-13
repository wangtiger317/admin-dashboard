export default [
  {
    path: '/bonus/free-bet',
    name: 'bonus-free-bet',
    component: () => import('@/views/bonus-potongan/free-bet/FreeBet.vue'),
  },
  {
    path: '/bonus/bonus-send',
    name: 'bonus-bonus-send',
    component: () => import('@/views/bonus-potongan/bonus-send/BonusSend.vue'),
  },
  {
    path: '/bonus/bonus-history',
    name: 'bonus-bonus-his',
    component: () => import('@/views/bonus-potongan/bonus-his/BonusHis.vue'),
  },
]
