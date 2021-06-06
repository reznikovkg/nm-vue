<template>
    <div class="page-scene-3d">
        <scene :type="typesOfScene3d"/>
    </div>
</template>

<script>
	import Scene from "./../Elements/Scene";
	import typesOfScene from "./../../scene/typesOfScene";

	export default {
		name: "Scene3D",
		components: {
			Scene
		},
		computed: {
			typesOfScene3d: function () {
				return typesOfScene.SCENE_3D;
			}
		}
	}
</script>

<style scoped lang="less">

</style>
