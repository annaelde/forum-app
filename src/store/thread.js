import Vuex from 'vuex'
import StateMachine from '../utils/machine'
import { request } from '../libs/axios'

const thread = {
    namespaced: true,
    state: {
        data: {},
        comments: [],
        machine: new StateMachine(),
        error: ''
    },
    actions: {
        async loadThread(context, { board, key, slug }) {
            // Get thread
            await request({
                context,
                method: 'get',
                url: `boards/${board}/threads/${key}/${slug}/`,
                mutations: ['SET_THREAD'],
                root: true
            })
        },
        async createThread(context, { board, title, content, chain = False }) {
            // Post thread
            await request({
                context,
                method: 'post',
                url: `boards/${board}/threads/`,
                payload: {
                    author: context.rootState.user.data.username,
                    board: board,
                    title: title,
                    content: content
                },
                mutations: ['SET_THREAD'],
                chain
            })
        },
        async deleteThread(context, { board, key, slug }) {
            // Delete thread
            await request({
                context,
                method: 'delete',
                url: `boards/${board}/threads/${key}/${slug}/`,
                mutations: ['SET_THREAD']
            })
        },
        async updateThread(context, { board, key, slug, title, content, chain = false }) {
            // Delete thread
            await request({
                context,
                method: 'patch',
                payload: { title, content },
                url: `boards/${board}/threads/${key}/${slug}/`,
                mutations: ['SET_THREAD'],
                chain
            })
        }
    },
    getters: {
        GET_STATE: state => state.machine.state,
        GET_ERROR: state => state.error,
        GET_THREAD: state => state.data
    },
    mutations: {
        SET_THREAD(state, thread) {
            state.data = thread
        },
        SET_ERROR(state, message) {
            state.error = message
        },
        SET_STATE(state, action) {
            state.machine.do(action)
        }
    }
}

export default thread
