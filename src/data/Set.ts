/// <reference path="interfaces/SetInterface.ts" />
/**
 * @class Set
 * 
 * Keeps values in the order they are inserted (Important!)
 * ES6 has a native Set object. Probably replace this Set with that. 
 * 
 * TODO: Allow option to set deep-equal
 */
class Set implements SetInterface {
	_isSet_ = true;
	protected _data: Array<any>;
	
	constructor();
	constructor(set: SetInterface);
	constructor(data: Array<any>);
	constructor(data?: any) {
		// Initialize empty
		this._data = [];
		
		if (data instanceof Array) {
			for (var i = 0; i < data.length; ++i) {
				this.add(data[i]);
			}
		} else if (data && data._isSet_) {
			// This is a set
			var set = <SetInterface>data;
			for (var i = 0; i < set.size(); ++i) {
				this.add(set.get(i));
			}
		}
	}
	
	add(val: any) {
		if (this._data.indexOf(val) == -1) {
			this._data.push(val);
		}
	}
	
	clear() {
		this._data = [];
	}
	
	contains(val: any) {
		return this._data.indexOf(val) >= 0;
	}
	
	difference(other: SetInterface): Set {
		var set = new Set(this);
		for (var i = 0; i < other.size(); ++i) {
			set.remove(other.get(i));
		}
		return set;
	}
	
	get() : Array<any>;
	get(index: number): any;
	get(index?: number): any {
		if (typeof index === 'undefined') {
			return this._data;
		} else {
			return this._data[index];
		}
	}
	
	indexOf(val: any): number {
		return this._data.indexOf(val);	
	}
	
	intersection(other: SetInterface): Set {
		var set = new Set();
		for (var i = 0; i < this.size(); ++i) {
			if (other.contains(this._data[i])) {
				set.add(this._data[i]);
			}
		}
		return set;
	}
	
	
	isDisjoint(other: SetInterface): boolean {
		for (var i = 0; i < this.size(); ++i) {
			if (other.contains(this._data[i])) {
				return false;
			}
		}
		return true;
	}
	
	
	isEqual(other: SetInterface): boolean {
		return this.isSubset(other) && this.isSuperset(other);
	}
	
	
	isSubset(other: SetInterface): boolean {
		for (var i = 0; i < this.size(); ++i) {
			if (!other.contains(this._data[i])) {
				return false;
			}
		}
		return true;
	}
	
	
	isSuperset(other: SetInterface): boolean {
		return other.isSubset(this);
	}
	
	pop(): any {
		if (this.size() > 0) {
			var elem = this._data[0];
			this.remove(elem);
			return elem;
		}
	}
	
	remove(val: any) {
		var index = this.indexOf(val);
		if (index >= 0) {
			this._data.splice(index, 1);
		}
	}
	
	
	size() {
		return this._data.length;
	}
	
	
	union(other: SetInterface): Set {
		var set = new Set(this);
		for (var i = 0; i < other.size(); ++i) {
			set.add(other.get(i));
		}
		return set;
	}
}



// modules.export
export = Set;