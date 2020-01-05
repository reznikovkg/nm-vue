<template>
    <div class="page-scene-3d">
        <scene :type="'3D'"/>
    </div>
</template>

<script>
	import Scene from "./../Elements/Scene";

	export default {
		name: "Scene3D",
		components: {
			Scene
		},
	}
</script>

<style scoped lang="less">

</style>
