<template>
    <div class="controls">
        <div>
            <button @click="$emit('toggle')" class="button">
                <span class="icon">
                    <i class="fa" v-bind:class="{'fa-plus' : !drawerOpen, 'fa-minus' : drawerOpen}">
                        <span class="is-accessible" v-if="!drawerOpen">Open</span>
                        <span class="is-accessible" v-else>Close</span>
                    </i>
                </span>
            </button>
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
        </div>
        <div v-if="editAllowed">
            <button @click="$emit('edit')" class="button">
                <span class="icon">
                    <i class="fa fa-pencil">
                        <span class="is-accessible">Edit</span>
                    </i>
                </span>
            </button>
            <button @click="$emit('archive')" class="button">
                <span class="icon">
                    <i class="fa fa-archive">
                        <span class="is-accessible">Archive</span>
                    </i>
                </span>
            </button>
            <button @click="$emit('delete')" class="button">
                <span class="icon">
                    <i class="fa fa-trash">
                        <span class="is-accessible">Delete</span>
                    </i>
                </span>
            </button>
        </div>
    </div>
</template>

<script>
export default Vue.component('thread-controls', {
    props: {
        editAllowed: {
            type: Boolean,
            required: true
        },
        drawerOpen: {
            type: Boolean,
            required: true
        }
    }
})
</script>

<style lang="sass">
.controls
    width: 100%
    display: flex
    flex-direction: row
    justify-content: space-between
</style>
