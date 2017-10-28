import App from './App.vue'
import store from './store'
import router from './router'
import filters from './plugins/filters'

var app = new Vue({
    router,
    store,
    render: createEle => createEle(App)
}).$mount('#app')