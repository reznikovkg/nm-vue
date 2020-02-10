<template>
    <div>
        <h3>ObjectScene</h3>
        <p>{{ model.name }}</p>
        <p>{{ model.code }}</p>
    </div>
</template>

<script>
    import InputCustom from './../Elements/InputCustom';
    import { mapActions } from 'vuex';

	export default {
		name: "ObjectScene",
        components: {
			InputCustom
        },
        data () {
			return {

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

        }
	}
</script>

<style scoped>

</style>