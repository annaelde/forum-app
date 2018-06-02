<template>
    <div class="view">
        <forum-view v-if="ready.view" :auth="auth" :boards="boards" @remove="removeBoard" />
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
        auth: 'user/GET_AUTHENTICATION',
        error: 'GET_ERROR'
    }),
    async created() {
        this.$emit('progress', 0)
        await this.$store.dispatch('forum/loadBoards')
            .then(() => {
                this.$emit('progress', 50)
                this.ready.view = true
            })
        if (!this.error) {
            await this.$store.dispatch('forum/loadStats').then(() => {
                this.$emit('progress', 100)
                this.ready.sidebar = true
            })
        }
    },
    methods: {
        removeBoard: function (slug) {
            this.$store.dispatch('forum/removeBoard', { slug })
        }
    }
})
</script>

<style>
</style>
