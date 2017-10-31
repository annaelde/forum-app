<template>
  <section class="section column">
      <div class="content">
          <h1 class="title">Welcome to Forum</h1>
          <h2>Stats</h2>
          <table>
              <tr>
                  <td>Users</td>
                  <td>{{ stats.users }}</td>
              </tr>
              <tr>
                  <td>Boards</td>
                  <td>{{ stats.boards }}</td>
              </tr>
              <tr>
                  <td>Threads</td>
                  <td>{{ stats.threads }}</td>
              </tr>
          </table>
      </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default Vue.component('forum-sidebar', {
    name: 'forum-sidebar',
    computed: mapState({
        stats: state => state.forum.stats,
        error: state => state.forum.error
    }),
    created(){
        this.$store.dispatch('forum/loadStats')
    }
})
</script>


<style lang="sass">

</style>