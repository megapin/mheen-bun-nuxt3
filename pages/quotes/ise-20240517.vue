<script setup>
const pb = usePb()
const route = useRoute()
// const invoices = await pb.collection('invoices').getFullList({
// 	expand: 'billto, sender, terms_conditions, payment_method', 
// 	filter: `billto = "${route.params.slug}"`
// })
const invoices = await pb.collection('invoices').getOne('pzyqvmnv4dechyb', {
	expand: 'billto, sender, terms_conditions, payment_method', 
	// filter: `billto = "${route.params.slug}"`
})
const invoice_services = await pb.collection('invoice_services').getFullList({
	expand: 'service', 
	// filter: invoices.map(x => `invoice = "${x.id}"`).join('||')
	filter: `invoice = "${invoices.id}"`
})

const isInvoice = ref(false)
const sel = ref()

// const onInvoice = item => {
// 	isInvoice.value = !isInvoice.value
	// const services = invoice_services.filter(x => x.invoice == item.id)
	const services = invoice_services.filter(x => x.invoice == invoices.id)
	const subtotal = services.reduce((acc,cur) => acc + cur.expand.service.price * cur.days, 0)
	const vat = subtotal * 10/100
	const total = subtotal + +vat
	// sel.value = {...item, services, subtotal, vat, total}
	sel.value = {...invoices, services, subtotal, vat, total}
// }
</script>

<template>
	<!-- <div p3> -->
	<!-- 	<button @click="onInvoice(item)" v-for="item in invoices" p1 m1>{{item.date.slice(0,10)}}</button> -->
	<!-- </div> -->

	<!-- <div v-if="isInvoice"> -->
		<div class="mb-15" />

		<div class="container px-8">
			<div class="flex justify-between">
				<div class="fw-700 text-7xl text-blue-7">Invoice</div>
				<div class="text-end">
					<div text-2xl fw-700>민 인터랙트</div>
					<div text-xl>Mheen Interact</div>
				</div>
			</div>
			<div class="mb-20" />

			<div class="flex">
				<div class="w10%"></div>
				<div class="w50%">
					<div class="title mb1">Bill to</div>
					<div>{{sel.expand.billto.name}}</div>
					<div>{{sel.expand.billto.address}}</div>
					<div>{{sel.expand.billto.building}}</div>
					<div>{{sel.expand.billto.dear}}님</div>
				</div>
				<div class="w40% text-end">
					<div class="title mb1">Invoice #</div>
					<div>{{sel.number}}</div>
					<div class="title mt2 mb1">Date</div>
					<div>{{sel.date.slice(0,10)}}</div>
				</div>
			</div>
			<div class="mb-20" />

			<div class="flex gap3">
				<div class="w10%"></div>
				<div class="w50% title">Description</div>
				<div class="w20% title text-end">Price/day</div>
				<div class="w15% title text-end">Days</div>
				<div class="w15% title text-end">Total</div>
			</div>

			<div class="flex gap3 pt-1" v-for="(item, i) in sel.services">
				<div class="w10% text-end text-blue-7">#0{{i+1}}</div>
				<div class="w50%">{{item.expand.service.name}}</div>
				<div class="w20% text-end">\{{item.expand.service.price.toLocaleString()}}</div>
				<div class="w15% text-end">{{item.days}}</div>
				<div class="w15% text-end">\{{(item.expand.service.price * item.days).toLocaleString()}}</div>
			</div>
			<div class="mb-5" />

			<div class="flex flex-items-center">
				<div class="w60%"></div>
				<div class="w20% title text-end">
					<div class="">Subtotal</div>
					<div class="">VAT.</div>
					<div class="">Total</div>
				</div>
				<div class="w20% text-end">
					<div class="pb1">\{{sel.subtotal.toLocaleString()}}</div>
					<div class="pb1">\{{sel.vat.toLocaleString()}}</div>
					<div class="pb1"><b>\{{sel.total.toLocaleString()}}</b></div>
				</div>
			</div>
		</div>

		<div class="bg-blue-7 mt-5">
			<div class="container px-8">
				<div class="flex py-3 text-white bg-blue-7 flex-items-center">
					<div class="w80% title fw-medium text-end">제안 견적금액 (VAT 별도)</div>
					<div class="w20% text-end fs-6">
						<!-- <b>\{{(Math.trunc(sel.total*47/100/100000)*100000).toLocaleString()}}</b> -->
						<b>\{{(Math.floor(sel.total/10000)*10000).toLocaleString()}}</b>
					</div>
				</div>
			</div>
		</div>
		<div class="mb-15" />

		<div class="container px8">
			<div class="">
				<div class="title mb2">Terms & conditions</div>
				<div class="" v-for="(item, i) in sel.expand.terms_conditions">
					{{item.text}}
				</div>
				<div class="title mt-5 mb2">Payment method</div>
				<div class="" v-for="(item, i) in sel.expand.payment_method">
					{{item.text}}
				</div>
			</div>
		</div>
		<!-- <div class="mb-30" /> -->

	<!-- </div> -->
</template>

<style scoped lang="scss">
.container {
	max-width: 1200px;
	margin-left: auto;
	margin-right: auto;
}
.title {
	font-weight: 800;
	font-size: 1.2rem;
	//background: #0139d6;
}
</style>
