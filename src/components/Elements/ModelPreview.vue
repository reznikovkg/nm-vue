<template>
    <div v-if="model" class="model">
        <div>
            <at-checkbox v-model="checkboxValue1" label="Show"/>
            {{ model.name }}
        </div>
        <div class="row">
            <at-button type="error" icon="icon-trash-2" circle></at-button>
        </div>
    </div>
</template>

<script>
	export default {
		name: "ModelPreview",
        props: {
			model: {
				type: Object,
                default: null
            }
        },
        data () {
			return {
				checkboxValue1: false
            }
        }
	}
</script>

<style scoped lang="less">
    .model {
        display: flex;
        justify-content: space-between;
        border: 1px solid #6190e8;
        border-radius: 5px;
        margin-bottom: 5px;
        padding: 5px;
        overflow: hidden;
    }
</style>