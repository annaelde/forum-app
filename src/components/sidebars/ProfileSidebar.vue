<template>
    <div class="sidebar">
        <div v-if="user" class="content">
            <div class="media">
                <div class="media-left">
                    <img class="avatar" :src="user.avatar">
                </div>
                <div class="media-content">
                    <h1 class="title">{{ user.username }}</h1>
                    <h2 class="subtitle is-5">Joined on {{ user.date_joined | readableDate }}</h2>
                </div>
            </div>
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

<style lang="sass" scoped>
@import "~styles/main"
.avatar
    height: 128px
    width: 128px
    border-radius: 50% 50%
    border-width: 3px
    border-color: $primary
    border-style: solid

.media-content
    height: 128px
    display: flex
    flex-flow: column nowrap
    justify-content: center
</style>
