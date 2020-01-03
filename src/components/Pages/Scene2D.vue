<template>
    <div class="component-scene-2d">
        <div class="scena-2d">
            <canvas ref="canvas"
                @mousedown="canvasMouseDown"
                @mousemove="canvasMouseDrag"
                @mouseup="canvasMouseUp"
                @wheel="canvasMouseWheel"/>
        </div>

        <div class="openScene3D">
            <at-button type="primary" size="large" icon="icon-box" circle @click="clickScene3D"></at-button>
        </div>

        <div class="openNav">
            <at-button type="primary" size="large" icon="icon-settings" circle @click="clickOpenNav"></at-button>
        </div>


        <div class="nav-scene" v-if="openNav">
            <div class="nav-head">
                <h4>CG-VUE</h4>
            </div>
            <div class="nav-tabs-head">
                <at-button
                        v-for="item in tabs"
                        :key="item.title"
                        :icon="item.icon"
                        :class="{ 'at-btn--primary': item.status}"
                        @click="choiseTab(item.title)"
                        size="smaller">{{ item.title }}</at-button>
            </div>
            <div class="nav-tabs-body">
                <div v-if="tabs.nav.status" class="nav-tab">
                    <at-button
                            v-for="item in nav"
                            :key="item.title"
                            :icon="item.icon"
                            :class="{ 'at-btn--primary': item.status}"
                            @click="choiseNav(item.title)"
                            circle/>
                </div>
                <div v-if="tabs.grid.status" class="nav-tab">
<!--                    <at-checkbox v-model="camera2D.grid.axiss" label="Shenzhen">Axis</at-checkbox>-->
<!--                    <at-checkbox v-model="camera2D.grid.grid" label="Shenzhen">Grid</at-checkbox>-->
<!--                    <at-checkbox v-model="camera2D.grid.serifs" label="Shenzhen">Serifs</at-checkbox>-->


<!--                    <p>Step serifs:-->
<!--                        <i @click="camera2D.grid.serifsStep&#45;&#45;" class="icon icon-minus"/>-->
<!--                        {{ camera2D.grid.serifsStep }}-->
<!--                        <i @click="camera2D.grid.serifsStep++" class="icon icon-plus"/>-->
<!--                    </p>-->
<!--                    <input-float-type v-model="camera2D.grid.serifsStep"></input-float-type>-->
<!--                    &lt;!&ndash;<at-slider v-model="camera2D.grid.serifsStep" :step="1" :min="1" :max="1000"></at-slider>&ndash;&gt;-->

<!--                    <p>Size serifs:-->
<!--                        <i @click="camera2D.grid.serifsSize&#45;&#45;" class="icon icon-minus"></i>-->
<!--                        {{ camera2D.grid.serifsSize }}-->
<!--                        <i @click="camera2D.grid.serifsSize++" class="icon icon-plus"></i>-->
<!--                    </p>-->
<!--                    <input-float-type v-model="camera2D.grid.serifsSize"></input-float-type>-->
<!--                </div>-->
<!--                <div v-if="tabs.plot.status" class="nav-tab"><hr>-->
<!--                    <h3>Points</h3>-->
<!--                    <div class="btn-group">-->
<!--                        <at-button v-if="!points.points" type="primary" size="small" @click="createPoints">Create</at-button>-->
<!--                        <at-button v-if="points.points" type="success" size="small" @click="createCirclePoints(false)">Circle points</at-button>-->
<!--                        <at-button v-if="points.points" type="success" size="small" @click="createCirclePoints">Circle/2 points</at-button>-->
<!--                        <at-button v-if="points.points" type="error" size="small" @click="removePoints">Remove object</at-button>-->
<!--                    </div>-->
<!--                    <div v-if="points.points">-->
<!--                        <at-checkbox v-model="show.points" label="Shenzhen">Show</at-checkbox>-->
<!--                        <div class="btn-group">-->
<!--                            <at-button type="primary" size="small" @click="addPointsToRoot">Add points to root</at-button>-->
<!--                            <at-button type="error" size="small" @click="clearPoints">Clear points</at-button>-->
<!--                        </div>-->
<!--                        <div class="rowFlex">-->
<!--                            <div class="row-fix-width">-->
<!--                                <p>x</p>-->
<!--                                <p v-for="item in points.points.x">{{ item.toFixed(2) }}</p>-->
<!--                            </div>-->
<!--                            <div class="row-fix-width">-->
<!--                                <p>y</p>-->
<!--                                <p v-for="item in points.points.y">{{ item.toFixed(2) }}</p>-->
<!--                            </div>-->
<!--                            <div class="row-fix-width">-->
<!--                                <p>h</p>-->
<!--                                <p v-for="item in points.points.h">{{ item.toFixed(2) }}</p>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="rowFlex">-->
<!--                            <input-float-type v-model="p.x"></input-float-type>-->
<!--                            <input-float-type v-model="p.y"></input-float-type>-->
<!--                            <at-button type="primary" size="small" @click="addPointFromInput">Add</at-button>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <hr>-->
<!--                    <h3>Function</h3>-->
<!--                    <at-checkbox v-model="show.fun" label="Shenzhen">Show</at-checkbox>-->

