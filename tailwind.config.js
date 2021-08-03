module.exports = {
	mode     : 'jit',
	purge    : [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}'
	],
	darkMode : false, // or 'media' or 'class'
	theme    : {
		extend     : {
			backgroundImage : (theme) => ({
				'background-image'       : "url('/images/bg-endwalker.jpg')",
				'background-image-small' : "url('/images/bg-endwalker-small.jpg')"
			})
		},
		fontFamily : {
			roboto   : [
				'"Roboto Condensed"',
				'sans-serif'
			],
			medula   : [
				'"Medula One"',
				'sans-serif'
			],
			almendra : [
				'Almendra',
				'sans-serif'
			]
		}
	},
	variants : {
		extend : {}
	},
	plugins  : []
};
