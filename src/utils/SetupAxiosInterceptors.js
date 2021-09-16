import axios from 'axios'

// const username = 'user'
// const password = 'password'

// const basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password)
// const config = { headers: { authorization: basicAuthHeader } }

const createJWTToken = (token) => {
  return 'Bearer ' + token
}

const SetupAxiosInterceptors = (token) => {
  EjectAxiosInterceptors()

  console.log('interceptor code running: ', token)

  // Log each request in the console
  axios.interceptors.request.use((req) => {
    console.log(`${req.method} ${req.url}`)
    // Important: request interceptors **must** return the request.
    return req
  })

  // Create an interceptor to add authentication in every request
  const myInterceptor = axios.interceptors.request.use((config) => {
    config.headers.authorization = createJWTToken(token)
    return config
  })

  // Store the interceptor ID in session storage
  sessionStorage.setItem('interceptorID', myInterceptor)
}

const EjectAxiosInterceptors = () => {
  console.log('I wanna eject... :(')
  axios.interceptors.request.eject(sessionStorage.getItem('interceptorID'))
  sessionStorage.removeItem('interceptorID')
}

export { SetupAxiosInterceptors, EjectAxiosInterceptors }
