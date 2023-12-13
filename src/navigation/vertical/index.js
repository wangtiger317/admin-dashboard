/*

Array of object

Top level object can be:
1. Header
2. Group (Group can have navItems as children)
3. navItem

* Supported Options

/--- Header ---/

header

/--- nav Grp ---/

title
icon (if it's on top level)
tag
tagVariant
children

/--- nav Item ---/

icon (if it's on top level)
title
route: [route_obj/route_name] (I have to resolve name somehow from the route obj)
tag
tagVariant

*/

// import vertical siderbar navigation disini
import dashboard from './dashboard'
import admin from './agent'
import members from './members'
import services from './services'
import bets from './bets'
import bonusePotongan from './bonus-potongan'
import keluaran from './keluaran'
import setting from './setting'
import cms from './cms'
import lainlain from './lain-lain'

// Array of sections export vertical sidebar navigation disini
export default [
  ...dashboard,
  ...admin,
  ...members,
  ...services,
  ...bets,
  ...bonusePotongan,
  ...keluaran,
  ...setting,
  ...cms,
  ...lainlain,
]
