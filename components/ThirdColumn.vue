<script setup lang="ts">
import {useStStore} from '@/store/st'

const pb = usePb()
const st = useStStore()
const {selectedProduct} = storeToRefs(st)
</script>

<template>
  <div>
		<h3 class="event__widget-title">{{selectedProduct?.name}}</h3>

		<div v-for="item in selectedProduct?.images" class="pb-30">
			<img :src="pb.files.getUrl(selectedProduct, item)" >
		</div>

		<AdminProductDetail v-if="selectedProduct" />
		<AdminAddProduct v-else />

	</div>
</template>
