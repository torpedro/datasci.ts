/// <reference path="../typings/papaparse/papaparse.d.ts" />
import CoreColumnTable = require('../data/CoreColumnTable');
import vec = require('../data/VectorOperations');
import Papa = require('papaparse');

class Parser {
	private _options: PapaParse.ParseConfig;
	
	constructor(options?: PapaParse.ParseConfig) {
		if (!options) options = {};
		if (typeof options.header === 'undefined') options.header = true;
		this._options = options;
	}
	
	parseString(csvString: string): CoreColumnTable {
		var result = Papa.parse(csvString, this._options);
		
		var numRows = result.data.length;
		var fields: Array<string> = [];
		var types: Array<string> = [];
		var attrVectors: Array<Array<any>> = [];
		
		if (result.meta.fields) {			
			fields = result.meta.fields;
			
			// Create attribute vectors
			for (var c = 0; c < fields.length; ++c) {
				var vector = [];	
				for (var r = 0; r < numRows; ++r) {
					vector.push(result.data[r][fields[c]]);	
				}
				
				// Detect data-types of vectors and convert all values to their types
				var type = vec.detectDataType(vector, true, true);
				
				types.push(type);
				attrVectors.push(vector);
			}
		} else {
			// Find the number of columns needed for all rows
			var numColumns = 0;
			for (var r = 0; r < numRows; ++r) {
				numColumns = Math.max(numColumns, result.data[r].length);
			}
			
			// Initialize fields
			for (var c = 0; c < numColumns; ++c) {
				fields.push('Column ' + (c+1));
			}
			
			// Fill Attribute Vectors
			for (var c = 0; c < numColumns; ++c) {
				var vector = [];
				for (var r = 0; r < numRows; ++r) {
					vector.push(result.data[r][c]);
				}
				attrVectors.push(vector);
				types.push(vec.detectDataType(vector, true, true));
			}
		}
		
		
		// TODO: Allow interface to directly set attribute vectors
		var table = new CoreColumnTable(fields, types);
		table.reserve(numRows);
		for (var c = 0; c < fields.length; ++c) {
			for (var r = 0; r < numRows; ++r) {
				table.setValue(r, c, attrVectors[c][r]);
			}
		}
		return table;
	}
}



// module.export
export = Parser;