<template>
    <div class="thread">
        <h1 class="title">{{ thread.title }}</h1>
        <h2 class="subtitle">Posted by {{ thread.author }} on {{ thread.created }}</h2>
        <p>{{ thread.content }}</p>
    </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'

export default Vue.component('thread', {
    name: 'thread',
    data() {
        return {
            thread: {},
            error: {}
        }
    },
    created() {
        axios
        .get('/api/threads/')
        .then(response => {
            this.thread = response.data
        })
        .catch(e => {
            this.error.push(e)
        })
    }
})

</script>


<style lang="sass">

</style>