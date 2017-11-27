import App from './App.vue'
import store from './store'
import router from './router'
import filters from './utils/filters'

new Vue({
    router,
    store,
    filters,
    render: createEle => createEle(App)
}).$mount('#app')