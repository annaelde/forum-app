import Vuex from 'vuex'
import axios from '../plugins/axios'

const user = {
    state: {
        token: '',
        data: {},
        error: ''
    },
    actions: {
        async authenticateUser({ dispatch, commit }, credentials) {
            await axios
            .post('auth/token/create/', credentials)
            .then(({ data }) => commit('setToken', data['auth_token']))
            .catch(error => commit('setError', error))
            dispatch('loadUser')
        },
        async loadUser({ commit }) {
            await axios
            .get('auth/me/')
            .then(({ data })  => commit('setUser', data))
            .catch(error => commit('setError', error))
        },
        async deauthenticateUser({ commit }){
            await axios
            .post('auth/token/destroy/')
            .then(({ data }) => commit('setToken', ''))
            .then( commit('setUser', {}) )
            .catch(error => commit('setError', error))
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            if (token !== '')
                axios.defaults.headers.common['Authorization'] = 'Token ' + token
            else
                delete axios.defaults.headers.common['Authorization']
        },
        setUser(state, user) {
            state.data = user
        },
        setError(state, message){
            state.error = message
        }
    }
}

export default user