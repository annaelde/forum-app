<template>
  <section class="section column">
      <h1 class="title">{{ board.name }}</h1>
      <h2 class="subtitle">{{ board.description }}</h2>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default Vue.component('board-sidebar', {
    name: 'board-sidebar',
    computed: mapState({
        board: state => state.board.data,
        error: state => state.board.error
    })
})
</script>


<style lang="sass">

</style>