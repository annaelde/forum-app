import Vuex from 'vuex'
import StateMachine from './machine'
import axios from '../plugins/axios'
import forum from './forum'
import user from './user'
import board from './board'
import thread from './thread'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        error: '',
        machine: new StateMachine()
    },
    mutations: {
        updateState(state, action){
            state.machine.do(action)
        },
        setError(state, message) {
            state.error = message
        }
    },
    modules: {
        forum,
        user,
        board,
        thread
    }
})

export default store
