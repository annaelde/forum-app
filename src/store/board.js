import Vuex from 'vuex'
import { request } from '../libs/axios'

const board = {
    namespaced: true,
    state: {
        data: {},
        threads: []
    },
    actions: {
        async initialize(context, { board, sidebarOnly }) {
            // Get board data displayed in sidebar
            await request({
                context,
                method: 'get',
                url: `boards/${board}/`,
                mutations: ['SET_BOARD'],
                root: true,
                chain: sidebarOnly ? true : false
            })

            // Get list of threads (only for board view)
            if (!sidebarOnly) {
                await context.dispatch('getThreads')
            }
        },
        async getThreads(context, params) {
            await request({
                context,
                method: 'get',
                url: `boards/${context.state.data.slug}/threads/${params ? params : ''}`,
                mutations: ['SET_THREADS'],
                root: true
            })
        }
    },
    mutations: {
        SET_BOARD(state, board) {
            state.data = board
        },
        SET_THREADS(state, threads) {
            state.threads = threads
        }
    },
    getters: {
        board: state => state.board,
        threads: state => state.threads
    }
}

export default board
