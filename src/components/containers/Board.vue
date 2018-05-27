<template>
    <div class="view">
        <board-view v-if="ready.view" :threads="threads" :board="board.slug" />
        <board-sidebar v-if="ready.sidebar" :board="board" :authenticated="authenticated" />
    </div>
</template>

<script>
import '../views/BoardView'
import '../sidebars/BoardSidebar'
import { mapGetters } from 'vuex'

export default Vue.component('board', {
    data: function() {
        return {
            ready: {
                view: false,
                sidebar: false
            }
        }
    },
    computed: mapGetters({
        board: 'board/GET_CURRENT',
        threads: 'board/GET_THREADS',
        authenticated: 'user/GET_AUTHENTICATION'
    }),
    async created() {
        this.$emit('progress', 0)
        await this.$store
            .dispatch('board/loadBoard', {
                board: this.$route.params.board,
                chain: true
            })
            .then(() => {
                this.$emit('progress', 50)
                this.ready.view = true
            })
        if (!this.error) {
            await this.$store.dispatch('board/loadThreads').then(() => {
                this.$emit('progress', 100)
                this.ready.sidebar = true
            })
        }
    }
})
</script>

<style>
</style>
