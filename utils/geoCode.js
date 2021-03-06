const request = require('request');

function getGeoURL(input) {
	const token = 'Your MapBox token here';
	const geoCodeURL =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		encodeURIComponent(input) +
		'.json?access_token=' +
		token +
		'&limit=1';
	return geoCodeURL;
}

const getCoordinates = (userInput, callback) => {
	const geoCodeURL = getGeoURL(userInput);
	request({ url: geoCodeURL, json: true }, (error, response, body) => {
		if (error) {
			callback('Unable to connect to geo Code service', undefined);
		} else if (body.message) {
			callback(body.message, undefined);
		} else if (body.features.length === 0) {
			callback('Unable to find location. Try some another location', undefined);
		} else {
			const longitude = body.features[0].center[0];
			const latitude = body.features[0].center[1];
			const location = body.features[0].place_name;
			callback(undefined, { longitude, latitude, location });
		}
	});
};

module.exports = { getCoordinates };
