// module bonus & potongan this
import freeBet from './freeBet'
import bonusSetting from './bonusSetting'
import bonusHistory from './bonusHistory'
import bonusSend from './bonusSend'
import potonganProvider from './potonganProvider'

export default {
  namespaced: true,

  modules: {
    freeBet,
    bonusSetting,
    bonusHistory,
    bonusSend,
    potonganProvider,
  },
}
