export default defineEventHandler(async (e) => {
	const gems = [ 'efficiency', 'luck', 'comfort', 'resilience' ]
	const levels = [...Array(8).keys()]
	const prices = [ [], [], [], [] ]

	const upbitKrw = await $fetch('https://api.upbit.com/v1/ticker?markets=KRW-GMT')
	const krw = upbitKrw[0]['trade_price']

	const fetched = await $fetch('https://stepn-market.guide/market/dashboard')
	const substr1 = fetched.substring(fetched.indexOf('Gems<small>(Floor'))
	const substr2 = substr1.substring(0, substr1.indexOf('<\/table>'))
	const replaced = substr2.replaceAll(' -\n', '0 GMT\n')
	const matches = replaced.match(/- GMT|\d+(\.\d+)? GMT|\d+\.svg/g)

	gems.forEach((_, x) => {
		[...Array(9).keys()].forEach(y => {
			const idx = matches.findIndex(m => m.includes(100013+x*9+y))
			prices[x][y] = +matches[idx+1].replace(' GMT', '')
		})
	})

	const ranks = []
	for (let lv in levels) {
		gems.forEach((gem, i) => {

			const gmt = prices[i][lv]
			const nLvGmt = +prices[i][+lv+1]
			const gemKrw = gmt * krw

			ranks.push({
				rank: 0,
				gem, 
				lv: +lv + 1, 
				gmt,
				krw: gemKrw.toFixed(),
				gmtx3: (gmt*3).toFixed(+lv < 2 ? 2 : 0),
				krwx3: (gemKrw*3).toFixed(),
				nLvGmt,
				nLvKrw: (nLvGmt*krw).toFixed(),
				percent: nLvGmt ? ((nLvGmt / (gmt*3))*100).toFixed() : 0,
				diffKrw: (nLvGmt*krw - gemKrw*3).toFixed(),
				million: nLvGmt ? (1000000 / ((nLvGmt*krw) - (gemKrw*3))).toFixed(1) : 0,
			})
		})
	}
	ranks.sort((a, b) => b.percent - a.percent)
		.forEach((r, i) => r.rank = i+1)

	return {
		prices,
		ranks,
		krw,
	}
})
