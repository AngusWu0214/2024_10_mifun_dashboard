import { defineStore } from 'pinia';

// 這邊 defineStore 會自動動態註冊模組，回傳值為 hook function
export const useMainStore = defineStore('Main', {
    // 注意 state 是一個 function，推薦使用 arrow function
    // 可幫助 typescript 更好進行類型推斷
    state: () => ({
        isLoading: true,
        isMobile: null,
        popup: null,
        popupQueue: null,
        tab: 'team', //timeline,board,team
    }),
    getters: {
        formattedPhoneNumber: (state) => {
            // 透過 getter 將號碼自動轉換
            if (!state.phoneNumber) return 0;
            if (state.phoneNumber.startsWith('09')) {
                return '+886' + state.phoneNumber.slice(1);
            }
            return state.phoneNumber;
        },
        tabLabel: (state) => {
            const tabMap = {
                timeline: '賽程表',
                board: '計分板',
                team: '隊伍名單',
            };
            return tabMap[state.tab] || '未知頁面'; // 根據 tab 返回中文，若沒有匹配則返回 '未知頁面'
        },
    },
    actions: {
        resetState() {
            const currentIsMobile = this.isMobile; // 保留當前的 isMobile 值
            this.$reset(); // 重置其他狀態
            this.isMobile = currentIsMobile; // 恢復 isMobile 的值
            this.isLoading = false;
        },
        setLoading(boolean) {
            this.$patch((state) => {
                state.isLoading = boolean;
            });
        },
        setIsMobile(boolean) {
            this.$patch((state) => {
                state.isMobile = boolean;
            });
        },
        setTab(string) {
            this.$patch((state) => {
                state.tab = string;
            });
        },
    },
})