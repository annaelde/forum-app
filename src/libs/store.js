import store from 'store'

export function getToken() {
    return store.get('token')
}

export function setToken(payload) {
    store.set('token', payload)
}

export function removeToken(payload){
    store.remove('token')
}