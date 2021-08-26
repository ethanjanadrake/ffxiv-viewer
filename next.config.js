module.exports = {
	reactStrictMode : true,
	images          : {
		domains : [
			'img2.finalfantasyxiv.com',
			'img.finalfantasyxiv.com',
			'xivapi.com',
			'static.wikia.nocookie.net',
			'wikia.nocookie.net',
			'nocookie.net'
		]
	},
	env             : {
		navHeight : '60px'
	},
	async redirects() {
		return [
			{
				source      : '/',
				destination : '/freecompany/9231112598714358365',
				permanent   : true
			}
		];
	}
};
