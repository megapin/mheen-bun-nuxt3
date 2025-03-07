<script setup>
// useHead({ 
// 	script: [ 
// 		{ src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js', type: 'text/javascript' }, 
// 	] 
// })

// import $ from 'jquery'
// window.jQuery = window.$ = $
// export default jQuery;

import gsap from 'gsap'

const m = ref()
onMounted(() => {
	// window.jQuery = window.$ = $

	var cw = window.innerWidth,
			ch = window.innerHeight,
			nWaves = 5,
			waves = [],
			amp = 10,
			speed = 0.4,
			detail = 30,
			waveY = 0;

	for (var w = 0; w < nWaves; w++) {
		var p = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
		waves.push(p);
		// $('#m').append(p);
		m.value.append(p);
		gsap.set(p, {
			attr: () => { 
				return (w == 0) 
					? {fill:'#fff'} 
					: {fill:'none', stroke:'#fff', 'stroke-dasharray':'2 4', 'stroke-width':3-w/nWaves*3}
			}
		});
	}

	gsap.timeline({defaults:{duration:1}, delay:0.9})
			.from('.txt1', {opacity:0, ease:'power2.inOut'}, 0)
			.to(window, {scrollTo:ch/2}, 0);

	gsap.ticker.add(drawWave);

	function drawWave(t) { 
		// if (waveY!=-$(window).scrollTop()) gsap.to(window, {duration:1, waveY:Math.round($(window).scrollTop())});
		// if (waveY != -window.scrollY) gsap.to(window, {duration: 1, waveY: Math.round(window.scrollY)});
		
		for (var k=0; k<nWaves; k++) {
			var p = waves[k],
					offset = (1 - k/nWaves) * nWaves/6,
					pts = '';
			
			for(var i=-1; i<(cw+detail); i+=detail) {
				var y = ch-waveY;
				y += Math.sin(i * 0.003 - t/speed + offset) * amp;
				y += Math.sin(i * 0.004 - t/speed + offset) * amp;
				y += Math.sin(i * -0.011 - t/speed + 20+offset) * amp;
				pts += i.toFixed(2)+','+y.toFixed(2)+' ';
			}
			
			gsap.set(p, {attr:{points:'-20,-20 -20,'+ch/2+' '+pts+' '+cw+',-20'}});
		}  
	}

	// $(window).on('resize', ()=>{ cw=window.innerWidth; ch=window.innerHeight; })
	cw = window.innerWidth; ch = window.innerHeight; 
})
</script>

<template>
	<div class="scrollDist"></div>
	<svg class="container" width="100%" height="100%">
		<defs>
		<mask id="m" ref="m"></mask>
		<g id="txt2">
			<rect width="750" height="120" fill="none" />
			<text class="txt2" x="0" y="0" stroke="#fff">DEVELOPMENT</text>
		</g>

		<g id="txt1">    
			<rect width="750" height="120" fill="none" />    
			<text class="txt1" x="107" y="0" fill="#000" letter-spacing="0.15">ANIMATION</text>
		</g>
		</defs>
	 
		<use xlink:href="#txt2" x="50%" y="50%" transform="translate(-375 0)" />
		
		<g mask="url(#m)">
			<rect fill="#fff" width="100%" height="100%" />
			<use xlink:href="#txt1" x="50%" y="50%" transform="translate(-375 0)" />
		</g>
	</svg>
</template>

<style scoped >
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');

body, html {
  background: black; 
  overflow-x:hidden;
  overflow-y:scroll;
  font-family: 'Montserrat', sans-serif;
  font-size:90px;
}

.scrollDist{
  width:100%;
  height:200%;
  position:absolute;
}

svg {
  position:fixed;
}
</style>
