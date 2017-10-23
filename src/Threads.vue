<template>
  <ul v-if="threads" class="threads">
    <li class="box" v-for="thread of threads">
        <h1 class="title">{{ thread.title }}</h1>
        <h2 class="subtitle">Posted by {{ thread.author }} on {{ thread.created }}</h2>
        <p>{{ thread.content }}</p>
    </li>
  </ul>
  <div v-else-if="error" class="threads">
    <p>{{ error.message }}</p> 
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'threads',
    data () {
        return {
            threads : {},
            error : {}
        }
    },
    created(){
        axios.get('/api/threads/')
        .then(response => {
            this.threads = response.data
        })
        .catch(e => {
            this.error.push(e)
        })
    }
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/initial-variables"

$family-primary: Raleway, sans-serif

@import "~bulma/bulma"

</style>