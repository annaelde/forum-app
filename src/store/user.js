import Vuex from 'vuex'
import StateMachine from '../utils/machine'
import axios from '../libs/axios'

const user = {
    namespaced: true,
    state: {
        token: '',
        data: {},
        machine: new StateMachine(),
        error: ''
    },
    actions: {
        async authenticate({ dispatch, commit, rootState }, credentials) {
            var resolved = true
            commit('updateState', 'request')

            await axios
                .post('auth/token/create/', credentials)
                .then(({ data }) => commit('setToken', data['auth_token']))
                .catch(error => {
                    commit('setError', error.response)
                    commit('updateState', 'reject')
                    resolved = false
                })

            if (resolved) {
                commit('updateState', 'resolve')
                dispatch('load')
            }
        },
        async load({ commit }) {
            var resolved = true
            commit('updateState', 'request')
            
            await axios
                .get('auth/me/')
                .then(({ data }) => commit('setData', data))
                .catch(error => {
                    commit('setError', error.response)
                    commit('updateState', 'reject')
                    resolved = false
                })
            
            if (resolved) commit('updateState', 'resolve')
        },
        async deauthenticate({ commit }) {
            var resolved = true
            commit('updateState', 'request')
            
            await axios
                .post('auth/token/destroy/')
                .then(({ data }) => commit('setToken', ''))
                .then(commit('setData', {}))
                .catch(error => {
                    commit('setError', error.response)
                    commit('updateState', 'reject')
                    resolved = false
                })

            if (resolved) commit('updateState', 'resolve')
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            if (token !== '') axios.defaults.headers.common['Authorization'] = 'Token ' + token
            else delete axios.defaults.headers.common['Authorization']
        },
        setData(state, data) {
            state.data = data
        },
        setError(state, message) {
            state.error = message
        },
        updateState(state, action){
            state.machine.do(action)
        }
    }
}

export default user
