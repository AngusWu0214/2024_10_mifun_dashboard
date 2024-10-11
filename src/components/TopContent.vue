<template>
    <v-container>
        <header class="header">
            <img src="../assets/header.png" alt="">
        </header>
        <div class="banner" id="banner">
            <img src="../assets/banner.jpg" @load="setContentHeight">
        </div>
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

.header {
    color: #000;
    // width: 100%;
    // height: 20px;
    background-color: #000;
    padding: 12px 0;
    margin: 0 auto;
    display: flex;
    justify-content: center;

    img {
        width: 97px;
    }

}

.banner {
    background-color: #000;
    display: flex;
    justify-content: center;
    overflow: hidden;

    img {
        width: 100%;
        max-width: 600px;
    }
}
</style>