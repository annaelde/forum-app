import Vuex from 'vuex'
import StateMachine from '../utils/machine'
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
    getters: {
        GET_STATE: state => state.machine.state,
        GET_ERROR: state => state.error
    },
    mutations: {
        SET_STATE(state, action){
            state.machine.do(action)
        },
        SET_ERROR(state, message) {
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
