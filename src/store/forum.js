import Vuex from 'vuex'
import { request } from '../libs/axios'

const forum = {
    namespaced: true,
    state: {
        data: {},
        stats: {},
        boards: []
    },
    actions: {
        async initialize(context) {
            // Get boards
            await request({
                context,
                method: 'get',
                url: 'boards/',
                mutations: ['SET_BOARDS'],
                root: true,
                chain: true
            })

            // Get forum stats
            await request({
                context,
                method: 'get',
                url: 'forum/',
                mutations: ['SET_STATS'],
                root: true
            })
        }
    },
    mutations: {
        SET_BOARDS(state, boards) {
            state.boards = boards
        },
        SET_STATS(state, stats) {
            state.stats = stats
        }
    }
}

export default forum
