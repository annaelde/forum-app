<template>
        <div class="thread">
        <h1 class="title">{{ thread.title }}</h1>
        <h2 class="subtitle">Posted by {{ thread.author }} on {{ thread.created }}</h2>
        <p>{{ thread.content }}</p>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'threads',
    data () {
        return {
            thread : {},
            error : {}
        }
    },
    created(){
        axios.get('/api/threads/')
        .then(response => {
            this.thread = response.data
        })
        .catch(e => {
            this.error.push(e)
        })
    }
}
</script>

// Styles that go across the app
<style lang="sass">
@import "~bulma/sass/utilities/initial-variables"

$family-primary: Raleway, sans-serif

@import "~bulma/bulma"
</style>