<!--                    <at-select v-model="funcs.select" :placeholder="'Function'">-->
<!--                        <at-option v-for="(val, key) in funcs.list" :value="key" :key="key">{{ key }}</at-option>-->
<!--                    </at-select>-->

<!--                    <hr>-->
<!--                    <h3>Spline</h3>-->
<!--                    <div v-if="!spline.spline" class="btn-group">-->
<!--                        <at-button type="primary" size="small" @click="createSpline">Create spline</at-button>-->
<!--                    </div>-->

<!--                    <at-checkbox v-model="show.spline" v-if="spline.spline" label="Shenzhen" :disabled="!spline.isActive">Show</at-checkbox>-->

<!--                    <div v-if="spline.spline" class="btn-group">-->
<!--                        <at-button type="primary" size="small" @click="setSplineCircle">Update spline</at-button>-->
<!--                        <at-button type="error" size="small" @click="removeSpline">Remove spline</at-button>-->

<!--                        <at-button type="primary" size="small" @click="setPointsToRootFromSpline(true)" :disabled="!spline.isActive">Add points to root from spline (by h)</at-button>-->
<!--                        <at-button type="primary" size="small" @click="setPointsToRootFromSpline()" :disabled="!spline.isActive">Add points to root from spline (by n)</at-button>-->
<!--                        <at-button type="primary" size="small" @click="addSplineToRoot" :disabled="!spline.isActive">Add spline to root</at-button>-->
<!--                    </div>-->
<!--                    <hr>-->
<!--                    <h3>Newton</h3>-->
<!--                    <div v-if="!polynom.polynom" class="btn-group">-->
<!--                        <at-button type="primary" size="small" @click="createPNewton">Create Newton</at-button>-->
<!--                    </div>-->

<!--                    <at-checkbox v-model="show.polynom" v-if="polynom.polynom" label="Shenzhen" :disabled="!polynom.isActive">Show</at-checkbox>-->
<!--                    <div v-if="polynom.polynom" class="btn-group">-->
<!--                        <at-button type="primary" size="small" @click="setPNewton">Update polynom</at-button>-->
<!--                        <at-button type="error" size="small" @click="removePNewton">Remove polynom</at-button>-->

<!--                        <at-button type="primary" size="small" @click="setPointsToRootFromPNewton(true)" :disabled="!polynom.isActive">Add points to root from polynom (by h)</at-button>-->
<!--                        <at-button type="primary" size="small" @click="setPointsToRootFromPNewton()" :disabled="!polynom.isActive">Add points to root from polynom (by n)</at-button>-->
<!--                        <at-button type="primary" size="small" @click="addPNewtonToRoot" :disabled="!polynom.isActive">Add polynom to root</at-button>-->
<!--                    </div>-->

<!--                    <h3>Default</h3>-->
<!--                    <p>h:-->
<!--                        <i @click="hDefault&#45;&#45;" class="icon icon-minus"></i>-->
<!--                        {{ hDefault }}-->
<!--                        <i @click="hDefault++" class="icon icon-plus"></i>-->
<!--                    </p>-->
<!--                    <input-float-type v-model="hDefault"></input-float-type>-->

