import { isSunday } from 'date-fns'
import apiString from './api-string'
import TokenManager from './token-manager'

const headers = {
  'Content-Type': 'application/json'
}

const _buildAuthHeaders = () => ({
  ...headers,
  Authorization: TokenManager.getToken()
})

const getPrices = async () => {
  const url = `${apiString}/price`
  const response = await fetch(url, {
    method: 'GET',
    headers: _buildAuthHeaders()
  })

  return response.json()
}

const getUsers = async () => {
  const url = `${apiString}/user/all`
  const response = await fetch(url, {
    method: 'GET',
    headers: _buildAuthHeaders()
  })
  return response.json()
}

const patchUser = async (body) => {
  const url = `${apiString}/user`
  const response = await fetch(url, {
    method: 'PATCH',
    headers: _buildAuthHeaders(),
    body
  })
  return response.json()
}

const postPrice = async (body) => {
  const action = isSunday(Date.now()) ? 'buy' : 'sell'
  const response = await fetch(`${apiString}/price/${action}`, {
    method: 'POST',
    headers: _buildAuthHeaders(),
    body
  })
  return response
}

const login = async (body) => {
  const response = await fetch(`${apiString}/auth/login`, {
    method: 'POST',
    headers,
    body
  })
  return response
}

const signUp = async (body) => {
  const response = await fetch(`${apiString}/user`, {
    method: 'POST',
    headers,
    body
  })
  return response
}

export { getPrices, getUsers, postPrice, login, signUp, patchUser }
