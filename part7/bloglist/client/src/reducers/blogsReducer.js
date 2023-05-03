import blogService from '../services/blogs';

const initialState = [];

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.newBlog];
    case 'SET_BLOGS':
      return action.blogs;
    case 'LIKE_BLOG':
      return state.map(blog => (blog.id === action.blogId ? { ...blog, likes: blog.likes + 1 } : blog));
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.blogId);
    case 'COMMENT_BLOG':
      return state.map(blog => {
        return blog.id === action.payload.blogId
          ? { ...blog, comments: blog.comments.concat(action.payload.comment) }
          : blog;
      });
    default:
      return state;
  }
};

export const createBlog = newBlog => {
  return {
    type: 'NEW_BLOG',
    newBlog,
  };
};

export const setBlogs = blogs => {
  return {
    type: 'SET_BLOGS',
    blogs,
  };
};

export const commentBlog = (blogId, comment) => {
  return {
    type: 'COMMENT_BLOG',
    payload: {
      blogId,
      comment: [comment],
    },
  };
};

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export default blogsReducer;
