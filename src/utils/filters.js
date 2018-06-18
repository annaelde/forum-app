import moment from 'moment'

export default {
    timeElapsed: Vue.filter('timeElapsed', timestamp => {
        return moment(timestamp).fromNow()
    }),

    readableDate: Vue.filter('readableDate', timestamp => {
        return moment(timestamp).calendar()
    }),

    shortCount: Vue.filter('shortCount', count => {
        if (count < 1000) return count
        else if (count > 1000 && count < 1000000) return Math.floor(count / 1000) + 'k'
        else if (count > 1000000) return Math.floor(count / 1000000) + 'm'
    })
}