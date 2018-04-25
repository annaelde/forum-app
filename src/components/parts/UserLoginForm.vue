<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Log into Forum</p>
            <button class="delete" aria-label="close" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
            <transition name="balloon">
                <error-message v-if="error" :response="error" />
            </transition>
            <div class="field">
                <label for="username" class="label">Username</label>
                <div class="control has-icons-left" :class="{'is-loading' : loading}">
                    <input class="input" id="username" v-model="username" type="text" value="">
                    <span class="icon is-small is-left">
                        <i class="fa fa-user" />
                    </span>
                </div>
            </div>
            <div class="field">
                <label for="password" class="label">Password</label>
                <div class="control has-icons-left" :class="{'is-loading' : loading}">
                    <input class="input" id="password" v-model="password" type="password" value="">
                    <span class="icon is-small is-left">
                        <i class="fa fa-key" />
                    </span>
                </div>
            </div>
        </section>
        <footer class="modal-card-foot">
            <button @click="login" class="button is-success">Login</button>
            <div class="register">
                <span class="is-hidden-mobile has-text-dark">Don't have an account yet?</span>
                <button @click="$emit('register')" class="button">Register</button>
            </div>
        </footer>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import './ErrorMessage'

export default Vue.component('user-login-form', {
    data: function() {
        return {
            username: '',
            password: ''
        }
    },
    computed: {
        loading: function() {
            return this.state === 'loading' || this.state === 'updating'
        },
        handling: function() {
            return this.state === 'handling'
        },
        ...mapGetters('user', {
            state: 'GET_STATE',
            error: 'GET_ERROR'
        })
    },
    methods: {
        ...mapActions('user', ['authenticate']),
        login: async function() {
            await this.authenticate({ username: this.username, password: this.password })
            if (!this.handling) this.$emit('close')
        }
    }
})
</script>