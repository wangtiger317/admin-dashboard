import jwtDefaultConfig from './jwtDefaultConfig'
import useJwt from '@/auth/jwt/useJwt'

export default class JwtService {
  // Will be used by this service for making API calls
  axiosIns = null

  // jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // For Refreshing Token
  subscribers = []

  constructor(axiosIns, jwtOverrideConfig) {
    this.axiosIns = axiosIns
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // Request Interceptor
    this.axiosIns.interceptors.request.use(
      (config) => {
        // Get token from localStorage
        const accessToken = this.getToken()

        // If token is present add it to request's Authorization Header
        if (accessToken) {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Add request/response interceptor
    this.axiosIns.interceptors.response.use(
      (response) => response,
      (error) => {
        // const { config, response: { status } } = error
        const { config, response } = error
        const originalRequest = config

        // if (status === 401) {
        if (response && response.status === 401) {
          localStorage.removeItem(this.jwtConfig.storageTokenKeyName)
          localStorage.removeItem(this.jwtConfig.storageRefreshTokenKeyName)
          // Remove userData from localStorage
          localStorage.removeItem('userData')
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true
            this.refreshToken().then((r) => {
              this.isAlreadyFetchingAccessToken = false

              // Update accessToken in localStorage
              this.setToken(r.data.accessToken)
              this.setRefreshToken(r.data.refreshToken)

              this.onAccessTokenFetched(r.data.accessToken)
            })
          }
          const retryOriginalRequest = new Promise((resolve) => {
            this.addSubscriber((accessToken) => {
              // Make sure to assign accessToken according to your response.
              // Check: https://pixinvent.ticksy.com/ticket/2413870
              // Change Authorization header
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
              resolve(this.axiosIns(originalRequest))
            })
          })
          return retryOriginalRequest
        }
        return Promise.reject(error)
      }
    )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter((callback) =>
      callback(accessToken)
    )
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  fetchData(uri, path = '', ...args) {
    return this.axiosIns.get(`${this.jwtConfig[uri]}${path}`, ...args)
  }

  deleteSlideImg(uri, path = '', ...args) {
    return this.axiosIns.delete(`${this.jwtConfig[uri]}${path}`, ...args)
  }

  // endpoint for withdrawal progress delete
  DeleteProgressData(uri, path = '', ...args) {
    return this.axiosIns.patch(`${this.jwtConfig[uri]}${path}`, ...args)
  }

  fetchSingleMember(...args) {
    return this.axiosIns.get(this.jwtConfig.fetchSingleMember, ...args)
  }

  // UPDATE DATA
  updateData(uri, path, ...args) {
    return this.axiosIns.patch(`${this.jwtConfig[uri]}${path}`, ...args)
  }

  // delete agent ip
  deleteIP(uri, path, ...args) {
    return this.axiosIns.delete(`${this.jwtConfig[uri]}${path}`, ...args)
  }

  // CREATE DATA
  createData(uri, path, ...args) {
    return this.axiosIns.post(`${this.jwtConfig[uri]}${path}`, ...args)
  }

  // CREATE DATA
  getDataList(uri, path, ...args) {
    return this.axiosIns.get(`${this.jwtConfig[uri]}${path}`, ...args)
  }

  // delete DATA
  deletememberUser(uri, path, ...args) {
    return this.axiosIns.delete(`${this.jwtConfig[uri]}${path}`, ...args)
  }

  // DELETE DATA
  deleteData(uri, path, ...args) {
    return this.axiosIns.delete(`${this.jwtConfig[uri]}${path}`, ...args)
  }

  // delete admin user
  deleteAdmin(uri, path, ...args) {
    return this.axiosIns.post(`${this.jwtConfig[uri]}${path}`, ...args)
  }

  // delete BLOK

  deleteBlock(uri, path, ...args) {
    return this.axiosIns.delete(`${this.jwtConfig[uri]}${path}`, ...args)
  }

  // delete admin user
  deletAdminRole(uri, path, ...args) {
    return this.axiosIns.delete(`${this.jwtConfig[uri]}${path}`, ...args)
  }

  // delete delete Deposit Progress
  deleteDepositProgress(uri, path, ...args) {
    return this.axiosIns.patch(`${this.jwtConfig[uri]}${path}`, ...args)
  }

  // logout post this
  logout(...args) {
    return this.axiosIns.post(this.jwtConfig.logoutEndpoint, ...args)
  }

  // login post this
  login(...args) {
    return this.axiosIns.post(this.jwtConfig.loginEndpoint, ...args)
  }

  // adminLevel list
  adminLevel(...args) {
    return this.axiosIns.get(this.jwtConfig.adminLevel, ...args)
  }

  // adminLog list
  adminLog(...args) {
    return this.axiosIns.get(this.jwtConfig.adminLog, ...args)
  }

  // adminLog list
  dailyReferralLog(...args) {
    return this.axiosIns.get(this.jwtConfig.dailyReferralLog, ...args)
  }

  // winloseAllDownload
  winLoseAllDownload(...args) {
    return this.axiosIns.get(this.jwtConfig.winloseAllDownload, ...args)
  }

  // bonus to send download csv
  bonusToSendDownload(...args) {
    return this.axiosIns.get(this.jwtConfig.bonusToSendDownload, ...args)
  }

  // deleting account
  deleteRekening(obj) {
    return this.axiosIns.post(
      this.jwtConfig.deleteRekening + '?id=' + obj.params.id
    )
  }
  deleteBankAccount(obj) {
    return this.axiosIns.post(
      this.jwtConfig.deleteBankAccount + '?id=' + obj.params.id
    )
  }

  deleteBlok(uri, path, ...args) {
    return this.axiosIns.delete(`${this.jwtConfig[uri]}${path}`, ...args)
  }

  deleteBankName(obj) {
    return this.axiosIns.post(
      this.jwtConfig.deleteBankName + '?id=' + obj.params.id
    )
  }

  // adminIp list
  adminIp(...args) {
    return this.axiosIns.get(this.jwtConfig.adminIp, ...args)
  }

  // deposit Approved List
  depositApproved(...args) {
    return this.axiosIns.get(this.jwtConfig.depositApproved, ...args)
  }

  // deposit Mutasi Bank List
  mutasiBank(...args) {
    return this.axiosIns.get(this.jwtConfig.mutasiBank, ...args)
  }

  // deposit Balance Bank List
  balanceBank(...args) {
    return this.axiosIns.get(this.jwtConfig.balanceBank, ...args)
  }

  // all Member List
  allMembersList(...args) {
    return this.axiosIns.get(this.jwtConfig.allMembersList, ...args)
  }

  // all Member List
  withdrawalApproved(...args) {
    return this.axiosIns.get(this.jwtConfig.withdrawalApproved, ...args)
  }

  // Endpoints Dashboard Status
  dashboardStatus(...args) {
    return this.axiosIns.get(this.jwtConfig.dashboardStatus, ...args)
  }

  // Endpoints web setting
  settingWeb(...args) {
    return this.axiosIns.get(this.jwtConfig.settingWeb, ...args)
  }

  // Endpoints web page setting
  settingWebPage(...args) {
    return this.axiosIns.get(this.jwtConfig.settingWebPage, ...args)
  }

  // Endpoints web website content list
  webContent(...args) {
    return this.axiosIns.get(this.jwtConfig.webContent, ...args)
  }

  // Endpoints  webSosmed list
  webSosmed(...args) {
    return this.axiosIns.get(this.jwtConfig.webSosmed, ...args)
  }

  // Endpoints  webLimit list
  webLimit(...args) {
    return this.axiosIns.get(this.jwtConfig.webLimit, ...args)
  }

  // Endpoints  peraturan games
  peraturanGames(...args) {
    return this.axiosIns.get(this.jwtConfig.peraturanGames, ...args)
  }

  //  Endpoints userDeactive
  userDeactive(...args) {
    return this.axiosIns.get(this.jwtConfig.userDeactive, ...args)
  }

  // Endpoints userActive
  userActive(...args) {
    return this.axiosIns.get(this.jwtConfig.userActive, ...args)
  }

  // Endpoints bankOnline
  bankOnline(...args) {
    return this.axiosIns.get(this.jwtConfig.bankOnline, ...args)
  }

  // Endpoints myAccount
  myAccount(...args) {
    return this.axiosIns.get(this.jwtConfig.myAccount, ...args)
  }

  //  Endpoints rekeningPulsa
  rekeningPulsa(...args) {
    return this.axiosIns.get(this.jwtConfig.rekeningPulsa, ...args)
  }

  //  Endpoints bankName
  bankName(...args) {
    return this.axiosIns.get(this.jwtConfig.bankName, ...args)
  }

  // Endpoints mutasiEdit
  mutasiEdit(...args) {
    return this.axiosIns.get(this.jwtConfig.mutasiEdit, ...args)
  }

  // Endpoints promoPage
  promoPage(...args) {
    return this.axiosIns.get(this.jwtConfig.promoPage, ...args)
  }

  // Endpoints slidePopup
  slidePopup(...args) {
    return this.axiosIns.get(this.jwtConfig.slidePopup, ...args)
  }

  // Endpoint for maucau
  macauContent(...args) {
    return this.axiosIns.get(this.jwtConfig.macauContent, ...args)
  }

  //  Endpoints withdrawProgress
  withdrawProgress(...args) {
    return this.axiosIns.get(this.jwtConfig.withdrawProgress, ...args)
  }

  //  Endpoints bankAccount
  bankAccount(...args) {
    return this.axiosIns.get(this.jwtConfig.bankAccount, ...args)
  }

  // Endpoints bankUser
  bankUser(...args) {
    return this.axiosIns.get(this.jwtConfig.bankUser, ...args)
  }

  bankFilter(...args) {
    return this.axiosIns.get(this.jwtConfig.bankFilter, ...args)
  }

  rekeningFilter(...args) {
    return this.axiosIns.get(this.jwtConfig.rekeningFilter, ...args)
  }

  depositProgress(...args) {
    return this.axiosIns.get(this.jwtConfig.depositProgress, ...args)
  }

  listPeriode(...args) {
    return this.axiosIns.get(this.jwtConfig.listPeriode, ...args)
  }

  listMarket(...args) {
    return this.axiosIns.get(this.jwtConfig.listMarket, ...args)
  }

  kelauranList(...args) {
    return this.axiosIns.get(this.jwtConfig.kelauranList, ...args)
  }

  settingBlok(...args) {
    return this.axiosIns.get(this.jwtConfig.settingBlok, ...args)
  }

  memberReferral(...args) {
    return this.axiosIns.get(this.jwtConfig.memberReferral, ...args)
  }

  settingMaintenance(...args) {
    return this.axiosIns.get(this.jwtConfig.settingMaintenance, ...args)
  }

  register(...args) {
    return this.axiosIns.post(this.jwtConfig.registerEndpoint, ...args)
  }

  refreshToken() {
    return this.axiosIns.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken(),
    })
  }
}
