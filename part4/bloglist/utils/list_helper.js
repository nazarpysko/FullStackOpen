const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => total += blog.likes, 0) 
}

const favoriteBlog = (blogs) => {
    let favBlog = { 
        title: '',
        author: '',
        likes: 0 
    }

    blogs.forEach(blog => {
        if (blog.likes > favBlog.likes) {
            favBlog.title = blog.title
            favBlog.author = blog.author
            favBlog.likes = blog.likes
        }
    });

    return favBlog
}

const mostBlogs = (blogs) => {
    let authorsBlogsCount = {}

    blogs.forEach(blog => {
        if (blog.author in authorsBlogsCount) {
            authorsBlogsCount[blog.author] += 1
        } else {
            authorsBlogsCount[blog.author] = 1
        }
    })

    return Object.entries(authorsBlogsCount)
        .reduce((max, [author, blogs]) => (blogs > max.blogs ? {author: author, blogs: blogs} : max), {author: '', blogs: 0})
} 

export { dummy, totalLikes, favoriteBlog, mostBlogs }