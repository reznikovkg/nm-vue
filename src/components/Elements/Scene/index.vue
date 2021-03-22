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
    import typesOfModels from "../../../models/typesOfModels";
    import * as AT3D from "@/scene/AffineTransform3D";

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

		created: function() {
			document.addEventListener('keydown', this.keyPress, false);
			document.addEventListener('keypress', this.keyPress, false);

		},
		destroyed: function() {
			document.removeEventListener('keydown', this.keyPress, false);
			document.removeEventListener('keypress', this.keyPress, false);
		},
		mounted() {
			this.initScene({
				canvas: this.canvas,
				type: this.type
			});
			window.addEventListener(`resize`, event => {
				this.reRender();
			}, false);

			this.crModels()
		},
        beforeDestroy() {
            clearInterval(this.interval)
		    this.interval = null
        },
        methods: {
			...mapActions('scene', [
				'initScene',
				'setSizeCanvas',
				'reRender',
                'cameraToggleRayTracing',
			]),
            ...mapActions('models', [
                'createModel',
                'toggleShowModel',
                'applyToModel'
            ]),
			...mapActions('navigation', [
				'mouseDown',
				'mouseDrag',
				'mouseUp',
				'mouseWheel',
                'keyPress'
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
            crModels: async function() {
                let li =  await this.createModel(typesOfModels["3d"].light)
                let sp = await this.createModel(typesOfModels["3d"].sphere)
                let sp2 = await this.createModel(typesOfModels["3d"].sphere)
                await this.applyToModel(AT3D.translation(10, 10,10));
                this.toggleShowModel(li)
                this.toggleShowModel(sp)
                this.toggleShowModel(sp2)
                this.cameraToggleRayTracing()
            }
		}
	}
</script>

<style scoped lang="less">

</style>
