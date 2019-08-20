const request = require('request'); 

module.exports = {
    geocode(address, callback) {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWxhbGFsZXhleGV4IiwiYSI6ImNqemJyZGhoczAxd3ozbXBtdWxta2VicG0ifQ.kT2duIVB4ab7GtxEHPQl1w&limit=1'; 
    
        request({url, json: true}, (err, response, body) => {
            if(err){
                callback(err);  
            }
            else if(body.features.length == 0){
                callback('No location found. Try again.');
            } 
            else {
                callback(null, {
                    latitude: body.features[0].center[1], 
                    longitude: body.features[0].center[0], 
                    location: body.features[0].place_name
                });
            }
        })
    } 
}; 