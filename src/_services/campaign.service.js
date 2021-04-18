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

export function getFacebookCampaigns (token) {
  return Axios({
    method: 'get',
    baseURL: `${process.env.API_URL}/api/v1/facebook-campaigns`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
})
}

export function getGoogleCampaigns (token) {
  return Axios({
    method: 'get',
    baseURL: `${process.env.API_URL}/api/v1/google-campaigns`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
})
}

export function createGoogleCampaign (token, googleCampaign) {
  return Axios({
    method: 'post',
    baseURL: `${process.env.API_URL}/api/v1/google-campaign/add`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    data: JSON.stringify({
      name: googleCampaign.name,
      start_date: googleCampaign.start_date,
      end_date: googleCampaign.end_date,
      ad_account_id: googleCampaign.ad_account_id,
      base_daily_budget: googleCampaign.base_daily_budget,
      copy_injection_template_tags:[],
      campaign: googleCampaign.adfluenceCampaignId
    })
})
}

export function updateGoogleCampaign (token, googleCampaign) {
  return Axios({
    method: 'put',
    baseURL: `${process.env.API_URL}/api/v1/google-campaign/${googleCampaign.id}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    data: JSON.stringify({
      name: googleCampaign.name,
      start_date: googleCampaign.start_date,
      end_date: googleCampaign.end_date,
      ad_account_id: googleCampaign.ad_account_id,
      base_daily_budget: googleCampaign.base_daily_budget,
      copy_injection_template_tags:[],
      campaign: googleCampaign.adfluenceCampaignId
    })
})
}

export function removeGoogleCampaign (token, googleCampaignId) {
  return Axios({
    method: 'delete',
    baseURL: `${process.env.API_URL}/api/v1/google-campaign/${googleCampaignId}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  })
}

export function createFacebookCampaign (token, facebookCampaign) {
  return Axios({
    method: 'post',
    baseURL: `${process.env.API_URL}/api/v1/facebook-campaign/add`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    data: JSON.stringify({
      name: facebookCampaign.name,
      start_date: facebookCampaign.start_date,
      end_date: facebookCampaign.end_date,
      ad_account_id: facebookCampaign.ad_account_id,
      base_daily_budget: facebookCampaign.base_daily_budget,
      copy_injection_template_tags:[],
      campaign: facebookCampaign.adfluenceCampaignId
    })
})
}

export function updateFacebookCampaign (token, facebookCampaign) {
  return Axios({
    method: 'put',
    baseURL: `${process.env.API_URL}/api/v1/facebook-campaign/${facebookCampaign.id}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    data: JSON.stringify({
      name: facebookCampaign.name,
      start_date: facebookCampaign.start_date,
      end_date: facebookCampaign.end_date,
      ad_account_id: facebookCampaign.ad_account_id,
      base_daily_budget: facebookCampaign.base_daily_budget,
      copy_injection_template_tags:[],
      campaign: facebookCampaign.adfluenceCampaignId
    })
})
}

export function removeFacebookCampaign (token, facebookCampaignId) {
  return Axios({
    method: 'delete',
    baseURL: `${process.env.API_URL}/api/v1/facebook-campaign/${facebookCampaignId}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  })
}