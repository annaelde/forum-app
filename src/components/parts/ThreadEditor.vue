<template>
    <div>
        <div class="title field">
            <div class="control">
                <input type="text" class="title input" v-model="title">
            </div>
        </div>
        <h3 class="subtitle">Posted by {{ thread.author }} {{ thread.created | timeElapsed }}</h3>

        <thread-controls class="controls" :disabled="true" :edit-allowed="true"/>
        <div class="field">
            <div class="control">
                <textarea class="textarea" v-model="content" />
            </div>
        </div>
        <div class="field is-grouped is-grouped-right">
            <div class="control">
                <button @click="saveEdits()" class="button is-primary" :class="{'is-loading' : loading}">
                    <span class="icon">
                        <i class="fa fa-check" />
                    </span>
                    <span>Save</span>
                </button>
            </div>
            <div class="control">
                <button @click="closeEditor()" class="button is-light" :disabled="loading">
                    <span class="icon">
                        <i class="fa fa-times" />
                    </span>
                    <span>Close</span>
                </button>
            </div>
        </div>
        <p class="help" :class="{'is-error' : error, 'is-success' : !error }">
            {{ message }}
        </p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default Vue.component('thread-editor', {
    props: {
        board: {
            type: String,
            required: true
        },
        thread: {
            type: Object,
            required: true
        }
    },
    data: function() {
        return {
            title: this.thread.title,
            content: this.thread.content,
            error: false,
            message: '',
            unsavedMsg: 'Your unsaved changes will be lost if you exit the editor.'
        }
    },
    computed: {
        loading: function() {
            return this.state === 'loading' || this.state === 'updating'
        },
        handling: function() {
            return this.state === 'handling'
        },
        ...mapGetters({
            state: 'thread/GET_STATE'
        })
    },
    methods: {
        saveEdits: async function() {
            // Reset error status
            this.error = false
            this.message = ''

            // Check if any changes were made
            if (this.content == this.thread.content) {
                this.error = true
                this.message = 'There are no changes to save!'
            }

            // Try to save
            await this.$store.dispatch('thread/updateThread', {
                board: this.board,
                key: this.thread.key,
                slug: this.thread.slug,
                title: this.title,
                content: this.content
            })

            // Reload threads
            if (!this.error) {
                if (this.$route.params.board) {
                    await this.$store.dispatch('board/loadThreads')
                } else if (this.$route.params.user) {
                    // We need to handle thread updates on the profile,
                    // and also any other component that uses a thread
                    // list, so we'll have to basically break the usage
                    // of the store out of this component
                }
            }

            // Emit save
            if (!this.error) {
                this.$emit('close')
            }
        },
        closeEditor() {
            if (this.content != this.thread.content && confirm(this.unsavedMsg)) {
                this.$emit('close')
            } else {
                this.$emit('close')
            }
        }
    }
})
</script>

<style lang="sass" scoped>
.help
    text-align: right
    width: 100%

.title.input
    padding: 0
    border-width: 0 0 1px 0
    border-bottom-style: dashed;
    margin: 0 0 -1px 0
    height: 2.3rem
    box-shadow: none

.subtitle
    margin-bottom: 0

.controls
    margin-top: 16px
    margin-bottom: 16px

.textarea
    border-style: dashed;
    box-shadow: none;
</style>
