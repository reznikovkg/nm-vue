<template>
    <div>
        <h3>Sphere</h3>
        <InputCustom :value="radius" @change="handlerRadius" title="radius"></InputCustom>
        <InputCustom :value="intervals" @change="handlerIntervals" title="intervals"></InputCustom>
        <InputCustom :value="segments" @change="handlerSegments" title="segments"></InputCustom>
    </div>
</template>

<script>

	import { mapGetters, mapActions } from 'vuex';
	import typesOfScene from "../../../../scene/typesOfScene";

    import ColorPicker from "@/components/Elements/Forms/Elements/ColorPicker";
    import InputCustom from "@/components/Elements/Forms/Elements/InputCustom";

	export default {
		name: "Sphere",
        components: {
            InputCustom
        },
        props: {
			index: {
                type: Number,
                default: 0
            }
        },
        computed: {
            ...mapGetters('models', [
            	'getModels',
                'getActiveModel'
            ]),

            radius: {
                get() {
                    return this.getActiveModel.radius
                },
                set(v) {
                    this.setRadius(v)
                }
            },
            segments: {
                get() {
                    return this.getActiveModel.segments
                },
                set(v) {
                    this.setSegments(v)
                }
            },
            intervals: {
                get() {
                    return this.getActiveModel.intervals
                },
                set(v) {
                    this.setIntervals(v)
                }
            },
        },
        methods: {
			...mapActions('models', [
				'setSegments',
                'setIntervals',
                'setRadius',
            ]),

            handlerRadius: function (v) {
			    this.radius = v;
            },
            handlerIntervals: function (v) {
                this.intervals = v;
            },
            handlerSegments: function (v) {
                this.segments = v;
            }
        }
	}
</script>

<style scoped lang="less">

</style>
