<template>
    <div>
        <the-header></the-header>
        <div class="progress-container">
            <transition name="fade-out">
                <progress v-show="progress != 100" class="progress is-info is-small is-radiusless" :value="progress" max="100"></progress>
            </transition>
        </div>

        <div class="view columns">
            <transition name="fade" mode="out-in" appear>
                <router-view name="main" :key="this.$route.fullPath"></router-view>
            </transition>
            <transition name="fade" mode="out-in" appear>
                <router-view name="sidebar" :key="this.$route.fullPath"></router-view>
            </transition>
        </div>
        <transition name="balloon">
            <div v-if="current === 'handling'" class="section">
                <error :response="error"></error>
            </div>
        </transition>
        <the-footer></the-footer>
    </div>
</template>

<script>
import { mapState } from 'vuex'

import { tweenState } from './libs/tween'
import { retrieveToken } from './libs/store'

import TheHeader from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'

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
    },
    created() {
        this.$store.dispatch('user/reauthenticate', retrieveToken())
    }
}
</script>

<style lang="sass">
@import "~bulmaswatch/united/_variables.scss"
@import "~bulma/bulma"
@import "~bulmaswatch/united/_overrides.scss"
@import "styles/main"

.progress-container
    min-height: calc(0.85em + 1.5rem)

.view
    min-height: 100vh
</style>

<style lang="scss">
$fa-font-path: '~font-awesome/fonts';
@import '~font-awesome/scss/font-awesome';
</style>