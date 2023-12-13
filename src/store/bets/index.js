// module services this
import betsTable from './betsTable'
import listBets from './listBets'

import betsBuangan from './betsBuangan'
import betsTerpasang from './betsTerpasang'

export default {
  namespaced: true,
  modules: {
    betsTable,
    listBets,
    betsBuangan,
    betsTerpasang,
  },
}
