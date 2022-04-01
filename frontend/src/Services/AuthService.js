const API_URL = 'http://localhost:4000/api/users/'

const AuthService = {
  register : user => {
    return fetch(API_URL, {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('user', JSON.stringify(data))

      return data
    })
  },

  login : user => {
    return fetch(API_URL + 'login', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('user', JSON.stringify(data))

      return data
    })
  },

  logout : () => {
    localStorage.removeItem('user')
  }

}

export default AuthService