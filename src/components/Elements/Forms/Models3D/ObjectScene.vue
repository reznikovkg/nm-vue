<template>
    <div>
        <h3>ObjectScene</h3>
        <at-select v-model="childModelIndex" :placeholder="'Guide'">
            <at-option v-for="(model, index) in getModelsForChoice" :value="index" :key="index">{{ model.name }} {{ index }}</at-option>
        </at-select>
        <at-input-number v-if="getChildModel" v-model="countOfPoints" :disabled="disableCountPoints"/>
    </div>
</template>

<script>
    import InputCustom from './../Elements/InputCustom';
	import {mapActions, mapGetters} from 'vuex';
	import typesOfScene from "../../../../scene/typesOfScene";
	import typesOfModels from "../../../../models/typesOfModels";

	export default {
		name: "ObjectScene",
        components: {
			InputCustom
        },
        data () {
			return {

            }
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
			getModelsForChoice: function () {
				return this.getModels.filter((item) => (item.type === typesOfScene.SCENE2D))
			},
			childModel: function () {
				if (this.getChildModel) return this.getModelsForChoice.find((item) => (item.hash === this.getChildModel.hash));
            },
            childModelIndex: {
				get() {
					if (this.getChildModel && this.getModelsForChoice.find((item) => (item.hash === this.getChildModel.hash))) {
						return this.getModelsForChoice.findIndex((item) => (item.hash === this.getChildModel.hash));
					} else {
						return -1;
					}
				},
				set(index){
					this.setChildModel(this.getModelsForChoice[index])
				}
			},
			countOfPoints: {
				get() {
					return this.getActiveModel.countPoints;
                },
                set(value) {
					this.setCountOfPoints(value);
                }
            },
            disableCountPoints: function () {
                return (this.getChildModel.code === typesOfModels[typesOfScene.SCENE2D].points.code);
			}
        },
        methods: {
			...mapActions('models', [
				'setChildModel',
                'setCountOfPoints'
			])

        }
	}
</script>

<style scoped>

</style>