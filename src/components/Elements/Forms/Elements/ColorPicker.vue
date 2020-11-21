<template>
    <div class="color-picker">
        <div class="color-picker__header">
            <h3>
                {{ title }}
            </h3>
            <div class="color" :style="{ background: colorReturn }" ></div>
        </div>
        <div class="options">
            <slider v-model="r" :min-value="0" :max-value="255" type=""
                    :background="backgroundSliderR"
                    :circle="circleR"
                    :background-process="'rgba(0,0,0,0)'"
                    @change="emitVal" :counter="false"/>

            <slider v-model="g" :min-value="0" :max-value="255" type=""
                    :background="backgroundSliderG"
                    :circle="circleG"
                    :background-process="'rgba(0,0,0,0)'"
                    @change="emitVal" :counter="false"/>

            <slider v-model="b" :min-value="0" :max-value="255" type=""
                    :background="backgroundSliderB"
                    :circle="circleB"
                    :background-process="'rgba(0,0,0,0)'"
                    @change="emitVal" :counter="false"/>
        </div>

    </div>
</template>

<script>
    import Slider from "./Slider";

    export default {
        name: "ColorPicker",
        data () {
            return {
                r: "0",
                g: "0",
                b: "0"
            }
        },
        components: {
            Slider
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            value: Array,
            placeholder: String,
            title: String,
        },
        mounted() {
            console.log(this.value)
            this.setFromValue();
        },
        computed: {
            colorReturn: function () {
                return `rgb(${ this.r },${ this.g },${ this.b })`;
            },

            backgroundSliderR: function () {
                return `linear-gradient(90deg, rgb(0,0,0), rgb(255,0,0))`;
            },
            backgroundSliderG: function () {
                return `linear-gradient(90deg, rgb(0,0,0), rgb(0,255,0))`;
            },
            backgroundSliderB: function () {
                return `linear-gradient(90deg, rgb(0,0,0), rgb(0,0,255))`;
            },


            circleR: function () {
                return `rgb(${this.r},0,0)`;
            },
            circleG: function () {
                return `rgb(0,${this.g},0)`;
            },
            circleB: function () {
                return `rgb(0,0,${this.b})`;
            },
        },
        methods: {
            setFromValue: function () {
                if (this.value && this.value.length === 3) {
                    this.r = (this.value[0] * 255).toString();
                    this.g = (this.value[1] * 255).toString();
                    this.b = (this.value[2] * 255).toString();
                }
            },
            emitVal: function () {
                this.$emit('change', [
                    parseInt(this.r) / 255,
                    parseInt(this.g) / 255,
                    parseInt(this.b) / 255
                ]);
            },
        }
    }
</script>

<style scoped lang="less">
    .color-picker {
        width: 100%;
        display: flex;
        flex-direction: column;

        & .color-picker__header {
            display: flex;
            h3 {
                margin: 0;
            }
        }

        & .options {
            padding: 10px;
            text-align: center;
        }

        & .color {
            margin-left: 10px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            box-shadow: 0 0 3px #aaa;
        }
    }
</style>
