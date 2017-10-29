<template>
    <div>
        <nav class="section">
            <div class="container">
                <router-link to="/" class="button">
                    <span class="icon">
                        <i class="fa fa-arrow-left">
                        </i>
                    </span>
                    <span>Back to Board</span>
                </router-link>
            </div>
        </nav>
        <article v-if="loading" class="section thread skeleton">
            <span class="icon is-large"><i  class="fa fa-spinner fa-spin fa-3x"></i></span>
        </article>
        <article v-else-if="!loading && thread">
            <section class="hero is-info is-bold">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title">{{ thread.title }}</h1>
                        <h2 class="subtitle">Posted by {{ thread.author }} on {{ thread.created | timeElapsed }}</h2>
                    </div>
                </div>
            </section>
            <section class="section">
                <div class="container">
                    {{ thread.content }}
                </div>
            </section>
        </article>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from '../plugins/axios'

export default Vue.component('thread', {
    name: 'thread',
    computed: mapState({
        thread: state => state.thread.data,
        error: state => state.thread.error,
        loading: state => state.thread.loading
    }),
    created() {
        this.$store.dispatch('loadThread', { id: this.$route.params.id, slug: this.$route.params.slug })
    }
})
</script>


<style lang="sass">

</style>