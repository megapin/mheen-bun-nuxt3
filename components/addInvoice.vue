<script setup>
const pb = usePb()
const companies = await pb.collection('companies').getFullList()
const services = await pb.collection('services').getFullList()

const company = reactive({
	name: '',
	address: '',
	buiding: '',
	dear: ''
})
const service = reactive({name: '', desc: '', price: 250000, qty: 1, mm: 1, days: 1})
const selCompany = ref()
const selService = ref()
const invoice_services = ref([])

const addService = () => {
	invoice_services.value.push(selService.value)
	selService.value = null
}

const onCellEditComplete = (event) => {
    let { data, newValue, field } = event;

    switch (field) {
				case 'days':
        case 'quantity':
        case 'price':
            if (isPositiveInteger(newValue)) data[field] = newValue;
            else event.preventDefault();
            break;

        default:
            if (newValue.trim().length > 0) data[field] = newValue;
            else event.preventDefault();
            break;
    }
};
const isPositiveInteger = (val) => {
    let str = String(val);

    str = str.trim();

    if (!str) {
        return false;
    }

    str = str.replace(/^0+/, '') || '0';
    var n = Math.floor(Number(str));

    return n !== Infinity && String(n) === str && n >= 0;
};
</script>

<template>
  <section class=" bg-white bg-purple-700/30 p-10 rounded-xl flex flex-col gap-8 max-w-3xl " >
    <Panel header="Add Invoice">
			<!-- <FloatLabel mt5> -->
			<!-- 	<InputText wfull id="companyName" v-model="company.name" /> -->
			<!-- 	<label for="companyName">Company Name</label> -->
			<!-- </FloatLabel> -->

			<Dropdown mt3 w100 v-model="selCompany" :options="companies" optionLabel="name" placeholder="Company" />
			<!-- <Dropdown mt3 w50 v-model="selService" :options="services" optionLabel="name" placeholder="Service" /> -->
			<!-- <InputText mt3 w100 v-model="service.name" placeholder="Service" /> -->

			<div v-if="invoice_services.length">
				<!-- <DataTable :value="invoice_services" tableStyle="min-width:50rem"> -->
				<!-- <DataTable :value="invoice_services"> -->
				<DataTable :value="invoice_services" editMode="cell" @cell-edit-complete="onCellEditComplete"
					:pt="{
						table: { style: 'min-width: 50rem' },
						column: {
							bodycell: ({ state }) => ({
								class: [{ 'pt-0 pb-0': state['d_editing'] }]
							})
						}
					}">
					<Column field="name" header="Name" />
					<Column field="price" header="Price" />
					<Column field="qty" header="Qty" />
					<Column field="days" header="Days">
						<template #body="{ data, field }">
							<!-- {{ field === 'price' ? formatCurrency(data[field]) : data[field] }} -->
							{{ data[field] }}
						</template>
						<template #editor="{ data, field }">
							<!-- <template v-if="field !== 'price'"> -->
							<!-- 	<InputText v-model="data[field]" autofocus /> -->
							<!-- </template> -->
							<!-- <template v-else> -->
								<!-- <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US" autofocus /> -->
								<InputNumber v-model="data[field]" autofocus />
							<!-- </template> -->
						</template>
					</Column>
					<Column field="total" header="Total">
						<template #body="slotProps">{{(slotProps.data.price * slotProps.data.days).toLocaleString()}}</template>
					</Column>
				</DataTable>
			</div>

			<div class="mt3 card flex flex-wrap gap-3 p-fluid">
				<Dropdown w50 v-model="selService" :options="services" optionLabel="name" placeholder="Service" />
				<div v-if="selService" flex gap2>
					<InputNumber v-model="selService.price" placeholder="Price" w30 disabled />
					<InputNumber v-model="selService.qty" placeholder="Qty" w20 />
					<InputNumber v-model="selService.days" placeholder="Days" w20 />
					<InputNumber :modelValue="selService.price * selService.days" placeholder="Total" w30 disabled />
					<!-- <InputNumber v-model="value1" placeholder="MM" w20 /> -->
				</div>
			</div>
			<div mt3>
				<Button @click="addService" icon="pi pi-plus" severity="info" text raised rounded aria-label="Cancel" />
			</div>

			<!-- <div class="mt3 card flex flex-wrap gap-3 p-fluid"> -->
   <!--      <div class="flex-auto"> -->
   <!--          <label for="integeronly" class="font-bold block mb-2"> Integer Only </label> -->
   <!--          <InputNumber v-model="value1" inputId="integeronly" /> -->
   <!--      </div> -->
   <!--      <div class="flex-auto"> -->
   <!--          <label for="withoutgrouping" class="font-bold block mb-2"> Without Grouping </label> -->
   <!--          <InputNumber v-model="value2" inputId="withoutgrouping" :useGrouping="false" /> -->
   <!--      </div> -->
   <!--      <div class="flex-auto"> -->
   <!--          <label for="minmaxfraction" class="font-bold block mb-2"> Min-Max Fraction Digits </label> -->
   <!--          <InputNumber v-model="value3" inputId="minmaxfraction" :minFractionDigits="2" :maxFractionDigits="5" /> -->
   <!--      </div> -->
   <!--      <div class="flex-auto"> -->
   <!--          <label for="minmax" class="font-bold block mb-2"> Min-Max Boundaries </label> -->
   <!--          <InputNumber v-model="value4" inputId="minmax" :min="0" :max="100" /> -->
   <!--      </div> -->
			<!-- </div> -->

    </Panel>
  </section>
</template>
