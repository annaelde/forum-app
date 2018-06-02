// A little mock JS server when we're not interested in testing with Django
import users from './users'
import profile from './profile'
import threads from './threads'
import boards from './boards'
import stats from './stats'
import cloneDeep from '@npm/lodash/cloneDeep'
import slugify from '@npm/slugify'
import randomString from '@npm/random-string'

const http = {
    defaults: {
        headers: {
            common: []
        }
    },
    post: (endpoint, payload) => {
        return serve(endpoint, payload, 'post')
    },
    get: (endpoint, payload) => {
        return serve(endpoint, payload, 'get')
    },
    patch: (endpoint, payload) => {
        return serve(endpoint, payload, 'patch')
    },
    delete: (endpoint, payload) => {
        return serve(endpoint, payload, 'delete')
    }
}

function serve(endpoint, payload, method = 'get') {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Capture the URL path, so we can return the appropriate response
            // This regex is a bit of a nightmare. I promise the actual regexes in Python
            // are much prettier! 🦄✨
            let regex = /(boards)\/$|(boards)\/(\w*)\/(threads)\/(\w*)\/(\S*)\/|(boards)\/(\w*)\/(threads)|(boards)\/(\w*)|(users)\/(\w*)|(forum)|(auth)\/(me)|(auth)\/(token)\/(create)|(auth)\/(token)\/(destroy)|(auth)\/(users)\/(create)/
            let result = endpoint.match(regex)
            let matches = result.slice(1, result.length)
            // Remove empty matches
            matches = matches.filter(match => match)
            switch (matches[0]) {
                case 'users':
                    resolve(getUser({
                        username: matches[1]
                    }))
                    break
                case 'boards':
                    if (matches[1] && matches[2] && matches[3]  && method === 'get') {
                        try {
                            resolve(getThread({
                                slug: matches[4]
                            }))
                        } catch (e) {
                            reject(e)
                        }
                    }  else if (matches[1] && matches[2] && matches[3]  && method === 'patch') {
                        try {
                            resolve(updateThread({ 
                                ...payload, 
                                board: matches[1], 
                                key: matches[3], 
                                slug: matches[4] 
                            }))
                        } catch (e) {
                            reject(e)
                        }
                    } else if (matches[1] && matches[2] && method === 'get') {
                        try {
                            resolve(getThreads({
                                slug: matches[1]
                            }))
                        } catch (e) {
                            reject(e)
                        }
                    } else if (matches[1] && matches[2] && method === 'post') {
                        try {
                            resolve(createThread(payload))
                        } catch (e) {
                            reject(e)
                        }
                    } else if (matches[1]) {
                        try {
                            resolve(getBoard({
                                slug: matches[1]
                            }))
                        } catch (e) {
                            reject(e)
                        }
                    } else {
                        try {
                            resolve(getBoards())
                        } catch (e) {
                            reject(e)
                        }
                    }
                    break
                case 'forum':
                    try {
                        resolve(getForum())
                    } catch (e) {
                        reject(e)
                    }
                    break
                case 'auth':
                    if (matches[1] === 'users') {
                        try {
                            resolve(createUser(payload))
                        } catch (e) {
                            reject(e)
                        }
                    } else if (matches[1] === 'token' && matches[2] === 'destroy') {
                        try {
                            resolve(logout())
                        } catch (e) {
                            reject(e)
                        }
                    } else if (matches[1] === 'token' && matches[2] === 'create') {
                        try {
                            resolve(login(payload))
                        } catch (e) {
                            reject(e)
                        }
                    } else if (matches[1] === 'me') {
                        try {
                            resolve(getProfile())
                        } catch (e) {
                            reject(e)
                        }
                    }
                    break
            }
        }, 400)
    })
}

function getUser({
    username
}) {
    let user = users.find(user => user.username === username)
    user.posts = cloneDeep(threads)
    user
        .posts
        .forEach(thread => thread.author = username)
    return {
        data: user
    }
}

function getBoard({
    slug
}) {
    let board = boards.find(board => board.slug === slug)
    if (!board) {
        throw Error({
            response: 'Page Not Found'
        })
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

function getThread({
    slug
}) {
    return {
        data: threads.find(thread => thread.slug === slug)
    }
}

function createThread({
    author,
    board,
    title,
    content
}) {
    let thread = {
        author,
        board,
        title,
        content,
        created: '2018-05-27T17:22:17+00:00',
        slug: slugify(title),
        key: randomString({
            length: 5
        })
    }
    threads.push(thread)
    return { 
        data: thread
    }
}

function updateThread({
    key,
    slug,
    title,
    content
}) {
    let thread = threads.find(thread => thread.key === key && thread.slug === slug)
    thread.content = content
    thread.title = title
    return {
        data: thread
    }
}

function getThreads({
    slug
}) {
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

function login({
    username,
    password
}) {
    if (username === 'mockUser' && password === 'pass') {
        return {
            data: {
                auth_token: '012345'
            }
        }
    } else if (users.find(user => user.username === username && user.password === password))
    {
        return {
            data: {
                auth_token: '012345'
            }
        }
    } 
    else {
        throw Error({
            response: 'Not Authorized'
        })
    }
}

function logout() {
    return {
        response: 'Success',
        data: ''
    }
}

function createUser(payload) {
    let user = { ...payload, 
        data_joined: '2018-05-27T22:35:17+00:00', 
        avatar: '/media/avatars/avatar.jpg'
    }
    users.push(user)
    return {
        data: user
    }
}

function getProfile() {
    return {
        data: profile
    }
}

export default http