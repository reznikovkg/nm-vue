<template>
    <div class="page-scene-2d">
        <scene :type="'2D'"/>
    </div>
</template>

<script>
	import Scene from "./../Elements/Scene";

    export default {
        name: "Scene2D",
        components: {
			Scene
        },
    }
</script>

<style scoped lang="less">

</style>
