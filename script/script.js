/* Global Variables */
let beginDate; //date to begin the simulation (note: included). initialPrice is the price on this date
let endDate; //date to end the simulation (note: included)
let startingPrice; //initial price (price on beginDate)
let monthlyVolatility; // standard deviation of monthly price change (%)
let meanPriceChange; //monthly average price change (%)
let priceFloor; //minimum price (price will not fall below this)
let priceCeiling; //maximum price (price will not rise above this)

//object to hold the data for the trial
let data = {}; 

const NUM_TRIALS = 10; //number of trials to run

function getParameters() {
	beginDate = document.getElementById('beginDate').value;
	endDate = document.getElementById('endDate').value;
	startingPrice = Number(document.getElementById('startingPrice').value);
	monthlyVolatility = Number(document.getElementById("monthlyVolatility").value) / 100;
	meanPriceChange = Number(document.getElementById('meanPriceChange').value) / 100
	priceFloor = Number(document.getElementById('priceFloor').value)
	priceCeiling = Number(document.getElementById('priceCeiling').value)

	console.log(`beginDate: ${beginDate}
	endDate: ${endDate}
	startingPrice: ${startingPrice}
	monthlyVolatility: ${monthlyVolatility}
	meanPriceChange: ${meanPriceChange}
	priceFloor: ${priceFloor}
	priceCeiling: ${priceCeiling}`
	);
}

function generateGaussianValue(mu, sigma) {
	/* Use the Box-Muller transform to generate the values
	 * (https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve)
	 * mu: mean
	 * sigma: variance
	 */

	let u = 0, v = 0;
	while (u === 0) u = Math.random();
	while (v === 0) v = Math.random();

	//Gaussan with mu = 0, sigma = 1
	let g =  Math.sqrt(-2 * Math.log(u)) * Math.cos( 2.0 * Math.PI * v);
	
	//if g is N(0,1), then mu + sigma * g is N(mu, sigma)
	return g * sigma + mu;
}


/**
 * Closure to create a function which finds the next price
 */
function generateNextPrice(mu, sigma) {
	return function(price) {
		return (1 + generateGaussianValue(mu, sigma)) * price;
	}
}
/**
 * Gets the next price for one varying under a normal distribution
 * @param {number} price - The current price
 * @param {number} mu - The mean of the distribution
 * @param {number} sigma - The standard deviation of the distribution
 */
function nextPrice(price, mu, sigma) {
	//generate the percent by which the price should be multiplied from the normal distribution, then multiply by the current price
	return (1 + generateGaussianValue(mu, sigma)) * price;
}


function generateResults() {
	getParameters();

	let trials = new Array(NUM_TRIALS).fill(startingPrice || 0);
	console.log(`initial trials: ${trials}`);
	for (let i = 0; i < 10; i++) {
		trials = trials.map(generateNextPrice(meanPriceChange, monthlyVolatility));
		console.log(`Trial ${i}: ${trials}`);
	}

}


window.onload = () => {
	document.getElementById('generate').addEventListener('click', generateResults);
};
