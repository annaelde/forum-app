<template>
  <main v-if="threads" class="section column is-three-quarters">
    <preview v-for="thread of threads" :board="board.slug" :thread="thread" :key="thread.id"></preview>
  </main>
</template>

<script>
import Preview from '../parts/Preview.vue'
import { mapState } from 'vuex'

export default Vue.component('board', {
    name: 'board',
    data() {
        return {
            collapsed: true,
        }
    },
    created() {
        this.$store.dispatch('board/loadBoard', { board: this.$route.params.board, context: 'board' })
    },
    computed: mapState({
        board: state => state.board.data,
        threads: state => state.board.threads,
        error: state => state.error
    })
})
</script>


<style lang="sass">

</style>