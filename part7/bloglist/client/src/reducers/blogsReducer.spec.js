import deepfreeze from 'deep-freeze';
import blogsReducer from './blogsReducer';

describe('testing blogsReducer', () => {
  const initialState = [];

  test('should create a blog', () => {
    const action = {
      type: 'NEW_BLOG',
      newBlog: {
        title: 'This is a test title',
        author: 'Nazar Pysko',
        url: 'example.com',
      },
    };

    deepfreeze(initialState);

    const newState = blogsReducer(initialState, action);
    expect(newState).toHaveLength(1);
    expect(newState[0]).toMatchObject(action.newBlog);
  });

  test('should set blogs', () => {
    const action = {
      type: 'SET_BLOGS',
      blogs: [
        {
          title: 'Title example 1',
          author: 'Nazar Pysko',
          url: 'example1.com',
        },
        {
          title: 'Title example 2',
          author: 'Nazar Pysko',
          url: 'example2.com',
        },
        {
          title: 'Title example 3',
          author: 'Nazar Pysko',
          url: 'example3.com',
        },
      ],
    };
    deepfreeze(initialState);

    const newState = blogsReducer(initialState, action);
    expect(newState).toHaveLength(action.blogs.length);
    action.blogs.forEach(blog => expect(newState).toContain(blog));
  });

  describe('with a not empty initialState', () => {
    const initialState = [
      {
        id: '1111',
        title: 'Title example 1',
        author: 'Nazar Pysko',
        url: 'example1.com',
        likes: 6
      },
      {
        id: '1112',
        title: 'Title example 2',
        author: 'Nazar Pysko',
        url: 'example2.com',
        likes: 2
      },
      {
        id: '1113',
        title: 'Title example 3',
        author: 'Nazar Pysko',
        url: 'example3.com',
        likes: 0
      },
    ];

    test('should give a like if a valid id is given', () => {
      const blogToLike = initialState[0];
      const action = {
        type: 'LIKE_BLOG',
        blogId: blogToLike.id
      }
      deepfreeze(initialState);

      const newState = blogsReducer(initialState, action);
      const newBlogState = newState.find(blog => blog.id === blogToLike.id);
      expect(newBlogState.likes).toBe(blogToLike.likes + 1);
    });

    test('should not like if a not valid id is given', () => {
      const action = {
        type: 'LIKE_BLOG',
        blogId: '0'
      }

      deepfreeze(initialState);
      const newState = blogsReducer(initialState, action);
      initialState.forEach(blog => expect(newState).toContain(blog));
    })

    test('should delete a blog if a valid id is given', () => {
      const action = {
        type: 'DELETE_BLOG',
        blogId: initialState[0].id
      }

      deepfreeze(initialState);
      const newState = blogsReducer(initialState, action);
      expect(newState).toHaveLength(initialState.length - 1);
    })
  });
});
