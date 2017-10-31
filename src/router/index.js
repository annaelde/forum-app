import Router from 'vue-router'

import Forum from '../components/views/Forum.vue'
import Board from '../components/views/Board.vue'
import Thread from '../components/views/Thread.vue'

import ForumSidebar from '../components/sidebars/Forum.vue'
import BoardSidebar from '../components/sidebars/Board.vue'

Vue.use(Router)

const routes = [
    {
        path: '/',
        components: {
            main: Forum,
            sidebar: ForumSidebar
        }
    },
    {
        path: '/~:board/',
        components: {
            main: Board,
            sidebar: BoardSidebar
        }
    },
    {
        path: '/~:board/:key/:slug/',
        components: {
            main: Thread,
            sidebar: BoardSidebar
        }
    }
]

const router = new Router({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition ? savedPosition : { x: 0, y: 0 }
    }
})

export default router
