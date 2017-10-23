<template>
    <div class="box">
        <div class="columns">
            <div class="column is-three-quarters">
                <router-link :to="'/thread/' + thread.id + '/' + thread.slug + '/'">
                    <h1 class="title">{{ thread.title }}</h1>
                </router-link>
                <h2 class="subtitle">Posted by {{ thread.author }} on {{ thread.created }}</h2>
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
            </div>
        </div>
        <div v-bind:class="{'is-hidden' : !open}" class="content">
            <p>{{ thread.content }}</p>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'

export default Vue.component('thread-preview', {
    name: 'thread-preview',
    data() {
        return {
            open: false
        }
    },
    props: {
        thread: {
            type: Object,
            required: true
        }
    }
})
</script>