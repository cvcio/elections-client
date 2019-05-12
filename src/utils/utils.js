import { truncate } from 'lodash';

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

export {
	filterSelector,
	ellipsis
};
