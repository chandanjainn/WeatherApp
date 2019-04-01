const request = require('request');

const getForecast = (geoCodeResponse, callback) => {
	const token = '53511e9a3600bf44737a6b00060cd77b';
	const url =
		'https://api.darksky.net/forecast/' +
		token +
		'/' +
		geoCodeResponse.latitude +
		',' +
		geoCodeResponse.longitude +
		'?units=si';

	//using JS shorthand syntax for url
	request({ url, json: true }, (error, response, body) => {
		if (error) {
			callback('Unable to connect to weather service', undefined);
		} else if (body.error) {
			callback(body.error, undefined);
		} else {
			callback(undefined, {
				summary: body.hourly.summary,
				temperature: body.currently.temperature
			});
		}
	});
};

module.exports = { getForecast };