<!--                    <p>n:-->
<!--                        <i @click="nv&#45;&#45;" class="icon icon-minus"></i>-->
<!--                        {{ nDefault }}-->
<!--                        <i @click="nDefault++" class="icon icon-plus"></i>-->
<!--                    </p>-->
<!--                    <input-float-type v-model="nDefault"></input-float-type>-->
                </div>
                <div v-if="tabs.objects.status" class="nav-tab">

                    <h3>Models:</h3>
                    <model-preview  v-for="(model,index) in getModels" :model="model" :index="index" :key="index"/>
                    <hr>


                    <at-select v-model="choiceType" :placeholder="'Type plot'">
                        <at-option v-for="(type, index) in typesOfModelsShow" :value="index" :key="index">{{ type.name }}</at-option>
                    </at-select>
                    <at-button type="primary" icon="icon-settings" @click="createModel">Create new model</at-button>

<!--                    <component v-if="selectedType" :is="typesOfObjects[selectedType].componentForm"/>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import InputFloatType from "./../Elements/input-float-type";

    import typesOfModels from "../../consts/typesOfModels";

	import { mapActions, mapGetters } from "vuex";

	import ModelPreview from "../Elements/ModelPreview";

    export default {
        name: "Scena2D",
        components: {
            InputFloatType,
			ModelPreview
        },
        data () {
            return {
				load: false,
                /**
                 * Menu
                 */
                openNav: false,

                /**
                 * Menu tabs
                 */
                tabs: {
                    nav: {
                        status: true,
                        title: 'Nav',
                        icon: 'icon-move'
                    },
                    grid: {
                        status: false,
                        title: 'Grid',
                        icon: 'icon-grid'
                    },
                    objects: {
                        status: false,
                        title: 'objects',
                        icon: 'icon-map'
                    },
                    root: {
                        status: false,
                        title: 'Root',
                        icon: 'icon-home'
                    },
                },



                // show: {
                //     fun: false,
                //     spline: false,
                //     points: false,
                //     polynom: false
                // },
                //
                // hDefault: 0.1,
                // nDefault: 30,
                //
                //
                // p: {
                //     x: 0,
                //     y: 0
                // },
                //
                // spline: {
                //     isActive: false,
                //     spline: null,
                //     splineSecond: null,
                //
                //     xLeft: null,
                //     xRight: null
                // },
                // polynom: {
                //     isActive: false,
                //     polynom: null
                // },
                //
                // funcs: {
                //     select: "sin(x)",
                //     list: {
                //         "sin(x)" : function (x) {
                //             return Math.sin(x);
                //         },
                //         "cos(x)" : function (x) {
                //             return Math.cos(x);
                //         },
                //         "x^2" : function (x) {
                //             return x*x;
                //         },
                //     }
                //
                // },
				// typesOfObjects: {
				// 	points: {
				// 		name: 'Points',
                //         componentForm: PointsForm
				// 	},
				// 	spline: {
				// 		name: 'Spline',
				// 		componentForm: SplineForm
				// 	},
				// },
				// selectedType: null,
				// choiseType: false
            }
        },
        computed: {
        	...mapGetters('scene2d', [
        		'getModels',
                'getChoiceType'
            ]),
            canvas: function () {
                return this.$refs.canvas;
            },
            choiceType: {
        		get() {
        			return this.getChoiceType
                },
                set(t) {
					this.setChoiceType(t);
                }
            },
			typesOfModelsShow: function () {
                return typesOfModels;
			}
        },
        mounted() {
			this.initCamera(this.$refs.canvas);
			this.reRender();
			window.addEventListener(`resize`, event => {
				this.setSizeCanvas();
				this.reRender();
			}, false);
		},
		// created: function() {
        //     document.addEventListener('keydown', this.keyPress, false);
        //     document.addEventListener('keypress', this.keyPress, false);
        // },
        // destroyed: function() {
        //     document.removeEventListener('keydown', this.keyPress, false);
        //     document.removeEventListener('keypress', this.keyPress, false);
        // },
        methods: {
			...mapActions('scene2d', [
				'initCamera',
				'setSizeCanvas',
				'reRender',

                'mouseDown',
                'mouseDrag',
                'mouseUp',
                'mouseWheel',


                'createModel',
				'setChoiceType'
			]),

			canvasMouseDown(e) {
				this.mouseDown(e);
			},
			canvasMouseDrag: function (e) {
				this.mouseDrag(e);
			},
			canvasMouseUp: function (e) {
				this.mouseUp(e);
			},
			canvasMouseWheel: function (e) {
				this.mouseWheel(e);
			},




























            /**
             * Open/Close nav by click
             *
             * Status: Done
             */
            clickOpenNav: function () {
                this.openNav = !this.openNav;
            },

            /**
             * Route to scene 3D
             *
             * Status: Done
             */
            clickScene3D: function () {
                this.$router.push({ name: 'scene3d' });
            },

            /**
             * Choise navigation canvas
             *
             * Status: Done
             */
            choiseNav: function(title){
                let nav = this.nav;
                for (let item in nav) {
                    if (this.nav[`${item}`].title === title) {
                        this.nav[`${item}`].status = true;
                    } else {
                        this.nav[`${item}`].status = false;
                    }
                }
            },

            /**
             * Choise navigation canvas
             *
             * Status: Done
             */
            choiseTab: function(title){
                let tabs = this.tabs;
                for (let item in tabs) {
                    if (this.tabs[`${item}`].title === title) {
                        this.tabs[`${item}`].status = true;
                    } else {
                        this.tabs[`${item}`].status = false;
                    }
                }
            },


            /**
             * Key press to action
             *
             * Status: Process
             */
            // keyPress: function(evt) {
            //     switch (evt.keyCode) {
            //         case 82: {
            //             this.points.points.applyAT2D( AT2D.rotationDeg(Math.PI / 18) ); break;
            //         }
            //         case 87: {
            //             this.points.points.applyAT2D( AT2D.scaling(1.1, 1.1) ); break;
            //         }
            //         case 81: {
            //             this.points.points.applyAT2D( AT2D.scaling(0.9, 0.9) ); break;
            //         }
            //         case 37: {
            //             this.points.points.applyAT2D( AT2D.translation(-0.5,0) ); break;
            //         }
            //         case 38: {
            //             this.points.points.applyAT2D( AT2D.translation(0,0.5) ); break;
            //         }
            //         case 39: {
            //             this.points.points.applyAT2D( AT2D.translation(0.5, 0) ); break;
            //         }
            //         case 40: {
            //             this.points.points.applyAT2D( AT2D.translation(0, -0.5) ); break;
            //         }
            //     }
            // },






            /**
             * Combo-adding points (start method)
             *
             * Status: Done *
             */
            addComboPointsStart: function (e) {
                this.points.points.clear();

                this.points.points.combo = true;

                this.spline.isActive = false;
                this.polynom.isActive = false;
                this.show.spline = false;
                this.show.polynom = false;

                this.points.points.addPoint(
                    this.camera2D.ScreenToWorldX(e.clientX),
                    this.camera2D.ScreenToWorldY(e.clientY)
                );
            },

            /**
             * Combo-adding points (drag method)
             *
             * Status: Done *
             */
            addComboPointsDrag: function (e) {
                if (!this.points.points.combo) {
                    return;
                }
                if (this.hDefault) {
                    if (this.points.points.x[this.points.points.x.length-1] + this.hDefault > this.camera2D.ScreenToWorldX(e.clientX) ) {
                        return;
                    }
                }

                this.points.points.addPoint(
                    this.camera2D.ScreenToWorldX(e.clientX),
                    this.camera2D.ScreenToWorldY(e.clientY)
                );
            },

            /**
             * Combo-adding points (stop method)
             *
             * Status: Done *
             */
            addComboPointsStop: function () {
                this.points.points.combo = false;

                // if ((this.spline.isActive)&&(this.show.spline)) {
                //     this.setSpline();
                // }

                // if ((this.polynom.isActive)&&(this.show.polynom)) {
                //     this.setPNewton();
                // }
            },




        }
    }
</script>

<style scoped lang="less">
    .component-scene-2d {
        & .scena-2d {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            & canvas {
                width: 100%;
            }

        }

        & .loadscene {
            position: absolute;
            background: #4f7de2;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            & p {
                color: #fff;
            }
        }

        & .openNav {
            position: fixed;
            right: 10px;
            top: 10px;
            z-index: 1000;
        }

        & .openScene3D {
            position: fixed;
            right: 60px;
            top: 10px;
            z-index: 1000;
        }

    }



    .fade-nav-enter, .fade-nav-leave-to {
        transform: translateX(300px);
        opacity: 0;
    }


</style>
