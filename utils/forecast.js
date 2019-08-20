const request = require('request'); 

module.exports = {
    forecast(latitude, longitude, callback){
        const url = "https://api.darksky.net/forecast/94c147c6b8e27f69af6273a051af3156/" + latitude +","+ longitude; 
        request({ url, json: true}, (lowLevelError, response, {daily, error, currently}) => {
            if(lowLevelError){
                callback('Unable to connect to Darksky', null); 
            }else if(error){
                callback('Darksky not working', null); 
            }else{
                callback(null, daily.data[0].summary + ' It is currently ' + currently.temperature + ' degrees out. ' + currently.precipProbability + '% chance of rain.')
            }
        })
    }
}