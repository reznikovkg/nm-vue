<template>
    <div>
        {{ title }}
        <at-input v-model="text" placeholder="Please input" @change="setValue"></at-input>
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
            value: Number,
            title: String
        },
        mounted() {
            this.text = this.value.toString()
        },
        methods: {
            setValue: function (v) {
                this.$emit('change', Number(v));
            }
        }
    }
</script>

<style scoped lang="less">
    .input-float-type {
        width: 100px;
        height: 30px;
    }
</style>
