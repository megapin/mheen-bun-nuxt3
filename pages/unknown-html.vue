<script setup>
/*
const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("favDialog");
const outputBox = document.querySelector("output");
const selectEl = favDialog.querySelector("select");
const confirmBtn = favDialog.querySelector("#confirmBtn");

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
  favDialog.showModal();
});

// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
favDialog.addEventListener("close", (e) => {
  outputBox.value =
    favDialog.returnValue === "default"
      ? "No return value."
      : `ReturnValue: ${favDialog.returnValue}.`; // Have to check for "default" rather than empty string
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  favDialog.close(selectEl.value); // Have to send the select box value here.
});
*/
const favDialog = ref()
const animal = ref()
const showDialog = () => favDialog.value.showModal()
const cancel = () => favDialog.value.close()
const ok = () => { }
</script>

<template>
		<!-- <div class="grid grid-cols-3 grid-rows-3 g-1 w-full"> -->
		<!-- 	<div class="col-span-2 col-start-2 b-solid b-1">1</div> -->
		<!-- 	<div class="row-span-2 row-start-2 bg-gray-1">2</div> -->
		<!-- </div> -->
	<!-- <div class="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"> -->
	<div p5 grid grid-cols-5 grid-rows-1 gap-3 grid-flow-col>
		<div>
			<div>
				<label for="dino">선택: </label>
				<select id="dino">
					<optgroup label="Theropods">
						<option>Tyrannosaurus</option>
						<option>Velociraptor</option>
						<option>Deinonychus</option>
					</optgroup>
					<optgroup label="Sauropods">
						<option>Diplodocus</option>
						<option>Saltasaurus</option>
						<option>Apatosaurus</option>
					</optgroup>
				</select>

				<h1>세이브 대마왕은 누구인가?</h1>
				<section>
					<h2>이제 갓 20살 인데?</h2>
					<p>
						이 문서는 올바른 Apple을 선택하는 중요한 작업에 도움이 되는 가이드를 제공합니다.
					</p>
				</section>

				<!-- <div m2 flex justify-center text-2xl op30 hover="op80"> -->
				<hgroup pl-2 b-l-solid b-10 b-gray-4 hover="b-black" transition-400>
					<h1 mb-0 animate-bounce-alt animate-count-1 animate-duration-1s>프랑켄슈타인</h1>
					<p m-0 animate-bounce-alt animate-count-1 animate-duration-1s animate-delay-1s>Or: The Modern Prometheus</p>
				</hgroup>
				<p>
					스위스 과학자 빅터 프랑켄슈타인(Victor Frankenstein)은 지적인 생명체를 창조하겠다는 큰 야망을 가지고 있습니다. 
					그러나 그의 창조물이 처음으로 움직이자 그는 자신이 괴물을 만들었다는 것을 깨달았습니다.
					주인에게 버림받고, 보는 사람 모두도 기피하는 괴물은 프랑켄슈타인 박사를 따라 지구 끝까지 갑니다.
				</p>
			</div>

			<div font-gowun>
				<h1>방망이를 헛돌리는 최선의 방법</h1>
				<section>
					<h2>소개</h2>
					<p>
						이 문서는 올바른 Apple을 선택하는 중요한 작업에 도움이 되는 가이드를 제공합니다.
					</p>
				</section>

				<!-- <div m2 flex justify-center text-2xl op30 hover="op80"> -->
				<hgroup pl-2 b-l-solid b-10 b-gray-4 hover="b-black" transition-400>
					<h1 mb-0 animate-bounce-alt animate-count-1 animate-duration-1s>프랑켄슈타인</h1>
					<p m-0 animate-bounce-alt animate-count-1 animate-duration-1s animate-delay-1s>Or: The Modern Prometheus</p>
				</hgroup>
				<p font-gowun>
					스위스 과학자 빅터 프랑켄슈타인(Victor Frankenstein)은 지적인 생명체를 창조하겠다는 큰 야망을 가지고 있습니다. 
					그러나 그의 창조물이 처음으로 움직이자 그는 자신이 괴물을 만들었다는 것을 깨달았습니다.
					주인에게 버림받고, 보는 사람 모두도 기피하는 괴물은 프랑켄슈타인 박사를 따라 지구 끝까지 갑니다.
				</p>
			</div>
		</div>

		<div>
			<div font-iropke>
				<form>
					<fieldset rounded-1>
						<legend>Choose your favorite monster</legend>

						<input type="radio" id="kraken" name="monster" value="K" />
						<label for="kraken">Kraken</label><br />

						<input type="radio" id="sasquatch" name="monster" value="S" />
						<label for="sasquatch">Sasquatch</label><br />

						<input type="radio" id="mothman" name="monster" value="M" />
						<label for="mothman">Mothman</label>
					</fieldset>
				</form>

				<h1>올바른 애플을 고르는 방법</h1>
				<section>
					<h2>Introduction</h2>
					<p>
						이 문서는 올바른 Apple을 선택하는 중요한 작업에 도움이 되는 가이드를 제공합니다.
					</p>
				</section>

				<!-- <div m2 flex justify-center text-2xl op30 hover="op80"> -->
				<hgroup pl-2 b-l-solid b-10 b-gray-4 hover="b-black" transition-400>
					<h1 mb-0 animate-bounce-alt animate-count-1 animate-duration-1s>프랑켄슈타인</h1>
					<p m-0 animate-bounce-alt animate-count-1 animate-duration-1s animate-delay-1s>Or: The Modern Prometheus</p>
				</hgroup>
				<p>
					스위스 과학자 빅터 프랑켄슈타인(Victor Frankenstein)은 지적인 생명체를 창조하겠다는 큰 야망을 가지고 있습니다. 
					그러나 그의 창조물이 처음으로 움직이자 그는 자신이 괴물을 만들었다는 것을 깨달았습니다.
					주인에게 버림받고, 보는 사람 모두도 기피하는 괴물은 프랑켄슈타인 박사를 따라 지구 끝까지 갑니다.
				</p>
			</div>
		</div>

		<div>
			<div>
				<form>
					<fieldset rounded-1>
						<legend>Choose your favorite monster</legend>

						<input type="radio" id="kraken" name="monster" value="K" />
						<label for="kraken">Kraken</label><br />

						<input type="radio" id="sasquatch" name="monster" value="S" />
						<label for="sasquatch">Sasquatch</label><br />

						<input type="radio" id="mothman" name="monster" value="M" />
						<label for="mothman">Mothman</label>
					</fieldset>
				</form>

				<h1 font-gowun>올바른 애플을 고르는 방법</h1>
				<section>
					<h2>인트로덕션</h2>
					<p>
						이 문서는 올바른 Apple을 선택하는 중요한 작업에 도움이 되는 가이드를 제공합니다.
					</p>
				</section>

				<!-- <div m2 flex justify-center text-2xl op30 hover="op80"> -->
				<hgroup pl-2 b-l-solid b-10 b-gray-4 hover="b-black" transition-400>
					<h1 mb-0 animate-bounce-alt animate-count-1 animate-duration-1s font-gowun>프랑켄슈타인</h1>
					<p m-0 animate-bounce-alt animate-count-1 animate-duration-1s animate-delay-1s>Or: The Modern Prometheus</p>
				</hgroup>
				<p>
					스위스 과학자 빅터 프랑켄슈타인(Victor Frankenstein)은 지적인 생명체를 창조하겠다는 큰 야망을 가지고 있습니다. 
					그러나 그의 창조물이 처음으로 움직이자 그는 자신이 괴물을 만들었다는 것을 깨달았습니다.
					주인에게 버림받고, 보는 사람 모두도 기피하는 괴물은 프랑켄슈타인 박사를 따라 지구 끝까지 갑니다.
				</p>
			</div>

			<div>
				<article class="forecast">
					<h1>부천: 3일간 날씨 전망</h1>
					<article class="day-forecast">
						<h2>03 March 2018</h2>
						<p>Rain.</p>
					</article>
					<article class="day-forecast">
						<h2>04 March 2018</h2>
						<p>Periods of rain.</p>
					</article>
					<article class="day-forecast">
						<h2>05 March 2018</h2>
						<p>Heavy rain.</p>
					</article>
				</article>

				<dl>
					<dt>Beast of Bodmin</dt>
					<dd>A large feline inhabiting Bodmin Moor.</dd>

					<dt>Morgawr</dt>
					<dd>A sea serpent.</dd>

					<dt>Owlman</dt>
					<dd>A giant owl-like creature.</dd>
				</dl>

				<details>
					<summary>Details</summary>
					<p>Something small enough to escape casual notice.</p>
				</details>

				<!-- A modal dialog containing a form -->
				<dialog ref="favDialog" id="favDialog">
					<form>
						<p>
							<label>
								좋아하는 동물:
								<select v-model="animal">
									<option value="default">선택...…</option>
									<option>브라인 쉬림프</option>
									<option>레드 판다</option>
									<option>스파이더 몽키</option>
								</select>
							</label>
						</p>
						<div>
							<button @click="cancel" value="cancel" formmethod="dialog">취소</button>
							<button @click="ok" id="confirmBtn" value="default">확인</button>
						</div>
					</form>
				</dialog>
				<p>
					<button @click="showDialog">HTML 다이얼로그</button>
				</p>
				<output>{{animal}}</output>
			</div>

		</div>
	</div>
</template>

<style scoped lang="scss">
</style>
