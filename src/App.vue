<template>
    <div>
        <navigation></navigation>
        <div v-show="current === 'idle'" class="columns">
            <router-view name="main"></router-view>
            <router-view name="sidebar"></router-view>
        </div>
        <transition name="fade">
            <div v-if="current === 'loading'">
                <div class="overlay">
                    <span class="icon is-large">
                        <i class="fa fa-circle-o-notch fa-spin fa-3x"></i>
                    </span>
                </div>
            </div>
        </transition>
        <transition name="balloon">
            <div v-if="current === 'handling'" class="section">
                <error :response="error"></error>
            </div>
        </transition>
        <footnotes></footnotes>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Navigation from './components/layout/Navigation.vue'
import Footnotes from './components/layout/Footnotes.vue'

export default {
    name: 'app',
    computed: mapState({
        error: state => state.error,
        current: state => state.machine.state
    })
}
</script>

// Global styles
<style lang="sass">
@import "~bulmaswatch/darkly/_variables.scss"
@import "~bulma/bulma"
@import "~bulmaswatch/darkly/_overrides.scss"
@import "styles/main"

.overlay
    position: fixed
    z-index: 3
    height: 100%
    width: 100%
    background: rgba(0, 0, 0, 0.3)
    top: 0
    left: 0

.overlay .icon
    position: absolute
    top: calc(50% - 5vh)
    left: calc(50% - 5vh)
    font-size: 10vh

</style>

<style lang="scss">
$fa-font-path: '~font-awesome/fonts';
@import '~font-awesome/scss/font-awesome';
</style>