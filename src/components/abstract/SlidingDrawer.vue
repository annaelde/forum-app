<template>
    <transition name="slide-down">
        <div ref="drawer" :class="[ drawerOpen ? openedStyle : closedStyle ]" v-show="drawerOpen">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
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
        },
        // Used to control max-height when the container
        // will be changing contents and size
        refresh: {
            type: Boolean,
            default: false,
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
    watch: {
        refresh: function(value) {
            if (this.refresh) {
                Vue.nextTick(() => this.maxHeight())
                this.$emit('refreshed')
            }
        }
    },
    mounted() {
        this.maxHeight()
        window.addEventListener('resize', this.maxHeight)
    },
    destroyed() {
        window.removeEventListener('resize', this.maxHeight)
    },
    methods: {
        maxHeight: function() {
            var el = this.$refs.drawer

            if (!this.drawerOpen) {
                el.style.display = ''
                el.className = this.openedStyle
            }

            el.style.setProperty('--slide-down-height', el.clientHeight + 'px')

            if (!this.drawerOpen) {
                el.style.display = 'none'
                el.className = this.closedStyle
            }
        }
    }
})
</script>

<style lang="sass">
.slide-down-enter-active, 
.slide-down-leave-active
    overflow-y: hidden
    transition: all .3s cubic-bezier(0.15, 0, 0.20, 1)

.slide-down-leave, 
.slide-down-enter-to
    max-height: var(--slide-down-height)

.slide-down-enter, 
.slide-down-leave-to
    transform: translateY(-10px)
    opacity: 0
    max-height: 0
    padding-top: 0
    padding-bottom: 0
</style>