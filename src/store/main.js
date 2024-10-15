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
        activeTeam: null
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
        activeTeamData: (state) => {
            if(!state.activeTeam) return 0;
            const teams = {
              '巴拉圭': {
                className: 'paraguay',
                lgImage: require('../assets/A_lg.png'),
                smImage: require('../assets/A_sm.png'),
              },
              '馬紹爾群島': {
                className: 'marshall-islands',
                lgImage: require('../assets/B_lg.png'),
                smImage: require('../assets/B_sm.png'),
              },
              '史瓦帝尼': {
                className: 'eswatini',
                lgImage: require('../assets/C_lg.png'),
                smImage: require('../assets/C_sm.png'),
              },
              '瓜地馬拉': {
                className: 'guatemala',
                lgImage: require('../assets/D_lg.png'),
                smImage: require('../assets/D_sm.png'),
              },
              '聖克里斯多福及尼維斯聯邦': {
                className: 'st-kitts-nevis',
                lgImage: require('../assets/E_lg.png'),
                smImage: require('../assets/E_sm.png'),
              },
              '吐瓦魯國': {
                className: 'tuvalu',
                lgImage: require('../assets/F_lg.png'),
                smImage: require('../assets/F_sm.png'),
              },
              '聖文森及格瑞那丁': {
                className: 'st-vincent-grenadines',
                lgImage: require('../assets/G_lg.png'),
                smImage: require('../assets/G_sm.png'),
              },
              '海地': {
                className: 'haiti',
                lgImage: require('../assets/H_lg.png'),
                smImage: require('../assets/H_sm.png'),
              }
            };
      
            return teams[state.activeTeam];
          }
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
        setActiveTeam(string) {
            this.$patch((state) => {
                state.activeTeam = string;
            });
        }
    },
})