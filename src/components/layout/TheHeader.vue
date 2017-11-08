<template>
    <nav class="navbar is-radiusless" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link to='/' class="navbar-item">
                <span class="icon is-large">
                    <i class="fa fa-hourglass-o fa-2x has-text-light"></i>
                </span>
                <h1 class="title has-text-light">Forum</h1>
            </router-link>
            <div v-if="!auth" class="navbar-item is-hidden-mobile">
                <button @click="showLogin = !showLogin" class="button is-info">
                    <span class="icon">
                        <i class="fa fa-sign-in"></i>
                    </span>
                    <span>Login</span>
                </button>
            </div>
            <button v-bind:class="{'is-active' : openDrawer}" class="button navbar-burger is-large is-white has-text-grey-darker" @click="openDrawer = !openDrawer" data-target="navMenu">
                <span></span>
                <span></span>
                <span></span>
                <div class="is-accessible">Open Navigation Drawer</div>
            </button>

        </div>
        <transition name="slide-down">
            <div ref="drawer" class="navbar-menu is-active" v-show="openDrawer">
                <div class="navbar-start">
                    <a @click="showLogin = !showLogin" v-if="!auth" class="navbar-item is-primary is-hidden-tablet">Login</a>
                    <a class="navbar-item">Trending</a>
                    <a class="navbar-item">Browse</a>
                </div>
                <div v-if="auth" class="navbar-end">
                    <a class="navbar-item">Profile</a>
                    <a class="navbar-item">Bookmarks</a>
                    <a class="navbar-item" @click="logout">Logout</a>
                </div>
            </div>
        </transition>
        <div class="navbar-menu" v-show="!openDrawer">
            <div class="navbar-start">
                <a @click="showLogin = !showLogin" v-if="!auth" class="navbar-item is-primary is-hidden-tablet">Login</a>
                <a class="navbar-item">Trending</a>
                <a class="navbar-item">Browse</a>
            </div>
            <div v-if="auth" class="navbar-end">
                <a class="navbar-item">Profile</a>
                <a class="navbar-item">Bookmarks</a>
                <a class="navbar-item" @click="logout">Logout</a>
            </div>
        </div>
        <transition name="fade">
            <login-modal v-if="showLogin" @close="showLogin = false"></login-modal>
        </transition>
    </nav>
</template>

<script>
import { mapState } from 'vuex'
import LoginModal from '../parts/LoginModal.vue'
import { forEach, has } from 'lodash'

export default Vue.component('the-header', {
    data() {
        return {
            openDrawer: false,
            showLogin: false
        }
    },
    computed: mapState({
        auth: state => state.user.token,
        user: state => state.user.data
    }),
    methods: {
        logout: function() {
            this.$store.dispatch('user/deauthenticate')
        },
        maxHeight: function() {
            var el = this.$refs.drawer
            el.style.display = ''
            var children = el.querySelectorAll('div')
            var scrollHeight = 0
            var paddingHeight = 0

            forEach(children, function(child) {
                scrollHeight += child.scrollHeight
                var padding = window.getComputedStyle(child).getPropertyValue('padding-top')
                if (padding) {
                    paddingHeight += 2 * Number.parseInt(padding)
                }
            })

            el.style.display = 'none'

            var padding = window.getComputedStyle(el).getPropertyValue('padding-top')
            if (padding) {
                paddingHeight += 2 * Number.parseInt(padding)
            }
            
            el.style.setProperty('--slide-down-height', scrollHeight + paddingHeight + 'px')
        }
    },
    mounted() {
        this.maxHeight()
    }
})
</script>

<style lang="sass">
.navbar-burger span:nth-child(1)
    margin-top: -7px

.navbar-burger span:nth-child(2)
    margin-top: 0

.navbar-burger span:nth-child(3)
    margin-top: 7px

.navbar-burger.is-active span:nth-child(1)
    margin-left: 5px

.navbar-burger.is-active span:nth-child(3)
    margin-top: 6px
    margin-left: 5px

.navbar-burger span
    height: 4px
    width: 20px
    top: calc(50% - 2px)
    left: calc(50% - 10px)
    margin-left: 0

.navbar-burger
    height: 2em
    margin-top: .4rem
    margin-right: 1rem
</style>