import Axios from 'axios'

export function getUserClients (token) {
    return Axios({
        method: 'get',
        baseURL: `${process.env.API_URL}/api/v1/clients`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
    })
}

export function createUserClient (token, client) {
  return Axios({
      method: 'post',
      baseURL: `${process.env.API_URL}/api/v1/client/add`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      data: JSON.stringify({ name: client.name, agency: client.agencyId })
  })
}

export function updateUserClient (token, client) {
  return Axios({
      method: 'put',
      baseURL: `${process.env.API_URL}/api/v1/client/${client.id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      data: JSON.stringify({ name: client.name, agency: { name: client.agencyName } })
  })
}

export function removeUserClient (token, clientId) {
  return Axios({
      method: 'delete',
      baseURL: `${process.env.API_URL}/api/v1/client/${clientId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
  })
}