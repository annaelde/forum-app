<template>
    <main class="main">
        <div class="grid">
            <div v-for="board in boards" :key="board.name" class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        {{ board.name }}
                    </p>
                    <a href="#" class="card-header-icon" aria-label="more options">
                        <span class="icon">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </span>
                    </a>
                </header>
                <div class="card-content">
                    <div class="content">
                        {{ board.description }}
                    </div>
                </div>
                <footer class="card-footer">
                    <router-link to="" class="card-footer-item">
                        <span class="icon">
                            <i class="fa fa-thumb-tack" aria-hidden="true"></i>
                        </span>
                        <span>Pin</span>
                    </router-link>
                    <router-link :to="`~${board.slug}`" class="card-footer-item">
                        <span class="icon">
                            <i class="fa fa-sign-in" aria-hidden="true"></i>
                        </span>
                        <span>Visit</span>
                    </router-link>
                </footer>
            </div>
        </div>
    </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default Vue.component('forum', {
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


<style lang="sass" scoped>
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