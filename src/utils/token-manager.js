import decode from 'jwt-decode'

const setToken = (token) => {
  window.localStorage.setItem('apiToken', token)
}

const getToken = () => window.localStorage.getItem('apiToken')

const getTokenPayload = () => {
  const token = getToken()
  return token && decode(token)
}

const isTokenValid = () => {
  const token = getTokenPayload()
  return Boolean(token && ((!token.exp) || (Date.now() / 1000 < token.exp)))
}

const removeToken = () => {
  window.localStorage.removeItem('apiToken')
}

export default {
  setToken,
  getToken,
  getTokenPayload,
  isTokenValid,
  removeToken
}
