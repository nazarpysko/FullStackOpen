import Blog from "../models/blog";

const initialBlogs = [
    {
        title: 'Yo, Robot',
        author: 'Isaac Asimov',
        url: 'https://www.goodreads.com/book/show/34910695-yo-robot?from_search=true&from_srp=true&qid=ObroBcLBNb&rank=1',
        likes: 13
    },
    {
        title: 'Clean Code',
        author: 'Robert C. Martin',
        url: 'https://www.goodreads.com/book/show/3735293-clean-code?from_search=true&from_srp=true&qid=iEN2WA9FLD&rank=1',
        likes: 24
    },
]

const nonExistingId = async () => {
    const blog = new Blog({ 
        title: 'test',
        author: 'test',
        url: 'test',
        likes: 0
    })

    await blog.save()
    await blog.remove()

    return blog.id
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

export { initialBlogs, nonExistingId, blogsInDb }