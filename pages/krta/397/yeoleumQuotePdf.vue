<script setup>
const services = ref([
	{desc: '웹기획', price: 291414, qty: 1, mm: 1, period: 15},
	{desc: '웹디자인', price: 217843, qty: 1, mm: 1, period: 15},
	{desc: '웹퍼블리싱', price: 217843, qty: 1, mm: 1, period: 15},
	{desc: '웹프론트엔드 개발', price: 311962, qty: 1, mm: 1, period: 25},
	{desc: '웹백엔드 개발 (DB)', price: 311962, qty: 1, mm: 1, period: 25},
])
const subtotal = services.value.reduce((acc,cur) => acc + cur.price * cur.period, 0)
const vat = subtotal * 10/100
const total = subtotal + +vat
const sender = reactive({
	company: '민 인터랙트',
	address: '경기도 부천시 길주로411번길 22',
	building: '춘의디아크원 1105',
	from: '연정훈',
	email: 'yeonjh549@gmail.com',
	phone: '010 9904 2107',
})
const billTo = reactive({
	company: '조경하다 열음',
	address: '서울시 마포구 포은로 2가길 65',
	building: '진영빌딩 305호',
	dear: '윤호준 대표님',
})
const invoice = reactive({
	number: 'QYE20240126',
	date: '2024/01/26',
})
const termsConditions = ref([
	{text: '용역 기간: 계약일로부터 약 2개월(업무일 기준)',},
	{text: '1. 상기 견적은 디자인 및 컨텐츠, 서비스 개발 범위의 상호 협의에 따라 변경될 수 있습니다.', mt: true},
	{text: '2. 상기 견적은 SW기술자 평균 임금 기준이며 합리적인 견적을 위해 제경비 및 기술료는 10%로 산정되었습니다.',},
	{text: '3. 개발에 투입되는 인력 기준의 견적이며 사진 및 영상촬영, 번역비 등 기타 제반 추가비용은 별도입니다.',},
	{text: '4. 도메인, 웹호스팅, SSL 보안서버인증서등의 비용은 별도입니다.(상세협의 필요)',},
	{text: '2023년 적용 SW기술자 평균 임금 공표(단위: 원)', mt: true},
	{text: '응용SW 개발자: 311,962/일 6,426,417/월 38,995/시간',},
])
const paymentMethod = ref([
	{text: '선금(50%): 계약 시',},
	{text: '잔금(50%): 정식 오픈(작업 및 검수) 완료 후 10일 이내',},
])
</script>

<template>
	<div class="mb-50" />
	<div class="container" style="margin: 0 10px">
		<div class="wrap p-2 pb-4 fs-6">
			<div class="row mx-0">
				<div class="col fw-700" style="font-size:4rem; color:#0139d6"><b>Invoice</b></div>
				<div class="col text-end">
					<div style="font-size:1.52rem"><b>민 인터랙트</b></div>
					<div>Mheen Interact</div>
					<!-- <div>춘의디아크원 1105</div> -->
					<!-- <div>연정훈</div> -->
					<!-- <div>010 9904 2107</div> -->
				</div>
			</div>
			<div class="mb-100" />

			<div class="row mx-0">
				<div class="col-2"></div>
				<div class="col-4">
					<div class="title">Bill to</div>
					<div v-for="item in billTo">{{item}}</div>
				</div>
				<div class="col-2"></div>
				<div class="col-1"></div>
				<div class="col-3 text-end">
					<div class="title">Invoice #</div>
					<div>{{invoice.number}}</div>
					<div class="title mt-30">Date</div>
					<div>{{invoice.date}}</div>
				</div>
			</div>
			<div class="mb-50" />

			<div class="row mx-0">
				<div class="col-2"></div>
				<div class="col-4 title">Description</div>
				<div class="col-2 title">Price/day</div>
				<div class="col-2 title text-end">Days</div>
				<div class="col-2 pe-3 title text-end">Total</div>
			</div>

			<div class="row mx-0 pt-1" v-for="(item, i) in services">
				<div class="col-2 pe-4 text-end service-number">#0{{i+1}}</div>
				<div class="col-4">{{item.desc}}</div>
				<div class="col-2">\{{item.price.toLocaleString()}}</div>
				<div class="col-2 text-end">{{item.period}}</div>
				<div class="col-2 pe-3 text-end">\{{(item.price * item.period).toLocaleString()}}</div>
			</div>
			<div class="mb-20" />

			<div class="row mx-0">
				<div class="col title text-end px-0">
					<div class="pe-2">Subtotal</div>
					<div class="pe-2 mt-5">VAT.</div>
					<div class="pe-2 mt-5">Total</div>
					<div class="pe-2 py-3 mt-20 amount fw-medium">제안 견적금액 (VAT 별도)</div>
				</div>
				<div class="col-2 text-end px-0">
					<div class="pe-3">\{{subtotal.toLocaleString()}}</div>
					<div class="pe-3 mt-5">\{{vat.toLocaleString()}}</div>
					<div class="pe-3 mt-5"><b>\{{total.toLocaleString()}}</b></div>
					<div class="pe-3 py-3 mt-20 amount">
						<b>\{{(Math.trunc(total*47/100/100000)*100000).toLocaleString()}}</b>
					</div>
				</div>
			</div>
		<!-- </div> -->

	<!-- <div class="row" style="background:#0139d6"> -->
		<!-- <div class="container"> -->
			<!-- <div class="row mx-0 ps-4 pe-2 py-3 text-white" style="background:#0139d6"> -->
			<!-- 	<div class="col-2"></div> -->
			<!-- 	<div class="col-2"></div> -->
			<!-- 	<div class="col-2"></div> -->
			<!-- 	<div class="col-4 title fw-medium text-end">제안 견적금액 (VAT 별도)</div> -->
			<!-- 	<div class="col-2 text-end fs-6"> -->
			<!-- 		<b>\{{(Math.trunc(total*47/100/100000)*100000).toLocaleString()}}</b> -->
			<!-- 	</div> -->
			<!-- </div> -->
		<!-- </div> -->
	<!-- </div> -->
	<div class="mb-30" />

	<!-- <div class="container"> -->
		<div class="row p-4 mx-0" style="font-size:.91rem">
			<div class="col title">Terms & conditions</div>
			<div :class="`${item.mt ? 'mt-2' : ''} ${i == 0 ? 'mt-1' : ''}`" v-for="(item, i) in termsConditions">
				{{item.text}}
			</div>
			<div class="col title mt-20">Payment method</div>
			<div :class="`${item.mt ? 'mt-2' : ''} ${i == 0 ? 'mt-1' : ''}`" v-for="(item, i) in paymentMethod">
				{{item.text}}
			</div>
		</div>
	</div>
	</div>
	<!-- <div class="mb-50" /> -->
</template>

<style scoped lang="scss">
/* @page wrap {
    size: 8.27in 11.69in; 
    margin: .5in .5in .5in .5in; 
    mso-header-margin: .5in; 
    mso-footer-margin: .5in; 
    mso-paper-source: 0;
}
div.wrap { page: Section1; } */ 
@page { 
	size: A4; 
	margin: 0mm;
}
@media print {
    .wrap {
        width: 21cm;
        height: 29.7cm;
        /* margin: 30mm 45mm 30mm 45mm; */
        margin: 5mm 5mm 5mm 5mm; 
		}
}

.title {
	font-weight: 800;
	font-size: 1.2rem;
}
.service-number {
	color: #0139d6;
}
.amount {
	background: #0139d6;
	color: white;
}
</style>
