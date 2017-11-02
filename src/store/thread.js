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
        async getThread(context, { board, key, slug }) {
            // Refresh board information
            if (context.rootState.board.data.slug != board) {
                await context.dispatch(
                    'board/initialize',
                    {
                        board: board,
                        sidebarOnly: true
                    },
                    { root: true }
                )
            }

            // Get thread
            await request({
                context,
                method: 'get',
                url: `boards/${board}/threads/${key}/${slug}/`,
                mutations: ['SET_THREAD'],
                root: true
            })
        },
        async postThread(context, { board, title, content }) {
            // Post thread
            await request({
                context,
                method: 'post',
                url: `boards/${board}/threads/create/`,
                payload: { author: context.rootState.user.data.username, board: board, title: title, content: content },
                mutations: ['SET_THREAD']
            })

            // Refresh the board
            await context.dispatch('board/getThreads', null, { root: true })
        }
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
