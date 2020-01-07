<template>
    <div class="hello">
        <router-link :to="{ name: 'Scene2D' }">
            <at-button type="primary">Scene2D</at-button>
        </router-link>
        <router-link :to="{ name: 'Scene3D' }">
            <at-button type="primary">Scene3D</at-button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'Homepage'
}
</script>

<style lang="less">

</style>
