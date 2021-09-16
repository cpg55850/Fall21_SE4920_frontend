import axios from 'axios'

export const jwtAuthenticate = async (username, password) => {
  const res = await axios.post(`http://localhost:8080/authenticate`, {
    username,
    password,
  })

  return res
}
