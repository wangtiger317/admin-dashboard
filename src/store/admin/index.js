// module admin this
import adminIp from './ip'
import adminLog from './adminLog'
import adminUser from './adminUser'
import adminLevel from './adminLevel'

export default {
  namespaced: true,
  modules: {
    adminIp,
    adminLog,
    adminUser,
    adminLevel,
  },
}
