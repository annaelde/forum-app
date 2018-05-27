<template>
    <div>
        <the-header/>
        <progress-bar :progress="progress" :error="!!error" />

        <transition name="fade" mode="out-in" appear>
            <router-view v-if="!error" @progress="update" />
        </transition>

        <transition name="balloon">
            <div v-if="error" class="error">
                <error-message :response="error" />
            </div>
        </transition>
        <the-footer/>
    </div>
</template>

<script>
import TWEEN from '@tweenjs/tween.js'
import { mapState } from 'vuex'
import { getToken } from './libs/store'

import './components/layout/TheHeader'
import './components/layout/TheFooter'
import './components/parts/ProgressBar'
import './components/parts/ErrorMessage'

export default {
    name: 'App',
    data: function() {
        return {
            progress: 0,
            ready: false
        }
    },
    computed: {
        ...mapState({
            error: state => state.error
        })
    },
    created: async function() {
        await this.$store.dispatch('user/restore', getToken())
        this.ready = true
    },
    methods: {
        update: function(value) {
            function animate() {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }

            if (value === 0) {
                // don't tween back to zero
                this.progress = 0
            } else {
                new TWEEN.Tween({ x: this.progress })
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .to({ x: value }, 500)
                    .onUpdate(object => {
                        this.progress = parseFloat(object.x.toFixed(0))
                    })
                    .start()
                animate()
            }
        }
    }
}
</script>

<style lang="sass">
@import "~styles/main"

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