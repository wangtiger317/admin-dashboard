export default {
  // Endpoints LOGIN & LOGOUT MODULE
  loginEndpoint: '/login',
  logoutEndpoint: '/logout',

  // Endpoints ADMIN MODULE
  agentAll: '/admin',
  adminLog: '/admin/log/list',
  adminIp: '/admin/ip',
  adminLevel: '/admin/level/list',
  userDeactive: '/admin/deactivated-user/list',
  userActive: '/admin/active-user/list',
  myAccount: '/admin/my-account',
  adminUser: '/admin',
  agentIp: '/admin/ip',

  // Endpoints SERVICES MODULE
  depositApproved: '/services/deposit/deposits-approved',
  depositProgress: '/services/deposit/deposits-in-progress',
  bankOnline: '/services/bank-online-list',
  bankUser: '/services/bank-user-list',
  bankFilter: '/services/constant-bank-filter',
  rekeningFilter: '/services/rekening-bank-filter',
  deleteRekening: `/services/rekening-delete`,
  deleteBankAccount: `/services/rekening-delete`,
  deleteBankName: `/services/constant-rekening-delete`,
  deleteProgress: `/services/deposit`,

  servicesAccount: '/services',
  //allMembers: '/member',
  dailyReferralLog: '/member/daily-referral-list',

  bankAccount: '/services/bank-account-list',
  mutasiBank: '/services/mutasi-bank-list',
  balanceBank: '/services/balance-bank-list',
  withdrawalApproved: '/services/withdraw-approval',
  withdrawProgress: '/services/withdraw-progress',
  rekeningPulsa: '/services/rekening-pulsa-list',
  bankName: '/services/bank-name-list',
  mutasiEdit: '/services/mutasi-edit-credit-list',
  winloseAllDownload: '/member/win-lose-all-download',

  // BONUS POTONGAN SETTING MODULE
  bonusPotonganAll: '/bonus-potongan',
  bonusToSendDownload: '/bonus-potongan/bonus-to-send-download-csv',

  // Endpoints Members MODULE
  allMembers: '/member',
  fetchSingleMember: '/member/profile-member',
  memberReferral: '/member/member-referral-list',

  // Endpoints DASHBOARD MODULE
  dashboardStatus: '/dashboard/status',

  // ENDPOINT BETS MODULE
  betsAll: '/bets',
  betsBuangan: '/bets/bet-buangan',
  betTable: '/bets/bets-table',
  filterTable: '/bets/bets-table/pasaran',
  filterUsername: '/member/member-dropdown',

  // Endpoints SETTING MODULE
  settingAll: '/setting',
  settingWeb: '/setting/web',
  settingWebPage: '/setting/web-page',
  filterPasaran: '/setting/pasaran-filter',
  gameList: '/setting/game-list',
  webSosmed: '/setting/sosmed',
  webLimit: '/setting/limit-line',
  macauContent: '/setting/game-list',
  listPeriode: '/setting/list-period',
  settingBlok: '/setting/block-angka-list',
  settingMaintenance: '/setting/maintenance',
  listMarket: '/setting/pasaran-lists',

  // Endpoints CMS MODULE
  webContent: '/cms/website-content',
  peraturanGames: '/cms/game-content',
  promoPage: '/cms/promo-page',
  slidePopup: '/cms/slide-popup-images',
  cms: '/cms',

  // ENDPOINT MODULE KELUARAn
  allKeluaran: '/keluaran',

  //  Endpoints LAIN-LAIN MODULE
  lainLainAll: 'lain-lain',

  registerEndpoint: '/jwt/register',
  refreshEndpoint: '/jwt/refresh-token',

  //  Endpoints KELAURAN-LIST MODULE
  kelauranList: 'keluaran/kelauran-list',

  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
