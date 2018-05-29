import { request } from '../libs/axios'

const forum = {
    namespaced: true,
    state: {
        data: {},
        stats: {},
        boards: []
    },
    actions: {
        async loadBoards(context) {
            // Get boards
            await request({
                context,
                method: 'get',
                url: 'boards/',
                mutations: ['SET_BOARDS'],
                root: true,
                chain: true
            })
        },
        async loadStats(context) {
            // Get forum stats
            await request({
                context,
                method: 'get',
                url: 'forum/',
                mutations: ['SET_STATS'],
                root: true
            })
        },
        async removeBoard(context, { slug }) {
            context.commit('REMOVE_BOARD', slug)
        }
    },
    getters: {
        GET_BOARDS: state => state.boards,
        GET_STATS: state => state.stats
    },
    mutations: {
        SET_BOARDS(state, boards) {
            state.boards = boards
        },
        SET_STATS(state, stats) {
            state.stats = stats
        },
        REMOVE_BOARD(state, slug) { 
            state.boards = state.boards.filter(board => board.slug !== slug)
        }
    }
}

export default forum
