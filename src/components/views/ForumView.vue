<template>
    <main class="main">
        <div v-if="boards.length > 0" class="grid">
            <board-card v-for="board in boards" :auth="auth" :key="board.name" :board="board" @remove="removeBoard" />
        </div>
        <div v-else-if="auth" >
            <h1 class="title">Browse to find new boards to pin!</h1>
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
        },
        auth: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        removeBoard: function(boardName) {
            this.$emit('remove', boardName)
        }
    }
})
</script>