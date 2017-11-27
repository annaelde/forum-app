import moment from 'moment'

export default {
    timeElapsed: Vue.filter('timeElapsed', timestamp => {
        return moment(timestamp).fromNow()
    }),

    readableDate: Vue.filter('readableDate', timestamp => {
        return moment(timestamp).calendar()
    })
}