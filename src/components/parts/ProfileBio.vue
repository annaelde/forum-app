<template>
    <div v-if="!edit" @click="toggle()" @keyup.enter="toggle()" tabindex="0">
        <div class="can-edit" :class="{ 'show-icon': isMe }">
            <p class="content">
                {{ bio }}
            </p>
        </div>
    </div>
    <div v-else>
        <div class="field">
            <div class="control">
                <textarea v-if="edit" v-model="payload" class="textarea" maxlength="256" />
            </div>
        </div>
        <div class="field is-grouped">
            <span class="control">
                <button @click="submit()" class="button is-link" :class="loading ? 'is-loading' : ''">
                    Save
                </button>
            </span>
            <span class="control">
                <button class="button" :disabled="loading" @click="cancel()">
                    Cancel
                </button>
            </span>
        </div>
    </div>
</template>

<script>
export default Vue.component('profile-bio', {
    props: {
        bio: {
            type: String,
            required: false,
            default: ''
        },
        isMe: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            payload: this.bio,
            edit: false,
            loading: false
        }
    },
    methods: {
        toggle: function() {
            if (this.isMe) this.edit = true
        },
        submit: function() {
            this.loading = true
            this.$emit('save', this.payload, this.complete, this.error)
        },
        cancel: function() {
            // Reset the bio to the original
            this.edit = false
            this.payload = this.bio
            this.$emit('cancel')
        },
        complete: function() {
            this.edit = false
            this.loading = false
        },
        error: function() {
            this.loading = false
        }
    }
})
</script>