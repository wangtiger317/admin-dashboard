export default [
  {
    path: '/cms/page-content',
    name: 'cms-webiste-content',
    component: () => import('@/views/cms/website-content/WebsiteContent.vue'),
  },
  {
    path: '/cms/banner',
    name: 'cms-slide-popup',
    component: () => import('@/views/cms/slide-popup/SlidePopup.vue'),
  },
  {
    path: '/cms/promotion',
    name: 'cms-promo-page',
    component: () => import('@/views/cms/promo-page/PromoPage.vue'),
  },
  {
    path: '/cms/lottery-rules',
    name: 'cms-peraturan-game',
    component: () => import('@/views/cms/peraturan-game/PeraturanGame.vue'),
  },
]
