import store from 'store'

export function retrieveToken() {
    return store.get('token')
}

export function storeToken(payload) {
    store.set('token', payload)
}
