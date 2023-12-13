export default [
  {
    path: '/my-acount',
    name: 'my-acount-profile',
    component: () => import('@/views/my-acount/profile/Profile.vue'),
    // meta: {
    //   pageTitle: 'Profile',
    //   breadcrumb: [
    //     {
    //       text: 'Pages',
    //     },
    //     {
    //       text: 'Profile',
    //       active: true,
    //     },
    //   ],
    // },
  },
]
