<template>
  <section class="section column">
      <h1>{{ board.name }}</h1>
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