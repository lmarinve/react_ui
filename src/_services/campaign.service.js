import Axios from 'axios'

export function getUserAdfluenceCampaigns (token) {
    return Axios({
        method: 'get',
        baseURL: `${process.env.API_URL}/api/v1/adfluence-campaigns`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
    })
}

export function createAdfluenceCampaign (token, adfluenceCampaign) {
  return Axios({
      method: 'post',
      baseURL: `${process.env.API_URL}/api/v1/adfluence-campaign/add`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      data: JSON.stringify({
        name: adfluenceCampaign.name,
        client: adfluenceCampaign.clientId
      })
  })
}

export function updateAdfluenceCampaign (token, adfluenceCampaign) {
  return Axios({
      method: 'put',
      baseURL: `${process.env.API_URL}/api/v1/adfluence-campaign/${adfluenceCampaign.id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      data: JSON.stringify({
        name: adfluenceCampaign.name,
        client: adfluenceCampaign.clientId
      })
  })
}

export function removeAdfluenceCampaign (token, adfluenceCampaignId) {
  return Axios({
      method: 'delete',
      baseURL: `${process.env.API_URL}/api/v1/adfluence-campaign/${adfluenceCampaignId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
  })
}