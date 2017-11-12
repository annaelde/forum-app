<template>
    <div class="box grid">
        <header v-if="!editMode" class="header">
            <router-link :to="`/~${board}/${thread.key}/${thread.slug}/`">
                <h2 class="title">{{ thread.title }}</h2>
            </router-link>
            <h3 class="subtitle">Posted by {{ thread.author }} {{ thread.created | timeElapsed }}</h3>
        </header>

        <thread-controls v-if="!editMode" :editAllowed="editAllowed" :drawerOpen="drawerOpen" 
        @toggle="drawerOpen = !drawerOpen" 
        @delete="deleteThread()" 
        @archive="archiveThread()"
        @edit="editMode = true"></thread-controls>

        <sliding-drawer v-if="!editMode" :drawer-open="drawerOpen" classes="content">
            <article>{{ thread.content }}</article>
        </sliding-drawer>

        <thread-editor v-if="editMode" :board="board" :thread="thread" @save="updateThread()" @close="editMode = false"></thread-editor>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ThreadEditor from './ThreadEditor.vue'
import ThreadControls from './ThreadControls.vue'

export default Vue.component('thread-card', {
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
    data() {
        return {
            drawerOpen: false,
            editMode: false
        }
    },
    computed: {
        editAllowed: function() {
            return this.username === this.thread.author
        },
        handling: state => state === 'handling',
        ...mapGetters({
            username: 'user/GET_USERNAME',
            state: 'thread/GET_STATE'
        })
    },
    methods: {
        deleteThread: async function() {
            if (confirm(`Are you sure you want to delete ${this.thread.title}?`)) {
                await this.$store.dispatch('thread/deleteThread', {
                    board: this.board,
                    key: this.thread.key,
                    slug: this.thread.slug
                })

                if (!this.handling) {
                    this.$emit('close')
                    await this.$store.dispatch('board/loadThreads')
                }
            }
        },
        updateThread: async function() {
            this.editMode = false
            this.drawerOpen = true
        },
        archiveThread: async function() {}
    }
})
</script>

<style lang="sass">
.box.grid
    display: grid
    grid-template-columns: 1fr
    grid-template-rows: auto auto 1fr
    grid-template-areas: "header" "controls" "content"
    grid-row-gap: 1em

.box.grid .header
    grid-area: header

.box.grid .controls
    grid-area: controls

.box.grid .content
    grid-area: content

</style>
