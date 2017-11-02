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
    created() {
        this.$store.dispatch('board/initialize', { board: this.$route.params.board })
    },
    destroyed() {
        this.$store.commit('board/SET_BOARD', {})
        this.$store.commit('board/SET_THREADS', [])
    }
})
</script>


<style lang="sass">

</style>