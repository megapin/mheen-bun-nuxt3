// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	// head: {
	// script: [
	// 		{
	// 			src: "https://code.jquery.com/jquery-3.3.1.slim.min.js",
	// 			type: "text/javascript"
	// 		},
	// 	],
	// },

	// app: {
	// 	head: {
	// 		script: [
	// 			{src: 'https:/unpkg.com/primevue/core/core.min.js'},
	// 		],
	// 	},
	// },

	modules: [
		'nuxt-primevue',
		'nuxt-svgo',
		'@pinia/nuxt',
		'@unocss/nuxt',
	],

	primevue: {
		/* options */
	},

	css: [
		'primevue/resources/themes/aura-light-green/theme.css',
		'~/assets/scss/main.scss',
	],

	devtools: { enabled: true },
	compatibilityDate: '2024-08-16',
  // app: { baseURL: '/nuxt/' },
})
