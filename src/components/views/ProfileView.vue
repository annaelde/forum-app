<template>
    <main class="main">
        <thread-card v-for="thread in threads" :key="thread.name" :board="thread.board" :thread="thread" />
        <div v-if="user && !threads">
            <p class="title">
                This user hasn't posted any threads.
            </p>
        </div>
        <div v-if="!user">
            <p class="title">
                Oh no, 404! This user doesn't exist.
            </p>
        </div>
    </main>
</template>

<script>
import { request } from '../../libs/axios'
import '../parts/ThreadCard.vue'

export default Vue.component('profile-view', {
    data() {
        return {
            user: null
        }
    },
    computed: {
        threads: function() {
            return this.user ? this.user.posts : false
        }
    },
    async created() {
        await this.setUser()
    },
    methods: {
        setUser: async function() {
            await request({
                method: 'get',
                url: `users/${this.$route.params.username}`,
                callback: response => {
                    this.user = response ? response.data : null
                }
            })
        }
    }
})
</script>