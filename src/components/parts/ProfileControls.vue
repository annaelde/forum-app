<template>
    <div class="field has-addons">
        <p class="control">
            <a class="button" @click="$emit('editBio')">
                <span class="icon is-small">
                    <i class="fa fa-user" />
                </span>
                <span>Bio</span>
            </a>
        </p>
        <p class="control">
            <a class="button">
                <span class="icon is-small">
                    <i class="fa fa-camera-retro" />
                </span>
                <span>Avatar</span>
            </a>
        </p>
        <p class="control">
            <a class="button">
                <span class="icon is-small">
                    <i class="fa fa-ellipsis-h" />
                </span>
                <span>Options</span>
            </a>
        </p>
    </div>
</template>

<script>
export default Vue.component('profile-controls', {})
</script>

<style>

</style>
