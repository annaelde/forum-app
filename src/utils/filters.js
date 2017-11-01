import moment from "moment"

Vue.filter('timeElapsed', timestamp => {
        return moment(timestamp).fromNow()
})