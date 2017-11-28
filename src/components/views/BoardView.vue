<template>
    <main v-if="threads" class="main">
        <thread-card v-for="thread of threads" :board="board.slug" :thread="thread" :key="thread.id"/>
    </main>
</template>

<script>
import '../parts/ThreadCard.vue'
import { mapState } from 'vuex'

export default Vue.component('board', {
    computed: mapState({
        board: state => state.board.data,
        threads: state => state.board.threads,
        error: state => state.error
    }),
    async created() {
        await this.$store.dispatch('board/loadBoard', { board: this.$route.params.board, chain: true })
        await this.$store.dispatch('board/loadThreads')
    }
})
</script>