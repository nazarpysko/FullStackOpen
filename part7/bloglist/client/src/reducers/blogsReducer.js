const initialState = [];

const blogsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'NEW_BLOG':
            return [...state, action.newBlog];
        case 'SET_BLOGS':
            return action.blogs;
        case 'LIKE_BLOG':
            return state.map(blog => blog.id === action.blogId ? { ...blog, likes: blog.likes + 1 } : blog);
        case 'DELETE_BLOG':
            return state.filter(blog => blog.id !== action.blogId);
        default:
            return state;
    }
}

export const createBlog = newBlog => {
    return {
        type: 'NEW_BLOG',
        newBlog
    }
}

export const setBlogs = blogs => {
    return {
      type: 'SET_BLOGS',
      blogs,
    };
}

export default blogsReducer;