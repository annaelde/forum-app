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
            <div v-if="this.handling" class="view">
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
@import "~bulmaswatch/united/_variables.scss"
@import "~bulma/bulma"
@import "~bulmaswatch/united/_overrides.scss"
@import "styles/main"

.progress-container
    min-height: calc(0.85em + 1.5rem)

.view
    padding: 1.777rem
    min-height: 100vh
    display: grid
    grid-template: auto / 1fr minmax(250px, 30%)
    grid-template-areas: "main sidebar"
    grid-column-gap: 1.777rem
    grid-row-gap: 1.777rem

.view .main
    grid-area: main

.view .sidebar
    grid-area: sidebar

@media screen and (max-width: 700px)
    .view
        grid-template: repeat(2, max-content) / 1fr
        grid-template-areas: "sidebar" "main"

input:-webkit-autofill 
    -webkit-box-shadow: 0 0 0px 1000px white inset

</style>

<style lang="scss">
$fa-font-path: '~font-awesome/fonts';
@import '~font-awesome/scss/font-awesome';
</style>