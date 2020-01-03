<template>
    <div>
        <p>Points</p>

        <div v-if="getPoints.length" class="btn-group">
            <at-button type="error" size="small" @click="clearPointsRoot">Remove ALL points ROOT</at-button>
        </div>
        <div v-for="(rPoints, index) in getPoints">


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
        <div v-if="getSpline.length" class="btn-group">
            <at-button type="error" size="small" @click="clearSplineRoot">Remove ALL spline ROOT</at-button>

            <at-button v-for="(spline, index) in getSpline"
                       type="primary"
                       size="small"
                       :key="index"
                       @click="removeSpline(index)">
                Remove spline {{index}}
            </at-button>
        </div>
        <hr>

        <p>pNewton</p>
        <div v-if="getPNewton.length" class="btn-group">
            <at-button type="error" size="small" @click="clearSplineRoot">Remove ALL spline ROOT</at-button>

            <at-button v-for="(pNewton, index) in getPNewton"
                       type="primary"
                       size="small"
                       :key="index"
                       @click="removePNewton(index)">
                Remove spline {{index}}
            </at-button>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: "RootPoints",
        computed: {
        	...mapGetters('cache', [
        		'getPoints',
				'getSpline',
				'getPNewton',
            ])
        },
        methods: {
            removePoints: function (pointsIndex) {
                // VUEX splice(pointsIndex, 1);
            },

            clearPointsRoot: function () {
                // VUEX points = [];
            },

            removeSpline: function (splineIndex) {
                // VUEX splice(splineIndex, 1);
            },

            removePNewton: function (pNewtonIndex) {
                // VUEX splice(pNewtonIndex, 1);
            },

            clearSplineRoot: function () {
                // VUEX spline = [];
            },

        }
    }
</script>

<style scoped lang="less">

</style>
