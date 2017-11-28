<template>
    <div class="sidebar">
        <div class="content">
            <h1 class="title">Welcome to Forum</h1>
            <p>A new type of message board.</p>
            <h2>Stats</h2>
            <table>
                <tr>
                    <td>
                        <span class="icon">
                            <i class="fa fa-users" />
                        </span>
                        <span>Users</span>
                    </td>
                    <td>{{ stats.users }}</td>
                </tr>
                <tr>
                    <td>
                        <span class="icon">
                            <i class="fa fa-list-alt" />
                        </span>
                        <span>Boards</span>
                    </td>
                    <td>{{ stats.boards }}</td>
                </tr>
                <tr>
                    <td>
                        <span class="icon">
                            <i class="fa fa-bookmark" />
                        </span>
                        <span>Threads</span>
                    </td>
                    <td>{{ stats.threads }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default Vue.component('forum-sidebar', {
    computed: mapState({
        stats: state => state.forum.stats,
        error: state => state.forum.error
    })
})
</script>