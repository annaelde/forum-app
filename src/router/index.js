import Router from 'vue-router'
import Forum from '../components/Forum.vue'
import Board from '../components/Board.vue'
import Sidebar from '../components/Sidebar.vue'
import Thread from '../components/Thread.vue'

Vue.use(Router)

const routes = [
    { 
        path: '/', 
        components: {
            main: Forum,
            sidebar: Sidebar
        }
    },
    {
        path: '/~:board/',
        components: {
            main: Board,
            sidebar: Sidebar
        }
    },
    { 
        path: '/~:board/:key/:slug/',
        components: {
            main: Thread,
            sidebar: Sidebar
        }
    }
]

const router = new Router({
    mode: 'history',
    routes,
    scrollBehavior (to, from, savedPosition) {
        return savedPosition ? savedPosition : { x: 0, y: 0}
    }
})

export default router