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
            </div>
        </div>
        <transition name="slide-down">
            <div v-show="open" class="content">
                <p>{{ thread.content }}</p>
            </div>
        </transition>
    </div>
</template>

<script>
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
    }
})
</script>