<script setup>
import {useStStore} from '@/store/st'

const st = useStStore()
const {selectedFavor} = storeToRefs(st)
</script>

<template>
	<div class="">
		<AdminProducts v-if="selectedFavor == 1" />
	</div>
		<!-- <div class="col"> -->
		<AdminProjects v-if="selectedFavor == 2" />
	<!-- 	</div> -->
	<!-- </div> -->
</template>
