<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
           <div class="navbar-item">
               <span class="icon is-large">
                   <i class="fa fa-hourglass-o fa-2x"></i>
                </span>
               <h1 class="title">Forum</h1>
           </div>
            <div v-if="!auth" class="navbar-item is-hidden-mobile">
                <button class="button is-primary is-medium">
                    <span class="icon"><i class="fa fa-sign-in"></i></span>
                    <span>Login</span>
                </button>
            </div>
            <button v-bind:class="{'is-active' : open}" class="button navbar-burger is-large is-white has-text-grey-darker" @click="open = !open" data-target="navMenu">
                <span></span>
                <span></span>
                <span></span>
                <div class="is-accessible">Open Navigation Drawer</div>
            </button>

        </div>
        <div class="navbar-menu" v-bind:class="{'is-active' : open}">
            <div class="navbar-start">
                <a v-if="!auth" class="navbar-item is-primary is-hidden-tablet">Login</a>
                <a class="navbar-item">Trending</a>
                <a class="navbar-item">Browse</a>
            </div>
            <div v-if="auth" class="navbar-end">
                <a class="navbar-item">Profile</a>
                <a class="navbar-item">Bookmarks</a>
                <a class="navbar-item">Logout</a>
            </div>
        </div>
    </nav>
</template>

<script>
import Vue from 'vue'

export default Vue.component('navbar', {
    name: 'navbar',
    data() {
        return {
            open: false
        }
    },
    props: {
        auth: {
            type: Boolean,
            required: true
        }
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
    margin-top: .4rem
    margin-right: 1rem
</style>