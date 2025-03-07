<script setup>
const products = ref([
	{name: '메인화면 디자인', unit: '건', qty: 1, price: 500000},
	{name: '서브화면 디자인', unit: '건', qty: 50, price: 35000},
	{name: '이벤트화면 디자인', unit: '건', qty: 1, price: 100000},
	{name: '메인화면 코딩', unit: '건', qty: 1, price: 100000},
	{name: '서브화면 코딩', unit: '건', qty: 50, price: 35000},
	{name: '이벤트코딩 및 운영', unit: '건', qty: 1, price: 400000},
	{name: '유지보수', unit: '건', qty: 1, price: 400000},
	{name: '이북제작', unit: '건', qty: 1, price: 250000},
])

const columns = ref([
	{ field: 'name', header: 'Name' },
	{ field: 'qty', header: 'Quantity' },
	{ field: 'price', header: 'Price' },
	{ field: 'total', header: 'Total' },
])

const onCellEditComplete = (event) => {
	let { data, newValue, field } = event;
	switch (field) {
		case 'qty':
		case 'price':
			if (isPositiveInteger(newValue)) data[field] = newValue;
			else event.preventDefault();
			break;
		default:
			if (newValue.trim().length > 0) data[field] = newValue;
			else event.preventDefault();
			break;
	}
}

const isPositiveInteger = (val) => {
	let str = String(val);
	str = str.trim();
	if (!str) {
		return false;
	}
	str = str.replace(/^0+/, '') || '0';
	var n = Math.floor(Number(str));
	return n !== Infinity && String(n) === str && n >= 0;
}

const formatCurrency = (value) => {
	// return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
	return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);
}

const total = computed(() => {
	let t = 0
	for (let p of products.value) {
		t += p.qty * p.price
	}
	return formatCurrency(t)
})
</script>

<template>
	<div flex justify-center>
		<div col text-center>
		<h1>Quote for Webzine Vol. 397</h1>
		<div class="card p-fluid">
			<DataTable :value="products" editMode="cell" @cell-edit-complete="onCellEditComplete"
				:pt="{
					table: { style: 'min-width: 50rem' },
					column: {
						bodycell: ({ state }) => ({
							class: [{ 'pt-0 pb-0': state['d_editing'] }]
						})
					}
				}" >
				<Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" style="width:15%;">
					<template #body="{ data, field }">
						{{ field === 'price' ? formatCurrency(data[field]) 
							: field === 'total' ? formatCurrency(data['qty'] * data['price']) 
							: data[field] }}
					</template>
					
					<template v-if="col.field !== 'total'" #editor="{ data, field }" >
						<template v-if="field !== 'price'">
							<InputText v-model="data[field]" autofocus />
						</template>
						<template v-else>
							<InputNumber v-model="data[field]" mode="currency" currency="KRW" locale="ko-KR" autofocus />
						</template>
					</template>
				</Column>
				<ColumnGroup type="footer">
					<Row>
            <Column footer="Totals:" :colspan="3" footerStyle="" />
            <Column :footer="total" />
            <!-- <Column :footer="thisYearTotal" /> -->
					</Row>
				</ColumnGroup>
			</DataTable>
		</div>
		</div>
	</div>
</template>
