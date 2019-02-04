<template>
    <div class="hello">
        <router-link to="/scene2d">
            <at-button type="primary">Scene2D</at-button>
        </router-link>
        <router-link to="/scene3d">
            <at-button type="primary">Scene3D</at-button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'Homepage',
    data () {
        return {

        }
    }
}
</script>

<style lang="less">

</style>
