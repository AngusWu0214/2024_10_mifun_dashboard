<template>
    <v-container fluid>
        <footer id="footer">
            <p>2024 蘭權媽媽</p>
            <div class="mask"></div>
        </footer>
    </v-container>
</template>

<script>
export default {
    name: 'TopContent',

    data: () => ({
    }),
    methods: {
        setContentHeight() {
            const bannerHeight = document.querySelector('#banner').offsetHeight
            const content = document.querySelector('#mainarea');
            content.style.minHeight = `calc(100vh - 54px - ${bannerHeight}px)`;
        }
    }
}
</script>
<style lang="scss">
.container {
    padding: 0;
}

#footer {
    width: 100%;
    background-color: #000;
    p {
        font-size: 12px;
        font-weight: 500;
        line-height: 56px;
        text-align: center;
        color: #fff;
        height: 56px;
        margin: 0;
    }
    .mask{
        width: 100%;
        background-color: #000;
        height: 72px;
    }
}
</style>