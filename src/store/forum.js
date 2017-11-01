import Vuex from 'vuex'
import StateMachine from '../utils/machine'
import axios from '../libs/axios'

const forum = {
    namespaced: true,
    state: {
        data: {},
        stats: {},
        boards: []
    },
    actions: {
        async loadBoards({ commit, dispatch }) {
            var resolved = true
            commit('updateState', 'request', { root: true })

            await axios
                .get(`boards/`)
                .then(response => commit('setBoards', response.data))
                .catch(error => {
                    commit('setError', error.response, { root: true })
                    commit('updateState', 'reject', { root: true })
                    resolved = false
                })

            if (resolved) {
                commit('updateState', 'resolve', { root: true })
                dispatch('loadStats')
            }
        },
        async loadStats({ commit }) {
            var resolved = true
            commit('updateState', 'request', { root: true })

            await axios
                .get(`forum/`)
                .then(response => commit('setStats', response.data))
                .catch(error => {
                    commit('setError', error.response, { root: true })
                    commit('updateState', 'reject', { root: true })
                    resolved = false
                })

            if (resolved) commit('updateState', 'resolve', { root: true })
        }
    },
    mutations: {
        setBoards(state, boards) {
            state.boards = boards
        },
        setStats(state, stats) {
            state.stats = stats
        }
    }
}

export default forum
