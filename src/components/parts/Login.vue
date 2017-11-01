<template>
    <transition name="fade">
    <div class="modal login is-active">
        <div @click="$emit('close')" class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Log into Forum</p>
                <button class="delete" aria-label="close" @click="$emit('close')"></button>
            </header>
            <section class="modal-card-body">
                <transition name="balloon">
                    <error v-if="error" :response="error"></error>
                </transition>
                <div class="field">
                    <label for="username" class="label">Username</label>
                    <div class="control has-icons-left" :class="{'is-loading' : (state === 'loading')}">
                        <input class="input" id="username" type="text" value="">
                        <span class="icon is-small is-left">
                        <i class="fa fa-user"></i>
                        </span>
                    </div>
                </div>
                <div class="field">
                    <label for="password" class="label">Password</label>
                    <div class="control has-icons-left" :class="{'is-loading' : (state === 'loading')}">
                        <input class="input" id="password" type="password" value="">
                        <span class="icon is-small is-left">
                        <i class="fa fa-key"></i>
                        </span>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button @click="login" class="button is-success">Login</button>
                <div class="register">
                    <span class="is-hidden-mobile">Don't have an account yet?</span>
                    <button class="button">Register</button>
                </div>
            </footer>
        </div>
    </div>
    </transition>
</template>

<script>
import { mapState } from 'vuex'
import Error from './Error.vue'
import axios from '../../libs/axios'

export default Vue.component('login', {
    name: 'login',
    computed: mapState({
        auth: state => state.user.token,
        state: state => state.user.machine.state,
        user: state => state.user.data,
        error: state => state.user.error
    }),
    methods: {
        login: function() {
            this.$store.dispatch('user/authenticate', {
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            })
        }
    },
    watch: {
        auth: function(){
            if (this.auth) this.$emit('close')
        }
    }
})
</script>


<style lang="sass">
.login.modal .modal-card-foot
    justify-content: space-between

.login.modal .register
    align-items: center    
    justify-content: flex-end
    display: flex
    margin-left: 1rem

.login.modal .register button
    margin-left: 1rem
</style>
