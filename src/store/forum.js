import Vuex from 'vuex'
import StateMachine from './machine'
import axios from '../plugins/axios'

const forum = {
    namespaced: true,
    state: {
        data: {},
        stats: {},
        boards: [],
        machine: new StateMachine(),
        error: ''
    },
    actions: {
        async loadBoards({ commit }) {
            var resolved = true
            commit('updateState', 'request')

            await axios
                .get(`boards/`)
                .then(response => commit('setBoards', response.data))
                .catch(error => {
                    commit('setError', error.response)
                    commit('updateState', 'reject')
                    resolved = false
                })

            if (resolved) commit('updateState', 'resolve')
        },
        async loadStats({commit}){
            var resolved = true
            commit('setStats', 'request')

            await axios
                .get(`forum/`)
                .then(response => commit('setStats', response.data))
                .catch(error => {
                    commit('setError', error.response)
                    commit('updateState', 'reject')
                    resolved = false
                })

            if (resolved) commit('updateState', 'resolve')
        }
    },
    mutations: {
        setBoards(state, boards) {
            state.boards = boards
        },
        setError(state, message) {
            state.error = message
        },
        setStats(state, stats){
            state.stats = stats
        },
        updateState(state, action) {
            state.machine.do(action)
        }
    }
}

export default forum
