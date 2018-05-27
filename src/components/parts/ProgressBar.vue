<template>
    <div class="progress-container">
        <transition name="fade" appear>
            <progress v-show="progress !== 100 || error" :value="progress" :class="{'is-info': !error, 'is-error': error }" class="progress is-small is-radiusless" max="100" />
        </transition>
    </div>
</template>

<script>
export default Vue.component('progress-bar', {
    props: {
        progress: {
            type: Number,
            required: true
        },
        error: {
            type: Boolean,
            required: true
        }
    }
})
</script>

<style>

</style>
