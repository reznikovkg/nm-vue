<template>
    <div class="">
        <h3>Spline</h3>
        <at-select v-model="indexOfPoints" :placeholder="'Points'">
            <at-option :value="-1" :key="-1">Not choice</at-option>
            <at-option v-for="(model, index) in getModelsForChoice" :value="index" :key="index">Points {{ index }} ({{ model.hash }}</at-option>
        </at-select>
    </div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import typesOfScene from "../../../../consts/typesOfScene";
	import typesOfModels from "../../../../consts/typesOfModels";

	export default {
		name: "Spline",
		computed: {
			...mapGetters('models', [
				'getModels',
                'getPointsOfModel'
			]),
			getModelsForChoice: function () {
				return this.getModels.filter((item) => (item.code === typesOfModels[typesOfScene.SCENE2D].points.code))
			},
			indexOfPoints: {
				get() {
					if (this.getPointsOfModel && this.getModelsForChoice.find((item) => (item.hash === this.getPointsOfModel.hash))) {
						return this.getModelsForChoice.findIndex((item) => (item.hash === this.getPointsOfModel.hash));
                    } else {
						return -1;
                    }
				},
				set(index){
					if (index >= 0) {
						this.setPointsOfModel(this.getModelsForChoice[index])
                    }
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