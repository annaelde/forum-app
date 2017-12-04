<template>
    <div class="view">
        <board-view :threads="threads" :board="board.slug" />
        <board-sidebar :board="board" :authenticated="authenticated" />
    </div>
</template>

<script>
import '../views/BoardView.vue'
import '../sidebars/BoardSidebar.vue'
import { mapGetters } from 'vuex'

export default Vue.component('board', {
    computed: mapGetters({
        board: 'board/GET_CURRENT',
        threads: 'board/GET_THREADS',
        authenticated: 'user/GET_AUTHENTICATION'
    }),
    async created() {
        await this.$store.dispatch('board/loadBoard', { board: this.$route.params.board, chain: true })
        await this.$store.dispatch('board/loadThreads')
    }
})
</script>

<style>

</style>
