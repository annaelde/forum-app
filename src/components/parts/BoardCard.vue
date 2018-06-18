<template>
    <router-link :to="`_${board.slug}`" class="card">
        <header class="card-header">
            <h2 class="card-header-title">
                {{ board.name }}
            </h2>
            <a v-show="auth" class="card-header-icon" aria-label="more options" @click="$emit('remove', board.slug)">
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
            <div class="card-footer-item">
                <span class="icon">
                    <i class="fa fa-users" aria-hidden="true"/>
                </span>
                <span>{{ board.userCount | shortCount }}</span>
            </div>
            <div class="card-footer-item">
                <span class="icon">
                    <i class="fa fa-hashtag" aria-hidden="true"/>
                </span>
                <span>{{ board.threadCount | shortCount }}</span>
            </div>
            <div class="card-footer-item">
                <span class="icon">
                    <i class="fa fa-comment-o" aria-hidden="true"/>
                </span>
                <span>{{ board.commentCount | shortCount }}</span>
            </div>
        </footer>
    </router-link>
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
        },
        auth: {
            type: Boolean,
            required: false,
            default: false
        },
        mode: {
            type: String,
            required: false,
            default: 'forum'
        }
    }
})
</script>