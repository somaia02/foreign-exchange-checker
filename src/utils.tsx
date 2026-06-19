export function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message
	return `Something went wrong. ${String(error)}`;
}

export const flagNames = [
	'ae', 'ar', 'au', 'bd', 'bg', 'bh',
	'br', 'ca', 'ch', 'cl', 'cn', 'co',
	'cy', 'cz', 'dk', 'eg', 'eu', 'gb',
	'hk', 'hm', 'hn', 'hr', 'ht', 'hu',
	'id', 'in', 'is', 'jo', 'jp', 'ke',
	'kr', 'kw', 'lb', 'lc', 'lk', 'ma',
	'mx', 'my', 'ng', 'no', 'np', 'nz',
	'om', 'pe', 'ph', 'pk', 'pl', 'qa',
	'ro', 'ru', 'sa', 'se', 'sg', 'th',
	'tr', 'tw', 'ua', 'us', 'vn',	'za',
];