<template>
    <transition name="fade">
    <div class="modal login is-active">
        <div @click="$emit('close')" class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p v-if="!auth" class="modal-card-title">Log into Forum</p>
                <p v-else class="modal-card-title">Welcome back!</p>
                <button class="delete" aria-label="close" @click="$emit('close')"></button>
            </header>
            <section v-show="!auth" class="modal-card-body">
                <p v-show="error">{{ error }}</p>
                <label for="username" class="label">Username</label>
                <div class="field">
                    <div class="control has-icons-left">
                        <input class="input" id="username" type="text" value="">
                        <span class="icon is-small is-left">
                        <i class="fa fa-user"></i>
                        </span>
                    </div>
                </div>
                <div class="field">
                    <label for="password" class="label">Password</label>
                    <div class="control has-icons-left">
                        <input class="input" id="password" type="password" value="">
                        <span class="icon is-small is-left">
                        <i class="fa fa-key"></i>
                        </span>
                    </div>
                </div>
            </section>
            <transition name="fade">
                <section v-show="auth && !error" class="modal-card-body">
                    <p>Good to see you again, {{ user.username }} 😊</p>
                </section>
            </transition>
            <footer class="modal-card-foot">
                <button v-show="!auth" @click="login" class="button is-success">Login</button>
                <button v-show="auth && !error" @click="$emit('close')" class="button is-success">Start Posting</button>
                <div v-show="!auth" class="register">
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
import axios from '../plugins/axios'

export default Vue.component('login', {
    name: 'login',
    computed: mapState({
        auth: state => state.user.token,
        user: state => state.user.data,
        error: state => state.user.error
    }),
    methods: {
        login: function() {
            // Authenticate and get the user
            this.$store.dispatch('authenticateUser', {
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            })
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
