import Axios from 'axios'

export function getUserAgencies (token) {
    return Axios({
        method: 'get',
        baseURL: `${process.env.API_URL}/api/v1/agencies`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
    })
}

export function createUserAgency (token, newAgency) {
  return Axios({
      method: 'post',
      baseURL: `${process.env.API_URL}/api/v1/agency/add`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      data: JSON.stringify({ name: newAgency.name })
  })
}

export function updateUserAgency (token, agency) {
  return Axios({
      method: 'put',
      baseURL: `${process.env.API_URL}/api/v1/agency/${agency.id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      data: JSON.stringify({ name: agency.name })
  })
}

export function removeUserAgency (token, agencyId) {
  return Axios({
      method: 'delete',
      baseURL: `${process.env.API_URL}/api/v1/agency/${agencyId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
  })
}

