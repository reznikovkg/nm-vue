<template>
    <div class="hello">
        <router-link :to="{ name: 'Scene2D' }">
            <at-button type="primary">Scene2D</at-button>
        </router-link>
        <router-link :to="{ name: 'Scene3D' }">
            <at-button type="primary">Scene3D</at-button>
        </router-link>
        <router-link :to="{ name: 'Documentation' }">
            <at-button type="primary">Documentation</at-button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'Homepage'
}
</script>

<style scoped lang="less">
    .hello {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        & > * {
            margin: 1rem;
        }
    }
</style>
