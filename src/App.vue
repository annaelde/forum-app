<template>
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
}
</script>

// Styles that go across the app
<style lang="sass">
@import "~bulma/sass/utilities/initial-variables"

$family-primary: Raleway, sans-serif

@import "~bulma/bulma"

.is-accessible
    font-size: 0
</style>

<style lang="scss">
$fa-font-path: "~font-awesome/fonts";
@import "~font-awesome/scss/font-awesome";

</style>