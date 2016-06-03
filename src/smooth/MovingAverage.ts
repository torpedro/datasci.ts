/**
 * @module ma
 */
module ma {
	export function SimpleMovingAverage(vector: number[], k: number): number[] {
		let result: number[] = [];

		// for first k-records use their partial average
		for (let i: number = 0; i < k && i < vector.length; ++i) {
			// calculate the partial average
			let sum: number = 0;
			for (let j: number = i; j >= 0; --j) {
				sum += vector[j];
			}
			result.push(sum / (i + 1));
		}

		// for the other records use the average of the k-1 past records
		for (let i: number = k; i < vector.length; ++i) {
			let sum: number = 0;
			for (let j: number = i; j > i - k; --j) {
				sum += vector[j];
			}
			result.push(sum / k);
		}

		return result;
	}


	// todo: Central Moving Average
	// todo: Cumulative Moving Average
}


// modules.export
export = ma;