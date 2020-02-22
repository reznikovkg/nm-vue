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
            <component :is="formModel" :model="model"/>
        </div>
    </div>
</template>

<script>
	import typesOfModels from "./../../../models/typesOfModels";

    import { mapGetters, mapActions } from 'vuex';

	export default {
		name: "ModelPreview",
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
			formModel: function () {
				return typesOfModels[this.model.type][this.model.code].form;
			},
        },
        methods: {
			...mapActions('models', [
				'setActiveModel',
				'toggleShowModel',
				'removeModel',
                'setTitleOfModel'
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