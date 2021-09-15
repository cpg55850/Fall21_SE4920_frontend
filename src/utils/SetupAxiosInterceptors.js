import axios from 'axios'

// const username = 'user'
// const password = 'password'

// const basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password)
// const config = { headers: { authorization: basicAuthHeader } }

const SetupAxiosInterceptors = (basicAuthHeader) => {
  EjectAxiosInterceptors()

  console.log('interceptor code running: ', basicAuthHeader)

  axios.interceptors.request.use((req) => {
    console.log(`${req.method} ${req.url}`)
    // Important: request interceptors **must** return the request.
    return req
  })

  const myInterceptor = axios.interceptors.request.use((config) => {
    config.headers.authorization = basicAuthHeader
    return config
  })

  sessionStorage.setItem('interceptorID', myInterceptor)
}

const EjectAxiosInterceptors = () => {
  console.log('I wanna eject... :(')
  axios.interceptors.request.eject(sessionStorage.getItem('interceptorID'))
  sessionStorage.removeItem('interceptorID')
}

export { SetupAxiosInterceptors, EjectAxiosInterceptors }
