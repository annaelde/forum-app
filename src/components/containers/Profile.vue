<template>
    <div class="view">
        <profile-view v-if="ready" :user="user" :threads="threads" />
        <profile-sidebar v-if="ready" :user="user" />
    </div>
</template>

<script>
import { request } from '../../libs/axios'
import '../views/ProfileView.vue'
import '../sidebars/ProfileSidebar.vue'

export default Vue.component('profile', {
    data() {
        return {
            user: null,
            ready: false
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
                    this.ready = true
                }
            })
        }
    }
})
</script>

<style>

</style>
