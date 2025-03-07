<script setup>
import Moveable from "vue3-moveable";
import Selecto from "vue3-selecto";

const hitRate = 0;
const selectByClick = true;
const selectFromInside = false;
const toggleContinueSelect = ["shift"];
const ratio = 0;
const cubes = [];
for (let i = 0; i < 75; ++i) {
	cubes.push(i);
}
const targets = ref([]);
const moveableRef = ref(null);
const selectoRef = ref(null);
const onClickGroup = e => {
	selectoRef.value.clickTarget(e.inputEvent, e.inputTarget);
};
const onRender = e => {
	e.target.style.cssText += e.cssText;
};
const onRenderGroup = e => {
	e.events.forEach(ev => {
		ev.target.style.cssText += ev.cssText;
	});
};
const onDragStart = (e) => {
	const target = e.inputEvent.target;
	if (moveableRef.value.isMoveableElement(target)
			|| targets.value.some(t => t === target || t.contains(target))
	) {
		e.stop();
	}
};
const onSelect = e => {
	if (e.isDragStartEnd) {
		return;
	}
	targets.value = e.selected;
};
const onSelectEnd = e => {
	if (e.isDragStartEnd) {
		e.inputEvent.preventDefault();
		moveableRef.value.waitToChangeTarget().then(() => {
			moveableRef.value.dragStart(e.inputEvent);
		});
	}
	targets.value = e.selected;
};
</script>

<template>
    <!-- <div class="moveable app"> -->
    <!--     <div class=""> -->
        <!--     <div class="logo logos" id="logo" > -->
        <!--         <a href="https://github.com/daybrush/selecto" target="_blank" > -->
        <!--             <img src="https://daybrush.com/selecto/images/256x256.png" class="selecto"/> -->
        <!--         </a> -->
								<!-- <a href="https://github.com/daybrush/moveable" target="_blank"> -->
								<!-- 	<img src="https://daybrush.com/moveable/images/256x256.png"/> -->
        <!--         </a> -->
        <!--     </div> -->
        <!--     <h1>Select Moveable targets in real time.</h1> -->
        <!--     <p class="description">You can drag and move targets and select them.</p> -->
            <!-- <Moveable -->
            <!--     ref="moveableRef" -->
            <!--     :target="targets" -->
            <!--     :draggable="true" -->
            <!--     @clickGroup="onClickGroup" -->
            <!--     @render="onRender" -->
            <!--     @renderGroup="onRenderGroup"/> -->
            <!-- <Selecto -->
            <!--     ref="selectoRef" -->
            <!--     :dragContainer="'.elements'" -->
            <!--     :selectableTargets="['.target']" -->
            <!--     :hitRate="hitRate" -->
            <!--     :selectByClick="selectByClick" -->
            <!--     :selectFromInside="selectFromInside" -->
            <!--     :toggleContinueSelect="toggleContinueSelect" -->
            <!--     :ratio="ratio" -->
            <!--     @dragStart="onDragStart" -->
            <!--     @select="onSelect" -->
            <!--     @selectEnd="onSelectEnd"/> -->
						<!-- <div class="elements selecto-area"> -->
						<!-- 	<div class="cube-wrap flex flex-wrap"> -->
      <!--           <div class="cube target bg-gray-2 text-center" v-for="i in cubes" :key="i" >{{i}}</div> -->
						<!-- 	</div> -->
      <!--       </div> -->
            <!-- <div class="empty elements"></div> -->
    <!--     </div> -->
    <!-- </div> -->

	<Moveable
		ref="moveableRef"
		:target="targets"
		:draggable="true"
		@clickGroup="onClickGroup"
		@render="onRender"
		@renderGroup="onRenderGroup"/>
	<Selecto
		ref="selectoRef"
		:dragContainer="'.elements'"
		:selectableTargets="['.target']"
		:hitRate="hitRate"
		:selectByClick="selectByClick"
		:selectFromInside="selectFromInside"
		:toggleContinueSelect="toggleContinueSelect"
		:ratio="ratio"
		@dragStart="onDragStart"
		@select="onSelect"
		@selectEnd="onSelectEnd"/>

	<div class="elements absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] [background-size:50px_50px]"></div>


</template>

<style>
.cube-wrap {
	width: 100%;
	height: 100vh;
	padding: 5rem 10rem;
	/* border: 1px solid; */
}
.cube {
	width: 50px;
	height: 50px;
	align-content: center;
}
</style>
