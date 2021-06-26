<template>
    <div v-if="model" class="model" :class="{ active: isActive }">
        <div class="model-header">
            <div class="model-name" @click="choiceModelActive">
                {{ model.getTitle() }}
            </div>
            <div class="model-header-nav">
                <at-button
                           icon="icon-edit-1"
                           circle size="smaller" title="Change Title" @click="changeTitle(model)"/>

                <at-button :type="model.show ? 'success' : 'error'"
                           :icon="model.show ? 'icon-eye' : 'icon-eye-off'"
                           circle size="smaller" title="" @click="toggleShowModel(model)"/>
                <at-button type="error" icon="icon-trash-2" circle size="smaller" title="Remove" @click="removeModel(model)"/>
            </div>
        </div>
        <div class="model-body" v-if="isActive">
            <div v-if="model.commonFields">
                <h3>Common:</h3>
                <ColorPicker :value="color" @change="handlerColor" title="Color"></ColorPicker>
            </div>

            <component :is="model.formEdit" :model="model"/>

            <div v-if="model.animateModel">
                <h3>Animations:</h3>
                <at-select v-model="animation" :placeholder="'Animation'">
                    <at-option v-for="modelChoice in getAnimationsForChoice"
                               :value="modelChoice.name"
                               :key="modelChoice.name">
                        {{ modelChoice.name }}
                    </at-option>
                </at-select>
                <div>
                    Count:
                    <InputCustom v-model="animationFramesCount"/>
                </div>
                <div>
                    Param:
                    <at-input v-model="animationFramesParam" placeholder="Please input"></at-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import typesOfModels from "./../../../models/typesOfModels";

    import { mapGetters, mapActions } from 'vuex';
    import {Animations} from "@/scene/Animations";
    import ColorPicker from "@/components/Elements/Forms/Elements/ColorPicker";
    import InputCustom from "@/components/Elements/Forms/Elements/InputCustom";

	export default {
		name: "ModelPreview",
        components: {InputCustom, ColorPicker},
        props: {
			model: {
				type: Object,
                default: null
            }
        },
        computed: {
			...mapGetters('models', [
                'getActiveModel'
            ]),
			...mapGetters('scene', [
				'getTypeScene',
			]),
            isActive: function () {
				return (this.getActiveModel && (this.model.hash === this.getActiveModel.hash));
            },
            animation: {
                get() {
                    return this.model.animation.name
                },
                set(v) {
                    this.setAnimationOfModel(this.getAnimationsForChoice.find(item => item.name === v))
                }
            },
            getAnimationsForChoice: function () {
                return Animations
            },
            color: {
                get() {
                    return this.getActiveModel.color
                },
                set(v) {
                    this.setColor(v)
                }
            },
            animationFramesCount: {
                get() {
                    return this.model.animationFramesCount;
                },
                set(animationFramesCount) {
                    this.setAnimationFramesCount({ animationFramesCount: parseInt(animationFramesCount), hash: this.model.hash })
                }
            },
            animationFramesParam: {
                get() {
                    return this.model.animationFramesParam;
                },
                set(animationFramesParam) {
                    this.setAnimationFramesParam({ animationFramesParam: animationFramesParam, hash: this.model.hash })
                }
            },
        },
        methods: {
			...mapActions('models', [
				'setActiveModel',
				'toggleShowModel',
				'removeModel',
                'setTitleOfModel',
                'setAnimationOfModel',
                'setColor',
                'setAnimationFramesCount',
                'setAnimationFramesParam'
			]),
			choiceModelActive: function () {
				if (!this.isActive) this.setActiveModel(this.model);
			},
			changeTitle: function (model) {
				this.$Modal.prompt({
					title: 'Custom title',
					content: `Enter custom title for ${ model.name}\n(${ model.hash })`,
                    value: model.name
				}).then((data) => {
					this.setTitleOfModel({
						model,
						title: data.value
					})
				}).catch(() => {

				})
			},
            handlerColor: function (v) {
                this.color = v;
            }
        }
    }
</script>

<style scoped lang="less">
    .model {
        border: 1px solid #6190e8;
        border-radius: 5px;
        margin-bottom: 5px;


        &.active {
            background: #6190e8;
            .model-name {
                color: white;
            }
        }

        &-name {
            padding: 5px;
            white-space: nowrap;
            overflow: hidden;
            flex: 1;
            cursor: pointer;
        }

        &-header {
            display: flex;
            justify-content: space-between;
            &-nav {
                padding: 5px;
            }
        }

        &-body {
            padding: 5px;
        }
    }
</style>
