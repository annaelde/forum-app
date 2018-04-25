<template>
    <transition name="fade">
        <div class="modal login is-active">
            <div @click="$emit('close')" class="modal-background" />
            <user-login-form v-if="login" @register="login = false" @close="$emit('close')" />
            <user-register-form v-if="!login" @back="login = true" @close="$emit('close')" />
        </div>
    </transition>
</template>

<script>
import './UserLoginForm'
import './UserRegisterForm'

export default Vue.component('user-modal', {
    data: function() {
        return {
            login: true
        }
    },
    methods: {
        reset: function() {
            // Add function to reset error message on navigating away
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

.login.modal .register .button
    margin-left: 1rem
</style>
