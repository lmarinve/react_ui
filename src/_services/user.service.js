import Axios from 'axios'

export function register1 (user) {
  return Axios({
    method: 'post',
    baseURL: `${process.env.API_URL}/api/v1/rest-auth/registration/`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      username: user.email,
      email: user.email,
      password1: user.password,
      password2: user.confirmedPassword
    })
  })
}

export function register2 (user) {
  const newUser = {
    username: user.email,
    email: user.email,
    password: user.password,
    is_active: true,
    is_staff: false,
    is_superuser: false,
    first_name: user.first_name,
    last_name: user.last_name,
    role: 'D',
    address: user.address,
    city: user.city,
    state: user.state,
    zip: user.zip,
    country: user.country
  }

  return Axios({
    method: 'post',
    baseURL: `${process.env.API_URL}/users/users/`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(newUser)
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
    data: JSON.stringify({
      username: user.email,
      password: user.password
    })
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

export function getMyInfo (token) {
  return Axios({
    method: 'get',
    baseURL: `${process.env.API_URL}/api/v1/rest-auth/user/`,
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export function changeMyPassword (token, passwords) {
  return Axios({
    method: 'post',
    baseURL: `${process.env.API_URL}/users/auth/password/change/`,
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      new_password1: passwords.newPassword, 
      new_password2: passwords.confirmedPassword
    })
  })
}

export function getUsers (token) {
  return Axios({
    method: 'get',
    baseURL: `${process.env.API_URL}/users/users/`,
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export function createUser (token, user) {

}

export function getUser (token, user) {
  return Axios({
    method: 'get',
    baseURL: `${process.env.API_URL}/users/users/${user.pk}/`,
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export function editUser (token, user, ownUser) {
  return Axios({
    method: 'put',
    baseURL: ownUser ? `${process.env.API_URL}/users/users/${user.pk}/` : user.url,
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      username: user.email,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      is_active: user.is_active,
      is_staff: user.is_staff,
      is_superuser: user.is_superuser,
      role: 'D',
      address: user.address,
      city: user.city,
      state: user.state,
      zip: user.zip,
      country: user.country
    })
  })
}

export function removeUser (token, user) {
  return Axios({
    method: 'DELETE',
    baseURL: user.url,
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    },
  })
}

export function editCurrentUser (token, user) {
  return Axios({
    method: 'PUT',
    baseURL: `${process.env.API_URL}/users/auth/user`,
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      username: user.email,
      first_name: user.first_name,
      last_name: user.last_name
    })
  })
}
