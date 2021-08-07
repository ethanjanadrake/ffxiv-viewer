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
			}),

			colors          : {
				primary          : '#fbbf24',
				'primary-dark'   : '#b45309',
				secondary        : '#1e40af',
				'primary-t'      : '#fff',
				'primary-t-fade' : '#d1d5db',
				'primary-b'      : '#4b5563',
				'secondary-t'    : '#111827',
				'secondary-b'    : '#fcd34d80'
			}
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
	plugins  : [
		function({ addComponents }) {
			const links = {
				a      : {
					'-webkit-tap-highlight-color' : 'rgba(0, 0, 0, 0)'
				},
				button : {
					'-webkit-tap-highlight-color' : 'rgba(0, 0, 0, 0)'
				}
			};
			addComponents(links);
		}
	]
};
