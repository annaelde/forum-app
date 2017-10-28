<template>
  <div v-if="threads" class="threads">
    <preview v-for="thread of threads" v-bind:thread="thread" v-bind:key="thread.id"></preview>
  </div>
  <div v-else-if="error" class="threads">
    <p>{{ error.message }}</p> 
  </div>
</template>

<script>
import Preview from './Preview.vue'
import { mapState } from 'vuex'

export default Vue.component('board', {
    name: 'board',
    data() {
        return {
            collapsed: true,
        }
    },
    created() {
        this.$store.dispatch('loadBoard', '')
        this.$store.dispatch('loadThreads')
    },
    computed: mapState({
        threads: state => state.board.threads,
        error: state => state.board.error
    })
})
</script>


<style lang="sass">

</style>