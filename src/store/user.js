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
                mutations: ['SET_TOKEN']
            })

            if (!context.state.data){
                await context.dispatch('initialize')
            }
        },
        async restore(context, token) {
            // Restore token from local storage
            if (token) {
                context.commit('SET_TOKEN', { auth_token: token })
                await context.dispatch('initialize')
            }
        },
        async initialize(context) {
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
                mutations: ['REMOVE_TOKEN']
            })
        }
    },
    mutations: {
        SET_TOKEN(state, { auth_token }) {
            state.token = auth_token
            setToken(auth_token)
            setHeader('Authorization', `Token ${auth_token}`)
        },
        REMOVE_TOKEN(state){
            state.token = ''
            removeToken()
            removeHeader('Authorization')
        },
        SET_DATA(state, data) {
            state.data = data
        },
        SET_ERROR(state, message) {
            state.error = message
        },
        SET_STATE(state, action) {
            state.machine.do(action)
        }
    }
}

export default user
