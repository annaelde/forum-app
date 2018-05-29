<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                {{ board.name }}
            </p>
            <a class="card-header-icon" aria-label="more options" @click="$emit('remove', board.slug)">
                <span class="icon">
                    <i class="fa fa-times" aria-hidden="true" />
                </span>
            </a>
        </header>
        <div class="card-content">
            <div class="content">
                {{ board.description }}
            </div>
        </div>
        <footer class="card-footer">
            <router-link to="" class="card-footer-item">
                <span class="icon">
                    <i class="fa fa-thumb-tack" aria-hidden="true" />
                </span>
                <span>Pin</span>
            </router-link>
            <router-link :to="`_${board.slug}`" class="card-footer-item">
                <span class="icon">
                    <i class="fa fa-sign-in" aria-hidden="true" />
                </span>
                <span>Visit</span>
            </router-link>
        </footer>
    </div>
</template>

<script>
export default Vue.component('board-card', {
    props: {
        board: {
            required: true,
            type: Object,
            default: () => ({
                name: '',
                description: '',
                slug: ''
            })
        }
    }
})
</script>