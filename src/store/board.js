import Vuex from 'vuex'
import axios from '../plugins/axios'

const board = {
    namespaced: true,
    state: {
        data: {},
        threads: [],
        error: ''
    },
    actions: {
        async loadBoard({ commit }, slug) {
            commit('setBoard', { name: '' })
        },
        async loadThreads({ state, commit, rootState }) {
            // Track if the promise was resolved or rejected
            var resolved = true

            // Notify components that we're requesting something
            commit('updateState', 'request', { root: true })

            await axios
                .get('threads/' + (state.data.name ? `${state.data.name}/` : ''))
                .then(response => commit('setThreads', response.data))
                .catch(error => { 
                    // Supply error and set state machine to handle
                    commit('setError', error.response, { root: true })
                    commit('updateState', 'handle', { root: true })
                    resolved = false
                })
            
            // Only set the state machine back to idle on success
            if (resolved) commit('updateState', 'resolve', { root: true })
        }
    },
    mutations: {
        setBoard(state, board) {
            state.data = board
        },
        setThreads(state, threads) {
            state.threads = threads
        },
        setError(state, message) {
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
