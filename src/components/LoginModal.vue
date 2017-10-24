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
                <label for="username" class="label">Username</label>
                <div class="field">
                    <div class="control has-icons-left">
                        <input class="input" type="text" value="">
                        <span class="icon is-small is-left">
                        <i class="fa fa-user"></i>
                        </span>
                    </div>
                </div>
                <div class="field">
                    <label for="password" class="label">Password</label>
                    <div class="control has-icons-left">
                        <input class="input" type="password" value="">
                        <span class="icon is-small is-left">
                        <i class="fa fa-key"></i>
                        </span>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success">Login</button>
                <div class="register">
                    <span>Don't have an account yet?</span>
                    <button class="button">Register</button>
                </div>
            </footer>
        </div>
    </div>
    </transition>
</template>

<script>
import Vue from 'vue'

export default Vue.component('login-modal', {
    name: 'login-modal',
    data() {
        return {
            auth: false,
        }
    },
    methods: {
        login: function() {
            this.$emit('user-authenticated', this.user)
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
