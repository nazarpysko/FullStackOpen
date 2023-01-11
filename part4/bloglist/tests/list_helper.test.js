import { dummy, favoriteBlog, totalLikes, mostBlogs } from "../utils/list_helper.js";

const emptyBlogsList = []

const oneBlogList = [
    {
        id: '12345678910',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        url: 'https://www.goodreads.com/book/show/3735293-clean-code?from_search=true&from_srp=true&qid=rZ4acP6ITW&rank=1',
        likes: 42
    }
]

const manyBlogList = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }  
]


test('dummy returns one', () => {     
    const result = dummy(emptyBlogsList)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('empty blog list', () => {
        const result = totalLikes(emptyBlogsList)

        expect(result).toBe(0)
    })

    test('one blog list', () => {
        const result = totalLikes(oneBlogList)

        expect(result).toBe(oneBlogList[0].likes)
    }) 

    test('many blogs list', () => {
        const result = totalLikes(manyBlogList)
        
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
    test('empty blog list', () => {
        const result = favoriteBlog(emptyBlogsList)

        expect(result).toEqual({
            title: '',
            author: '',
            likes: 0 
        })
    })

    test('one blog list', () => {
        const result = favoriteBlog(oneBlogList)

        expect(result).toEqual({
            title: 'Clean Code',
            author: 'Robert C. Martin',
            likes: 42
        })
    })

    test('many blogs list', () => {
        const result = favoriteBlog(manyBlogList)

        expect(result).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
        })
    })
})

describe('most blogs', () => {
    test('empty blog list', () => {
        const result = mostBlogs(emptyBlogsList)

        expect(result).toEqual({
            author: '',
            blogs: 0
        })
    })

    test('one blog list', () => {
        const result = mostBlogs(oneBlogList)

        expect(result).toEqual({
            author: 'Robert C. Martin',
            blogs: 1
        })
    })

    test('many blog list', () => {
        const result = mostBlogs(manyBlogList)

        expect(result).toEqual({
            author: 'Robert C. Martin',
            blogs: 3
        })
    })
})
