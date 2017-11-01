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
                            <input class="input" id="title" type="text" value="">
                        </div>
                    </div>
                    <div class="field">
                        <label for="content" class="label">Content</label>
                        <div class="control" :class="{'is-loading' : (state === 'loading')}">
                            <textarea class="textarea" id="content" type="text" placeholder=""></textarea>
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
import { mapState } from 'vuex'
import ErrorMessage from './ErrorMessage.vue'
import axios from '../../libs/axios'

export default Vue.component('post-modal', {
    computed: mapState({
        state: state => state.thread.machine.state,
        error: state => state.thread.error
    }),
    methods: {
        post: function() {
            var title = document.getElementById('title').value
            var content = document.getElementById('content').value
            this.$store.dispatch('thread/postThread', { board: this.board.slug, title: title, content: content })
        }
    },
    props: ['board'],
    watch: {}
})
</script>


<style lang="sass">

</style>
