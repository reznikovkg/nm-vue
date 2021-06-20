<template>
    <div class="page-scene-2d">
        <scene :type="typesOfScene2d"/>
    </div>
</template>

<script>
	import Scene from "./../Elements/Scene";
	import typesOfScene from "./../../scene/typesOfScene";

    export default {
        name: "Scene2D",
        components: {
			Scene
        },
        computed: {
        	typesOfScene2d: function () {
                return typesOfScene.SCENE_2D;
			}
        }
    }
</script>

<style scoped lang="less">

</style>
