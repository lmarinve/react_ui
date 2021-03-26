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