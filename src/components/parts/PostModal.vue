<template>
    <transition name="fade">
        <div class="modal compose is-active">
            <div @click="$emit('close')" class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Post a Thread on {{ board.name }}</p>
                    <button class="delete" aria-label="close" @click="$emit('close')"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label for="title" class="label">Title</label>
                        <div class="control">
                            <input class="input" id="title" v-model="title" type="text" value="">
                        </div>
                    </div>
                    <div class="field">
                        <label for="content" class="label">Content</label>
                        <div class="control">
                            <textarea class="textarea" id="content" v-model="content" type="text" placeholder=""></textarea>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button @click="post" class="button is-success" :class="{'is-loading' : loading}">
                        <span class="icon">
                            <i class="fa fa-bolt"></i>
                        </span>
                        <span>Post</span>
                    </button>
                    <p v-if="error" class="help is-danger">
                        {{ error.data.content.toString() }}
                    </p>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import ErrorMessage from './ErrorMessage.vue'
import axios from '../../libs/axios'

export default Vue.component('post-modal', {
    data: function() {
        return {
            title: '',
            content: ''
        }
    },
    computed: {
        loading: function() {
            return this.state === 'loading'
        },
        ...mapGetters('thread', {
            state: 'GET_STATE',
            error: 'GET_ERROR',
            thread: 'GET_THREAD'
        })
    },
    methods: {
        post: async function() {
            await this.$store.dispatch('thread/createThread', {
                board: this.board.slug,
                title: this.title,
                content: this.content
            })

            // If no errors, go to the new thread
            if (!this.error) {
                this.$emit('close')
                this.$router.push({
                    name: 'thread',
                    params: {
                        board: this.board.slug,
                        key: this.thread.key,
                        slug: this.thread.slug
                    }
                })
            }
        }
    },
    props: {
        board: {
            type: Object,
            required: true
        }
    }
})
</script>