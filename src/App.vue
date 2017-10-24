<template>
    <div>
        <navbar v-bind:auth="auth"></navbar>
        <router-view class="section"></router-view>
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
    name: 'app',
    data() {
        return {
            auth: true
        }
    }
}
</script>

// Styles that go across the app
<style lang="sass">
@import "~bulma/sass/utilities/initial-variables"

$family-primary: Raleway, sans-serif

@import "~bulma/bulma"

.is-accessible
    font-size: 0
</style>

<style lang="scss">
$fa-font-path: '~font-awesome/fonts';
@import '~font-awesome/scss/font-awesome';
</style>