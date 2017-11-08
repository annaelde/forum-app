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
                    <transition name="balloon">
                        <error-message v-if="error" :response="error"></error-message>
                    </transition>
                    <div class="field">
                        <label for="title" class="label">Title</label>
                        <div class="control" :class="{'is-loading' : (state === 'loading')}">
                            <input class="input" id="title" v-model="title" type="text" value="">
                        </div>
                    </div>
                    <div class="field">
                        <label for="content" class="label">Content</label>
                        <div class="control" :class="{'is-loading' : (state === 'loading')}">
                            <textarea class="textarea" id="content" v-model="content" type="text" placeholder=""></textarea>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button @click="post" class="button is-success">
                        <span class="icon">
                            <i class="fa fa-bolt"></i>
                        </span>
                        <span>Post</span>
                    </button>
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
        handling: state => state === 'handling',
        ...mapGetters({
            state: 'GET_STATE',
            error: 'GET_ERROR'
        })
    },
    methods: {
        post: async function() {
            await this.$store.dispatch('thread/createThread', {
                board: this.board.slug,
                title: this.title,
                content: this.content
            })

            if (!this.handling) {
                this.$emit('close')
                await this.$store.dispatch('board/loadThreads')
            }
        }
    },
    props: ['board'],
    watch: {}
})
</script>


<style lang="sass">

</style>
