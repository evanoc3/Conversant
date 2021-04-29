/**
 * Returns the difference in time between the provided date and now as a readable time duration, i.e. "4 years". Only shows the highest time unit that 
 * fits evenly into the time difference, so if the difference was "4 years and 3 months", then only "4 years" will be displayed.
 */
export function timeSince(then: Date): string {
	const diff = Math.round((new Date().getTime() - then.getTime()) / 1000);
	let timeUnits = 1;
	let diffStr = "moments";

	const units: {[key: string]: number} = {
		"second": 1,
		"minute": 60,
		"hour": 	60 * 60,
		"day": 		60 * 60 * 24,
		"week": 	60 * 60 * 24 * 7,
		"month": 	60 * 60 * 24 * 30,
		"year": 	60 * 60 * 24 * 365
	}

	for(const unit in units) {
		if(units[unit] > diff) {
			break;
		}
		
		timeUnits = Math.round(diff / units[unit]);
		diffStr = `${timeUnits} ${unit}${(timeUnits > 1) ? "s" : ""}`;
	}

	return diffStr;
} 