// A little mock JS server when we're not interested in testing with Django
import users from './users'
import threads from './threads'
import boards from './boards'
import stats from './stats'
import cloneDeep from '@npm/lodash/cloneDeep'

const http = {
    get: (endpoint, payload) => {
        return new Promise(resolve => {
            setTimeout(() => {
                // The endpoint will be in the first capture group, with
                // params in the second
                let regex = /(boards)\/$|(boards)\/(\w*)\/(threads)\/(\w*)\/(\S*)\/|(boards)\/(\w*)\/(threads)|(boards)\/(\w*)|(users)\/(\w*)|(forum)/
                let result = endpoint.match(regex)
                console.log(endpoint)
                let matches = result.slice(1, result.length)
                matches = matches.filter(match => match)
                console.log(matches)
                switch (matches[0]) {
                    case 'users':
                        resolve(getUser({ username: matches[1] }))
                        break
                    case 'boards':
                        if (matches[1] && matches[2] && matches[3]) {
                            try {
                                resolve(getThread({ slug: matches[4] }))
                            } catch(e) {
                                throw Error(e)
                            }
                        } else if (matches[1] && matches[2]) {
                            try {
                                resolve(getThreads({ slug: matches[1] }))
                            } catch(e) {
                                throw Error(e)
                            }
                        } else if (matches[1]) {
                            try {
                                resolve(getBoard({ slug: matches[1] }))
                            } catch(e) {
                                throw Error(e)
                            }   
                        } else {
                            try {
                                resolve(getBoards())
                            } catch (e) {
                                throw Error(e)
                            }
                        }
                        break
                    case 'forum':
                        try {
                            resolve(getForum())
                        } catch (e) {
                            throw Error(e)
                        }
                        break
                }
            }, 1000)
        })
    }
}

function getUser({ username }) {
    let user = users.find(user => user.username === username)
    user.posts = cloneDeep(threads)
    user.posts.forEach(thread => thread.author = username)
    return {
        data: user
    }
}

function getBoard({ slug }) {
    let board = boards.find(board => board.slug === slug)
    if (!board) {
        throw Error('404')
    }
    return {
        data: board
    }
}

function getBoards() {
    return {
        data: boards
    }
}

function getThread({ slug }) {
    return {
        data: threads.find(thread => thread.slug === slug)
    }
}

function getThreads({ slug }) {
    let list = cloneDeep(threads)
    list.forEach(item => item.board = slug)
    return { 
        data: list
    }
}

function getForum() {
    return {
        data: stats
    }
}

export default http