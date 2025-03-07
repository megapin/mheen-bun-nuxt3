<script setup>
/*
// declare some global variables
let showSelection = false;
let Xstart;
let Ystart;

$(document).ready(function(){

    $(document).mousedown(function(event){
        // set a variable that indicates the user is drawing a selection
        showSelection=true;

        // save the position where the mouse click started
        Xstart=event.pageX;
        Ystart=event.pageY;

        // create the select box element and give it some starting positions
        $('<div id="selection"></div>')
            .css({
                "left": Xstart + 'px',
                "top": Ystart + 'px',
            })
        .appendTo(document.body);
    });

    $(document).mousemove(function(event){
        
        // if we are making a selection lets keep updating our select box dimensions
        if(showSelection == true) {
            
            // horizontal selection
            if (event.pageX > Xstart) {
                // left to right
                $('#selection').css({
                    "width": event.pageX-Xstart + 'px'
                })
            } else {
                // right to left
                $('#selection').css({
                    "left": event.pageX,
                    "width": Xstart-event.pageX + 'px'
                })
            }

            // vertical selection
            if (event.pageY > Ystart) {
                // top to bottom
                $('#selection').css({
                    "height": event.pageY-Ystart + 'px'
                })
            } else {
                // bottom to top
                $('#selection').css({
                    "top": event.pageY,
                    "height": Ystart-event.pageY + 'px'
                })
            }
        }

    });

    $(document).mouseup(function(event){

        // we can borrow the needed values from the #selection element to draw our 'area' :)
        LeftVal = $("#selection").css('left')
        TopVal = $("#selection").css('top')
        WidthVal = $("#selection").css('width')
        HeightVal = $("#selection").css('height')

        // create the area element and give it the dimensions
        $('<div class="area"></div>')
            .css({
                "left": LeftVal,
                "top": TopVal,
                "width": WidthVal,
                "height": HeightVal
            })
            .appendTo(document.body);
        
        // get rid of the selection element from the DOM
        $( "#selection" ).remove();
        // and set our showSelection variable back to false
        showSelection=false;

    });
});
*/


const wrap = ref()
const divs = ref([])
const div = ref()
const mouse = reactive({ down: false, start: {} })
const selected = ref()
const adjusting = ref(false)

const mouseDown = ({pageX, pageY}) => {
	mouse.down = true
	mouse.start.x = pageX
	mouse.start.y = pageY
}
const mouseMove = ({pageX, pageY}) => {
	if (mouse.down) {
		const {x, y} = mouse.start
		const w = Math.abs(pageX - x)
		const h = Math.abs(pageY - y)
		if (pageX > x) pageX = x
		if (pageY > y) pageY = y
		if (w * h >= 9)
			div.value = {x: pageX, y: pageY, w, h}
	}
}
const mouseUp = (e) => {
	mouse.down = false;
	divs.value.push(div.value)
}
const adjust = div => {
	selected.value = div
	adjusting.value = true
}
</script>

<template>
	<div ref="wrap" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp" class="wrap">
		<div v-if="mouse.down" 
			:style="`
				left: ${div?.x}px; 
				top: ${div?.y}px; 
				width: ${div?.w}px; 
				height: ${div?.h}px;
			`"></div>
		<div v-for="div in divs" 
			:style="`
				left: ${div.x}px; 
				top: ${div.y}px; 
				width: ${div.w}px; 
				height: ${div.h}px;
				background: ${div == selected ? '#eee' : '#fff'};
			`"
      @click="selected = div"
			@contextmenu.prevent="adjust(div)"></div>
	</div>
</template>

<style scoped lang="scss">
.wrap {
	position: relative;
	width: 99vw;
	height: 99vh;
	background: #eee;
	div {
		position: absolute;
		border: 1px solid gray;
		z-index: 9;
	}
}
/*
.area {
	position: absolute;
	background-color:lightgray;
}
#selection {
	position: absolute;
	background-color: lightblue;
	border: 2px solid blue;
}
*/
</style>
