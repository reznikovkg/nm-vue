<template>
    <div v-if="model" class="model" :class="{ active: index === getActiveModel }" @click="choiseModelActive">
        <div class="model-nav">
            <div class="model-name">
                {{ model.name }}
            </div>
            <div class="row" v-if="index === getActiveModel">
                <at-button type="error" icon="icon-eye-off" circle size="smaller" title=""></at-button>
                <at-button type="error" icon="icon-trash-2" circle size="smaller" title="Remove"></at-button>
            </div>
        </div>
        <div class="model-body" v-if="index === getActiveModel">
            <component :is="typesOfModelsShow[model.code].form" :model="model"/>
        </div>
    </div>
</template>

<script>
    import SplineForm from './../Forms/Scene2D/Spline';
	import typesOfModels from "../../consts/typesOfModels";

    import { mapGetters, mapActions } from 'vuex';

	export default {
		name: "ModelPreview",
        props: {
			model: {
				type: Object,
                default: null
            },
            index: {
				type: Number,
                default: -1
            }
        },
        data () {
			return {
				checkboxValue1: false
            }
        },
        computed: {
			...mapGetters('scene2d', [
				'getActiveModel'
            ]),
			typesOfModelsShow: function () {
				return typesOfModels;
			}
        },
        methods: {
			...mapActions('scene2d', [
				'setActiveModel'
			]),
			choiseModelActive: function () {
				if (this.index !== this.getActiveModel) this.setActiveModel(this.index);
			}
        }
	}
</script>

<style scoped lang="less">
    .model {
        border: 1px solid #6190e8;
        border-radius: 5px;
        margin-bottom: 5px;
        padding: 5px;
        overflow: hidden;
        cursor: pointer;

        &.active {
            background: #6190e8;
            color: white;
            cursor: default;
        }

        .model-nav {
            display: flex;
            justify-content: space-between;
        }

        .model-body {

        }
    }
</style>