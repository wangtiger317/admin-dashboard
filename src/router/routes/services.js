export default [
  {
    path: '/services/deposit',
    name: 'services-deposit',
    component: () => import('@/views/services/deposit/Deposit.vue'),
  },
  {
    path: '/services/withdraw',
    name: 'services-withdraw',
    component: () => import('@/views/services/withdraw/Withdraw.vue'),
  },
  {
    path: '/services/bank-account',
    name: 'services-account',
    component: () => import('@/views/services/account/Account.vue'),
  },
  {
    path: '/services/mutasi-bank',
    name: 'services-mutasi-bank',
    component: () => import('@/views/services/mutasi-bank/MutasiBank.vue'),
  },
  {
    path: '/services/mutasi-bank/detail',
    name: 'services-mutasi-bank-detail',
    component: () => import('@/views/services/mutasi-bank/MutasiDetail.vue'),
  },
  {
    path: '/services/edit-credit',
    name: 'services-creadit',
    component: () => import('@/views/services/creadit/Creadit.vue'),
  },
  {
    path: '/services/bank-balance',
    name: 'services-balance-bank',
    component: () => import('@/views/services/balance-bank/BalanceBank.vue'),
  },
  {
    path: '/services/bank-status',
    name: 'services-bank-online',
    component: () => import('@/views/services/bank-online/BankOnline.vue'),
  },
  {
    path: '/services/non-bank-nett',
    name: 'services-potongan',
    component: () => import('@/views/services/potongan/Potongan.vue'),
  },
]
