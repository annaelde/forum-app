<template>
    <div class="view">
        <forum-view v-if="ready.view" :boards="boards" />
        <forum-sidebar v-if="ready.sidebar" :stats="stats" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import '../views/ForumView'
import '../sidebars/ForumSidebar'

export default Vue.component('forum', {
    data: function() {
        return {
            ready: {
                view: false,
                sidebar: false
            }
        }
    },
    computed: mapGetters({
        boards: 'forum/GET_BOARDS',
        stats: 'forum/GET_STATS',
        error: 'GET_ERROR'
    }),
    async created() {
        this.$emit('progress', 30)
        await this.$store.dispatch('forum/loadBoards')
            .then(() => {
                this.$emit('progress', 60)
                this.ready.view = true
            })
        if (!this.error) await this.$store.dispatch('forum/loadStats')
            .then(() => {
                this.$emit('progress', 100)
                this.ready.sidebar = true
            })
    }
})
</script>

<style>
</style>
