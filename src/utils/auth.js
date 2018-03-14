import Cookies from 'js-cookie'

const UsernameKey = process.env.AUTH_USERNAME_KEY // api的username_key
const TokenKey = process.env.AUTH_TOKEN_KEY // api的token_key

export function getUserToken() {
  return { username: Cookies.get(UsernameKey), token: Cookies.get(TokenKey) }
}

export function setUserToken(username, token) {
  return {
    username: Cookies.set(UsernameKey, username),
    token: Cookies.set(TokenKey, token)
  }
}

export function removeUserToken() {
  return {
    username: Cookies.remove(UsernameKey),
    token: Cookies.remove(TokenKey)
  }
}
