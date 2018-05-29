<template>
    <article class="main">
        <header>
            <h1 class="title">{{ thread.title }}</h1>
            <h2 class="subtitle">Posted by {{ thread.author }} {{ thread.created | timeElapsed }}</h2>
            <thread-controls :edit-allowed="user === thread.author" />
        </header>
        <section class="section">
            {{ thread.content }}
        </section>
    </article>
</template>

<script>
import '../parts/ThreadControls'

export default Vue.component('thread-view', {
    props: {
        thread: {
            required: true,
            type: Object,
            default: () => ({
                title: '',
                author: '',
                created: 0,
                content: ''
            })
        },
        user: {
            required: true,
            type: String,
            default: ''
        }
    }
})
</script>

<style lang="sass" scoped>
header
    padding:
        left: 1.5rem
        right: 1.5rem
</style>
