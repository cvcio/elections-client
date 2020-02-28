const getRole = (profile) => {
	if (!profile || !profile.roles) return 100;

	if (profile.roles.includes('ADMIN')) {
		return 0;
	} else if (profile.roles.includes('ORGADMIN')) {
		return 10;
	} else if (profile.roles.includes('POWERUSER')) {
		return 20;
	} else if (profile.roles.includes('USER')) {
		return 30;
	} else {
		return 100;
	}
};

const getFavicon = (url) => {
	return `https://www.google.com/s2/favicons?domain=${url}`;
};

const getIcon = (t) => {
	switch (t) {
	case 'article':
		return 'mdi-file-document-outline';
	case 'author':
		return ' mdi-fountain-pen-tip';
	case 'entity':
		return 'mdi-tag-text';
	case 'feed':
		return 'mdi-web';
	default:
		return 'mdi-file-document-outline';
	}
};

const getColor = (t) => {
	switch (t) {
	case 'article':
		return '#1524D9';
	case 'author':
		return '#00b0ff';
	case 'entity':
		return '#757575';
	case 'feed':
		return '#ff1744';
	default:
		return '#ccc';
	}
};

export {
	getRole,
	getFavicon,
	getIcon,
	getColor
};
