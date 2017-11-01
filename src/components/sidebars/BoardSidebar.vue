<template>
    <section class="section column">
        <h1 class="title">{{ board.name }}</h1>
        <h2 class="subtitle">{{ board.description }}</h2>
        <button class="button is-primary is-medium">
            <span class="icon">
                <i class="fa fa-plus"></i>
            </span>
            <span @click="showPostModal = true">Post a Thread</span>
        </button>
        <post-modal v-if="showPostModal" @close="showPostModal = false" :board="board"></post-modal>
    </section>
</template>

<script>
import { mapState } from 'vuex'
import PostModal from '../parts/PostModal.vue'

export default Vue.component('board-sidebar', {
    data: function() {
        return {
            showPostModal: false
        }
    },
    computed: mapState({
        board: state => state.board.data,
        error: state => state.board.error
    })
})
</script>


<style lang="sass">

</style>