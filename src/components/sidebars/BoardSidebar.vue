<template>
    <div class="sidebar">
        <router-link :to="`/_${board.slug}`">
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
import '../parts/PostModal.vue'

export default Vue.component('board-sidebar', {
    props: {
        board: {
            type: Object,
            required: true,
            default: () => {}
        },
        authenticated: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    data: function() {
        return {
            showPostModal: false
        }
    }
})
</script>