<template>
    <main class="section column">
        <div v-for="board in boards" :key="board.name" class="card">
            <header class="card-header">
                <p class="card-header-title">
                    {{ board.name }}
                </p>
                <a href="#" class="card-header-icon" aria-label="more options">
                    <span class="icon">
                        <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                </a>
            </header>
            <div class="card-content">
                <div class="content">
                    {{ board.description }}
                </div>
            </div>
            <footer class="card-footer">
                <router-link to="" class="card-footer-item">Star</router-link>
                <router-link :to="`~${board.slug}`" class="card-footer-item">Visit</router-link>
                <router-link to="" class="card-footer-item">Ditch</router-link>
            </footer>
        </div>
    </main>
</template>

<script>
import Preview from './Preview.vue'
import { mapState } from 'vuex'

export default Vue.component('forum', {
    name: 'forum',
    data() {
        return {
            collapsed: true
        }
    },
    created() {
        this.$store.dispatch('forum/loadBoards')
    },
    computed: mapState({
        boards: state => state.forum.boards
    })
})
</script>


<style lang="sass">

</style>