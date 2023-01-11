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

export { dummy, totalLikes, favoriteBlog }