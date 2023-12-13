// module services this
import kelauran from './kelauran'
import scan from './scan'
import analisa from './analisa'
import submit from './submit'

export default {
  namespaced: true,
  modules: {
    submit,
    kelauran,
    scan,
    analisa,
  },
}
