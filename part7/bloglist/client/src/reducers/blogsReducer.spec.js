import deepfreze from 'deep-freeze';
import blogsReducer from './blogsReducer';

describe('testing blogsReducer', () => {
    const initialState = [];

    test('should create a blog', () => {
        const action = {
            type: 'NEW_BLOG',
            newBlog: {
                title: 'This is a test title',
                author: 'Nazar Pysko',
                url: 'example.com'
            }
        }

        deepfreze(initialState);

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
                    url: 'example1.com'
                },
                {
                    title: 'Title example 2',
                    author: 'Nazar Pysko',
                    url: 'example2.com'
                },
                {
                    title: 'Title example 3',
                    author: 'Nazar Pysko',
                    url: 'example3.com'
                }
            ]
        }
        deepfreze(initialState);

        const newState = blogsReducer(initialState, action);
        expect(newState).toHaveLength(action.blogs.length);
        action.blogs.forEach(blog => expect(newState).toContain(blog));
    })
});