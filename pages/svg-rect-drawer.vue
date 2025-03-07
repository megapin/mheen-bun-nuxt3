<script setup>
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

  if (!selected.value) {
    rectangles.value.push({
      x, y,
			width: 200,
			height: 230
    })
    push()
  }
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


const mouse = reactive({
	current: { x: 0, y: 0 },
	previous: { x: 0, y: 0 },
	down: false
})
const rect = reactive({
	x: 0, y: 0, width: 0, height: 0
})

const draw = (e) => {
	if (mouse.down) {
	// 	const c = document.getElementById("canvas")
	// 	const ctx = c.getContext("2d")
	// 	ctx.clearRect(0,0, canvasW, canvasH)
	// 	// ctx.setLineDash([4])
	// 	ctx.strokeRect(rect.x, rect.y, rect.w, rect.h)

		// console.log(rect)
	}
}
const mouseDown = (e) => {
	mouse.down = true
	mouse.current = {
		x: e.clientX,
		y: e.clientY
	}
	rect.x = mouse.current.x
	rect.y = mouse.current.y
}
const mouseMove = (e) => {
	// mouse.current = {
	// 	x: e.clientX,
	// 	y: e.clientY
	// }
	if (mouse.down) {
		// rect.width = mouse.current.x - rect.x
		// rect.height = mouse.current.y - rect.y
		rect.width = e.clientX <= rect.x ? rect.x - e.clientX : e.clientX - rect.x
		rect.height = e.clientY <= rect.y ? rect.y - e.clientY : e.clientY - rect.y
		rect.x = e.clientX <= rect.x ? e.clientX : rect.x
		rect.y = e.clientY <= rect.y ? e.clientY : rect.y
		draw(e)
	}
}
const mouseUp = () => {
	// rectangles.value.push(rect)
	rectangles.value.push({
		x: rect.x, 
		y: rect.y,
		width: rect.width,
		height: rect.height
	})
	push()
	mouse.down = false
}
</script>

<template>
  <!-- <svg @click="onClick"> -->
  <svg @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp">
    <foreignObject x="0" y="40%" width="100%" height="200">
      <p class="tip">
        Click on the canvas to draw a rectangle. Click on a circle to select it.
        Right-click on the canvas to adjust the radius of the selected rectangle.
      </p>
    </foreignObject>
    <rect
      v-for="rectangle in rectangles"
      :x="rectangle.x"
      :y="rectangle.y"
			:width="rectangle.width"
			:height="rectangle.height"
      :fill="rectangle === selected ? '#ccc' : '#fff'"
      @click="selected = rectangle"
      @contextmenu.prevent="adjust(rectangle)"
    ></rect>
  </svg>

  <div class="controls">
    <button @click="undo" :disabled="index <= 0">Undo</button>
    <button @click="redo" :disabled="index >= history.length - 1">Redo</button>
  </div>

  <div class="dialog" v-if="adjusting" @click.stop>
    <p>Adjust radius of rectangle at ({{ selected.x }}, {{ selected.y }})</p>
    <input type="range" v-model="selected.width" min="1" max="600">
    <input type="range" v-model="selected.height" min="1" max="800">
  </div>

	<!-- <div class="elements absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] [background-size:50px_50px]"></div> -->
</template>

<style scoped>
body {
  margin: 0;
  overflow: hidden;
}

svg {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}

rect {
  stroke: #000;
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
