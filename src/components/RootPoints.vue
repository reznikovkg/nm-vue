<template>
    <div>
        <p>Root points</p>
        <div v-for="rPoints in $root.points">

            <at-button type="primary" size="small" @click="removePoints(rPoints)">Remove points</at-button>

            <div class="row-fix-width">
                <p>x</p>
                <p v-for="item in rPoints.x">{{ item.toFixed(2) }}</p>
            </div>
            <div class="row-fix-width">
                <p>y</p>
                <p v-for="item in rPoints.y">{{ item.toFixed(2) }}</p>
            </div>
            <div class="row-fix-width">
                <p>z</p>
                <p v-for="item in rPoints.z">{{ item.toFixed(2) }}</p>
            </div>
            <hr>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RootPoints",
        methods: {
            removePoints: function (points) {

            }
        }
    }
</script>

<style scoped lang="less">
    .row-fix-width {
        width: 50px;
        overflow: hidden;
        margin-right: 20px;
    }
</style>
