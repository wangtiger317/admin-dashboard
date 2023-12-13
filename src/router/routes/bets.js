export default [
  {
    path: '/lottery/list',
    name: 'bets-bets-table',
    component: () => import('@/views/bets/bets-table/BetsTable.vue'),
  },
  {
    path: '/lottery/running',
    name: 'bets-list-bets',
    component: () => import('@/views/bets/list-bets/ListBets.vue'),
  },
  {
    path: '/lottery/thrown',
    name: 'bets-bets-buangan',
    component: () => import('@/views/bets/bets-buangan/BetsBuangan.vue'),
  },
  {
    path: '/lottery/lottery-list',
    name: 'bets-terpasang',
    component: () => import('@/views/bets/terpasang/Terpasang.vue'),
  },
]
