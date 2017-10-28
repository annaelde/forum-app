import Vuex from 'vuex'
import axios from '../plugins/axios'

const thread = { 
    state: {
        data: {},
        comments: [],
        loading: false,
        error: ''
    },
    actions: {
        async loadThread({ commit }, { id, slug }){
            commit('setLoading', true)
            await axios.get(`threads/${id}/${slug}/`)
            .then(response => commit('setThread', response.data))
            .catch(error => commit('setError', error.response.message))
            setTimeout(() => commit('setLoading', false), 4000)
        },
    },
    mutations: {
        setThread(state, thread){
            state.data = thread
        },
        setError(state, message){
            state.error = message
        },
        setLoading(state, loading){
            state.loading = loading
        }
    }
}

export default thread