<script setup>
/*
Vue.component('draw-rectangle-board', {
  props: ['imagesrc'],
  data: function () {
    return {
      mouse: {
        current: { x: 0, y: 0 },
        previous: { x: 0, y: 0 },
        down: false
      },
      rect:{
        startX:0, startY:0,
        w:0, h:0
      },
      img:null
    }
  },
  computed: {
    currentMouse: function () {
      var c = document.getElementById("canvas");
      var rect = c.getBoundingClientRect();
      return {
        x: this.mouse.current.x - rect.left,
        y: this.mouse.current.y - rect.top
      }
    }
  },
  template: '<canvas id="canvas" v-on:mousedown="handleMouseDown" v-on:mouseup="handleMouseUp" v-on:mousemove="handleMouseMove" width="800px" height="800px"></canvas>',
  methods: {
    draw: function (event) {
       if (this.mouse.down ) {
          var c = document.getElementById("canvas");
         var ctx = c.getContext("2d");
         ctx.drawImage(this.img,0,0);  // ctx.clearRect(0,0,800,800);
         ctx.setLineDash([1]);
         ctx.strokeRect(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);
       }
    },
    handleMouseDown: function (event) {
      this.mouse.down = true;
      this.mouse.current = {
        x: event.pageX,
        y: event.pageY
      }
			this.rect.startX = this.mouse.current.x;
			this.rect.startY = this.mouse.current.y;
    },
    handleMouseUp: function () {
      this.mouse.down = false;
    },
    handleMouseMove: function (event) {
      this.mouse.current = {
        x: event.pageX,
        y: event.pageY
      }
      if (this.mouse.down) {
        this.rect.w = this.mouse.current.x - this.rect.startX;
        this.rect.h = this.mouse.current.y - this.rect.startY ;
        // ctx.clearRect(0,0,canvas.width,canvas.height);
        this.draw(event)
      }
    }
  },
	ready: function () {   
		var c = document.getElementById("canvas");
		var ctx = c.getContext("2d");
		ctx.translate(0.5, 0.5);
		ctx.imageSmoothingEnabled= false;
		// var img = document.getElementById("imageRef");
		// ctx.drawImage(img);
		var img = new Image
		img.onload = function(){
			ctx.drawImage(img, this.x, this.y)
			c.width = img.width
			c.height = img.height
		}
		img.src = this.imagesrc
		this.img = img
		c.width = img.width
		c.height = img.height  
	}
})

var app = new Vue({
  el: "#app",
  data: {},
})
*/


const canvasW = 1920, canvasH = 1080
const canvas = ref()
const ctx = ref()
const mouse = reactive({ down: false })
const rect = reactive({ x:0, y:0, w:0, h:0 })

const draw = (e) => {
	ctx.value.clearRect(0,0, canvasW, canvasH)
	ctx.value.setLineDash([4])
	ctx.value.strokeRect(rect.x, rect.y, rect.w, rect.h)
}
const mouseDown = (e) => {
	mouse.down = true
	rect.x = e.pageX
	rect.y = e.pageY
	ctx.value = canvas.value.getContext("2d")
}
const mouseMove = (e) => {
	if (mouse.down) {
		rect.w = e.pageX - rect.x
		rect.h = e.pageY - rect.y
		draw(e)
	}
}
const mouseUp = () => {
	mouse.down = false
	console.log(ctx.value)
}
</script>

<template>
	<canvas id="canvas" ref="canvas"
		@mousedown="mouseDown" 
		@mousemove="mouseMove" 
		@mouseup="mouseUp" 
		:width="`${canvasW}px`" 
		:height="`${canvasH}px`">
	</canvas>
	<div class="elements absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] [background-size:50px_50px]"></div>
</template>
