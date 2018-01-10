// MergeSorter
//
// A wrap for using merge sort on a list
//
function MergeSorter() {
}

// init
//
// Initializes the MergeSorter
//
MergeSorter.prototype.init = function (list) {
	this.setList(list);

	this.onChangeFunctions = [];
	this.onFinishFunctions = [];
	this.onLayerSwapFunctions = [];
};

// setList
//
MergeSorter.prototype.setList = function (list) {
	if (Array.isArray(list) === false)
		throw new Error('Wrong argument for MergeSorter.init\n Array is required');

	this.currentLayer = list.map(item => [item]);
	this.nextLayer = [];
	this.nextLayerGroupSize = 2;

	/* Example layers
	this.currentLayer: 	[["e", "g"], ["f", "h"]]
	this.nextLayer: 	[["a", "c", "b", "d"]]
	this.nextLayerGroupSize: 4
	*/
}

// getNextComparisonItems
//
// Return the pair of items which will be compaired next
//
MergeSorter.prototype.getNextComparisonItems = function () {
	if (this.currentLayer.length >= 2)
		return [this.currentLayer[0][0], this.currentLayer[1][0]];
	else
		return false;
};

// setComparisonResult
//
// Set the result of the current comparison and proceed the sorting
//
// firstIsChosen is a boolean, indicating if the user choose the first or second item
MergeSorter.prototype.setComparisonResult = function (firstIsChosen) {
	if (typeof firstIsChosen !== 'boolean')
		throw new Error('Wrong argument for MergeSorter.setComparisonResult\n Boolean is required');

	// Add new group if current group (of the next layer) is full
	if (this.nextLayer.length === 0 || this.nextLayer[this.nextLayer.length - 1].length === this.nextLayerGroupSize)
		this.nextLayer.push(new Array());

	// Get chosen item
	const chosenItem = firstIsChosen ? this.currentLayer[0].shift() : this.currentLayer[1].shift();

	// Add the item to the last group of the next layer
	this.nextLayer[this.nextLayer.length - 1].push(chosenItem);

	// If one of the groups is empty, append all items of the other group to the next layer
	// Then remove both groups
	if (this.currentLayer[0].length === 0 ||
	   	this.currentLayer[1].length === 0) {
		const emptyLayer = this.currentLayer[0].length === 0 ? 0 : 1;
		const toEmpty = emptyLayer === 0 ? 1 : 0;
		for (let i = 0; i < this.currentLayer[toEmpty].length; i++)
			this.nextLayer[this.nextLayer.length - 1].push(this.currentLayer[toEmpty][i]);

		this.currentLayer.shift();
		this.currentLayer.shift();
	}
	if (this.currentLayer.length == 1)
		this.nextLayer.push(this.currentLayer.pop());

	// If the current layer is empty, move to the next layer
	if (this.currentLayer.length === 0)
		this.proceedWithNextLayer();

	this.triggerChange();
};

// proceedWithNextLayer
//
// Set current layer to next layer and change settings
//
MergeSorter.prototype.proceedWithNextLayer = function () {
	// Use slice to make a copy and not a reference
	this.currentLayer = this.nextLayer.slice(0);
	this.nextLayer = [];
	this.triggerLayerSwap();

	this.nextLayerGroupSize = this.nextLayerGroupSize * 2;


	if (this.currentLayer.length === 1)
		this.triggerFinish();
};


// Nice to have but not neccessary functions
//
//
// onChange
//
// Call the provided function whenever the list is changed
//
MergeSorter.prototype.onChange = function (callback) {
	this.onChangeFunctions.push(callback);
};

// onLayerSwap
//
// Call the provided function when the current layer is swapped with the next layer
//
MergeSorter.prototype.onLayerSwap = function (callback) {
	this.onLayerSwapFunctions.push(callback);
};

// onFinish
//
// Call the provided function when the sorting process has finished
//
MergeSorter.prototype.onFinish = function (callback) {
	this.onFinishFunctions.push(callback);
};

// triggerChange
//
// Call all stored callback functions which are bound via onChange
//
MergeSorter.prototype.triggerChange = function () {
	this.onChangeFunctions.forEach(callback => callback());
};
// triggerFinish
//
MergeSorter.prototype.triggerFinish = function () {
	this.onFinishFunctions.forEach(callback => callback(this.currentLayer[0]));
};
// triggerLayerSwap
//
MergeSorter.prototype.triggerLayerSwap = function () {
	this.onLayerSwapFunctions.forEach(callback => callback());
};
