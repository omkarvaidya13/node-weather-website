const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/14c0789714762e538e094aab30d177b4/'+ latitude+','+ longitude

    request({ url: url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service.', undefined)
        }else if(body.error){
            callback(body.error, undefined)
        }else{
            callback(undefined, body.daily.data[0].summary +' It is currently '+ body.currently.temperature +' degrees out. The high today is '+body.daily.data[0].temperatureHigh +' degrees with a low of '+body.daily.data[0].temperatureLow +' degrees. There is a '+ body.currently.precipProbability +'% chance of rain.')
        }
    })
}

module.exports = forecast