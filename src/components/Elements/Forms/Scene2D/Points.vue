<template>
    <div>
        <h3>Points</h3>
        <div class="rowFlex">
            <div class="row-fix-width">
                <p>x</p>
                <p v-for="item in model.x">{{ item.toFixed(2) }}</p>
            </div>
            <div class="row-fix-width">
                <p>y</p>
                <p v-for="item in model.y">{{ item.toFixed(2) }}</p>
            </div>
            <div class="row-fix-width">
                <p>h</p>
                <p v-for="item in model.h">{{ item.toFixed(2) }}</p>
            </div>
        </div>
        <div class="rowFlex">
            <input-float-type v-model="p.x"/>
            <input-float-type v-model="p.y"/>
<!--            <at-button type="primary" size="small" @click="addPointFromInput">Add</at-button>-->
        </div>
    </div>
</template>

<script>
    import InputFloatType from './../../Elements/input-float-type';
	export default {
		name: "Points",
        components: {
			InputFloatType
        },
        data () {
			return {
				p: {
					x: null,
                    y: null
                }
            }
        },
        props: {
			model: {
				type: Object,
                default: null
            }
        }
	}
</script>

<style scoped>

</style>