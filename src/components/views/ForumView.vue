<template>
    <main class="main">
        <div class="grid">
            <board-card v-for="board in boards" :key="board.name" :board="board" />
        </div>
    </main>
</template>

<script>
import { mapGetters } from 'vuex'
import '../parts/BoardCard'

export default Vue.component('forum-view', {
    data() {
        return {
            collapsed: true
        }
    },
    computed: mapGetters({
        boards: 'forum/GET_BOARDS',
        error: 'GET_ERROR'
    }),
    async created() {
        await this.$store.dispatch('forum/loadBoards')
        if (!this.error) await this.$store.dispatch('forum/loadStats')
    }
})
</script>


<style lang="sass">
.grid
    display: flex
    flex-flow: row wrap
    width: 100%
    
.grid .card
    display: flex
    flex: 1 1 15em
    flex-direction: column
    margin: 1em
    max-width: 50%
    
.grid .card-content
    flex: 1 1 auto

@supports(display: grid)
    .grid
        display: grid
        grid-template-columns: repeat(auto-fit, minmax(15em, 1fr))
        grid-gap: 1em

    .grid .card
        margin: 0
        max-width: none
</style>