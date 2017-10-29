<template>
  <main class="section column">
    <preview v-for="thread of threads" :thread="thread" :key="thread.id"></preview>
  </main>
</template>

<script>
import Preview from './Preview.vue'
import { mapState } from 'vuex'

export default Vue.component('board', {
    name: 'board',
    data() {
        return {
            collapsed: true,
        }
    },
    created() {
        this.$store.dispatch('board/loadBoard', '')
        this.$store.dispatch('board/loadThreads')
    },
    computed: mapState({
        threads: state => state.board.threads,
    })
})
</script>


<style lang="sass">

</style>