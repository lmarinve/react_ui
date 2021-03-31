export * from './user.service'
export * from './agency.service'
export * from './client.service'
export * from './campaign.service'

function randomNumber (minimo, maximo) {
    return Math.round(Math.random() * (maximo - minimo) + minimo)
}

export const request = (dispatch = () => ({})) => {
    return new Promise ((resolve, reject) => {
        const responseType = Number(`${randomNumber(0, 5)}000`)
        const responseLatency = Number(`${randomNumber(0, 5)}000`)
        return setTimeout(() => {
            // if (responseType === 0) 
            //     return reject('something went wrong')

            const response = dispatch()
            return resolve(response)
        }, responseLatency)
    })
}