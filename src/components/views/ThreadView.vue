<template>
    <article class="main">
        <header class="hero is-primary is-round">
            <div class="hero-body">
                <h1 class="title">{{ thread.title }}</h1>
                <h2 class="subtitle">Posted by {{ thread.author }} {{ thread.created | timeElapsed }}</h2>
            </div>
        </header>
        <section class="section">
            {{ thread.content }}
        </section>
    </article>
</template>

<script>
import { mapState } from 'vuex'
import axios from '../../libs/axios'

export default Vue.component('thread', {
    computed: mapState({
        board: state => state.board.data,
        thread: state => state.thread.data,
        error: state => state.error
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