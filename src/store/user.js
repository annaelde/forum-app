import Vuex from 'vuex'
import StateMachine from '../utils/machine'
import { request, setHeader, removeHeader } from '../libs/axios'
import { setToken, removeToken } from '../libs/store'

const user = {
    namespaced: true,
    state: {
        token: '',
        data: null,
        machine: new StateMachine(),
        error: ''
    },
    actions: {
        async authenticate(context, credentials) {
            // Request token from server
            await request({
                context,
                method: 'post',
                url: `auth/token/create/`,
                payload: credentials,
                mutations: ['SET_TOKEN'],
                chain: true
            })

            // You'll always want to load user data after
            // authenticating, so this is called here.
            if (context.getters.GET_STATE !== 'handling') {
                await context.dispatch('load')
            }
        },
        async restore(context, token) {
            // Restore token from local storage
            if (token) {
                context.commit('SET_TOKEN', { auth_token: token })
                await context.dispatch('load')

                // Delete the token if we get a 401
                if (context.getters.GET_ERROR.status === 401) {
                    context.commit('REMOVE_TOKEN')
                    context.commit('SET_DATA')
                    context.commit('SET_ERROR')
                }
            }
        },
        async load(context) {
            // Request user data
            await request({
                context,
                method: 'get',
                url: 'auth/me/',
                mutations: ['SET_DATA']
            })
        },
        async deauthenticate(context) {
            // Destroy token
            await request({
                context,
                method: 'post',
                url: 'auth/token/destroy/',
                mutations: ['REMOVE_TOKEN', 'SET_DATA']
            })
        },
        async register(context, payload) {
            await request({
                context,
                method: 'post',
                url: `auth/users/create/`,
                payload,
                mutations: ['SET_DATA']
            })
        }
    },
    getters: {
        GET_STATE: state => state.machine.state,
        GET_ERROR: state => state.error,
        GET_AUTHENTICATION: state => state.token ? true : false,
        GET_USER: state => state.data,
        GET_USERNAME: state => {
            if (state.data) {
                return state.data.username
            } else {
                return ''
            }
        }
    },
    mutations: {
        SET_TOKEN(state, { auth_token }) {
            state.token = auth_token
            setToken(auth_token)
            setHeader('Authorization', `Token ${auth_token}`)
        },
        REMOVE_TOKEN(state) {
            state.token = ''
            removeToken()
            removeHeader('Authorization')
        },
        SET_DATA(state, data = {}) {
            state.data = data
        },
        SET_ERROR(state, message = '') {
            state.error = message
        },
        SET_STATE(state, action) {
            state.machine.do(action)
        }
    }
}

export default user
