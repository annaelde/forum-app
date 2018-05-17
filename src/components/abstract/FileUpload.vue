<template>
    <input ref="input" type="file" @change="$emit('change', $event)" :multiple="multiple" :class="{ hidden }">
</template>

<script>
export default Vue.component('file-upload', {
    props: {
        multiple: {
            type: Boolean,
            required: false,
            default: false
        },
        hidden: {
            type: Boolean,
            required: false,
            default: false
        },
        activate: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    watch: {
        activate: function() {
            if (this.activate) {
                this.$refs.input.click()
            }
        }
    }
})
</script>

<style lang="sass" scoped>
</style>
