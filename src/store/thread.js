import Vuex from 'vuex'
import StateMachine from './machine'
import axios from '../plugins/axios'

const thread = {
    namespaced: true,
    state: {
        data: {},
        comments: []
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
        }
    },
    mutations: {
        setThread(state, thread) {
            state.data = thread
        }
    }
}

export default thread
