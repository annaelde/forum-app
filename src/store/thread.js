import Vuex from 'vuex'
import StateMachine from '../utils/machine'
import axios from '../libs/axios'

const thread = {
    namespaced: true,
    state: {
        data: {},
        comments: [],
        machine: new StateMachine(),
        error: ''
    },
    actions: {
        async loadThread({ commit, rootState, dispatch }, { board, key, slug }) {
            // Refresh board information
            if (rootState.board.data.slug != board) {
                await dispatch('board/loadBoard', { board: board, context: 'thread' }, { root: true })
            }

            var resolved = true
            commit('updateState', 'request', { root: true })

            await axios
                .get(`boards/${board}/threads/${key}/${slug}/`)
                .then(response => commit('setThread', response.data))
                .catch(error => {
                    commit('setError', error.response, { root: true })
                    commit('updateState', 'reject', { root: true })
                    resolved = false
                })

            if (resolved) commit('updateState', 'resolve', { root: true })
        },
        async postThread({commit, rootState }, { board, title, content }){
            var resolved = true
            commit('updateState', 'request')

            await axios
                .post(`boards/${board}/threads/create/`, { author: rootState.user.data.username, board: board, title: title, content: content })
                .then(response => commit('setThread', response.data))
                .catch(error => {
                    commit('setError', error.response)
                    commit('updateState', 'reject')
                    resolved = false
                })

            if (resolved) commit('updateState', 'resolve')
        }
    },
    mutations: {
        setThread(state, thread) {
            state.data = thread
        },
        setError(state, message) {
            state.error = message
        },
        updateState(state, action){
            state.machine.do(action)
        }
    }
}

export default thread
