<template>
    <div class="bot-navigation">
        <div class="bot-navigation-container d-flex justify-space-between align-center">
            <div class="bot-nav-item d-flex flex-column align-center" :class="{ active: tab == 'timeline' }" @click="setTab('timeline')">
                <v-icon :color="tab === 'timeline' ? '#1A2B7B' : '#8C95BD'">mdi-clock-time-four-outline</v-icon>
                <div class="nav-text">賽程表</div>
            </div>
            <div class="bot-nav-item d-flex flex-column align-center" :class="{ active: tab == 'board' }" @click="setTab('board')">
                <v-icon :color="tab === 'board' ? '#1A2B7B' : '#8C95BD'">mdi-scoreboard-outline</v-icon>
                <div class="nav-text">計分板</div>
            </div>
            <div class="bot-nav-item d-flex flex-column align-center" :class="{ active: tab == 'team' }" @click="setTab('team')">
                <v-icon :color="tab === 'team' ? '#1A2B7B' : '#8C95BD'">mdi-account-multiple-outline</v-icon>
                <div class="nav-text">隊伍名單</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useMainStore } from "@/store/main";
export default {
    name: 'TopContent',

    data: () => ({
    }),
    computed: {
        ...mapState(useMainStore, ['tab']),
    },
    methods: {
        ...mapActions(useMainStore, ['setTab']),
        setContentHeight() {
            const bannerHeight = document.querySelector('#banner').offsetHeight
            const content = document.querySelector('#mainarea');
            content.style.minHeight = `calc(100vh - 54px - ${bannerHeight}px)`;
        }
    }
}
</script>
<style lang="scss">
.bot-navigation {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 600px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    .bot-navigation-container {
        background-color: #fff;
        height: 72px;
        border-radius: 20px 20px 0 0;
        padding: 0 24px;

        .bot-nav-item {
            color: #8C95BD;
            transition: all ease .3s;
            .nav-text {
                font-size: 12px;
                font-weight: 500;
                line-height: 20px;
                text-align: center;
            }
        }
        .bot-nav-item.active{
            color: #1A2B7B;
            transition: all ease .3s;
        }
    }
}
</style>