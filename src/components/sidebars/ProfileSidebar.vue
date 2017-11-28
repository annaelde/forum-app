<template>
    <div class="sidebar">
        <div class="content">
            <h1 class="title">{{ user.username }}</h1>
            <h2 class="subtitle is-5">Joined on {{ user.date_joined | readableDate }}</h2>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default Vue.component('profile-sidebar', {
    computed: mapGetters('user', {
        user: 'GET_USER'
    })
})
</script>