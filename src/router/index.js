import Router from 'vue-router'

import ForumView from '../components/views/ForumView.vue'
import BoardView from '../components/views/BoardView.vue'
import ThreadView from '../components/views/ThreadView.vue'

import ForumSidebar from '../components/sidebars/ForumSidebar.vue'
import BoardSidebar from '../components/sidebars/BoardSidebar.vue'

Vue.use(Router)

const routes = [
    {
        name: 'forum',
        path: '/',
        components: {
            main: ForumView,
            sidebar: ForumSidebar
        }
    },
    {
        name: 'board',
        path: '/~:board/',
        components: {
            main: BoardView,
            sidebar: BoardSidebar
        }
    },
    {
        name: 'thread',
        path: '/~:board/:key/:slug/',
        components: {
            main: ThreadView,
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
