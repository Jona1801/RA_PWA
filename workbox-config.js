module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{js,css,jpg,png,html,json}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'sw.js'
};