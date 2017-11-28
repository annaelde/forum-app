<template>
    <div class="modal">
        <div class="modal-background" />
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">
                    {{ title }}
                </p>
                <button class="delete" aria-label="close" @click="$emit('cancel')" />
            </header>
            <section class="modal-card-body">
                {{ body }}
            </section>
            <footer class="modal-card-foot">
                <button class="button" @click="$emit('confirm')">Confirm</button>
                <button class="button" @click="$emit('cancel')">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script>
export default Vue.component('confirm-modal', {
    props: {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        }
    }
})
</script>