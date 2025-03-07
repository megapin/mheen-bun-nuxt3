<script setup>
const date = ref(new Date().toLocaleDateString())
const time = ref(new Date().toLocaleTimeString())
const gems = [ 'efficiency', 'luck', 'comfort', 'resilience' ]

const {data} = await useFetch('/api/stepn')

const sortBy = reactive({ name: 'percent', isAsc: true })
const ths = Object.keys(data.value.ranks[0])

const sort = (arg) => {
	if (arg === sortBy.name) sortBy.isAsc = !sortBy.isAsc
	sortBy.name = arg
	data.value.ranks.sort((a, b) => sortBy.isAsc 
		? a[sortBy.name] - b[sortBy.name] 
		: b[sortBy.name] - a[sortBy.name]
	)
}
</script>

<template>
	<div p3>
		<div flex justify-between>
			<span>{{date}} {{time}}</span> <span>{{data.krw}}원/GMT</span>
		</div>

		<div text-sm flex flex-wrap mt3 class="gems">
			<table border border-collapse w-full>
				<thead>
					<tr> 
						<th v-for="(gem, i) in gems">{{gem}}</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="lv in 8" text-end>
						<template v-for="(gem, i) in gems">
							<td py1>
								<img float-left mr1 :src="`/imgs/stepn/${gem}-${lv}.svg`" width="16px" />
								<span>{{data.prices[i][lv-1].toFixed(lv > 2 ? 0 : 2)}}</span>
								<span inline-block w-4rem>{{(data.prices[i][lv-1] * data.krw).toFixed()}}</span>
							</td>
						</template>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="mt3 overflow-auto fix-table-head">
			<table border-0 border-separate border-spacing-0 w-full>
				<thead>
					<tr>
						<th v-for="th in ths" @click="!['rank','gem','lv'].includes(th) ? sort(th) : ''">
							{{th == 'rank' ? '#' : th}} 
							<template v-if="!['rank','gem','lv'].includes(th)">
								<span v-if="sortBy.name == th && sortBy.isAsc">&#9652;</span>
								<span v-else>&#9662;</span>
							</template>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(rank, i) in data.ranks" text-end>
						<template v-for="k in ths">
							<th v-if="k == 'rank'" text-center>{{rank.rank}}</th>
							<th v-else-if="k == 'gem'" p0 text-center>
								<img :src="`/imgs/stepn/${rank.gem}-${rank.lv}.svg`" width="27px" />
							</th>
							<td v-else :class="k == 'lv' && 'text-center'">
								{{rank[k]}} 
								{{k.toLowerCase().includes('krw') ? '원' : k.includes('percent') ? '%' : ''}}
							</td>
						</template>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<style scoped lang="scss">
@media (max-width: 320px) {
	.gems {
		//flex-direction: column;
		div { flex: 100%; }
	}
}
th, td {
	border-top: 1px solid gray;
	border-left: 1px solid gray;
}
thead, tbody {
	th:last-child { 
		border-right: 1px solid gray; 
	}
	td:last-child { 
		border-right: 1px solid gray; 
	}
}
thead th {
	padding: .25rem .5rem; 
	border-bottom: 1px solid gray;
}
tbody {
	tr:last-child {
		th, td {
			border-bottom: 1px solid gray;
		}
	}
	th, td { 
		padding-left: .5rem; 
		padding-right: .5rem; 
	}
}
th { background: #eee; }

.fix-table-head {
	width: 100%;
	height: 65vh;
	thead th {
		top: 0;
		position: sticky;
		z-index: 1;
		cursor: pointer;
	}
	th {
		left: 0;
		position: sticky;
	}
}
</style>
