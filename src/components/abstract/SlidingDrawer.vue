<template>
    <transition name="slide-down">
        <div ref="drawer" :class="[ drawerOpen ? openedStyle : closedStyle ]" v-show="drawerOpen">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
import { forEach } from 'lodash'

export default Vue.component('sliding-drawer', {
    props: {
        drawerOpen: {
            type: Boolean,
            default: false,
            required: true
        },
        classes: {
            type: String,
            default: '',
            required: false
        },
        openedClasses: {
            type: String,
            required: false
        },
        closedClasses: {
            type: String,
            required: false
        }
    },
    computed: {
        openedStyle: function() {
            if (this.openedClasses) {
                return this.openedClasses
            } else {
                return this.classes
            }
        },
        closedStyle: function() {
            if (this.closedClasses) {
                return this.closedClasses
            } else {
                return this.classes
            }
        }
    },
    mounted() {
        this.maxHeight()
    },
    methods: {
        maxHeight: function() {
            var el = this.$refs.drawer
            el.style.display = ''
            el.className = this.open
            el.style.setProperty('--slide-down-height', el.clientHeight + 'px')
            el.style.display = 'none'
            el.className = this.close
        }
    }
})
</script>

<style lang="sass">
.slide-down-enter-active, .slide-down-leave-active
    transition: all .5s cubic-bezier(0.19, 1, 0.22, 1)

.slide-down-leave, .slide-down-enter-to
    max-height: var(--slide-down-height)

.slide-down-enter, .slide-down-leave-to
    transform: translateY(-10px)
    opacity: 0
    overflow-y: hidden
    max-height: 0
    padding: 0
</style>