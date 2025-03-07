// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  theme: {
    colors: {
			veryCool: '#0000ff', // class="text-very-cool"
			brand: {
				primary: 'hsl(var(--hue, 217) 78% 51%)', //class="bg-brand-primary"
				DEFAULT: '#942192' //class="bg-brand"
			},
    },
		fontFamily: {
			iropke: 'IropkeBatang',
			pretendard: 'Pretendard',
			gowun: 'GowunBatang',
		},
  },
	rules: [
	],
  shortcuts: [
    // ...
  ],
	variants: [
		{
			name: 'variants-name',
			match(matcher, {theme}) {
			},
		},
	],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
			scale: 1.2,
			cdn: 'https://esm.sh/',
		}),
    presetTypography(),
    presetWebFonts({
			provider: 'google',
      fonts: {
        sans: 'IBM Plex Sans KR',
				mono: ['Fira Code', 'Fira Mono:400,700'],
				lobster: 'Lobster',
				// lato: [
				// 	{name: 'Lato', weights: ['400', '700'], italic: true},
				// 	{name: 'sans-serif', provider: 'none'},
				// ],
				gowun: 'Gowun Batang',
				
				// @font-face {
				// font-family: 'Pretendard-Regular';
				// src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
				// font-weight: 400;
				// font-style: normal;
				// // }
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
	// include: [
	// 	"./index.html",
	// 	"./src/**/*.{vue,js,ts,jsx,tsx}",
	// 	"./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}"
	// ],
})
