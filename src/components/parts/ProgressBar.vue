<template>
    <div class="progress-container">
        <transition name="fade-out" appear>
            <progress v-show="progress != 100" class="progress is-info is-small is-radiusless" :value="progress" max="100" />
        </transition>
    </div>
</template>

<script>
export default Vue.component('progress-bar', {
    props: {
        progress: {
            type: Number,
            required: true
        }
    }
})
</script>

<style>

</style>
