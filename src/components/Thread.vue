<template>
    <div class="thread" v-if="thread">
        <h1 class="title">{{ thread.title }}</h1>
        <h2 class="subtitle">Posted by {{ thread.author }} on {{ thread.created }}</h2>
        <p>{{ thread.content }}</p>
    </div>
    <div v-else-if="error" class="threads">
        <p>{{ error.message }}</p> 
    </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'

export default Vue.component('thread', {
    name: 'thread',
    data() {
        return {
            thread: null,
            error: null
        }
    },
    created() {
        axios
        .get('/api/threads/' + this.$route.params.id + '/' + this.$route.params.slug)
        .then(response => {
            this.thread = response.data
        })
        .catch(e => {
            this.error = e
            console.log(e)
        })
    }
})

</script>


<style lang="sass">

</style>