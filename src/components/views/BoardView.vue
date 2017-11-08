<template>
    <main v-if="threads" class="section column is-three-quarters">
        <thread-preview v-for="thread of threads" :board="board.slug" :thread="thread" :key="thread.id"></thread-preview>
    </main>
</template>

<script>
import ThreadPreview from '../parts/ThreadPreview.vue'
import { mapState } from 'vuex'

export default Vue.component('board', {
    data() {
        return {
            collapsed: true
        }
    },
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


<style lang="sass">

</style>