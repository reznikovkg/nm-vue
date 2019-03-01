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
    name: 'App',
    methods: {
    }
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
            right: 10px;
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

    .row {
        margin-bottom: 10px;

        button {
            margin-right: 10px;
            margin-bottom: 10px;
        }

        &.btn {
            &:last-child {
              margin: 0;
            }
            margin-bottom: 0;
        }

    }

    .at-tabs {
        overflow: hidden;
        position: absolute;
        right: 10px;
        left: 10px;
        bottom: 10px;
        top: 60px;
        overflow-y: scroll;
    }
</style>
