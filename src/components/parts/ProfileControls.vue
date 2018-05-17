<template>
    <div class="control-bar buttons has-addons">
        <button class="control-bar__button button" @click="$emit('editBio')">
            <span class="icon is-small">
                <i class="fa fa-user" />
            </span>
            <span>Edit Bio</span>
        </button>
        <button class="control-bar__button button" @click="$emit('pickAvatar')">
            <span class="icon is-small">
                <i class="fa fa-camera-retro" />
            </span>
            <span>Pick Avatar</span>
        </button>
        <button class="control-bar__button button">
            <span class="icon is-small">
                <i class="fa fa-ellipsis-h" />
            </span>
            <span>Options</span>
        </button>
    </div>
</template>

<script>
export default Vue.component('profile-controls', {})
</script>

<style lang="sass">
.control-bar
    display: flex;

.control-bar__button
    flex: 1 1 auto;
</style>
