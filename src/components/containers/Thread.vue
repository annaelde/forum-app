<template>
    <div class="view">
        <thread-view v-if="ready.view" :thread="thread" :user="user" />
        <board-sidebar v-if="ready.sidebar" :board="board(this.$route.params.board)" :authenticated="authenticated" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import '../views/ThreadView'
import '../sidebars/BoardSidebar'

export default Vue.component('thread', {
    data() {
        return {
            ready: { 
                view: false,
                sidebar: false
            }
        }
    },
    computed: mapGetters({
        thread: 'thread/GET_THREAD',
        board: 'board/GET_BOARD',
        user: 'user/GET_USERNAME',
        authenticated: 'user/GET_AUTHENTICATION',
        error: 'GET_ERROR'
    }),
    async created() {
        // Get data
        this.$emit('progress', 0)
        await this.$store.dispatch('board/loadBoard', { board: this.$route.params.board })
            .then(() => {
                this.$emit('progress', 50)
                this.ready.sidebar = true               
            })
        await this.$store
            .dispatch('thread/loadThread', {
                board: this.$route.params.board,
                key: this.$route.params.key,
                slug: this.$route.params.slug
            })
            .then(() => {
                this.$emit('progress', 100)
                this.ready.view = true
            })
    }
})
</script>