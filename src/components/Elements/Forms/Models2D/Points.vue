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
                <p>z</p>
                <p v-for="item in model.z">{{ item.toFixed(2) }}</p>
            </div>
            <div class="row-fix-width">
                <p>h</p>
                <p v-for="item in model.h">{{ item.toFixed(3) }}</p>
            </div>
            <div class="row-fix-width">
                <p>A</p>
                <p v-for="(item, index) in model.x">
                    <at-button type="error" icon="icon-trash-2" circle size="smaller" title="Remove" @click="removePointInModel(index)"/>
                </p>
            </div>
        </div>
        <div class="rowFlex">
            <input-custom v-model="p.x"/>
            <input-custom v-model="p.y"/>
            <input-custom v-model="p.z"/>
<!--            <at-button type="primary" size="small" @click="addPointFromInput">Add</at-button>-->
        </div>
    </div>
</template>

<script>
    import InputCustom from './../Elements/InputCustom';
    import { mapActions } from 'vuex';

	export default {
		name: "Points",
        components: {
			InputCustom
        },
        data () {
			return {
				p: {
					x: null,
                    y: null,
					z: null
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
				'removePointInModel'
            ])
        }
	}
</script>

<style scoped>

</style>