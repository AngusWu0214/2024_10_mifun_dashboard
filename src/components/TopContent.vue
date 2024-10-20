<template>
    <v-container fluid>
        <header class="header">
            <img src="../assets/header.png" alt="">
        </header>
        <transition name="fade" mode="out-in">
            <div class="banner" id="banner" v-if="tab === 'board' || !activeTeam">
                <img src="../assets/banner.jpg" @load="setContentHeight">
            </div>
            <div class="country-banner" v-else>
                <!-- <img class="bg" src="../assets/banner_nobg.png" alt=""> -->
                 <img :src="activeTeamData.lgImage" alt="">
            </div>
        </transition>
    </v-container>
</template>

<script>
import { mapState } from "pinia";
import { useMainStore } from "@/store/main";

export default {
    name: 'TopContent',
    computed: {
        ...mapState(useMainStore, ['tab', 'tabLabel', 'activeTeam', 'activeTeamData']),
    },
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
    background-color: #000;
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

.country-banner {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    aspect-ratio: 375/160;
    max-width: 600px;
    background-image: url('../assets/banner_nobg.png');
    background-size: 100% auto;
    background-position: center center;
    margin: 0 auto;
    img{
        width: 180px;
    }
}
</style>