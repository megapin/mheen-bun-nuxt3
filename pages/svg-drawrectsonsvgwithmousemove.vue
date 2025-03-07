<script setup>
// onMounted(() => {
// 	const svg = document.querySelector('#svg');
// 	const svgPoint = (elem, x, y) => {
// 		const p = svg.createSVGPoint();
// 		p.x = x;
// 		p.y = y;
// 		return p.matrixTransform(elem.getScreenCTM().inverse());
// 	};
//
// 	svg.addEventListener('mousedown', (event) => {
// 		const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
// 		const start = svgPoint(svg, event.clientX, event.clientY);

// 		const drawRect = (e) => {
// 			const p = svgPoint(svg, e.clientX, e.clientY);
// 			const w = Math.abs(p.x - start.x);
// 			const h = Math.abs(p.y - start.y);

// 			if (p.x > start.x) { p.x = start.x; }
// 			if (p.y > start.y) { p.y = start.y; }
//
// 			rect.setAttributeNS(null, 'x', p.x);
// 			rect.setAttributeNS(null, 'y', p.y);
// 			rect.setAttributeNS(null, 'width', w);
// 			rect.setAttributeNS(null, 'height', h);
// 			svg.appendChild(rect);
// 		};
//
// 		const endDraw = (e) => {
// 			svg.removeEventListener('mousemove', drawRect);
// 			svg.removeEventListener('mouseup', endDraw);
// 		};
// 		
// 		svg.addEventListener('mousemove', drawRect);
// 		svg.addEventListener('mouseup', endDraw);
// 	});
// })


const history = shallowReactive([[]])
const index = ref(0)
const rectangles = ref([])
const selected = ref()
const adjusting = ref(false)

const onClick = ({ clientX: x, clientY: y }) => {
  if (adjusting.value) {
    adjusting.value = false
    selected.value = null
    push()
    return
  }

  selected.value = [...rectangles.value].reverse().find(rect => {
		const dx = x >= rect.x && x <= rect.x + rect.width 
		const dy = y >= rect.y && y <= rect.y + rect.height
		return dx && dy
  })

  // if (!selected.value) {
  //   rectangles.value.push({
  //     x, y,
		// 	width: 200,
		// 	height: 230
  //   })
  //   push()
  // }
}

const adjust = (rectangle) => {
  selected.value = rectangle
  adjusting.value = true
}

const push = () => {
  history.length = ++index.value
  history.push(clone(rectangles.value))
  console.log(toRaw(history))
}

const undo = () => rectangles.value = clone(history[--index.value])
const redo = () => rectangles.value = clone(history[++index.value])
const clone = (rectangles) => rectangles.map((c) => ({ ...c }))


const svg = ref()
const rect = ref()
const rct = ref()
const mouse = reactive({ 
	down: false,
	start: {}
})

const drawRect = ({clientX, clientY}) => {
	const {x, y} = mouse.start

	const w = Math.abs(clientX - x)
	const h = Math.abs(clientY - y)
	if (clientX > x) clientX = x
	if (clientY > y) clientY = y

	rect.value.setAttributeNS(null, 'x', clientX)
	rect.value.setAttributeNS(null, 'y', clientY)
	rect.value.setAttributeNS(null, 'width', w)
	rect.value.setAttributeNS(null, 'height', h)
	// rect.value.setAttributeNS(null, 'fill', "none")
	// rect.value.setAttributeNS(null, 'stroke', "black")
	// rect.value.setAttributeNS(null, 'stroke-width', 5)

	svg.value.appendChild(rect.value)
	rct.value = {x: clientX, y: clientY, width: w, height: h}
}

const mouseDown = ({clientX: x, clientY: y}) => {
	mouse.down = true
	mouse.start = {x, y}
	rect.value = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
}
const mouseMove = e => {
	if (mouse.down) drawRect(e)
}
const mouseUp = e => {
	mouse.down = false
	rectangles.value.push(rct.value)
	push()
	// svg.value.removeChild(rect.value)
}
</script>

<template>
	<svg id="svg" ref="svg" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp" >
		<rect v-for="rectangle in rectangles"
			:x="rectangle.x"
			:y="rectangle.y"
			:width="rectangle.width"
			:height="rectangle.height" 
      :fill="rectangle === selected ? '#ccc' : '#fff'"
      @click="selected = rectangle"
      @contextmenu.prevent="adjust(rectangle)"
		/>
	</svg>

	<div class="elements absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] [background-size:50px_50px]"></div>

  <div class="controls">
    <button @click="undo" :disabled="index <= 0">Undo</button>
    <button @click="redo" :disabled="index >= history.length - 1">Redo</button>
  </div>

  <div class="dialog" v-if="adjusting" @click.stop>
    <p>Adjust rectangle at ({{ selected.x }}, {{ selected.y }})</p>
    <input type="range" v-model="selected.width" min="1" max="600">
    <input type="range" v-model="selected.height" min="1" max="800">
  </div>
</template>

<style scoped>
svg {
  width: 99vw;
  height: 99vh;
  /* cursor: crosshair; */
  /* border: 1px solid #000000; */
  fill: none;
  stroke: #000000;
}
rect {
  /* fill: none; */
  /* stroke: #000000; */
  /* stroke-width: 10; */
}
.controls {
  position: fixed;
  top: 10px;
  left: 0;
  right: 0;
  text-align: center;
}

.controls button + button {
  margin-left: 6px;
}

.dialog {
  position: fixed;
  top: calc(50% - 50px);
  left: calc(50% - 175px);
  background: #fff;
  width: 350px;
  height: 100px;
  padding: 5px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}

.dialog input {
  display: block;
  width: 200px;
  margin: 0px auto;
}

.tip {
  text-align: center;
  padding: 0 50px;
  color: #bbb;
}
</style>
