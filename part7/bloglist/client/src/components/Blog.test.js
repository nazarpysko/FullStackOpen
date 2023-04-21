import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('Displays basic info about blog', () => {
  const blog = {
    title: 'The Go libraries that never failed us: 22 libraries you need to know',
    author: 'Robert Laszczak',
    url: 'https://threedots.tech/post/list-of-recommended-libraries/',
    likes: 42,
    user: {
      username: 'eduardo'
    }
  }

  const user = {
    username: 'a'
  }

  const { container } = render(<Blog blog={blog} user={user}/>)
  const renderedBlog = container.querySelector('.blog')
  expect(renderedBlog).toHaveTextContent(blog.title)
  expect(renderedBlog).toHaveTextContent(blog.author)

  const blogInfo = container.querySelector('.info')
  expect(blogInfo).toHaveStyle('display: none')
})

test('Blog\'s URL and number of likes are shown when view button is clicked', async () => {
  const blog = {
    title: 'The Go libraries that never failed us: 22 libraries you need to know',
    author: 'Robert Laszczak',
    url: 'https://threedots.tech/post/list-of-recommended-libraries/',
    likes: 42,
    user: {
      username: 'eduardo'
    }
  }

  const user = {
    username: 'a'
  }

  const userInteraction = userEvent.setup()
  const { container } = render(<Blog blog={blog} user={user}/>)
  const viewButton = screen.getByText('view')
  await userInteraction.click(viewButton)

  const info = container.querySelector('.info')
  expect(info).toHaveStyle('display: block')
  const buttonLabel = screen.getByText('hide')
  expect(buttonLabel).toBeDefined()
})

test('If the like button is clicked twice, the event handler the component received as props is called twice.', async () => {
  const blog = {
    title: 'The Go libraries that never failed us: 22 libraries you need to know',
    author: 'Robert Laszczak',
    url: 'https://threedots.tech/post/list-of-recommended-libraries/',
    likes: 42,
    user: {
      username: 'eduardo'
    }
  }

  const user = {
    username: 'a'
  }

  const mockHandler = jest.fn()

  const userInteraction = userEvent.setup()
  const { container } = render(<Blog blog={blog} user={user} updateLikes={mockHandler}/>)
  const likeButton = container.querySelector('.like')
  await userInteraction.dblClick(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('The form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const newBlog = {
    title: 'The Go libraries that never failed us: 22 libraries you need to know',
    author: 'Robert Laszczak',
    url: 'https://threedots.tech/post/list-of-recommended-libraries/',
  }

  const createBlogMock = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlogMock} />)

  const titleInput = container.querySelector('#blog-title-input')
  const authorInput = container.querySelector('#blog-author-input')
  const urlInput = container.querySelector('#blog-url-input')
  const createButton = screen.getByText('create')

  await user.type(titleInput, newBlog.title)
  await user.type(authorInput, newBlog.author)
  await user.type(urlInput, newBlog.url)
  await user.click(createButton)

  expect(createBlogMock.mock.calls[0][0].title).toBe(newBlog.title)
  expect(createBlogMock.mock.calls[0][0].author).toBe(newBlog.author)
  expect(createBlogMock.mock.calls[0][0].url).toBe(newBlog.url)
})