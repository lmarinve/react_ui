import axios from "axios"

export const getFlightRules = (token) => {
    return axios({
        method: 'get',
        baseURL: `${process.env.API_URL}/api/v1/flight-rules`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
    })
}

export const getWeatherRules = (token) => {
    return axios({
        method: 'get',
        baseURL: `${process.env.API_URL}/api/v1/weather-rules`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
    })
}

export const createFlightRule = (token, flightRule) => {
    return axios({
        method: 'post',
        baseURL: `${process.env.API_URL}/api/v1/flight-rule/add`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        data: JSON.stringify({
            name: flightRule.name,
            priority: flightRule.priority,
            connector: flightRule.connector,
            low_price: flightRule.low_price,
            logic: flightRule.logic,
            high_price: flightRule.high_price,
            modifier_action: flightRule.modifier_action,
            percentage_change: flightRule.percentage_change,
            campaign: flightRule.adfluenceCampaignId
        })
    })
}

export const updateFlightRule = (token, flightRule) => {
    return axios({
        method: 'put',
        baseURL: `${process.env.API_URL}/api/v1/flight-rule/${flightRule.id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        data: JSON.stringify({
            name: flightRule.name,
            priority: flightRule.priority,
            connector: flightRule.connector,
            low_price: flightRule.low_price,
            logic: flightRule.logic,
            high_price: flightRule.high_price,
            modifier_action: flightRule.modifier_action,
            percentage_change: flightRule.percentage_change,
            campaign: flightRule.adfluenceCampaignId
        })
    })
}

export const removeFlightRule = (token, flightRuleId) => {
    return axios({
        method: 'delete',
        baseURL: `${process.env.API_URL}/api/v1/flight-rule/${flightRuleId}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    }) 
}

export const createWeatherRule = (token, weatherRule) => {
    return axios({
        method: 'post',
        baseURL: `${process.env.API_URL}/api/v1/weather-rule/add`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        data: JSON.stringify({
            name: weatherRule.name,
            priority: weatherRule.priority,
            connector: weatherRule.connector,
            when: weatherRule.when,
            days: weatherRule.days,
            weather_trigger: weatherRule.weather_trigger,
            low_parameter: weatherRule.low_parameter,
            logic: weatherRule.logic,
            high_parameter: weatherRule.high_parameter,
            modifier_action: weatherRule.modifier_action,
            percentage_change: weatherRule.percentage_change,
            campaign: weatherRule.adfluenceCampaignId
        })
    })
}

export const updateWeatherRule = (token, weatherRule) => {
    return axios({
        method: 'put',
        baseURL: `${process.env.API_URL}/api/v1/weather-rule/${weatherRule.id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        data: JSON.stringify({
            name: weatherRule.name,
            priority: weatherRule.priority,
            connector: weatherRule.connector,
            when: weatherRule.when,
            days: weatherRule.days,
            weather_trigger: weatherRule.weather_trigger,
            low_parameter: weatherRule.low_parameter,
            logic: weatherRule.logic,
            high_parameter: weatherRule.high_parameter,
            modifier_action: weatherRule.modifier_action,
            percentage_change: weatherRule.percentage_change,
            campaign: weatherRule.adfluenceCampaignId
        })
    })
}

export const removeWeatherRule = (token, weatherRuleId) => {
    return axios({
        method: 'delete',
        baseURL: `${process.env.API_URL}/api/v1/weather-rule/${weatherRuleId}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
}
 
export const getFlights = (token) => {
    return axios({
        method: 'get',
        baseURL: `${process.env.API_URL}/api/v1/flights`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
}

export const createFlight = (token, flight) => {
    return axios({
        method: 'post',
        baseURL: `${process.env.API_URL}/api/v1/flight/add`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        data: JSON.stringify({
            name: flight.name,
            origin: flight.origin,
            destination: flight.destination,
            campaign: flight.adfluenceCampaignId
        })
    })
}

export const updateFlight = (token, flight) => {
    return axios({
        method: 'put',
        baseURL: `${process.env.API_URL}/api/v1/flight/${flight.id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        data: JSON.stringify({
            name: flight.name,
            origin: flight.origin,
            destination: flight.destination,
            campaign: flight.adfluenceCampaignId
        })
    })
}

export const removeFlight = (token, flightId) => {
    return axios({
        method: 'delete',
        baseURL: `${process.env.API_URL}/api/v1/flight/${flightId}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
}

export const getWeather = (token) => {
    return axios({
        method: 'get',
        baseURL: `${process.env.API_URL}/api/v1/weather-list`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
}

export const createWeather = (token, weather) => {
    return axios({
        method: 'post',
        baseURL: `${process.env.API_URL}/api/v1/weather/add`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        data: JSON.stringify({
            city: 1,
            campaign: weather.adfluenceCampaignId
        })
    })
}

export const updateWeather = (token, weather) => {
    return axios({
        method: 'put',
        baseURL: `${process.env.API_URL}/api/v1/weather/${weather.id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        data: JSON.stringify({
            city: 1,
            campaign: weather.adfluenceCampaignId
        })
    })
}

export const removeWeather = (token, weatherId) => {
    return axios({
        method: 'delete',
        baseURL: `${process.env.API_URL}/api/v1/weather/${weatherId}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
    })
}