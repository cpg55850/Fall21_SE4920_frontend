import axios from 'axios'

// const username = 'user'
// const password = 'password'

// const basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password)
// const config = { headers: { authorization: basicAuthHeader } }

export const getTodos = async (user) => {
  // console.log(basicAuthHeader)
  const res = await axios.get(`http://localhost:8080/users/${user}/todos`)

  return res.data
}

export const getTodo = async (user, id) => {
  const res = await axios.get(`http://localhost:8080/users/${user}/todos/${id}`)

  return res.data
}

export const deleteTodo = async (user, id) => {
  const res = await axios.delete(
    `http://localhost:8080/users/${user}/todos/${id}`
  )

  return res.data
}

export const updateTodo = async (user, id, todo) => {
  const res = await axios.put(
    `http://localhost:8080/users/${user}/todos/${id}`,
    todo
  )

  return res.data
}

export const createTodo = async (user, todo) => {
  const res = await axios.post(
    `http://localhost:8080/users/${user}/todos`,
    todo
  )

  return res.data
}
