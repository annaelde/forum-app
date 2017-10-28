import Vuex from 'vuex'
import axios from '../plugins/axios'
import user from './user'
import board from './board'
import thread from './thread'

Vue.use(Vuex)

const store = new Vuex.Store({
   modules: {
       user,
       board,
       thread
   }
})

export default store
