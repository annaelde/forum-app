<template>
    <board></board>
</template>

<script>
import axios from 'axios'
import Board from './components/board.vue'

export default {
    name: 'app',
    el: '#app',
    components: { Board }
}
</script>

// Styles that go across the app
<style lang="sass">
@import "~bulma/sass/utilities/initial-variables"

$family-primary: Raleway, sans-serif

@import "~bulma/bulma"
</style>