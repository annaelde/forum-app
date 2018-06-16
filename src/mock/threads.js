import loremIpsum from '@npm/lorem-ipsum'

const threads = [{
    created: '2018-05-27T17:22:17+00:00',
    title: 'Community feedback thread: Part 1',
    content: '',
    author: 'testUser1',
    board: 'computers',
    slug: 'mock-thread-1',
    key: 'ae498'
}, {
    created: '2018-05-27T17:22:17+00:00',
    title: 'What do you think about this?',
    content: '',
    author: 'testUser2',
    board: 'news',
    slug: 'mock-thread-2',
    key: 'ae498'
}, {
    created: '2018-05-27T17:22:17+00:00',
    title: 'Post your BEST links here',
    content: '',
    author: 'testUser3',
    board: 'comics',
    slug: 'mock-thread-3',
    key: 'ae498'
}, {
    created: '2018-05-27T17:22:17+00:00',
    title: 'Expert Here: Ask Me Whatever!',
    content: '',
    author: 'testUser4',
    board: 'flowers',
    slug: 'mock-thread-4',
    key: 'ae498'
}, {
    created: '2018-05-27T17:22:17+00:00',
    title: '[Serious Thread] Post Your Experiences',
    content: '',
    author: 'testUser5',
    board: 'computers',
    slug: 'mock-thread-5',
    key: 'ae498'
}, {
    created: '2018-05-27T17:22:17+00:00',
    title: 'I can\'t believe they finally did it..',
    content: '',
    author: 'mockUser',
    board: 'news',
    slug: 'mock-thread-6',
    key: 'ae498'
}]

threads.forEach(thread => thread.content = loremIpsum({
    count: 2,
    units: 'paragraphs'
}))

export default threads