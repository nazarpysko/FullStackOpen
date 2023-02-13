import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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