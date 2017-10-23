<template>
  <div v-if="threads" class="threads">
    <thread-preview v-for="thread of threads" v-bind:thread="thread" v-bind:key="thread.id"></thread-preview>
  </div>
  <div v-else-if="error" class="threads">
    <p>{{ error.message }}</p> 
  </div>
</template>

<script>
import Vue from 'vue'
import ThreadPreview from './ThreadPreview.vue'
import axios from 'axios'

export default Vue.component('board', {
    name: 'board',
    data() {
        return {
            threads: null,
            error: null,
            collapsed: true,
        }
    },
    created() {
        axios
            .get('/api/threads/')
            .then(response => {
                this.threads = response.data
            })
            .catch(e => {
                this.error = e
            })
    },
    methods: {
        openThread: function() { 
        
        }
    }
})
</script>


<style lang="sass">

</style>