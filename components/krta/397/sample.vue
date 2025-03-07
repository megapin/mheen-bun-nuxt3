<script setup>
import Editor from '@tinymce/tinymce-vue'

const pb = usePb()
const items = await pb.collection('krta_test').getFullList({expand: {krta_author: 'name'}})
const authors = await pb.collection('krta_authors').getFullList()
// const krta_author = items[0].krta_author
console.log(items)
const krta_author = authors.find(a => a.id == items[0].krta_author)?.id

const title = ref()
const selectedItem = ref({...items[0], krta_author})

const add = () => {
	selectedItem.value = {title: '', content: ''}
	title.value.focus()
}
const save = async () => {
	const res = await pb.collection('krta_test').create(selectedItem.value)
	console.log(res)
}

const {data} = await useFetch('http://anais.mheen.net/elysia/terms/4')
// const bufKeys = Object.keys(data[0]).map(k => data[0][k]?.type == 'Buffer')
// data.forEach(d => {
// 	d.title = Buffer.from(d.post_title).toString()
// })
</script>

<template>
	<div grid grid-cols-4 w-full gap4>
		<div p2 pt4>
			<div @click="selectedItem = item" v-for="item in data" p2>
				{{item.post_title}}
			</div>
			<div p3>
				<button bg="gray-700 hover:gray-400" p="x3 y0" text="white xl" border="rounded" @click="save">save</button>
				<button bg="blue-700 hover:blue-400" p="x3 y0" text="white xl" border="rounded" @click="add">new</button>
			</div>
		</div>

		<div p4 pt0 col-span-3 col-start-2>
			<!-- <keep-alive> -->
			<!-- <client-only> -->
			<main id="sample">
				<div w-full p3 px0>
					<input ref="title" p3 v-model="selectedItem.post_title" b-none text-2xl w-50% />
					<!-- <input p3 v-model="selectedItem.status" /> -->
					<select v-model="selectedItem.post_author" p3 ml5 text-xl w30 appearance-none>
						<option v-for="item in authors" :value="item.id" p2>{{item.name}}</option>
					</select>
				</div>
				<Editor
					api-key="y32biavdwl481ocayh8x0dywbc3habrx4yypwfvbujjksyny"
					:init="{
						toolbar_mode: 'sliding',
						plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
						toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
						tinycomments_mode: 'embedded',
						tinycomments_author: 'Author name',
						mergetags_list: [
							{ value: 'First.Name', title: 'First Name' },
							{ value: 'Email', title: 'Email' },
						],
						ai_request: 'no ai',
					}"
					v-model="selectedItem.post_content"
					h-full />
						<!-- plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss', -->
						<!-- ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")), -->
					<!-- :initial-value="selectedItem.content" -->
			</main>
			<!-- </client-only> -->
			<!-- </keep-alive> -->
		</div>
	</div>
</template>

<style scoped lang="scss">
@media (min-width: 1024px) {
  #sample {
    // display: flex;
    // flex-direction: column;
    // place-items: center;
    width: 100%;
		height: 80vh;
  }
}

table, th, td { border: 1px solid; }
table { border-collapse: collapse; }
</style>
