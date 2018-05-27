<template>
    <main class="main">
        <div class="grid">
            <board-card v-for="board in boards" :key="board.name" :board="board" />
        </div>
    </main>
</template>

<script>
import '../parts/BoardCard'

export default Vue.component('forum-view', {
    props: {
        boards: {
            type: Array,
            required: true
        }
    }
})
</script>