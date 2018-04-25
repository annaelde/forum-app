<template>
    <main class="main">
        <thread-card v-for="thread of threads" :board="board" :thread="thread" :key="thread.id" />
    </main>
</template>

<script>
import '../parts/ThreadCard'

export default Vue.component('board-view', {
    props: {
        board: {
            required: true,
            type: String,
            default: ''
        },
        threads: {
            required: true,
            type: Array,
            default: () => []
        }
    }
})
</script>