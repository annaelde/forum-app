<template>
    <div>
        <the-header></the-header>

        <div class="progress-container">
            <transition name="fade-out">
                <progress v-show="progress != 100" class="progress is-info is-small is-radiusless" :value="progress" max="100"></progress>
            </transition>
        </div>

        <div v-if="!this.handling && this.ready" class="view">
            <transition name="fade" mode="out-in" appear>
                <router-view name="main" :key="this.$route.fullPath"></router-view>
            </transition>
            <transition name="fade" mode="out-in" appear>
                <router-view name="sidebar" :key="this.$route.fullPath"></router-view>
            </transition>
        </div>

        <transition name="balloon">
            <div v-if="this.handling" class="error">
                <error-message :response="error"></error-message>
            </div>
        </transition>

        <the-footer></the-footer>
    </div>
</template>

<script>
import { mapState } from 'vuex'

import { tweenState } from './libs/tween'
import { getToken } from './libs/store'

import TheHeader from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'
import ErrorMessage from './components/parts/ErrorMessage.vue'

export default {
    name: 'app',
    data: function() {
        return {
            progress: 0,
            ready: false
        }
    },
    computed: {
        handling: function() {
            return this.state === 'handling'
        },
        ...mapState({
            error: state => state.error,
            state: state => state.machine.state
        })
    },
    watch: {
        state: function(newState, oldState) {
            tweenState(newState, oldState, this)
        }
    },
    created: async function() {
        await this.$store.dispatch('user/restore', getToken())
        this.ready = true
    }
}
</script>

<style lang="sass">
@import "~bulma/bulma"
@import "styles/main"

$ratio: 1.777

.progress-container
    min-height: calc(0.85em + 1.5rem)

.error
    margin: #{$ratio}rem

.view
    padding: #{$ratio}rem
    min-height: 100vh
    display: grid
    grid-template: auto / 1fr minmax(250px, 30%)
    grid-template-areas: "main sidebar"
    grid-column-gap: #{$ratio}rem
    grid-row-gap: #{$ratio}rem

.view .main
    grid-area: main

.view .main .hero
    margin-left: -#{$ratio}rem
    padding-left: #{$ratio}rem
    padding-right: #{$ratio}rem

.view .sidebar
    grid-area: sidebar

@media screen and (max-width: 700px)
    .view
        grid-template: repeat(2, max-content) / 1fr
        grid-template-areas: "sidebar" "main"

    .view .main .hero
        margin-right: -#{$ratio}rem

input:-webkit-autofill 
    -webkit-box-shadow: 0 0 0px 1000px white inset
</style>

<style lang="scss">
$fa-font-path: '~font-awesome/fonts';
@import '~font-awesome/scss/font-awesome';
</style>