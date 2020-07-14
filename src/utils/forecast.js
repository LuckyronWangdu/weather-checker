const request = require('postman-request')



const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=34a7df0f566591180b55f34ca81ed028&query=' + latitude + ',' + longitude
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather sevices!', undefined)
        } else if (body.error) {
            callback('Location not found!', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' conditons. Temperatue is ' + body.current.temperature + ' but it feels like it is ' + body.current.feelslike + ' outside')
        }
    })
}




module.exports = forecast