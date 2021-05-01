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
    password1: user.password,
    password2: user.confirmedPassword,
    is_active: true,
    is_staff: false,
    is_superuser: false,
    first_name: user.first_name,
    last_name: user.last_name,
    profile: {
      role: 'D',
      title: 'Mr',
      dob: user.dateOfBorn,
      address: user.address,
      country: user.country,
      city: user.city,
      zip: user.zip,
      photo: ''
    }
  }

  return Axios({
    method: 'post',
    baseURL: `${process.env.API_URL}api/v1/rest-auth/registration/`,
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

export function editUser (token, user) {
  return Axios({
    method: 'put',
    baseURL: /*`${process.env.API_URL}/users/users/`*/user.url,
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      is_active: user.is_active,
      is_staff: user.is_staff,
      is_superuser: user.is_superuser,
      profile: {
        "role": "D",
        "title":"Mr",
        "dob":"2021-04-09",
        "address":"1221 sw 111 st",
        "country":"Usa",
        "city":"Miami",
        "zip":"33196"
      },
      password: 'P4j4rr4c0'
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
