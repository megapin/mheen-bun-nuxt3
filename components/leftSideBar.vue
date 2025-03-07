<script setup>
const visible = defineModel()
</script>

<template>
	<Sidebar v-model:visible="visible">
		<template #header>
			<div class="flex align-items-center gap-2">
				<Avatar image="/images/avatar/amyelsner.png" shape="circle" />
				<span class="font-bold">Amy Elsner</span>
			</div>
		</template>
		<p>dkssud vmfkdlaqb? ahgksi?</p>
	</Sidebar>
</template>
