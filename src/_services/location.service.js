import axios from 'axios'

export const getLocations = (token) => {
    return axios ({
        method: 'get',
        baseURL: `${process.env.API_URL}/api/v1/locations`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
}

export const createLocation = (token, location) => {
    return axios({
        method:'post',
        baseURL: `${process.env.API_URL}/api/v1/location/add`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        data: JSON.stringify({
            city: location.city,
            country: location.country
        })
    })
} 
