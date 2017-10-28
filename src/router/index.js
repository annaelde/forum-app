import Router from 'vue-router'
import Board from '../components/Board.vue'
import Thread from '../components/Thread.vue'

Vue.use(Router)

const routes = [
    { 
        path: '/', 
        component: Board 
    },
    { 
        path: '/thread/:id/:slug/',
        component: Thread
    }
]

const router = new Router({
    routes
})

export default router