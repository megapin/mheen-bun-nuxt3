<script setup>
/*
거래명세서,,,,,,,
No.,,,,,등록번호,69987-00311,
02월 20일,,,,,상호,송현문화주식회사,
대한방사선사협회,귀중,,,,대표이사,신영교,
아래와 같이 청구 합니다.,,,,,주소,경기도 파주시 하지석길 97-1,

방사협보,"표지포함 68p , 2,830부 , 국배판",,,,,,

내역,규격,단위,수량,색도,단가,금액,비고
표지디자인,,식,1,,,"800,000",
내지디자인,,면,67,,"45,000","3,015,000",
기획,,면,68,,"10,000","680,000",
소계,"4,495,000",

표지용지대(209g마쉬멜로우),국전,R,2,,"246,339","492,678",
내지용지대(100g엠매트),국전,R,25,,"55,700","1,392,500",
표지 인쇄판대,,판,8,,"8,000","64,000",
인쇄대,,R,2,8,"8,000","128,000",
코팅대,무광,R,2,,"80,000","160,000",
박 동판대,,벌,1,,"150,000","150,000",
박작업비,,부,"2,830",,150,"424,500",
내지 인쇄판대,,판,32,,"8,000","256,000",
인쇄대,,R,23,8,"8,000","1,472,000",
제본대,,부,"2,830",,150,"424,500",
소계,"4,964,178",

메인화면 디자인,,건,1,,"500,000","500,000",
서브화면 디자인,,건,20,,"35,000","700,000",
이벤트화면 디자인,,건,1,,"100,000","100,000",
메인화면 코딩,,건,1,,"100,000","100,000",
서브화면 코딩,,건,20,,"35,000","700,000",
이벤트코딩 및 운영,,건,1,,"400,000","400,000",
유지보수,,건,1,,"400,000","400,000",
이북제작,,건,1,,"250,000","250,000",
소계,"3,150,000",

일반관리비 및 이윤,"300,000",
계,"12,909,178",
V.A.T,"1,290,918",
절사,-96
합계,"14,200,000"
*/

const itemsName = 'Quote for Webzine Vol. 397'
const items = ref([
	{name: '메인화면 디자인', unit: '건', qty: 1, price: 500000},
	{name: '서브화면 디자인', unit: '건', qty: 50, price: 35000},
	{name: '이벤트화면 디자인', unit: '건', qty: 1, price: 100000},
	{name: '메인화면 코딩', unit: '건', qty: 1, price: 100000},
	{name: '서브화면 코딩', unit: '건', qty: 50, price: 35000},
	{name: '이벤트코딩 및 운영', unit: '건', qty: 1, price: 400000},
	{name: '유지보수', unit: '건', qty: 1, price: 400000},
	{name: '이북제작', unit: '건', qty: 1, price: 250000},
])
const secondName = 'Items by Volume'
const volItems = ref([
	{volume: '397', items: 54, date: '2024-02'},
	{volume: '396', items: 47, date: '2023-11'},
	{volume: '395', items: 39, date: '2023-08'},
	{volume: '394', items: 37, date: '2023-05'},
	{volume: '393', items: 43, date: '2023-02'},
	{volume: '392', items: 34, date: '2022-11'},
	{volume: '391', items: 32, date: '2022-09'},
	{volume: '390', items: 34, date: '2022-07'},
	{volume: '389', items: 31, date: '2022-05'},
	// {name: '388', items: 0},
	// {name: '387', items: 0},
	// {name: '386', items: 0},
	// {name: '385', items: 0},
	// {name: '384', items: 0},
	// {name: '383', items: 0},
	// {name: '382', items: 0},
])
</script>

<template>
	<div class="wrap" h-95vh pt7 flex justify-center gap9 >
		<!-- <div font-5>{{itemsName}}</div> -->
		<div>
			<h1 >{{itemsName}}</h1>
			<table class="rwd-table">
				<tbody>
					<tr>
						<th v-for="item in Object.keys(items[0])" :class="item == 'name' ? 'text-start' : 'text-end'">
							{{item}}
						</th>
						<th text-end>total</th>
					</tr>
					<tr v-for="item in items">
						<td v-for="(v,k) in item" :class="k !== 'name' ? 'text-end' : 'text-start'">
							{{k == 'price' ? v.toLocaleString() : v}}
						</td>
						<td text-end>{{(item.qty * item.price).toLocaleString()}}</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td text-left>Total: </td>
						<td colspan="4" pr-2 text-end>{{(items.reduce((acc,cur) => acc + cur.qty*cur.price, 0)).toLocaleString()}}</td>
					</tr>
				</tfoot>
			</table>
		</div>

		<div w-lg>
			<h1 >{{secondName}}</h1>
			<table class="rwd-table">
				<tbody>
					<tr>
						<th v-for="item in Object.keys(volItems[0])" text-start>
							{{item}}
						</th>
						<!-- <th text-start>total</th> -->
					</tr>
					<tr v-for="item in volItems">
						<td v-for="(v,k) in item" >
							{{k == 'price' ? v.toLocaleString() : v}}
						</td>
						<!-- <td text-end>{{(item.qty * item.price).toLocaleString()}}</td> -->
					</tr>
				</tbody>
				<!-- <tfoot> -->
				<!-- 	<tr> -->
				<!-- 		<td text-left>Total: </td> -->
				<!-- 		<td colspan="4" pr-2 text-end>{{(items.reduce((acc,cur) => acc + cur.qty*cur.price, 0)).toLocaleString()}}</td> -->
				<!-- 	</tr> -->
				<!-- </tfoot> -->
			</table>
		</div>
	</div>
</template>

