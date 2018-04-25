<template>
    <div class="sidebar">
        <div v-if="user" class="content">
            <h1 class="title">{{ user.username }}</h1>
            <h2 class="subtitle is-5">Joined on {{ user.date_joined | readableDate }}</h2>
            <hr>
            <slot />
        </div>
    </div>
</template>

<script>
import '@parts/ProfileControls'

export default Vue.component('profile-sidebar', {
    props: {
        user: {
            type: Object,
            required: false,
            default: () => {}
        },
        isMe: {
            type: Boolean,
            required: false,
            default: false
        }
    }
})
</script>