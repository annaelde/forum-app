<template>
  <section class="section column">
      <div class="content">
          <h1 class="title">Welcome to Forum</h1>
          <h2>Stats</h2>
      </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default Vue.component('forum-sidebar', {
    name: 'forum-sidebar',
    computed: mapState({
        error: state => state.board.error
    })
})
</script>


<style lang="sass">

</style>