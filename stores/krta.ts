import { defineStore } from "pinia";

export const useKrtaStore = defineStore('krta', () => {
	const elysia = 'http://anais.mheen.net/elysia'

	const posts = ref([])
	const authors = ref([])

	const fetchPosts = async (term) => {
		const {data} = await useFetch(`${elysia}/terms/${term}`)
		if (data.value) {
			posts.value = data.value
		}
	}
	const fetchAuthors = async () => {
		const {data} = await useFetch(`${elysia}/authors`)
		if (data.value) authors.value = data.value
	}


	return {
		posts,
		fetchPosts,
		authors,
		fetchAuthors,
	}
})
