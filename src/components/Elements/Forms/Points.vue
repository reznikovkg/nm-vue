<template>
    <div>
        <h3>Points</h3>
        <div class="points-grid">
            <p>x</p>
            <p>y</p>
            <p>z</p>
            <p>h</p>
            <p>A</p>
            <template  v-for="(item, index) in model.x">
                <p>{{ model.x[index].toFixed(2) }}</p>
                <p>{{ model.y[index].toFixed(2) }}</p>
                <p>{{ model.z[index].toFixed(2) }}</p>
                <p>{{ model.h[index] ? model.h[index].toFixed(2) : '-' }}</p>
                <p>
                    <at-button type="error" icon="icon-trash-2" circle size="smaller" title="Remove" @click="removePointInModel(index)"/>
                </p>
            </template>
        </div>
        <div class="rowFlex">
            <InputCustom v-model="p.x"/>
            <InputCustom v-model="p.y"/>
            <InputCustom v-model="p.z"/>
            <at-button type="primary" size="small" @click="addPointFromInput">Add</at-button>
        </div>
    </div>
</template>

<script>
    import InputCustom from './Elements/InputCustom';
    import { mapActions } from 'vuex';

	export default {
		name: "Points",
        components: {
			InputCustom
        },
        data () {
			return {
				p: {
					x: 0,
                    y: 0,
					z: 0
                }
            }
        },
        props: {
			model: {
				type: Object,
                default: null
            }
        },
        computed: {
			// ...mapGetters
        },
        methods: {
			...mapActions('models', [
				'removePointInModel',
                'addPoint'
            ]),
            addPointFromInput: function () {
                this.addPoint({
                    x: parseFloat(this.p.x),
                    y: parseFloat(this.p.y),
                    z: parseFloat(this.p.z),
                })
            }
        }
	}
</script>

<style lang="less">
 .points-grid {
     display: grid;
     grid-template-columns: repeat(5, 1fr);
 }
</style>
