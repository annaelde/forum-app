<template>
    <div class="box">
        <div class="columns">
            <div class="column is-three-quarters">
                <h1 class="title">{{ thread.title }}</h1>
                <h2 class="subtitle">Posted by {{ thread.author }} on {{ thread.created }}</h2>
            </div>
            <div class="column is-clearfix">
                <button @click="open = !open" class="button is-pulled-right">
                    <span class="icon">
                        <i class="fa" v-bind:class="{'fa-plus' : !open, 'fa-minus' : open}">
                            <span class="is-accessible" v-if="!open">Open</span>
                            <span class="is-accessible" v-else>Close</span>
                        </i>
                    </span>

                </button>
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


<style lang="sass">
.is-accessible
    font-size: 0
    
</style>