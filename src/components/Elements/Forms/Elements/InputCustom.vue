<template>
    <div>
        <at-input v-model="text" placeholder="Please input"></at-input>
        <!--<input type="text" class="input-float-type" v-model="text">-->
    </div>
</template>

<script>
    export default {
        name: "InputCustom",
        data () {
            return {
                text: '0',
            }
        },
        model: {
            prop: this.text,
            event: 'change'
        },
        props: {
            value: Number
        },
        methods: {
            setValue: function () {
                this.$emit('change', Number(this.text));
            }
        },
        watch: {
            'text': {
                handler: function () {
                    this.setValue();
                }
            },
            'value': {
                handler: function () {
                    this.text = String(this.value);
                }
            },

        }
    }
</script>

<style scoped lang="less">
    .input-float-type {
        width: 100px;
        height: 30px;
    }
</style>
