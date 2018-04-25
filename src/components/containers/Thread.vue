<template>
    <div class="view">
        <thread-view v-if="ready" :thread="thread" :user="user" />
        <board-sidebar v-if="ready" :board="board(this.$route.params.board)" :authenticated="authenticated" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import '../views/ThreadView'
import '../sidebars/BoardSidebar'

export default Vue.component('thread', {
    data() {
        return {
            ready: false
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
        await this.$store.dispatch('board/loadBoard', { board: this.$route.params.board })
        await this.$store.dispatch('thread/loadThread', {
            board: this.$route.params.board,
            key: this.$route.params.key,
            slug: this.$route.params.slug
        })

        // Template is ready to render
        this.ready = true
    }
})
</script>