import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import admin from './admin'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import services from './services'
import members from './members'
import dashboard from './dashboard'
import settings from './settings'
import cms from './cms'
import broadcast from './broadcast'
import account from './account'
import bonus from './bonus'
import bets from './bets'
import kelauran from './kelauran'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    admin,
    app,
    appConfig,
    verticalMenu,
    services,
    members,
    dashboard,
    settings,
    cms,
    broadcast,
    account,
    bonus,
    bets,
    kelauran,
  },
  strict: process.env.DEV,
})
