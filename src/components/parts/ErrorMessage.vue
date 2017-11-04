<template>
    <div class="hero box is-danger is-bold">
        <div class="hero-body">
            <h1 class="title">
                {{ response.status }} Error: {{ response.statusText }}
            </h1>
            <h2 class="subtitle">
                {{ customMessage() }}
            </h2>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default Vue.component('error-message', {
    props: [
        'response'
    ],
    methods: {
        customMessage: function() {
            var message = `Oops, there's been an error loading this page. Try loading it again.`
            switch(this.response.status)
            {
                case 500: 
                    message = `Forum couldn't process this request.`
                    break
                case 502: 
                    message = `Forum couldn't connect to the server.` 
                    break
                case 503: 
                    message = `The server is overloaded. Try connecting again.`
                    break
                case 400:
                    message = `The server did not understand the request.`
                    break
                case 401:
                    message = `This information you entered was not correct.`
                    break                      
                case 403: 
                    message = `You don't have permission to access this. Are you logged in?`
                    break                    
                case 404: 
                    message = `This page doesn't exist.`
                    break
            }
            return message
        }
    }
})
</script>


<style lang="sass">

</style>