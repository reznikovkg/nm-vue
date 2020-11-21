<template>
    <div>
        <h3>Light</h3>


        <ColorPicker :value="cLight" @change="handlerCLight" title="cLight"></ColorPicker>
        <ColorPicker :value="cDark" @change="handlerCDark" title="cDark"></ColorPicker>
        <InputCustom :value="power" @change="handlerPower"></InputCustom>
    </div>
</template>

<script>

	import { mapGetters, mapActions } from 'vuex';
	import typesOfScene from "../../../../scene/typesOfScene";

    import ColorPicker from "@/components/Elements/Forms/Elements/ColorPicker";
    import InputCustom from "@/components/Elements/Forms/Elements/InputCustom";

	export default {
		name: "Light",
        components: {
            ColorPicker,
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

            cLight: {
                get() {
                    return this.getActiveModel.cLight
                },
                set(v) {
                    this.setCLight(v)
                }
            },
            cDark: {
                get() {
                    return this.getActiveModel.cDark
                },
                set(v) {
                    this.setCDark(v)
                }
            },
            power: {
                get() {
                    return this.getActiveModel.power
                },
                set(v) {
                    this.setPower(v)
                }
            },
        },
        methods: {
			...mapActions('models', [
				'setCLight',
                'setCDark',
                'setPower'
            ]),

            handlerCLight: function (v) {
			    this.cLight = v;
            },
            handlerCDark: function (v) {
                this.cDark = v;
            },
            handlerPower: function (v) {
                this.power = v;
            }
        }
	}
</script>

<style scoped lang="less">

</style>
