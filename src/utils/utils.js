import {
	truncate
} from 'lodash';

const filterSelector = (item, queryText, itemText) => {
	const hasValue = val => val != null ? val : '';
	const text = hasValue(item.name);
	const query = hasValue(queryText);
	return text.toString()
		.toLowerCase()
		.indexOf(query.toString().toLowerCase()) > -1;
};

const ellipsis = (value, l = 120) => {
	if (!value) return '';
	if (value.length < l) return value;
	return truncate(value, {
		'omission': ' [...] ',
		'length': (l / 2)
	}) + value.substring(value.length - (l / 2), value.length);
};

// Credit David Walsh (https://davidwalsh.name/javascript-debounce-function)

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce (func, wait, immediate) {
	var timeout;

	// This is the function that is actually executed when
	// the DOM event is triggered.
	return function executedFunction () {
		// Store the context of this and any
		// parameters passed to executedFunction
		var context = this;
		var args = arguments;

		// The function to be called after
		// the debounce time has elapsed
		var later = function () {
			// null timeout to indicate the debounce ended
			timeout = null;

			// Call function now if you did not on the leading end
			if (!immediate) func.apply(context, args);
		};

		// Determine if you should call the function
		// on the leading or trail end
		var callNow = immediate && !timeout;

		// This will reset the waiting every function execution.
		// This is the step that prevents the function from
		// being executed because it will never reach the
		// inside of the previous setTimeout
		clearTimeout(timeout);

		// Restart the debounce waiting period.
		// setTimeout returns a truthy value (it differs in web vs node)
		timeout = setTimeout(later, wait);

		// Call immediately if you're dong a leading
		// end execution
		if (callNow) func.apply(context, args);
	};
};

const nodeColor = (t) => {
	switch (t) {
	case 'INFLUENCER':
		return '#76ff03';
	case 'ACTIVE':
		return '#00b0ff';
	case 'AMPLIFIER':
		return '#ff1744';
	case 'OTHER':
	case 'UNKNOWN':
		return '#757575';
	case 'NEW':
		return '#ffd600';
	default:
		return '#00b0ff';
	}
};

const linkColor = (t) => {
	switch (t.toLowerCase()) {
	case 'tweet':
	case 'tweets':
		return '#00b0ff';
	case 'retweet':
	case 'retweets':
		return '#76ff03';
	case 'quote':
	case 'quotes':
		return '#F4511E';
	case 'reply':
	case 'replies':
		return '#cccccc';
	default:
		return '#cccccc';
	}
};

const thousands = (num) => {
	return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'K' : Math.sign(num) * Math.abs(num);
};

export {
	filterSelector,
	ellipsis,
	debounce,
	nodeColor,
	linkColor,
	thousands
};
