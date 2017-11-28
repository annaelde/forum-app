<template>
    <div class="sidebar">
        <router-link :to="`/~${board.slug}`">
            <h1 class="title">{{ board.name }}</h1>
        </router-link>
        <h2 class="subtitle">{{ board.description }}</h2>
        <button v-if="authenticated" class="button is-primary is-medium">
            <span class="icon">
                <i class="fa fa-plus" />
            </span>
            <span @click="showPostModal = true">Post a Thread</span>
        </button>
        <post-modal v-if="showPostModal" @close="showPostModal = false" :board="board" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import '../parts/PostModal.vue'

export default Vue.component('board-sidebar', {
    data: function() {
        return {
            showPostModal: false
        }
    },
    computed: mapState({
        authenticated: state => state.user.token,
        board: state => state.board.data,
        error: state => state.board.error
    })
})
</script>