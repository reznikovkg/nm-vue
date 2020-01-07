<template>
    <div>
        <router-link :to="{ name: 'Scene3D' }" tag="div" class="openScene3D" v-if="getTypeScene === typesOfSceneShow.SCENE2D">
            <at-button type="primary" size="large" icon="icon-box" circle/>
        </router-link>

        <router-link :to="{ name: 'Scene2D' }" tag="div" class="openScene3D" v-if="getTypeScene === typesOfSceneShow.SCENE3D">
            <at-button type="primary" size="large" icon="icon-square" circle/>
        </router-link>

        <div class="openNav">
            <at-button type="primary" size="large" icon="icon-settings" circle @click="inverseMainMenuShow"></at-button>
        </div>


        <div class="nav-scene" v-if="getMainMenuShow">
            <div class="nav-head">
                <h4>CG-VUE</h4>
            </div>
            <div class="nav-tabs-head">
            </div>
            <div class="nav-tabs-body">
                <div  class="nav-tab">
                    <h3>Navigation:</h3>
                    <hr>
                    <at-button
                            v-for="item in getNavigation"
                            :key="item.title"
                            :icon="item.icon"
                            :class="{ 'at-btn--primary': item.status}"
                            @click="choiceNavigation(item.title)"
                            circle/>
                </div>
                <hr>
                <div class="nav-tab">
                    <h3>Models:</h3>
                    <hr>
                    <model-preview  v-for="(model,index) in getModels" :model="model" :index="index" :key="index" :scene="scene"/>
                    <hr>
                    <at-select v-model="choiceTypeModel" :placeholder="'Type plot'">
                        <at-option v-for="(type, index) in typesOfModelsShow" :value="index" :key="index">{{ type.name }}</at-option>
                    </at-select>
                    <at-button type="primary" icon="icon-settings" @click="createModel">Create new model</at-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import ModelPreview from "./ModelPreview";
	import typesOfModels from "../../../consts/typesOfModels";

	import { mapActions, mapGetters } from "vuex";
	import typesOfScene from "../../../consts/typesOfScene";

	export default {
		name: "Navigation",
        components: {
			ModelPreview
        },
        props: {
			scene: {
				type: String,
                default: typesOfScene.SCENE2D
            }
        },
        computed: {
			...mapGetters('scene', [
				'getTypeScene'
			]),
			...mapGetters('navigation', [
				'getMainMenuShow',
                'getNavigation'
            ]),
			...mapGetters('models', [
				'getChoiceTypeModel',
                'getModels'
			]),
			typesOfModelsShow: function () {
                return typesOfModels[this.scene];
			},
			typesOfSceneShow: function () {
				return typesOfScene;
			},
			choiceTypeModel: {
				get() {
					return this.getChoiceTypeModel;
				},
				set(t) {
					this.setChoiceTypeModel(t);
				}
			},
        },
        methods: {
			...mapActions('navigation', [
                'inverseMainMenuShow',
                'choiceNavigation'
			]),
			...mapActions('models', [
				'createModel',
                'setChoiceTypeModel'
			]),
        }
	}
</script>

<style scoped lang="less">

    & .openScene3D {
        position: fixed;
        right: 60px;
        top: 10px;
        z-index: 1000;
    }

    & .openNav {
        position: fixed;
        right: 10px;
        top: 10px;
        z-index: 1000;
    }

</style>