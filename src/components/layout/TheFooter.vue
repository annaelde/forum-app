<template>
    <footer class="footer">
        <div class="container">
            <div class="content has-text-centered">
                <p>&copy; Copyright 2017.</p>
            </div>
        </div>
    </footer>
</template>

<script>
import { mapState } from 'vuex'

export default Vue.component('the-footer', {
    computed: mapState({
        board: state => state.board.data
    })
})
</script>