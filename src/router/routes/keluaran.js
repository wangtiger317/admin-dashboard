export default [
  {
    path: '/lottery/result-list',
    name: 'keluaran-list-keluaran',
    component: () => import('@/views/keluaran/list-keluaran/ListKeluaran.vue'),
  },
  {
    path: '/lottery/scan',
    name: 'keluaran-scan',
    component: () => import('@/views/keluaran/scan/Scan.vue'),
  },
  {
    path: '/lottery/scan/detail',
    name: 'keluaran-scan-detail',
    component: () => import('@/views/keluaran/scan/ScanDetail.vue'),
  },
  {
    path: '/lottery/analyze',
    name: 'keluaran-analisa',
    component: () => import('@/views/keluaran/analisa/Analisa.vue'),
  },
  {
    path: '/lottery/submit/lottery',
    name: 'keluaran-submit',
    component: () => import('@/views/keluaran/submit/Submit.vue'),
  },
]
