<template>
    <div class="sidebar">
        <div v-if="user" class="content">
            <h1 class="title">{{ user.username }}</h1>
            <h2 class="subtitle is-5">Joined on {{ user.date_joined | readableDate }}</h2>
            <hr>
            <p>{{ user.bio }}</p>
        </div>
    </div>
</template>

<script>
export default Vue.component('profile-sidebar', {
    props: {
        user: {
            type: Object,
            required: false,
            default: () => {}
        }
    }
})
</script>