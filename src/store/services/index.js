// module services this
import accounts from './accounts'
import deposits from './deposits'
import withdraws from './witdraws'
import mutasiBank from './mutasiBank'
import mutasiCredit from './mutasiCredit'
import balanceBank from './balanceBank'
import bankOnline from './bankOnline'
import topDepoWd from './topDepoWd'
import rekening from './rekening'
import listBank from './listBank'
import migrasiRekening from './migrasiRekening'

export default {
  namespaced: true,

  modules: {
    accounts,
    deposits,
    withdraws,
    mutasiBank,
    mutasiCredit,
    balanceBank,
    bankOnline,
    topDepoWd,
    rekening,
    listBank,
    migrasiRekening,
  },
}