<style scoped lang="scss">
/*  
  Table Responsive
  ===================
  Author: https://github.com/pablorgarcia
 */

@charset "UTF-8";
@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,700);

body {
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  line-height: 1.42em;
  color:#A7A1AE;
  background-color:#1F2739;
}

h1 {
  font-size:3em; 
  font-weight: 300;
  line-height:1em;
  text-align: center;
  color: #4DC3FA;
}

h2 {
  font-size:1em; 
  font-weight: 300;
  text-align: center;
  display: block;
  line-height:1em;
  padding-bottom: 2em;
  color: #FB667A;
}

h2 a {
  font-weight: 700;
  text-transform: uppercase;
  color: #FB667A;
  text-decoration: none;
}

.blue { color: #185875; }
.yellow { color: #FFF842; }

.con-table {
	text-align: left;
	overflow: hidden;
	width: 80%;
	margin: 0 auto;
  display: table;
  padding: 0 0 8em 0;
	color:#A7A1AE;

	tr {
		&:hover {
			background-color: #464A52;
			-webkit-box-shadow: 0 6px 6px -6px #0E1119;
			-moz-box-shadow: 0 6px 6px -6px #0E1119;
			box-shadow: 0 6px 6px -6px #0E1119;
		}
		&:nth-child(odd) {
			background-color: #323C50;
		}
		&:nth-child(even) {
			background-color: #2C3446;
		}
	}

	td, th {
		padding-bottom: 2%;
		padding-top: 2%;
		padding-left: 2%;  
	}

	th {
		font-weight: bold;
		font-size: 1em;
		text-align: left;
		color: #185875;

		// background-color: #1F2739; 
		background-color: transparent; 
	}

	td {
		font-weight: normal;
		font-size: 1em;
		-webkit-box-shadow: 0 2px 2px -2px #0E1119;
		-moz-box-shadow: 0 2px 2px -2px #0E1119;
		box-shadow: 0 2px 2px -2px #0E1119;

		&:first-child { color: #FB667A; }

		&:hover {
			background-color: #FFF842;
			color: #403E10;
			font-weight: bold;

			box-shadow: #7F7C21 -1px 1px, #7F7C21 -2px 2px, #7F7C21 -3px 3px, #7F7C21 -4px 4px, #7F7C21 -5px 5px, #7F7C21 -6px 6px;
			transform: translate3d(6px, -6px, 0);

			transition-delay: 0s;
			transition-duration: 0.4s;
			transition-property: all;
			transition-timing-function: line;
		}
	}
}

@media (max-width: 800px) {
	.con-table {
		td:nth-child(4),
		th:nth-child(4) { 
			display: none; 
		}
	}
}


@import 'https://fonts.googleapis.com/css?family=Open+Sans:600,700';
* {font-family: 'Open Sans', sans-serif;}

.rwd-table {
  margin: auto;
  min-width: 300px;
  max-width: 100%;
  border-collapse: collapse;
	color: #333;
	border-radius: .4em;
	overflow: hidden;
	tr {
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
		background-color: #f5f9fc;
		border-color: #bfbfbf;
		&:first-child {
			border-top: none;
			background: #428bca;
			color: #fff;
		}
		&:nth-child(odd):not(:first-child) {
			background-color: #ebf3f9;
		}
	}
	th, td {
		padding: .5em 1em;
	}
	th {
		display: none;
	}
	td {
		display: block;
		&:first-child {
			margin-top: .5em;
		}
		&:last-child {
			margin-bottom: .5em;
		}
		&:before {
			content: attr(data-th) ": ";
			font-weight: bold;
			width: 120px;
			display: inline-block;
			color: #000;
		}
	}
}

@media screen and (max-width: 601px) {
  .rwd-table tr:nth-child(2) {
    border-top: none;
  }
}
@media screen and (min-width: 600px) {
	.rwd-table {
		tr:hover:not(:first-child) {
			background-color: #d8e7f3;
		}
		td:before {
			display: none;
		}
		th, td {
			display: table-cell;
			padding: .25em .5em;
			padding: 1em !important;
		}
		th:first-child,
		td:first-child {
			padding-left: 0;
		}
		th:last-child,
		td:last-child {
			padding-right: 0;
		}
	}
}

/* Basic Styling */
body {
	background: #4B79A1;
	background: -webkit-linear-gradient(to left, #4B79A1 , #283E51);
	background: linear-gradient(to left, #4B79A1 , #283E51);        
}
h1 {
  text-align: center;
  font-size: 2.4em;
  color: #f2f2f2;
}
.wrap {
	background: #4B79A1;
	background: linear-gradient(to left, #4B79A1 , #283E51);        
	background: -webkit-linear-gradient(to left, #4B79A1 , #283E51);
}
h3 {
  display: inline-block;
  position: relative;
  text-align: center;
  font-size: 1.5em;
  color: #cecece;
}
h3:before {
  content: "\25C0";
  position: absolute;
  left: -50px;
  -webkit-animation: leftRight 2s linear infinite;
  animation: leftRight 2s linear infinite;
}
h3:after {
  content: "\25b6";
  position: absolute;
  right: -50px;
  -webkit-animation: leftRight 2s linear infinite reverse;
  animation: leftRight 2s linear infinite reverse;
}
@-webkit-keyframes leftRight {
  0%    { -webkit-transform: translateX(0)}
  25%   { -webkit-transform: translateX(-10px)}
  75%   { -webkit-transform: translateX(10px)}
  100%  { -webkit-transform: translateX(0)}
}
@keyframes leftRight {
  0%    { transform: translateX(0)}
  25%   { transform: translateX(-10px)}
  75%   { transform: translateX(10px)}
  100%  { transform: translateX(0)}
}
</style>
