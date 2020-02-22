<template>
    <div>
        <at-select v-model="childModel" :placeholder="'Guide'">
            <at-option v-for="modelChoice in getModelsForChoice"
                       :value="modelChoice.hash"
                       :key="modelChoice.hash">
                {{ modelChoice.name }} ({{ modelChoice.hash }})
            </at-option>
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
				'getModels',
                'getModelByHash'
			]),
			childModel: {
				get() {
					if (this.value && this.getModelsForChoice.find((item) => (item.hash === this.value.hash))) {
						return this.getModelsForChoice.find((item) => (item.hash === this.value.hash)).hash;
					} else {
						return -1;
					}
				},
				set(hash){
					this.$emit('change', this.getModelByHash(hash));
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
