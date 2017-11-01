<template>
    <section class="section column">
        <h1 class="title">{{ board.name }}</h1>
        <h2 class="subtitle">{{ board.description }}</h2>
        <button class="button is-primary is-medium">
            <span class="icon">
                <i class="fa fa-plus"></i>
            </span>
            <span @click="showCompose = true">Post a Thread</span>
        </button>
        <compose v-if="showCompose" @close="showCompose = false" :board="board"></compose>
    </section>
</template>

<script>
import { mapState } from 'vuex'
import Compose from '../parts/Compose.vue'

export default Vue.component('board-sidebar', {
    name: 'board-sidebar',
    computed: mapState({
        board: state => state.board.data,
        error: state => state.board.error
    }),
    data: function(){
        return {
            showCompose: false
        }
    },
    methods: {

    }
})
</script>


<style lang="sass">

</style>