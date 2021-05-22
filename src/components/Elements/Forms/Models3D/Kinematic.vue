<template>
    <div>
        <h3>Kinematic model</h3>

<!--        <div class="rowFlex">-->
<!--            <div class="row-fix-width" style="width: 100px">-->
                <p>Guide</p>
<!--                <at-select v-model="guide" :placeholder="'Guide'">-->
<!--                    <at-option v-for="(model, index) in getModelsForChoice" :value="index" :key="index">{{ model.name }} {{ index }}</at-option>-->
<!--                </at-select>-->
<!--                <object-scene v-if="getActiveModel.guide" :model="getActiveModel.guide"/>-->
                <SelectModel v-model="guide" :filterFunction="filterFunction"></SelectModel>
<!--            </div>-->
<!--            <div class="row-fix-width" style="width: 100px">-->
                <p>Form</p>
<!--                <at-select v-model="form" :placeholder="'Guide'">-->
<!--                    <at-option v-for="(model, index) in getModelsForChoice" :value="index" :key="index">{{ model.name }} {{ index }}</at-option>-->
<!--                </at-select>-->
<!--                <object-scene v-if="getActiveModel.form" :model="getActiveModel.form"/>-->
                <SelectModel v-model="form" :filterFunction="filterFunction"></SelectModel>
<!--            </div>-->
<!--            <div class="row-fix-width" style="width: 100px">-->
<!--                <p>AT</p>-->
<!--                <at-select v-model="kinematicModel.selectAT" :placeholder="'Form'">-->
<!--                    <at-option :value="'identity'">Identity</at-option>-->
<!--                    <at-option :value="'rotationXDeg'">Rotation X</at-option>-->
<!--                    <at-option :value="'rotationYDeg'">Rotation Y</at-option>-->
<!--                    <at-option :value="'rotationZDeg'">Rotation Z</at-option>-->
<!--                    <at-option :value="'custom'">Custom</at-option>-->
<!--                </at-select>-->
<!--            </div>-->
<!--        </div>-->
<!--        <at-button type="primary" size="small" @click="setKitematicGuideForm">Set</at-button>-->

<!--        <div class="btn-group">-->
<!--            <at-button type="primary" size="small" @click="plotDefaulttKitematic">Plot default</at-button>-->
<!--        </div>-->
<!--        <div>-->
<!--            <at-checkbox v-model="kinematicModel.kinematicModel.formAT3D" label="Shenzhen" :disabled="!kinematicModel.isActive">Form TRANSFORM</at-checkbox>-->
<!--        </div>-->
<!--        <div>-->
<!--            <at-checkbox v-model="kinematicModel.kinematicModel.guideAT3D" label="Shenzhen" :disabled="!kinematicModel.isActive">Guide TRANSFORM</at-checkbox>-->
<!--        </div>-->


<!--        <p>Points guide:-->
<!--            <i @click="kinematicModel.kinematicModel.guideNumberPoints&#45;&#45;" class="icon icon-minus"></i>-->
<!--            {{ kinematicModel.kinematicModel.guideNumberPoints }}-->
<!--            <i @click="kinematicModel.kinematicModel.guideNumberPoints++" class="icon icon-plus"></i>-->
<!--        </p>-->
<!--        <input-float-type v-model="kinematicModel.kinematicModel.guideNumberPoints"></input-float-type>-->

<!--        <p>Points form:-->
<!--            <i @click="kinematicModel.kinematicModel.formNumberPoints&#45;&#45;" class="icon icon-minus"></i>-->
<!--            {{ kinematicModel.kinematicModel.formNumberPoints }}-->
<!--            <i @click="kinematicModel.kinematicModel.formNumberPoints++" class="icon icon-plus"></i>-->
<!--        </p>-->
<!--        <input-float-type v-model="kinematicModel.kinematicModel.formNumberPoints"></input-float-type>-->


<!--        <div v-if="kinematicModel.selectAT === 'custom'">AT-->
<!--            <div class="rowFlex" v-for="i in 4">-->
<!--                <div class="row-fix-width" style="width: 80px" v-for="j in 4">-->
<!--                    <input-float-type v-model="kinematicModel.kinematicModel.atCustom.cells[i-1][j-1]"></input-float-type>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
    </div>
</template>

<script>

	import { mapGetters, mapActions } from 'vuex';
	import typesOfScene from "../../../../scene/typesOfScene";
	import ObjectScene from "./ObjectScene";
	import SelectModel from "../Elements/SelectModel";
	import typesOfModels from "../../../../models/typesOfModels";

	export default {
		name: "Kinematic",
        components: {
			SelectModel,
			ObjectScene
        },
        props: {
			index: {
                type: Number,
                default: 0
            },

			model: {
				type: Object,
				default: null
			}
        },
        computed: {
            ...mapGetters('models', [
            	'getModels',
				'getFormOfModel',
				'getGuideOfModel',
                'getActiveModel'
            ]),
            getModelsForChoice: function () {
                return this.getModels.filter((item) => (item.type === typesOfScene.SCENE2D))
			},
            filterFunction: function () {
            	return (item) => {
                    if (item.type === typesOfScene.SCENE2D) return true;
                    if (item.code === typesOfModels["3d"].points.code) return true;
					if (item.code === typesOfModels["3d"].object.code) return true;

					return false;
                }
            },
            guide: {
				get() {
					return this.model.getGuide();
				},
				set(model) {
					this.setGuideByHash({
						model,
						hash: this.model.hash
					});
				}
            	// get() {
				// 	if (this.getGuideOfModel && this.getModelsForChoice.find((item) => (item.hash === this.getGuideOfModel.hash))) {
				// 		return this.getModelsForChoice.findIndex((item) => (item.hash === this.getGuideOfModel.hash));
				// 	} else {
				// 		return -1;
				// 	}
                // },
                // set(index){
            	// 	this.setGuideOfModel(this.getModelsForChoice[index])
                // }
            },
            form: {
				get() {
					return this.model.getForm();
				},
				set(model) {
					this.setFormByHash({
						model,
						hash: this.model.hash
					});
				}
				// get() {
				// 	if (this.getFormOfModel && this.getModelsForChoice.find((item) => (item.hash === this.getFormOfModel.hash))) {
				// 		return this.getModelsForChoice.findIndex((item) => (item.hash === this.getFormOfModel.hash));
				// 	} else {
				// 		return -1;
				// 	}
				// },
				// set(index){
				// 	this.setFormOfModel(this.getModelsForChoice[index])
				// }
            }
        },
        methods: {
			...mapActions('models', [
				'setFormOfModel',
                'setGuideOfModel',
                'setGuideByHash',
                'setFormByHash'
            ])
        }
	}
</script>

<style scoped lang="less">

</style>
