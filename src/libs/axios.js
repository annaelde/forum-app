import axios from 'axios'
import { forEach } from 'lodash'

export const http = axios.create({
    /// #if DEVELOPMENT
    baseURL: 'http://localhost:8000/api/',
    withCredentials: true
    /// #endif
})

export function setHeader(key, value) {
    http.defaults.headers.common[key] = value
}

export function removeHeader(key) {
    delete http.defaults.headers.common[key]
}

/**
 * 
 * @param {Object} context - Vuex store context
 * @param {string} method - HTTP Method
 * @param {string} url - API URL
 * @param {Object} payload - Payload to send to API
 * @param {Array} mutations - All mutations to commit
 * @param {boolean} root - Whether to commit mutations in global scope 
 * @param {boolean} chain - Whether to resolve state, or leave loading
 */
export async function request({ context, method, url, payload, mutations, root, chain }) {
    var resolved = true
    context.commit('SET_STATE', 'request', { root })

    await http[method](url, payload)
        .then(response => {
            forEach(mutations, mutation => {
                context.commit(mutation, response.data)
            })
        })
        .catch(error => {
            context.commit('SET_ERROR', error.response, { root })

            if (chain) {
                context.commit('SET_STATE', 'handle', { root })
            } else {
                context.commit('SET_STATE', 'reject', { root })
            }

            resolved = false
        })

    if (resolved && chain) {
        context.commit('SET_STATE', 'update', { root })
    } else if (resolved) {
        context.commit('SET_STATE', 'resolve', { root })
    }

    // If an error was previously raised, remove it
    if (resolved && context.getters.GET_ERROR) {
        context.commit('SET_ERROR', '', { root })
    }
}
