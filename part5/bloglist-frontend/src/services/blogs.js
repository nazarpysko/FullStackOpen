import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const setHeaders = () => {
  return { headers: { Authorization: token } }

}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const response = await axios.post(baseUrl, newBlog, setHeaders())
  return response.data
}

const remove = async blog => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, setHeaders())
  return response.data
}

const addLike = async blog => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, { likes: blog.likes + 1 }, setHeaders())
  return response.data
}

// eslint-disable-next-line
export default { setToken, getAll, create, remove, addLike }