import axios from "axios"
const baseUrl = "/api/users"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const clearToken = () => {
  token = null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

const updateLikedPosts = async (id, updatedUser) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(
    `${baseUrl}/likedPosts/${id}`,
    updatedUser,
    config
  )
  return response.data
}

const updateFollows = async (id, updatedUser) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(
    `${baseUrl}/follows/${id}`,
    updatedUser,
    config
  )
  return response.data
}

const updateFollowers = async (id, updatedUser) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(
    `${baseUrl}/followers/${id}`,
    updatedUser,
    config
  )
  return response.data
}

const deleteUser = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then((response) => response.data)
}

export default {
  getAll,
  create,
  updateLikedPosts,
  updateFollows,
  updateFollowers,
  setToken,
  clearToken,
  deleteUser,
}
