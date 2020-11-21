<template>
    <div class="slider">
        <div class="slider-input">
            <div class="slider-bar"
                 :style="styleBar"
                 ref="slider">
                <div v-if="counter" class="slider-counter">
                    <span class="counter-left">{{ minValue }}</span>
                    <span class="counter-right">{{ maxValue }}</span>
                </div>
                <div class="slider-handle"
                     :style="stylesHandle">
                    <span v-if="counter" class="counter">{{ getValueNumber }}</span>
                </div>
                <div class="slider-process"
                     :style="stylesProcess"></div>
            </div>
        </div>
        <v-touch tag="div"
                 @tap="cPosition"
                 @panstart="dragStart"
                 @panmove="drag"
                 @panend="dragEnd"
                 :class="{ dragging }"
                 class="slider-over">
        </v-touch>
    </div>
</template>

<script>
    export default {
        name: "Slider",
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            step: {
                type: Number,
                default: 1,
            },
            maxValue: {
                type: Number,
                default: 0,
            },
            minValue: {
                type: Number,
                default: 0,
            },
            type: {
                type: String,
                default: ''
            },
            background: {
                type: String,
                default: ''
            },
            backgroundProcess: {
                type: String,
                default: ''
            },
            circle: {
                type: String,
                default: ''
            },
            counter: {
                type: Boolean,
                default: true
            },
        },
        data: function () {
            return {
                dragging: false,
                size: 14,
            }
        },
        computed: {
            getMinValue: function () {
                return this.minValue;
            },
            getMaxValue: function () {
                return this.maxValue;
            },


            getValueNumber: function () {
                return parseInt(this.value ? this.value : this.getMinValue, 10)
            },
            range: function () {
                return (this.getMaxValue - this.getMinValue) / this.step;
            },
            position: function () {
                return (this.getValueNumber - this.getMinValue) / (this.range * this.step) * 100;
            },

            styleBar: function () {
                return {
                    background: this.background ? this.background : 'rgb(150,150,150)',
                    color: '#fff'
                }
            },
            stylesHandle: function () {
                return {
                    left: this.position + '%',
                    background: this.circle ? this.circle : 'rgb(255, 255, 255)'
                }
            },
            stylesProcess: function () {
                return {
                    width: this.position + '%',
                    background: this.backgroundProcess ? this.backgroundProcess : 'rgb(100, 100, 100)'
                }
            }
        },
        methods: {
            // setValueWatch: function () {
            //     this.value = parseInt(this.valueProp >= this.minValue ? this.valueProp : this.minValue, 10);
            //     return this.value;
            // },
            rectSlider: function () {
                return this.$refs.slider.getBoundingClientRect();
            },
            buildValue: function (per) {
                let value = Math.round(this.range / 100 * per);
                value = this.getMinValue + value * this.step;
                if (value !== this.getValueNumber) this.setValue(value);
            },
            setValue: function(value) {
                if ( value > this.getMaxValue ) {
                    value = this.getMaxValue;
                } else if ( value < this.getMinValue ) {
                    value = this.getMinValue;
                }
                value = `${ value }${ this.type }`;

                if (this.value !== value) this.$emit('change', value);
            },
            cPosition: function(ev) {
                this.buildValue((ev.center.x - this.rectSlider().left)/this.rectSlider().width*100);
            },
            dragStart: function(ev) {
                this.cPosition(ev);
                this.dragging = true;
            },
            drag: function(ev) {
                if (!this.dragging) {
                    return;
                }
                this.cPosition(ev);
            },
            dragEnd: function() {
                if (!this.dragging) {
                    return;
                }
                this.dragging = false;
            }
        },
        watch: {
            maxValue: function () {
                this.setValue(this.getValueNumber);
            },
            minValue: function () {
                this.setValue(this.getValueNumber);
            }
        }
    }
</script>

<style scoped lang="less">
    @sizeSlider: 10px;
    .slider {
        width: 100%;
        position: relative;
        padding: 0 @sizeSlider/2;
        box-sizing: border-box;

        .slider-over {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            cursor: pointer;
            z-index: 10;
            &.dragging {
                position: fixed;
            }
        }

        .slider-input {
            width: 100%;
            padding: @sizeSlider*1.5 0;
            position: relative;


            .slider-bar {
                height: @sizeSlider/2;
                position: relative;
                display: block;
                border-radius: @sizeSlider;
                box-shadow: 0 0 3px #909090;
                /*background: #212131;*/

                .slider-handle {
                    width: @sizeSlider*2;
                    height: @sizeSlider*2;
                    top: -(@sizeSlider - @sizeSlider/4);
                    margin-left: -(@sizeSlider - @sizeSlider/4);
                    position: absolute;
                    border-radius: 50%;
                    z-index: 3;
                    left: 0;
                    box-shadow: 0 0 3px #909090;

                    display: flex;
                    justify-content: center;
                    align-items: center;
                    & .counter {
                        color: black;
                        font-size: 10px;
                        line-height: 10px;
                    }
                }

                .slider-process {
                    width: 0;
                    height: @sizeSlider/2;
                    border-radius: 15px;
                }

                .slider-counter {
                    position: absolute;
                    color: black;
                    bottom: 5px;
                    height: 12px;
                    font-size: 10px;
                    left: 0;
                    right: 0;
                    & .counter-left {
                        position: absolute;
                        left: 0;
                    }
                    & .counter-right {
                        position: absolute;
                        right: 0;
                    }
                }
            }
        }
    }


</style>
