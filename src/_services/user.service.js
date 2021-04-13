import Axios from 'axios'

export function oldRegister (user) {
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

export function register (user) {
  return Axios({
    method: 'post',
    baseURL: `${process.env.API_URL}/users/users/`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      email: user.email,
      password: user.password,
      first_name: user.first_name,
      last_name: user.last_name,
      is_active: true,
      is_staff: false,
      is_superuser: false,
      profile: {
        role: 'D',
        title: 'Mr',
        dob: user.dateOfBorn,
        address: user.address,
        country: user.country,
        city: user.city,
        zip: user.zip
      }
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
