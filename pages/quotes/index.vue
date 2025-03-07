<script setup>
const pb = usePb()
const invoices = await pb.collection('invoices').getFullList({expand: 'billto,sender'})
const invoice_services = await pb.collection('invoice_services').getFullList({expand: 'service'})

const isAdd = ref(false)
const visible = ref(false)
const add = () => {
}
</script>

<template>
	<leftSideBar mr3 v-model="visible" />
	<div p5>
		<Toolbar>
			<template #start>
				<Button icon="pi pi-bars" mr3 @click="visible = true" />
				<Button icon="pi pi-plus" class="mr-2" severity="secondary" />
				<Button icon="pi pi-print" class="mr-2" severity="secondary" />
				<Button icon="pi pi-upload" severity="secondary" />
			</template>
			<template #center>
				<IconField iconPosition="left">
					<InputIcon>
						<i class="pi pi-search" />
					</InputIcon>
					<InputText placeholder="Search" />
				</IconField>
			</template>
			<template #end> 
				<SplitButton label="Save" :model="items"></SplitButton>
			</template>
		</Toolbar>

		<!-- <div flex flex-items-center gap2 mt5> -->
		<!-- 	<NuxtLink :to="`/quotes/${item.expand.billto.id}`" p1 b b-solid  -->
		<!-- 		v-for="item in invoices"> -->
		<!-- 		{{item.expand.billto.name}} -->
		<!-- 	</NuxtLink> -->

		<!-- 	<button @click="isAdd = !isAdd" :class="isAdd ? 'i-bi-x-circle' : 'i-bi-plus-circle'" text-xl></button> -->
		<!-- 	<Button @click="isAdd = !isAdd" label="추가"></Button> -->
		<!-- </div> -->

		<!-- <addInvoice v-if="isAdd" /> -->

		<invoiceTable mt8 />

	</div>
</template>
