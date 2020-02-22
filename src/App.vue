<template>
    <div id="app">
        <router-view/>

        <div class="openGit">
            <a href="https://github.com/reznikovkg/nm-vue" target="_blank">
                <at-button type="primary" icon="icon-github" circle></at-button>
            </a>
        </div>
    </div>
</template>

<script>

export default {
    name: 'App'
}
</script>

<style lang="less">
    body {
        margin: 0;
        overflow-y: hidden;
        overflow-x: hidden;
     }

    #app {
        & .openGit {
            position: fixed;
            left: 10px;
            bottom: 10px;
            z-index: 1000;
        }
    }

    hr {
        border: none;
        border-color: #EEEEEE;
        border-style: solid none;
        border-width: 1px 0;
        margin: 10px 0;
    }


    .btn-group {
        & button {
            margin-bottom: 5px;
        }
    }


    .nav-scene {
        position: absolute;
        border-radius: 5px;
        right: 0.5rem;
        top: 0.5rem;
        bottom: 0.5rem;
        width: 300px;
        background: #fff;
        box-shadow: 0 0 5px #757575;
        padding: 10px;
        transition: 0.3s;

        display: flex;
        flex-direction: column;
        & .nav-head {
            & h4 {

                line-height: 40px;
                font-size: 24px;
                color: #6190e8;
            }
        }

        & .nav-tabs-head {
            margin-top: 10px;
            & button {
                margin-bottom: 5px;
                margin-right: 5px;
            }
        }

        & .nav-tabs-body {
            flex: 1;
            overflow-y: scroll;
            overflow-x: hidden;
        }

    }

    .rowFlex {
        display: flex;
    }

    .row-fix-width {
        width: 50px;
        margin-right: 10px;
    }

    .nav-tab {
        margin-right: 5px;
    }

    .row {
        & .at-btn {
            margin-right: 5px;
        }
    }
</style>
