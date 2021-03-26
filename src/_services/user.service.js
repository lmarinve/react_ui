import Axios from 'axios'

export function register (user) {
  return Axios({
    method: 'post',
    baseURL: `${process.env.API_URL}/api/v1/rest-auth/registration/`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      username: user.username,
      email: user.email,
      password1: user.password,
      password2: user.confirmedPassword
    })
  })
}

export function getEmailAvailability (email) {
  return Axios({
    method: 'get',
    baseURL: `${process.env.API_URL}/${email}`,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function validateAccount (token) { 
  return Axios({
    method: 'post',
    baseURL: 'http://adfl.eba-mxzsvfqe.us-east-1.elasticbeanstalk.com/auth/registrarion/verify-email/',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      key: token
    }
  })
}

export function login (user) {
  return Axios({
    method: 'post',
    baseURL: `${process.env.API_URL}/api/v1/rest-auth/login/`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(user)
  })
}

export function unableUser (email, sendMessage) {
  return Axios({
    method: 'put',
    baseURL: `${process.env.API_URL}/login/${email}`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      is_active: false,
      send_message: sendMessage
    })
  })
}

export function getForgottenPassword (email) {
  return Axios({
    method: 'get',
    baseURL: `${process.env.API_URL}/login/forgot/${email}`,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getUsers (token) {
  return Axios({
    method: 'get',
    baseURL: `${process.env.API_URL}/user`,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}
