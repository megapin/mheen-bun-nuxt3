<script setup>
</script>

<template>
	<div class="wrapper">
		<input type="checkbox">
		<div class="video">
			<video src="https://www.robmillsarchitects.com/files/land/city/RMA_Web_land_city_1.mp4" loop muted autoplay playsinline></video>
		</div>
		<div class="text">
			<span data-text="Watch the video"></span>
		</div>
	</div>

	<!--- ## DRIBBBLE + TWITTER ############# -->
	<!-- <div class="socials"> -->
	<!-- 	<a class="dribbble" href="https://dribbble.com/shots/8998221-Video-button-animation-CodePen" target="_blank"> -->
	<!-- 		<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32"> -->
	<!-- 			<path fill-rule="evenodd" clip-rule="evenodd" fill="#EA4C89" d="M16 0C7.16703 0 0 7.16703 0 16C0 24.833 7.16703 32 16 32C24.8156 32 32 24.833 32 16C32 7.16703 24.8156 0 16 0ZM26.5683 7.37527C28.4772 9.70065 29.6226 12.6681 29.6573 15.8785C29.2061 15.7918 24.6941 14.872 20.1475 15.4447C20.0434 15.2191 19.9566 14.9761 19.8525 14.7332C19.5748 14.0738 19.2625 13.397 18.9501 12.7549C23.9826 10.7072 26.2733 7.75705 26.5683 7.37527ZM16 2.36009C19.4707 2.36009 22.6464 3.66161 25.0586 5.7961C24.8156 6.14317 22.7505 8.90239 17.8915 10.7245C15.6529 6.61171 13.1714 3.24512 12.7896 2.72451C13.8134 2.48156 14.8894 2.36009 16 2.36009ZM10.1866 3.64425C10.551 4.13015 12.9805 7.5141 15.2538 11.5401C8.86768 13.2408 3.22777 13.2061 2.62039 13.2061C3.50542 8.9718 6.36876 5.44902 10.1866 3.64425ZM2.32538 16.0174C2.32538 15.8785 2.32538 15.7397 2.32538 15.6009C2.9154 15.6182 9.54447 15.705 16.3644 13.6573C16.7636 14.4208 17.128 15.2017 17.4751 15.9826C17.3015 16.0347 17.1106 16.0868 16.9371 16.1388C9.89154 18.4121 6.14317 24.6247 5.8308 25.1453C3.6616 22.7332 2.32538 19.5228 2.32538 16.0174ZM16 29.6746C12.8416 29.6746 9.92625 28.5987 7.61822 26.7939C7.86117 26.2907 10.6377 20.9458 18.3427 18.256C18.3774 18.2386 18.3948 18.2386 18.4295 18.2213C20.3557 23.2017 21.1367 27.3839 21.3449 28.5813C19.6963 29.2928 17.8915 29.6746 16 29.6746ZM23.6182 27.3319C23.4794 26.4989 22.7505 22.5076 20.9631 17.5965C25.2495 16.9197 28.9978 18.0304 29.4664 18.1866C28.8764 21.987 26.6898 25.2668 23.6182 27.3319Z"></path> -->
	<!-- 		</svg> -->
	<!-- 	</a>  -->
	<!-- 	<a class="twitter" href="https://twitter.com/MilanRaring" target="_blank"> -->
	<!-- 		<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 72 72"> -->
	<!-- 			<path fill="black" d="M67.812 16.141a26.246 26.246 0 0 1-7.519 2.06 13.134 13.134 0 0 0 5.756-7.244 26.127 26.127 0 0 1-8.313 3.176A13.075 13.075 0 0 0 48.182 10c-7.229 0-13.092 5.861-13.092 13.093 0 1.026.118 2.021.338 2.981-10.885-.548-20.528-5.757-26.987-13.679a13.048 13.048 0 0 0-1.771 6.581c0 4.542 2.312 8.551 5.824 10.898a13.048 13.048 0 0 1-5.93-1.638c-.002.055-.002.11-.002.162 0 6.345 4.513 11.638 10.504 12.84a13.177 13.177 0 0 1-3.449.457c-.846 0-1.667-.078-2.465-.231 1.667 5.2 6.499 8.986 12.23 9.09a26.276 26.276 0 0 1-16.26 5.606A26.21 26.21 0 0 1 4 55.976a37.036 37.036 0 0 0 20.067 5.882c24.083 0 37.251-19.949 37.251-37.249 0-.566-.014-1.134-.039-1.694a26.597 26.597 0 0 0 6.533-6.774z"></path> -->
	<!-- 		</svg> -->
	<!-- 	</a>  -->
	<!-- </div> -->
