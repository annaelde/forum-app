<template>
    <div>
        <navigation></navigation>
        <div class="progress-container">
            <transition name="fade-out">
                <progress v-show="progress != 100" class="progress is-info is-small is-radiusless" :value="progress" max="100"></progress>
            </transition>
        </div>
        <div v-show="current === 'idle'" class="columns">
            <router-view name="main"></router-view>
            <router-view name="sidebar"></router-view>
        </div>
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
import { tweenState } from './libs/tween'

export default {
    name: 'app',
    data: function() {
        return {
            progress: 0
        }
    },
    computed: mapState({
        error: state => state.error,
        current: state => state.machine.state
    }),
    watch: {
        current: function(newState, oldState) {
            tweenState(newState, oldState, this)
        }
    }
}
</script>

// Global styles
<style lang="sass">
@import "~bulmaswatch/united/_variables.scss"
@import "~bulma/bulma"
@import "~bulmaswatch/united/_overrides.scss"
@import "styles/main"

.progress-container
    min-height: calc(0.85em + 1.5rem)
</style>

<style lang="scss">
$fa-font-path: '~font-awesome/fonts';
@import '~font-awesome/scss/font-awesome';
</style>