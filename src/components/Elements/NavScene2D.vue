<template>
    <transition name="fade-nav" mode="out-in" appear>
        <div class="nav-scene" v-if="open">

            <div class="head-nav">
                <h4>NM-VUE</h4>
            </div>

            <at-tabs>
                <at-tab-pane label="Grid" name="grid">
                    <at-checkbox v-model="grid.axiss" label="Shenzhen">Axis</at-checkbox>
                    <at-checkbox v-model="grid.grid" label="Shenzhen">Grid</at-checkbox>
                </at-tab-pane>
                <at-tab-pane label="Tab2" name="name2">
                    <p>Content of Tab Pane 2</p>
                </at-tab-pane>
            </at-tabs>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "NavScene2D",
        props: ['open'],
        data () {
            return {
                grid: {
                    axiss: true,
                    grid: true
                }
            }
        },
        watch: {
            'grid.axiss': function () {
                this.$emit('navGridAxiss', this.grid.axiss);
            },
            'grid.grid': function () {
                this.$emit('navGridGrid', this.grid.grid);
            }
        }
    }
</script>

<style lang="less">
    .fade-nav-enter, .fade-nav-leave-to {
        transform: translateX(300px);
        opacity: 0;
    }

    .nav-scene {
        position: absolute;
        right: 0;
        top: 0;
        width: 300px;
        height: 100%;
        background: #fff;
        border-left: 1px solid #5782d1;
        box-shadow: 0 0 5px #5782d1;
        padding: 10px;
        transition: 0.3s;

        & .head-nav {
            & h4 {

                line-height: 40px;
                font-size: 24px;
                color: #6190e8;
            }
        }
    }
</style>
