<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Register with Forum</p>
            <button class="delete" aria-label="close" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
            <transition name="balloon">
                <error-message v-if="error && error.status != 400" :response="error" />
            </transition>
            <div class="field">
                <label for="username" class="label">Username</label>
                <div class="control has-icons-left" :class="{'is-loading' : loading}">
                    <input class="input" id="username" v-model="username" type="text" value="">
                    <span class="icon is-small is-left">
                        <i class="fa fa-user" />
                    </span>
                </div>
                <p class="help is-danger">{{ response.username[0] }}</p>
            </div>
            <div class="field">
                <label for="email" class="label">Email</label>
                <div class="control has-icons-left" :class="{'is-loading' : loading}">
                    <input class="input" id="email" v-model="email" type="email" value="">
                    <span class="icon is-small is-left">
                        <i class="fa fa-envelope" />
                    </span>
                </div>
                <p class="help is-danger">{{ response.email[0] }}</p>
            </div>
            <div class="field">
                <label for="password" class="label">Password</label>
                <div class="control has-icons-left" :class="{'is-loading' : loading}">
                    <input class="input" id="password" v-model="password" type="password" value="">
                    <span class="icon is-small is-left">
                        <i class="fa fa-key" />
                    </span>
                </div>
                <p class="help is-danger">{{ response.password[0] }}</p>
            </div>
        </section>
        <footer class="modal-card-foot">
            <button @click="register" class="button is-success">Register</button>
            <button @click="$emit('back')" class="button">Cancel</button>
        </footer>
    </div>

</template>

<script>
import { mapGetters } from 'vuex'
import './ErrorMessage'

export default Vue.component('user-register-form', {
    data: function() {
        return {
            username: '',
            email: '',
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
        response: function() {
            let response = { username: [''], password: [''], email: [''] }

            if (!this.error.data) {
                return response
            }

            let data = this.error.data
            if (data.username) response.username = data.username
            if (data.password) response.password = data.password
            if (data.email) response.email = data.email
            return response
        },
        ...mapGetters('user', {
            state: 'GET_STATE',
            error: 'GET_ERROR'
        })
    },
    methods: {
        register: async function() {
            await this.$store.dispatch('user/register', {
                username: this.username,
                email: this.email,
                password: this.password
            })

            if (!this.error) this.$emit('close')
        }
    }
})
</script>