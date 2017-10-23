import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Board from './components/Board.vue'
import Thread from './components/Thread.vue'

Vue.use(Router)

const routes = [
    { path: '/', component: Board },
    { 
        path: '/thread/:id/:slug',
        component: Thread
    }
]

const router = new Router({
    routes
})

var view = new Vue({
    router,
    template: '<App/>',
    components: { App }
}).$mount('#app')
