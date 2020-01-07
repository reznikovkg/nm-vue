<template>
    <div class="scene">
        <div class="scene-canvas">
            <canvas ref="canvas"
                    @mousedown="canvasMouseDown"
                    @mousemove="canvasMouseDrag"
                    @mouseup="canvasMouseUp"
                    @wheel="canvasMouseWheel"/>
        </div>

        <navigation :scene="type"/>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
	import Navigation from "./../Navigation";

	export default {
		name: "Scene",
        props: {
			type: {
				type: String,
                default: null
            }
        },
		components: {
			Navigation
        },
		computed: {
			canvas: function () {
				return this.$refs.canvas;
			}
		},
		mounted() {
			this.initScene({
				canvas: this.canvas,
				type: this.type
			});
			window.addEventListener(`resize`, event => {
				this.setSizeCanvas();
				this.reRender();
			}, false);
		},
		methods: {
			...mapActions('scene', [
				'initScene',
				'setSizeCanvas',
				'reRender',
			]),
			...mapActions('navigation', [
				'mouseDown',
				'mouseDrag',
				'mouseUp',
				'mouseWheel',
			]),

			canvasMouseDown(e) {
				this.mouseDown(e);
			},
			canvasMouseDrag: function (e) {
				this.mouseDrag(e);
			},
			canvasMouseUp: function (e) {
				this.mouseUp(e);
			},
			canvasMouseWheel: function (e) {
				this.mouseWheel(e);
			},

		}
	}
</script>

<style scoped lang="less">

</style>