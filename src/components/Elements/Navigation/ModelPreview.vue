<template>
    <div v-if="model" class="model" :class="{ active: index === getIndexActiveModel }" @click="choiceModelActive">
        <div class="model-nav">
            <div class="model-name">
                {{ model.name }}
            </div>
            <div class="row" v-if="index === getIndexActiveModel">
                <at-button v-if="getActiveModel.show" type="success" icon="icon-eye" circle size="smaller" title="" @click="showModel(index)"/>
                <at-button v-if="!getActiveModel.show" type="error" icon="icon-eye-off" circle size="smaller" title="" @click="showModel(index)"/>
                <at-button type="error" icon="icon-trash-2" circle size="smaller" title="Remove" @click="removeModel(index)"/>
            </div>
        </div>
        <div class="model-body" v-if="index === getIndexActiveModel">
            <component :is="typesOfModelsShow[model.code].form" :model="model"/>
        </div>
    </div>
</template>

<script>
	import typesOfModels from "./../../../consts/typesOfModels";

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
            },
			scene: {
				type: String,
                default: '2d'
            }
        },
        data () {
			return {
				checkboxValue1: false
            }
        },
        computed: {
			...mapGetters('models', [
				'getIndexActiveModel',
                'getActiveModel'
            ]),
			...mapGetters('scene', [
				'getTypeScene',
			]),
			typesOfModelsShow: function () {
				return typesOfModels[this.getTypeScene];
			},
        },
        methods: {
			...mapActions('models', [
				'setIndexActiveModel',
				'removeModel',
                'showModel'
			]),
			choiceModelActive: function () {
				if (this.index !== this.getIndexActiveModel) this.setIndexActiveModel(this.index);
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