</template>

<style lang="scss" scoped>
.wrapper {
  --color: #1F242D;
  --color-invert: #ffffff;
  --clip-path: circle(15px at left);
  --clip-path-hover: circle(70px at left);
  --clip-path-clicked: circle(100vw at left);
  --duration: .4s;
  --timing-function: ease;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  .video {
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 15px;
    clip-path: var(--clip-path);
    transition: clip-path var(--duration) var(--timing-function);
    video {
      position: fixed;
      background: #c4cbde;
      top: 50%;
      left: 50%;
      min-width: 100%;
      min-height: 100%;
      width: auto;
      height: auto;
      transform: translate(-50%, -50%);
    }
  }
  .text {
    position: relative; 
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: .2px;
    opacity: var(--opacity, 1);
    transition: opacity .3s var(--timing-function) .2s;
    &::before,
    &::after {
      content:"";
      position: absolute;
      bottom: 0;
      left: -1px;
      right: 25px;
      height: 0;
    }
    &::before {
      box-shadow: 26px 0 0 1px var(--color);
      right: var(--r, 100%);
      opacity: var(--opacity, 0);
      transition: right .5s ease-in, opacity .1s linear;
    }
    &::after {
      box-shadow: 26px 0 0 1px var(--color-invert);
      clip-path: var(--clip-path);
      transition: clip-path var(--duration) var(--timing-function);
    }
    > span {
      &::before,
      &::after {
        content: attr(data-text);
        padding-left: 26px;
      }
      &::before {
        color: var(--color);
      }
      &::after {
        color: var(--color-invert);
        clip-path: var(--clip-path);
        transition: clip-path var(--duration) var(--timing-function);
        position: absolute;
        left: 0;
      }
    } 
  }
  input {
    width: 220px;
    height: 40px;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    border-radius: 40px;
    outline: none; 
    z-index: 2;
    appearance: none;
    cursor: pointer;
    &:focus {
      outline: 0;
    }
    &:hover {
      ~ .video {
        clip-path: var(--clip-path-hover);
      }
      ~ .text {
        &::before {
          --r: 25px;
          --opacity: 1;
        }
        &::after {
          clip-path: var(--clip-path-hover);
        }
        > span {
          &::after {
            clip-path: var(--clip-path-hover);
          }
        }
      }
    }
    &:checked {
      width: 100%;
      height: 100%;
      border-radius: 0;
      ~ .video {
        clip-path: var(--clip-path-clicked);
      }
      ~ .text {
        --opacity: 0;
        transition: opacity .3s var(--timing-function);
        &::after {
          clip-path: var(--clip-path-clicked);
        }
        > span {
          &::after {
            clip-path: var(--clip-path-clicked);
          }
        }
      }
    }
  }
}

//--- ## BASIC #############
body {
  background: #E8EBF3;
  height: 100vh;
  font: 400 16px 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .socials {
    position: fixed;
    display: block;
    left: 20px;
    bottom: 20px;
    z-index: 9999;
    > a {
      display: block;
      width: 30px;
      opacity: .2;
      transform: scale(var(--scale, .8));
      transition: transform .3s cubic-bezier(0.38,-0.12, 0.24, 1.91);
      &:hover {
        --scale: 1;
      }
    }
  }
}
</style>
