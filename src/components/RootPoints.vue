<template>
    <div>
        <p>Root points</p>
        <div v-for="(rPoints, index) in $root.points">

            <at-button type="primary" size="small" @click="removePoints(index)">Remove points {{index}}</at-button>

            <div class="rowFlex">
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
            </div>
            <hr>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RootPoints",
        methods: {
            removePoints: function (pointsIndex) {
                this.$root.points.splice(pointsIndex, 1);
            }
        }
    }
</script>

<style scoped lang="less">

</style>
