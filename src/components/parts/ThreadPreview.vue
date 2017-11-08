<template>
    <div class="box">
        <div class="columns">
            <div class="column is-three-quarters">
                <router-link :to="`/~${board}/${thread.key}/${thread.slug}/`">
                    <h2 class="title">{{ thread.title }}</h2>
                </router-link>
                <h3 class="subtitle">Posted by {{ thread.author }} {{ thread.created | timeElapsed }}</h3>
            </div>
            <div class="column is-clearfix">
                <div class="is-pulled-right">
                    <button class="button">
                        <span class="icon">
                            <i class="fa fa-bookmark">
                                <span class="is-accessible">Bookmark</span>
                            </i>
                        </span>
                    </button>
                    <button class="button">
                        <span class="icon">
                            <i class="fa fa-link">
                                <span class="is-accessible">Copy Link</span>
                            </i>
                        </span>
                    </button>
                    <button @click="open = !open" class="button">
                        <span class="icon">
                            <i class="fa" v-bind:class="{'fa-plus' : !open, 'fa-minus' : open}">
                                <span class="is-accessible" v-if="!open">Open</span>
                                <span class="is-accessible" v-else>Close</span>
                            </i>
                        </span>
                    </button>
                </div>
                <div v-if="thread.author === username" class="is-pulled-right">
                    <button class="button">
                        <span class="icon">
                            <i class="fa fa-pencil">
                                <span class="is-accessible">Edit</span>
                            </i>
                        </span>
                    </button>
                    <button class="button">
                        <span class="icon">
                            <i class="fa fa-archive">
                                <span class="is-accessible">Archive</span>
                            </i>
                        </span>
                    </button>
                    <button @click="deleteThread" class="button">
                        <span class="icon">
                            <i class="fa fa-trash">
                                <span class="is-accessible">Delete</span>
                            </i>
                        </span>
                    </button>
                </div>
            </div>
        </div>
        <sliding-drawer :drawer-open="open" classes="content">
            <p>{{ thread.content }}</p>
        </sliding-drawer>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SlidingDrawer from '../abstract/SlidingDrawer.vue'

export default Vue.component('thread-preview', {
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
            open: false
        }
    },
    computed: {
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
        }
    }
})
</script>