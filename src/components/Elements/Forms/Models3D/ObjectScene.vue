<template>
    <div>
        <h3>ObjectScene</h3>
<!--        <at-select v-model="childModelIndex" :placeholder="'Guide'">-->
<!--            <at-option v-for="(model, index) in getModelsForChoice" :value="index" :key="index">{{ model.name }} {{ index }}</at-option>-->
<!--        </at-select>-->

        <select-model v-model="childModel"></select-model>
        <at-input v-if="childModel" v-model="countOfPoints" :disabled="disableCountPoints"/>
    </div>
</template>

<script>
    import InputCustom from './../Elements/InputCustom';
	import { mapActions, mapGetters } from 'vuex';
	import typesOfScene from "../../../../scene/typesOfScene";
	import typesOfModels from "../../../../models/typesOfModels";
	import SelectModel from "../Elements/SelectModel";

	export default {
		name: "ObjectScene",
        components: {
			SelectModel,
			InputCustom
        },
        props: {
			model: {
				type: Object,
                default: null
            }
        },
        computed: {
			...mapGetters('models', [
				'getModels',
				'getActiveModel',
                'getChildModel'
			]),
			// getModelsForChoice: function () {
			// 	return this.getModels.filter((item) => (item.type === typesOfScene.SCENE2D))
			// },
			// childModel: function () {
			// 	if (this.getChildModel) return this.getModelsForChoice.find((item) => (item.hash === this.getChildModel.hash));
            // },
            // childModelIndex: {
			// 	get() {
			// 		if (this.getChildModel && this.getModelsForChoice.find((item) => (item.hash === this.getChildModel.hash))) {
			// 			return this.getModelsForChoice.findIndex((item) => (item.hash === this.getChildModel.hash));
			// 		} else {
			// 			return -1;
			// 		}
			// 	},
			// 	set(index){
			// 		this.setChildModel(this.getModelsForChoice[index])
			// 	}
			// },
			countOfPoints: {
				get() {
					return this.getActiveModel.countPoints;
                },
                set(value) {
					this.setCountOfPoints(value);
                }
            },
            disableCountPoints: function () {
                return (this.childModel && this.childModel.code === typesOfModels[typesOfScene.SCENE2D].points.code);
			},
			childModel: {
				get() {
					return this.getActiveModel.childModel;
				},
				set(model) {
					this.setChildModelByHash({
                        model,
                        hash: this.model.hash
					});
				}
			},
        },
        methods: {
			...mapActions('models', [
				'setChildModel',
                'setCountOfPoints',
                'setChildModelByHash'
			])

        }
	}
</script>

<style scoped>

</style>