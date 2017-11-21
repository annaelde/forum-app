import moment from "moment"

Vue.filter('timeElapsed', timestamp => {
        return moment(timestamp).fromNow()
})

Vue.filter('readableDate', timestamp => {
    return moment(timestamp).calendar()
})