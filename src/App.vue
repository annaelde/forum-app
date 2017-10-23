<template>
    <div class="container">
        <board></board>
    </div>
</template>

<script>
import Board from './components/board.vue'

export default {
    name: 'app',
    components: { Board }
}
</script>

// Styles that go across the app
<style lang="sass">
@import "~bulma/sass/utilities/initial-variables"

$family-primary: Raleway, sans-serif

@import "~bulma/bulma"
</style>

<style lang="scss">
$fa-font-path: "~font-awesome/fonts";
@import "~font-awesome/scss/font-awesome";

</style>