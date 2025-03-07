<script setup>
import Editor from '@tinymce/tinymce-vue'
import {useKrtaStore} from '@/stores/krta'

// const pb = usePb()
// const chapters = await pb.collection('krta_test').getFullList({expand: {krta_author: 'name'}})
// const authors = await pb.collection('krta_authors').getFullList()
// // const krta_author = chapters[0].krta_author
// const krta_author = authors.find(a => a.id == chapters[0].krta_author)?.id

const krta = useKrtaStore()
// const {posts, fetchPosts} = storeToRefs(krta)
await krta.fetchPosts(1)
await krta.fetchAuthors()
console.log(krta.authors, krta.posts)

const chapters = ref([
	{ id: 1, name: '건강한 조직', code: 'org', svg: 'swatch', icon: 'column-dependency'},
	{ id: 2, name: '건강한 정책', code: 'pol', svg: 'podium', icon: 'compass'},
	{ id: 3, name: '건강한 소통', code: 'com', svg: 'focus', icon: 'compare'},
	{ id: 4, name: "We are RT's", code: 'sample', svg: 'triCircle', icon: 'calls-incoming'},
])
const term = ref(1)
const post = ref(krta.posts[0])
const title = ref()

const onChapter = async (item) => {
	term.value = item.id
	await krta.fetchPosts(item.id)
}
const onTitle = (item) => {
	post.value = krta.posts.find(p => p.ID == item.ID)
}
const add = () => {
	post.value = {post_title: '', post_content: ''}
	title.value.focus()
}
const save = async () => {
	const res = await pb.collection('krta_test').create(post.value)
	console.log(res)
}
const onShow = (e,item) => {
	navigateTo(item.guid, {external:true, open:{target:'_blank'}})
}
</script>

<template>
	<!-- {{krta.authors}} -->
	<!-- <hr> -->
	<!-- {{krta.posts}} -->
	<div w27>
		<div v-for="item in chapters"
			@click="onChapter(item)"
			p3 text-center rounded m-1 cursor-pointer 
			:bg="item.id == term && 'black'" 
			:text="item.id == term && 'white'"
			hover="text-white bg-gray-500" >
			<div :class="`i-carbon-${item.icon} text-4xl ma`" />
			<div text-sm break-keep>{{item.name}}</div>
		</div>
	</div>

	<div w-full>
		<!-- <component :is="resolved[comp]" /> -->

		<div grid grid-cols-4 w-full gap4>
			<div col>
				<div flex justify-end p3 gap2>
					<button bg="blue-700 hover:blue-400" p="x3 y1" text="white xl" border="rounded" @click="add">new</button>
					<button bg="gray-700 hover:gray-400" p="x3 y1" text="white xl" border="rounded" @click="save">save</button>
				</div>
				<div overflow-auto h-80vh pt3 pr2>
					<ol font-sans p0 m0>
						<li v-for="item in krta?.posts" @click="onTitle(item)" 
							list-none relative mb4 ml5 py2 px4 cursor-pinter
							:class="item.ID == post.ID ? 'bg-gray-500 text-white font-bold' : 'bg-gray-100'">
							{{item.post_title}}
							<div i-carbon-screen text-4 flex-inline @click="onShow($event,item)" />
						</li>
					</ol>
					<p text-3>This was adapted from 
						<a text-red-5 href="http://www.456bereastreet.com/archive/201105/styling_ordered_list_numbers/">
							456bereastreet
						</a>.
					</p>
				</div>
			</div>

			<div col-span-3 col-start-2>
				<div w-full h-80vh>
					<div w-full p3 px0 flex>
						<input ref="title" p3 v-model="post.post_title" b-none text-2xl w-50vw />
						<select v-model="post.post_author" p3 ml5 text-xl appearance-none wa>
							<option v-for="item in krta.authors" :value="item.ID" p2>{{item.display_name}}</option>
						</select>
					</div>
					<Editor v-model="post.post_content"
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
						h-full />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
ol {
  counter-reset:li; /* Initiate a counter */
  li {
    &:before {
			content:counter(li); /* Use the counter as content */
			counter-increment:li; /* Increment the counter by 1 */
			/* Position and style the number */
			position:absolute;
			top: -16px;
			left: -30px;
			box-sizing:border-box;
			width:2em;
			/* Some space between the number and the content in browsers that support
				 generated content but not positioning it (Camino 2 is one example) */
			margin-right:8px;
			color: #A8CABA;
			font-weight:bold;
			font-family:"Helvetica Neue", Arial, sans-serif;
			font-size: 30px;
			text-align:center;
			text-shadow:
				3px 3px 0 #838689,
				-1px -1px 0 #838689,  
				1px -1px 0 #838689,
				-1px 1px 0 #838689,
				1px 1px 0 #838689;
    }
		&:hover:before {
			color: #EBE3AA;
		}
  }
}

table, th, td { border: 1px solid; }
table { border-collapse: collapse; }
</style>
