import Vuex from 'vuex'
import axios from '../plugins/axios'

const board = { 
    state: {
        board: {},
        threads: [],
        error: ''
    },
    actions: {
        async loadBoard({ commit }, slug){
            commit('setBoard', { name : '' })
        },
        async loadThreads({ state, commit }) {
            await axios.get('threads/' + state.board.name)
            .then(response => commit('setThreads', response.data))
            .catch(error => commit('setError', error.response.message))
        }
    },
    mutations: {
        setBoard(state, board){
            state.board = board
        },
        setThreads(state, threads) {
            state.threads = threads
        },
        setError(state, message){
            state.error = message
        }
    },
    getters: {
        getThreadByDate: state => {
            return state.threads.sort((a, b) => new Date(b.date) - new Date(a.date))
        }
    }
}

export default board