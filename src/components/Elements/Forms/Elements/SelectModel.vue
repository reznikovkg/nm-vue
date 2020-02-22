<template>
    <div>
        <at-select v-model="childModelIndex" :placeholder="'Guide'">
            <at-option v-for="(model, index) in getModelsForChoice" :value="index" :key="index">{{ model.name }} {{ index }}</at-option>
        </at-select>
    </div>
</template>

<script>
    import typesOfScene from "../../../../scene/typesOfScene";
	import { mapGetters } from 'vuex';

	export default {
        name: "SelectModel",
        data () {
        	return {
        		index: -1
            }
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
			value: {
				type: Object,
				default: null,
			},
            filterFunction: {
				type: Function,
                default: (item) => true
            }
        },
        computed: {
			...mapGetters('models', [
				'getModels'
			]),

			childModelIndex: {
				get() {
					if (this.value && this.getModelsForChoice.find((item) => (item.hash === this.value.hash))) {
						return this.getModelsForChoice.findIndex((item) => (item.hash === this.value.hash));
					} else {
						return -1;
					}
				},
				set(index){
					this.$emit('change', this.getModelsForChoice[index]);
				}
			},
			getModelsForChoice: function () {
				return this.getModels.filter(this.filterFunction)
			},
        }
    }
</script>

<style scoped lang="less">
    .input-float-type {
        width: 100px;
        height: 30px;
    }
</style>
