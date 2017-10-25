import Router from 'vue-router'
import App from './App.vue'
import Board from './components/Board.vue'
import Thread from './components/Thread.vue'

// Router Config
Vue.use(Router)

const routes = [
    { path: '/', component: Board },
    { 
        path: '/thread/:id/:slug/',
        component: Thread
    }
]

const router = new Router({
    routes
})

// App Config
var app = new Vue({
    router,
    render: createEle => createEle(App)
}).$mount('#app')
