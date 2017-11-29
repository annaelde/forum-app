<template>
    <article class="main">
        <header class="hero is-primary is-round">
            <div class="hero-body">
                <h1 class="title">{{ thread.title }}</h1>
                <h2 class="subtitle">Posted by {{ thread.author }} {{ thread.created | timeElapsed }}</h2>
                <thread-controls :edit-allowed="user === thread.author" />
            </div>
        </header>
        <section class="section">
            {{ thread.content }}
        </section>
    </article>
</template>

<script>
import { mapGetters } from 'vuex'
import '../parts/ThreadControls.vue'

export default Vue.component('thread-view', {
    computed: mapGetters({
        thread: 'thread/GET_THREAD',
        board: 'board/GET_DATA',
        user: 'user/GET_USERNAME',
        error: 'GET_ERROR'
    }),
    async created() {
        await this.$store.dispatch('board/loadBoard', { board: this.$route.params.board })
        await this.$store.dispatch('thread/loadThread', {
            board: this.$route.params.board,
            key: this.$route.params.key,
            slug: this.$route.params.slug
        })
    }
})
</script>


<style lang="sass"

</style>