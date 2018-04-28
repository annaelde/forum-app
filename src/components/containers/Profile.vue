<template>
    <div class="view">
        <profile-view v-if="ready" :user="user" :threads="threads" />
        <profile-sidebar v-if="ready" :user="user" :is-me="user.username === me">
            <profile-controls @editBio="edit = !edit" />
            <profile-bio @save="setBio" @cancel="edit = false" :bio="user.bio" :edit="edit" />
        </profile-sidebar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { request } from '@libs/axios'
import '@parts/ProfileControls'
import '@views/ProfileView'
import '@parts/ProfileBio'
import '@sidebars/ProfileSidebar'

export default Vue.component('profile', {
    data() {
        return {
            user: null,
            edit: false,
            ready: false
        }
    },
    computed: {
        threads: function() {
            return this.user ? this.user.posts : false
        },
        ...mapGetters({
            me: 'user/GET_USERNAME',
            token: 'user/GET_TOKEN'
        })
    },
    async created() {
        await this.setUser()
    },
    methods: {
        setUser: async function() {
            await request({
                method: 'get',
                url: `users/${this.$route.params.username}/`,
                complete: response => {
                    this.user = response ? response.data : null
                    this.ready = true
                }
            })
        },
        setBio: async function(bio, callComplete, callError) {
            await request({
                method: 'patch',
                url: `users/${this.$route.params.username}/`,
                payload: { bio },
                complete: () => {
                    this.user.bio = bio
                    this.edit = false
                    callComplete()
                },
                error: () => {
                    callError()
                }
            })
        }
    }
})
</script>

<style>

</style>
