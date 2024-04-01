import Vue from 'vue'
import Vuex from 'vuex'

import tab from './tab'
import menu from './menu'
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        tab,
        menu
    }
})

