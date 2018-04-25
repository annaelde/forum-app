import store from '@npm/store'

export function getToken() {
    return store.get('token')
}

export function setToken(payload) {
    store.set('token', payload)
}

export function removeToken(){
    store.remove('token')
}