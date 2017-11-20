<template>
    <article class="main">
        <header class="hero is-primary is-round">
            <div class="hero-body">
                <h1 class="title">{{ thread.title }}</h1>
                <h2 class="subtitle">Posted by {{ thread.author }} {{ thread.created | timeElapsed }}</h2>
                <thread-controls :editAllowed="user === thread.author"></thread-controls>
            </div>
        </header>
        <section class="section">
            {{ thread.content }}
        </section>
    </article>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from '../../libs/axios'
import ThreadControls from '../parts/ThreadControls.vue'

export default Vue.component('thread', {
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