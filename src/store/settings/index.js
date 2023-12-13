// module services this
import games from './games'
import pasarans from './pasarans'
import webSosmed from './webSosmed'
import maintenace from './maintenance'
import socialMedia from './socialMedia'

export default {
  namespaced: true,
  modules: {
    games,
    pasarans,
    webSosmed,
    maintenace,
    socialMedia,
  },
}
