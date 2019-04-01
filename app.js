const readline = require('readline');
const chalk = require('chalk');
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question('Enter the name of the place- ', input => {
	geoCode.getCoordinates(input, (geoCodeError, geoCodeResponse) => {
		if (geoCodeError) {
			console.log(chalk.red.inverse(geoCodeError));
			process.exit();
		}
		console.log(
			chalk.blue.inverse('Longitude=') + chalk.yellow(geoCodeResponse.longitude)
		);
		console.log(
			chalk.blue.inverse('Latitude= ') + chalk.yellow(geoCodeResponse.latitude)
		);
		console.log(
			chalk.blue.inverse('Location= ') + chalk.yellow(geoCodeResponse.location)
		);
		forecast.getForecast(
			geoCodeResponse,
			//using JS destructured syntax for forecastResponse
			(forecastError, { summary, temperature } = {}) => {
				if (forecastError) {
					console.log(chalk.red.inverse(forecastError));
					process.exit();
				}
				console.log(
					chalk.blue.inverse('Weather Forecast:-') +
						chalk.yellow('It will be ') +
						chalk.green(summary) +
						chalk.yellow('It is ') +
						chalk.green(temperature + ' C ') +
						chalk.yellow('out there.')
				);
			}
		);
	});
	rl.close();
});
