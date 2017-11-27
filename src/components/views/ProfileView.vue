<template>
    <main class="main">
        <thread-card v-for="thread in threads" :key="thread.name" :board="thread.board" :thread="thread"></thread-card>
    </main>
</template>

<script>
import { mapGetters } from 'vuex'
import ThreadCard from '../parts/ThreadCard.vue'

export default Vue.component('profile-view', {
    computed: mapGetters('user', {
        threads: 'GET_THREADS'
    })
    
})
</script>

<style>

</style>
