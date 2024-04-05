import Vue from 'vue'
import Vuex from 'vuex'

import tab from './tab'
import menu from './menu'
import userInfo from './userInfo'
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        tab,
        menu,
        userInfo
    }
})

