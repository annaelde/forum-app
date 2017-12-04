import { request } from '../libs/axios'

const board = {
    namespaced: true,
    state: {
        available: [],
        current: {}
    },
    actions: {
        async loadBoard(context, { board, chain = false }) {
            // Get board data displayed in sidebar
            let data = context.getters.GET_BOARD(board)
            if (!data || data.freshness - Date.now() < 24 * 360000) {
                await request({
                    context,
                    method: 'get',
                    url: `boards/${board}/`,
                    mutations: ['SET_AVAILABLE'],
                    root: true,
                    chain
                })
            }

            context.commit('SET_CURRENT', board)
        },
        async loadThreads(context, { params = false, chain = false } = {}) {
            await request({
                context,
                method: 'get',
                url: `boards/${context.getters.GET_CURRENT.slug}/threads/${params ? params : ''}`,
                mutations: ['SET_THREADS'],
                root: true,
                chain
            })
        }
    },
    mutations: {
        SET_CURRENT(state, slug) {
            state.current = state.available.find(board => board.slug === slug)
        },
        SET_AVAILABLE(state, data) {
            data['freshness'] = Date.now()
            state.available.push(data)
        },
        SET_THREADS(state, threads) {
            Vue.set(state.current, 'threads', threads)
        }
    },
    getters: {
        GET_AVAILABLE: state => state.available,
        GET_CURRENT: state => state.current,
        GET_BOARD: state => slug => state.available.find(board => board.slug === slug),
        GET_THREADS: state => state.current.threads
    }
}

export default board
