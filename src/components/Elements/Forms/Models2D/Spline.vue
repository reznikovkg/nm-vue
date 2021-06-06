<template>
    <div class="">
        <h3>Spline</h3>
        <at-select v-model="points" :placeholder="'Points'">
            <at-option :value="-1" :key="-1">Not choice</at-option>
            <at-option v-for="(modelChoice) in getModelsForChoice" :value="modelChoice.hash" :key="modelChoice.hash">Points ({{ modelChoice.hash }}</at-option>
        </at-select>
    </div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import typesOfScene from "../../../../scene/typesOfScene";
	import typesOfModels from "../../../../models/typesOfModels";
    import Points, { CODE as Points_CODE } from "@/models/Points";

	export default {
		name: "Spline",
        props: {
			model: {
				type: Object,
                default: null
            }
        },
		computed: {
			...mapGetters('models', [
				'getModels',
                'getModelByHash'
			]),
			getModelsForChoice: function () {
				return this.getModels.filter((item) => (item.code === Points_CODE))
			},
			points: {
				get() {
					if (this.model.getPoints()) {
						return this.model.getPoints().hash
                    } else {
						return -1;
                    }
				},
				set(hash){
                    this.model.setPoints(this.getModelByHash(hash))
				}
			},
		},
        methods: {
			...mapActions('models', [
				'setPointsOfModel',
			]),
        }
	}
</script>

<style scoped lang="less">

</style>
