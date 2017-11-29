import Router from 'vue-router'

import Forum from '../components/containers/Forum.vue'
import Board from '../components/containers/Board.vue'
import Thread from '../components/containers/Thread.vue'
import Profile from '../components/containers/Profile.vue'

Vue.use(Router)

const routes = [
    {
        name: 'forum',
        path: '/',
        component: Forum
    },
    {
        name: 'board',
        path: '/_:board/',
        component: Board
    },
    {
        name: 'thread',
        path: '/_:board/:key/:slug/',
        component: Thread
    },
    {
        name: 'profile',
        path: '/~:username',
        component: Profile
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
