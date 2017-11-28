import { request } from '../libs/axios'

const board = {
    namespaced: true,
    state: {
        data: {},
        threads: []
    },
    actions: {
        async loadBoard(context, { board, chain = false }) {
            // Get board data displayed in sidebar
            await request({
                context,
                method: 'get',
                url: `boards/${board}/`,
                mutations: ['SET_DATA'],
                root: true,
                chain
            })
        },
        async loadThreads(context, { params = false, chain = false } = {}) {
            await request({
                context,
                method: 'get',
                url: `boards/${context.getters.GET_SLUG}/threads/${params ? params : ''}`,
                mutations: ['SET_THREADS'],
                root: true,
                chain
            })
        }
    },
    mutations: {
        SET_DATA(state, data) {
            state.data = data
        },
        SET_THREADS(state, threads) {
            state.threads = threads
        }
    },
    getters: {
        GET_DATA: state => state.data,
        GET_SLUG: state => state.data.slug,
        GET_THREADS: state => state.threads
    }
}

export default board
