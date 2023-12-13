export default [
  {
    path: '/agent/agent-user',
    name: 'agent-agent-user',
    component: () => import('@/views/agent/agent-user/AgentUser.vue'),
  },

  {
    path: '/agent/agent-user/create',
    name: 'agent-agent-user-create',
    component: () => import('@/views/agent/agent-user/AgentUserCreate.vue'),
  },

  {
    path: '/agent/agent-user/edit/:id',
    name: 'agent-agent-user-edit',
    component: () => import('@/views/agent/agent-user/AgentUserEdit.vue'),
  },

  {
    path: '/agent/agent-user/change-password/:id',
    name: 'agent-agent-user-change-password',
    component: () => import('@/views/agent/agent-user/ChangePassword.vue'),
  },
  {
    path: '/agent/agent-role',
    name: 'agent-agent-role',
    component: () => import('@/views/agent/agent-role/AgentRole.vue'),
  },

  {
    path: '/agent/agent-role/create',
    name: 'agent-agent-role-create',
    component: () => import('@/views/agent/agent-role/AgentRoleCreate.vue'),
  },

  {
    path: '/agent/agent-role/edit',
    name: 'agent-agent-role-edit',
    component: () => import('@/views/agent/agent-role/AgentRoleEdit.vue'),
  },
  {
    path: '/agent/agent-ip',
    name: 'agent-agent-ip',
    component: () => import('@/views/agent/agent-ip/AgentIpList.vue'),
  },
  {
    path: '/agent/agent-activity',
    name: 'agent-agent-activity',
    component: () => import('@/views/agent/agent-activity/AgentActivity.vue'),
  },
]
