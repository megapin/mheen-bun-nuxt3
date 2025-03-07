<script setup>
const pb = usePb()
const route = useRoute()
const id = route.query.id
const invoice = await pb.collection('invoices').getOne(id, {
	expand: 'billto, sender, terms_conditions, payment_method',
})
const invoice_services = await pb.collection('invoice_services').getFullList({
	expand: 'service',
	filter: `invoice = "${invoice.id}"`
})
const round = 10000

const sel = ref()

const services = invoice_services.filter(x => x.invoice == invoice.id)
const subtotal = services.reduce((acc,cur) => acc + cur.expand.service.price * cur.days, 0)
const vat = subtotal * 10/100
const total = subtotal + +vat
const grandTotal = invoice.dc < 1
  ? (Math.floor(total*invoice.dc/round)*round).toLocaleString()
  : invoice.dc.toLocaleString()
sel.value = {...invoice, services, subtotal, vat, total, grandTotal}
</script>

<template>
	<!-- <div class="mb-15" /> -->
	<!---->
	<!-- <div class="container px-8"> -->
	<!-- 	<div class="flex justify-between"> -->
	<!-- 		<div class="fw-700 text-7xl text-blue-7">Quote</div> -->
	<!-- 		<div class="text-end"> -->
	<!-- 			<div text-2xl fw-700>민 인터랙트</div> -->
	<!-- 			<div text-xl>Mheen Interact</div> -->
	<!-- 		</div> -->
	<!-- 	</div> -->
	<!-- 	<div class="mb-20" /> -->
	<!---->
	<!-- 	<div class="flex"> -->
	<!-- 		<div class="w10%"></div> -->
	<!-- 		<div class="w50%"> -->
	<!-- 			<div class="title mb1">Bill to</div> -->
	<!-- 			<div>{{sel.expand.billto.name}}</div> -->
	<!-- 			<div>{{sel.expand.billto.address}}</div> -->
	<!-- 			<div>{{sel.expand.billto.building}}</div> -->
	<!-- 			<div>{{sel.expand.billto.dear}}님</div> -->
	<!-- 		</div> -->
	<!-- 		<div class="w40% text-end"> -->
	<!-- 			<div class="title mb1">Invoice #</div> -->
	<!-- 			<div>{{sel.number}}</div> -->
	<!-- 			<div class="title mt2 mb1">Date</div> -->
	<!-- 			<div>{{sel.date.slice(0,10)}}</div> -->
	<!-- 		</div> -->
	<!-- 	</div> -->
	<!-- 	<div class="mb-20" /> -->
	<!---->
	<!-- 	<div class="flex gap3"> -->
	<!-- 		<div class="w10%"></div> -->
	<!-- 		<div class="w50% title">Description</div> -->
	<!-- 		<div class="w20% title text-end">Price/day</div> -->
	<!-- 		<div class="w15% title text-end">Days</div> -->
	<!-- 		<div class="w15% title text-end">Total</div> -->
	<!-- 	</div> -->
	<!---->
	<!-- 	<div class="flex gap3 pt-1" v-for="(item, i) in sel.services"> -->
	<!-- 		<div class="w10% text-end text-blue-7">#0{{i+1}}</div> -->
	<!-- 		<div class="w50%">{{item.expand.service.name}}</div> -->
	<!-- 		<div class="w20% text-end">\{{item.expand.service.price.toLocaleString()}}</div> -->
	<!-- 		<div class="w15% text-end">{{item.days}}</div> -->
	<!-- 		<div class="w15% text-end">\{{(item.expand.service.price * item.days).toLocaleString()}}</div> -->
	<!-- 	</div> -->
	<!-- 	<div class="mb-5" /> -->
	<!---->
	<!-- 	<div class="flex flex-items-center"> -->
	<!-- 		<div class="w60%"></div> -->
	<!-- 		<div class="w20% title text-end"> -->
	<!-- 			<div class="">Subtotal</div> -->
	<!-- 			<div class="">VAT.</div> -->
	<!-- 			<div class="">Total</div> -->
	<!-- 		</div> -->
	<!-- 		<div class="w20% text-end"> -->
	<!-- 			<div class="pb1">\{{sel.subtotal.toLocaleString()}}</div> -->
	<!-- 			<div class="pb1">\{{sel.vat.toLocaleString()}}</div> -->
	<!-- 			<div class="pb1"><b>\{{sel.total.toLocaleString()}}</b></div> -->
	<!-- 		</div> -->
	<!-- 	</div> -->
	<!-- </div> -->

	<!-- <div class="bg-blue-7 mt-5"> -->
	<!-- 	<div class="container px-8"> -->
	<!-- 		<div class="flex py-3 text-white bg-blue-7 flex-items-center"> -->
	<!-- 			<div class="w85% title fw-medium text-end"> -->
	<!-- 				제안 견적금액  -->
	<!-- 				<span v-if="sel.dc < 0.9">(VAT 별도)</span> -->
	<!-- 			</div> -->
	<!-- 			<div class="w20% text-end fs-6"> -->
	<!-- 				<b>\{{sel.grandTotal}}</b> -->
	<!-- 			</div> -->
	<!-- 		</div> -->
	<!-- 	</div> -->
	<!-- </div> -->
	<!-- <div class="mb-15" /> -->
	<!---->
	<!-- <div class="container px8"> -->
	<!-- 	<div class=""> -->
	<!-- 		<div class="title mb2">Terms & conditions</div> -->
	<!-- 		<div class="" v-for="(item, i) in sel.expand.terms_conditions"> -->
	<!-- 			{{item.text}} -->
	<!-- 		</div> -->
	<!-- 		<div class="title mt-5 mb2">Payment method</div> -->
	<!-- 		<div class="" v-for="(item, i) in sel.expand.payment_method"> -->
	<!-- 			{{item.text}} -->
	<!-- 		</div> -->
	<!-- 	</div> -->
	<!-- </div> -->
	<!-- <div class="mb-10" /> -->




	<div class="mb-15" />

	<div class="container">
		<div class="grid grid-cols-12 gap-row-5">
			<div class="col-start-1">
				<div class="fw-700 text-7xl text-blue-7">Quotes</div>
			</div>
			<div class="col-start-11 col-span-2 text-end">
				<div text-2xl fw-700>민 인터랙트</div>
				<div text-xl>Mheen Interact</div>
			</div>

			<div class="col-start-2 col-span-3">
				<div class="title mb1">To</div>
				<div>{{sel.expand.billto.name}}</div>
				<div>{{sel.expand.billto.address}}</div>
				<div>{{sel.expand.billto.building}}</div>
				<div>{{sel.expand.billto.dear}}님</div>
			</div>
			<div class="col-start-11 col-span-2 text-end">
				<div class="title mb1">Invoice #</div>
				<div>{{sel.number}}</div>
				<div class="title mt2 mb1">Date</div>
				<div>{{sel.date.slice(0,10)}}</div>
			</div>

			<div class="col-start-2 title">Description</div>
			<div class="col-start-7 title text-end">Price/d</div>
			<div class="col-start-9 title text-end">Days</div>
			<div class="col-start-11 col-span-2 title text-end">Total</div>

			<template v-for="(item, i) in sel.services">
				<div class="col-start-1 text-end text-blue-7 me-2">#0{{i+1}}</div>
				<div class="col-start-2 col-end-7">{{item.expand.service.name}}</div>
				<div class="col-start-7 text-end w-[105%]">{{item.expand.service.price.toLocaleString()}}원</div>
				<div class="col-start-9 text-end">{{item.days}}</div>
				<div class="col-start-11 col-span-2 text-end">{{(item.expand.service.price * item.days).toLocaleString()}}원</div>
			</template>

			<div class="col-start-8 col-end-10 title text-end">
				<div class="">Subtotal</div>
				<div class="">VAT.</div>
				<div class="">Total</div>
			</div>
			<div class="col-start-11 col-span-2 text-end">
				<div class="pb1">{{sel.subtotal.toLocaleString()}}원</div>
				<div class="pb1">{{(+sel.vat.toFixed(0)).toLocaleString()}}원</div>
				<div class="pb1"><b>{{(+sel.total.toFixed(0)).toLocaleString()}}원</b></div>
			</div>
		</div>
	</div>


	<div class="bg-blue-8 mt-4">
		<div class="container">
			<div class="grid grid-cols-12 gap-row-5 text-white py-3 text-end">
				<div class="col-span-9 title fw-medium">
					제안 견적금액
					<!-- <span v-if="sel.dc < 0.9">(VAT 별도)</span> -->
					<span>(VAT 별도)</span>
				</div>
				<div class="col-span-3">
					<b>{{sel.grandTotal}}원</b>
				</div>
			</div>
		</div>
	</div>

	<div class="mb-15" />

	<div class="container">
		<div class="title mb2">Terms & conditions</div>
		<div class="" v-for="(item, i) in sel.expand.terms_conditions">
			{{item.text}}
		</div>
		<div class="title mt-5 mb2">Payment method</div>
		<div class="" v-for="(item, i) in sel.expand.payment_method">
			{{item.text}}
		</div>
	</div>
	<div class="mb-10" />
</template>

<style scoped lang="scss">
.container {
	max-width: 850px;
	margin-left: auto;
	margin-right: auto;
}
.title {
	font-weight: 800;
	font-size: 1.2rem;
	//background: #0139d6;
}
</style>


