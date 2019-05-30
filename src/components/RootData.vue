<template>
    <div>
        <p>Points</p>

        <div v-if="$root.points.length" class="btn-group">
            <at-button type="primary" size="small" @click="clearPointsRoot">Remove points ROOT</at-button>
        </div>
        <div v-for="(rPoints, index) in $root.points">


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
            <at-button type="primary" size="small" @click="removePoints(index)">Remove points {{index}}</at-button>
            <hr>
        </div>
        <hr>
        <p>Spline</p>

        <div v-if="$root.spline.length" class="btn-group">
            <at-button type="primary" size="small" @click="clearSplineRoot">Remove spline ROOT</at-button>
        </div>

        <div v-for="(spline, index) in $root.spline">

            <at-button type="primary" size="small" @click="removeSpline(index)">Remove spline {{index}}</at-button>

<!--            <div class="rowFlex">-->
<!--                <div class="row-fix-width">-->
<!--                    <p>x</p>-->
<!--                    <p v-for="item in rPoints.x">{{ item.toFixed(2) }}</p>-->
<!--                </div>-->
<!--                <div class="row-fix-width">-->
<!--                    <p>y</p>-->
<!--                    <p v-for="item in rPoints.y">{{ item.toFixed(2) }}</p>-->
<!--                </div>-->
<!--                <div class="row-fix-width">-->
<!--                    <p>z</p>-->
<!--                    <p v-for="item in rPoints.z">{{ item.toFixed(2) }}</p>-->
<!--                </div>-->
<!--            </div>-->
<!--            <hr>-->
        </div>
        <hr>
        <p>pNewton</p>
    </div>
</template>

<script>
    export default {
        name: "RootPoints",
        methods: {
            removePoints: function (pointsIndex) {
                this.$root.points.splice(pointsIndex, 1);
            },

            clearPointsRoot: function () {
                this.$root.points = [];
            },

            removeSpline: function (splineIndex) {
                this.$root.spline.splice(splineIndex, 1);
            },

            clearSplineRoot: function () {
                this.$root.spline = [];
            },

        }
    }
</script>

<style scoped lang="less">

</style>
