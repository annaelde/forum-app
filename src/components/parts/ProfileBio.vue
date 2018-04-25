<template>
    <div v-if="!edit">
        <p>{{ bio }}</p>
    </div>
    <div v-else>
        <div class="field">
            <div class="control">
                <textarea v-if="edit" v-model="bioPayload" class="textarea" />
            </div>
        </div>
        <div class="field is-grouped">
            <span class="control">
                <button @click="submit()" class="button is-link" :class="loading ? 'is-loading' : ''">
                    Save
                </button>
            </span>
            <span class="control">
                <button class="button" :disabled="loading" @click="$emit('cancel')">
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
        edit: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    data() {
        return {
            bioPayload: this.bio,
            loading: false
        }
    },
    methods: {
        submit: function() {
            this.loading = true
            this.$emit('save', this.bioPayload, this.complete, this.error)
        },
        complete: function() {
            this.loading = false
        },
        error: function() {
            this.loading = false
        }
    }
})
</script>

<style>

</style>
