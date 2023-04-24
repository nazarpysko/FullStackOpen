const initialState = [];

const blogsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'NEW_BLOG':
            return [...state, action.newBlog];
        case 'SET_BLOGS':
            return action.blogs;
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