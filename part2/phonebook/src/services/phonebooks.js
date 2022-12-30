import axios from "axios";
const baseURL = 'http://localhost:3001/persons'

const getResponseData = (promise) => {
    return promise.then(response => response.data)
}

const getAll = () => {
    const promise = axios.get(baseURL)
    return getResponseData(promise)
}

const create = newPerson => {
    const promise = axios.post(baseURL, newPerson)
    return getResponseData(promise)
}

export default { getAll, create }