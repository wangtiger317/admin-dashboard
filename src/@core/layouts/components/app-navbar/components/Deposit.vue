<template>
  <div style="height: inherit">
    <div class="todo-app-list">
      <div
        :key="task.id"
        class="todo-item"
        :class="{ completed: task.isCompleted }"
        @click="handleTaskClick(task)"
      >
        <div class="todo-item-action">
          Deposit
          <span class="ml-1">
            <feather-icon
              :badge="getBroadcastTop.deposit"
              badge-classes="bg-success"
              class="text-body"
              icon="false"
              size="21"
            />
          </span>
        </div>
      </div>
    </div>

    <!-- Task Handler -->
    <depo-sidebar
      v-model="isTaskHandlerSidebarActive"
      :task="task"
      :clear-task-data="clearTaskData"
      @remove-task="removeTask"
      @add-task="addTask"
      @update-task="updateTask"
    />
  </div>
</template>

<script>
import store from '@/store'
import { ref, watch, computed, onUnmounted } from '@vue/composition-api'
import { formatDate, avatarText } from '@core/utils/filter'
import { useRouter } from '@core/utils/utils'
import { useResponsiveAppLeftSidebarVisibility } from '@core/comp-functions/ui/app'
import todoStoreModule from './todoStoreModule'
import DepoSidebar from './DepoSidebar.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    // App SFC
    DepoSidebar,
  },
  computed: {
    ...mapGetters('broadcast', ['getBroadcastTop']),
  },

  created() {
    this.broadcashTop()
  },

  methods: {
    ...mapActions('broadcast', ['broadcashTop']),
  },

  setup() {
    const TODO_APP_STORE_MODULE_NAME = 'app-todo'

    // Register module
    if (!store.hasModule(TODO_APP_STORE_MODULE_NAME)) {
      store.registerModule(TODO_APP_STORE_MODULE_NAME, todoStoreModule)
    }

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(TODO_APP_STORE_MODULE_NAME)) {
        store.unregisterModule(TODO_APP_STORE_MODULE_NAME)
      }
    })

    const { route, router } = useRouter()
    const routeSortBy = computed(() => route.value.query.sort)
    const routeQuery = computed(() => route.value.query.q)
    const routeParams = computed(() => route.value.params)
    watch(routeParams, () => {
      // eslint-disable-next-line no-use-before-define
      fetchTasks()
    })

    const tasks = ref([])

    const sortOptions = [
      'latest',
      'title-asc',
      'title-desc',
      'assignee',
      'due-date',
    ]
    const sortBy = ref(routeSortBy.value)
    watch(routeSortBy, (val) => {
      if (sortOptions.includes(val)) sortBy.value = val
      else sortBy.value = val
    })
    const resetSortAndNavigate = () => {
      const currentRouteQuery = JSON.parse(JSON.stringify(route.value.query))

      delete currentRouteQuery.sort

      router
        .replace({ name: route.name, query: currentRouteQuery })
        .catch(() => {})
    }

    const blankTask = {
      id: null,
      title: '',
      dueDate: new Date(),
      description: '',
      assignee: null,
      tags: [],
      isCompleted: false,
      isDeleted: false,
      isImportant: false,
    }
    const task = ref(JSON.parse(JSON.stringify(blankTask)))
    const clearTaskData = () => {
      task.value = JSON.parse(JSON.stringify(blankTask))
    }

    const addTask = (val) => {
      store.dispatch('app-todo/addTask', val).then(() => {
        // eslint-disable-next-line no-use-before-define
        fetchTasks()
      })
    }
    const removeTask = () => {
      store.dispatch('app-todo/removeTask', { id: task.value.id }).then(() => {
        // eslint-disable-next-line no-use-before-define
        fetchTasks()
      })
    }
    const updateTask = (taskData) => {
      store.dispatch('app-todo/updateTask', { task: taskData }).then(() => {
        // eslint-disable-next-line no-use-before-define
        fetchTasks()
      })
    }

    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }

    const isTaskHandlerSidebarActive = ref(false)

    const taskTags = [
      {
        title: 'Team',
        color: 'primary',
        route: { name: 'apps-todo-tag', params: { tag: 'team' } },
      },
    ]

    const resolveTagVariant = (tag) => {
      if (tag === 'team') return 'primary'
      if (tag === 'low') return 'success'
      if (tag === 'medium') return 'warning'
      if (tag === 'high') return 'danger'
      if (tag === 'update') return 'info'
      return 'primary'
    }

    const resolveAvatarVariant = (tags) => {
      if (tags.includes('high')) return 'primary'
      if (tags.includes('medium')) return 'warning'
      if (tags.includes('low')) return 'success'
      if (tags.includes('update')) return 'danger'
      if (tags.includes('team')) return 'info'
      return 'primary'
    }

    // Search Query
    const searchQuery = ref(routeQuery.value)
    watch(routeQuery, (val) => {
      searchQuery.value = val
    })
    // eslint-disable-next-line no-use-before-define
    watch([searchQuery, sortBy], () => fetchTasks())
    const updateRouteQuery = (val) => {
      const currentRouteQuery = JSON.parse(JSON.stringify(route.value.query))

      if (val) currentRouteQuery.q = val
      else delete currentRouteQuery.q

      router.replace({ name: route.name, query: currentRouteQuery })
    }

    const fetchTasks = () => {
      store
        .dispatch('app-todo/fetchTasks', {
          q: searchQuery.value,
          filter: router.currentRoute.params.filter,
          tag: router.currentRoute.params.tag,
          sortBy: sortBy.value,
        })
        .then((response) => {
          tasks.value = response.data
        })
    }

    fetchTasks()

    const handleTaskClick = (taskData) => {
      task.value = taskData
      isTaskHandlerSidebarActive.value = true
    }

    // Single Task isCompleted update
    const updateTaskIsCompleted = (taskData) => {
      // eslint-disable-next-line no-param-reassign
      taskData.isCompleted = !taskData.isCompleted
      updateTask(taskData)
    }

    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility()

    return {
      task,
      tasks,
      removeTask,
      addTask,
      updateTask,
      clearTaskData,
      taskTags,
      searchQuery,
      fetchTasks,
      perfectScrollbarSettings,
      updateRouteQuery,
      resetSortAndNavigate,

      // UI
      resolveTagVariant,
      resolveAvatarVariant,
      isTaskHandlerSidebarActive,

      // Click Handler
      handleTaskClick,

      // Filters
      formatDate,
      avatarText,

      // Single Task isCompleted update
      updateTaskIsCompleted,

      // Left Sidebar Responsive
      mqShallShowLeftSidebar,
    }
  },
}
</script>

<style lang="scss" scoped>
.draggable-task-handle {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  visibility: hidden;
  cursor: move;

  .todo-task-list .todo-item:hover & {
    visibility: visible;
  }
}
</style>

<style lang="scss">
@import '~@core/scss/base/pages/app-todo.scss';
</style>
