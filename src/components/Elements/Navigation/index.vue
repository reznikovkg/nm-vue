<template>
    <div>
        <router-link :to="{ name: 'Scene3D' }" tag="div" class="openScene3D" v-if="getTypeScene === typesOfSceneShow.SCENE2D">
            <at-button type="primary" size="large" icon="icon-box" circle/>
        </router-link>

        <router-link :to="{ name: 'Scene2D' }" tag="div" class="openScene3D" v-if="getTypeScene === typesOfSceneShow.SCENE3D">
            <at-button type="primary" size="large" icon="icon-square" circle/>
        </router-link>

        <div class="openNav">
            <at-button type="primary" size="large" :icon="getMainMenuShow ? 'icon-x' : 'icon-menu'" circle @click="inverseMainMenuShow"></at-button>
        </div>

        <transition name="slide">
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
                        <model-preview v-for="(model,index) in getModels" v-if="model.type === getTypeScene" :model="model" :key="index"/>
                        <hr>
    <!--                    <at-select v-model="choiceTypeModel" :placeholder="'Type plot'">-->
    <!--                        <at-option v-for="(type, index) in typesOfModelsShow" :value="index" :key="index">{{ type.name }}</at-option>-->
    <!--                    </at-select>-->
                        <div class="nav-tab-new-models-list">
                            <div v-for="(type, index) in typesOfModelsShow" class="nav-tab-new-models-item">
                                <at-button  type="primary" icon="icon-plus" @click="createNewModel(type)">{{ type.name }}</at-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
	import ModelPreview from "./ModelPreview";
	import typesOfModels from "../../../models/typesOfModels";

	import { mapActions, mapGetters } from "vuex";
	import typesOfScene from "../../../scene/typesOfScene";

	export default {
		name: "Navigation",
        components: {
			ModelPreview
        },
        data () {
			return {
				choiceTypeModel: ""
            }
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
        },
        methods: {
			...mapActions('navigation', [
                'inverseMainMenuShow',
                'choiceNavigation'
			]),
			...mapActions('models', [
				'createModel',
			]),
            createNewModel: function (model) {
                this.createModel(model);
			}
        }
	}
</script>

<style scoped lang="less">
    .slide-enter-active, .slide-leave-active {
        transition: 0.5s;
    }
    .slide-enter, .slide-leave-to {
        opacity: 0;
        transform: translateX(300px);
    }

    & .openScene3D {
        position: fixed;
        right: 4rem;
        top: 1rem;
        z-index: 1000;
    }

    & .openNav {
        position: fixed;
        right: 1rem;
        top: 1rem;
        z-index: 1000;
    }

    .nav-tab-new-models-list {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .nav-tab-new-models-item {
        margin: 2px;
    }
</style>