const TokenKey = 'exam_ning_token'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function getBracketStr(text) {
  const result = []
  if (text === null) {
    return result
  }
  const regex = /\{{(.+?)\}}/g
  const options = text.match(regex)
  for (let i = 0; i < options.length; i++) {
    if (options[i]) {
      const option = options[i]
      if (option) {
        const tempStr = option.substring(2, option.length - 2)
        result.push(tempStr)
      }
    }
  }
  return result
}
