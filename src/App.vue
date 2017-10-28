<template>
    <div>
        <navbar v-bind:auth="auth"></navbar>
        <router-view></router-view>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from './components/Navbar.vue'

export default {
    name: 'app',
    computed: mapState({
        auth: 'token'
    })
}
</script>

// Global styles
<style lang="sass">
@import "~bulmaswatch/darkly/_variables.scss"
@import "~bulma/bulma"
@import "~bulmaswatch/darkly/_overrides.scss"
@import "styles/main"
</style>

<style lang="scss">
$fa-font-path: '~font-awesome/fonts';
@import '~font-awesome/scss/font-awesome';
</style>