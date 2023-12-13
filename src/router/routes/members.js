export default [
  {
    path: '/members/all-members',
    name: 'members-all-members',
    component: () => import('@/views/members/all-members/AllMembers.vue'),
  },

  {
    path: '/members/all-members/refferal',
    name: 'members-all-members-refferal',
    component: () => import('@/views/members/all-members/MemberRefferal.vue'),
  },
  {
    path: '/members/all-members/form',
    name: 'members-all-members-form',
    component: () =>
      import('@/views/members/all-members/FormDepositWithdraw.vue'),
  },
  {
    path: '/members/all-members/edit-password',
    name: 'members-all-members-edit',
    component: () => import('@/views/members/all-members/EditPassword.vue'),
  },
  {
    path: '/members/all-members/edit-profile',
    name: 'members-all-members-profile',
    component: () => import('@/views/members/all-members/EditProfile.vue'),
  },
  {
    path: '/members/all-members/edit-credit',
    name: 'members-all-members-credit',
    component: () => import('@/views/members/all-members/EditCredit.vue'),
  },
  {
    path: '/members/all-members/edit-rekening',
    name: 'members-all-members-rekening',
    component: () => import('@/views/members/all-members/EditRekening.vue'),
  },
  {
    path: '/members/all-members/history',
    name: 'members-all-members-history',
    component: () => import('@/views/members/all-members/MemberHistory.vue'),
  },

  {
    path: '/members/winlose-all',
    name: 'members-winlose-all',
    component: () => import('@/views/members/winlose-all/WinloseAll.vue'),
  },
  {
    path: '/members/user-referral',
    name: 'members-user-referral',
    component: () => import('@/views/members/user-referral/UserReferral.vue'),
  },
  {
    path: '/members/user-referral/detail',
    name: 'members-user-referral-detail',
    component: () =>
      import('@/views/members/user-referral/ReferralDetails.vue'),
  },
  {
    path: '/members/daily-referral',
    name: 'members-daily-referral',
    component: () => import('@/views/members/daily-referral/DailyReferral.vue'),
  },

  // MESSAGE LIST THIS
  {
    path: '/members/message',
    name: 'members-message',
    component: () => import('@/views/members/message/Message.vue'),
  },

  // MESSAGE CREATE THIS
  {
    path: '/members/message/create',
    name: 'members-message-create',
    component: () => import('@/views/members/message/MessageCreate.vue'),
  },

  // MESSAGE DETAIL THIS
  {
    path: '/members/message/detail',
    name: 'members-message-detail',
    component: () => import('@/views/members/message/MessageDetail.vue'),
  },

  {
    path: '/members/activity',
    name: 'members-members-activity',
    component: () =>
      import('@/views/members/members-activity/MembersActivity.vue'),
  },
]
