// module services this
import allMembers from './allMembers'
import memberLog from './memberLog'
import userReferral from './userReferral'
import dailyReferral from './dailyReferral'
import winLose from './winLose'
import rekening from './rekening'
import historyMember from './historyMembers'
import depoWDMember from './depoWDMember'
import editCreditMember from './editCreditMember'
import winLosedetail from './winLosedetail'
import message from './message'

export default {
  namespaced: true,
  modules: {
    allMembers,
    memberLog,
    userReferral,
    dailyReferral,
    winLose,
    rekening,
    historyMember,
    depoWDMember,
    editCreditMember,
    winLosedetail,
    message
  },
}
