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
        urlData: null,
        userPhone: null,
        IDToken: 123,
        accessToken: null,
        shareUid: null,
        userName: null,
        sid: null,
        citysData: null,
        zipCode: null,
        houseLandType: null,
        userAddress: null,
        roadName: null,
        cityId: null,
        phoneNumber: null,
        otpToken: null,
        otpCode: null,
        buyHouse: null,
        sellHouse: null,
        address: null,
        houseName: null,
        houseCityId: null,
        hosuezipCode: null,
        houseRoadName: null,
        houseAddress: null,
        backendData: null
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
        dataForGetCitys(state) {
            if (!state.urlData) return 0;
            const obj = {
                sid: "",
                utmSource: state.urlData.utmSource,
                utmMedium: state.urlData.utmMedium,
                utmCampaign: state.urlData.utmCampaign,
                utmContent: state.urlData.utmContent,
                utmTerm: state.urlData.utmTerm,
                utmCode: state.urlData.utmCode
            }
            return obj;
        },
        dataForSetLineShareLog(state) {
            if (!state.houseName) return 0;
            const obj = {
                agentId: state.urlData.agentId,
                storeId: state.urlData.storeId,
                utmSource: state.urlData.utmSource,
                utmMedium: state.urlData.utmMedium,
                utmCampaign: state.urlData.utmCampaign,
                utmContent: state.urlData.utmContent,
                utmTerm: state.urlData.utmTerm,
                shareUid: state.shareUid,
                sourceUid: state.urlData.sourceUid,
                idToken: state.IDToken,
                accessToken: state.accessToken,
                activityName: 'TVC_202410',
                retType: 0,
                tp: 0
            }
            return obj;
        },
        dataForGetRoadsHouse(state) {
            if (!state.hosuezipCode) {
                return null;
            }
            return {
                zipCode: state.hosuezipCode,
                utmSource: state.urlData.utmSource,
                utmMedium: state.urlData.utmMedium,
                utmCampaign: state.urlData.utmCampaign,
                utmContent: state.urlData.utmContent,
                utmTerm: state.urlData.utmTerm,
                utmCode: state.urlData.utmCode,
                sid: state.sid
            }
        },
        dataForGetRoads(state) {
            if (!state.zipCode) {
                return null;
            }
            return {
                zipCode: state.zipCode,
                utmSource: state.urlData.utmSource,
                utmMedium: state.urlData.utmMedium,
                utmCampaign: state.urlData.utmCampaign,
                utmContent: state.urlData.utmContent,
                utmTerm: state.urlData.utmTerm,
                utmCode: state.urlData.utmCode,
                sid: state.sid
            }
        },
        dataForSaveUid(state) {
            if (!state.userAddress) return 0;
            const obj = {
                uid: state.shareUid,
                sid: state.sid,
                phoneNumber: "",
                answer: {
                    houseName: state.houseName,
                    houseLandType: state.houseLandType,
                    cityId: state.houseCityId,
                    zipCode: state.hosuezipCode,
                    roadName: state.houseRoadName,
                    address: state.userAddress
                },
                utmSource: state.urlData.utmSource,
                utmMedium: state.urlData.utmMedium,
                utmCampaign: state.urlData.utmCampaign,
                utmContent: state.urlData.utmContent,
                utmTerm: state.urlData.utmTerm,
                utmCode: state.urlData.utmCode,
                sourceUid: state.urlData.sourceUid
            }
            return obj;
        },
        dataForSendOTP(state) {
            if (!state.phoneNumber) {
                return null;
            }
            return {
                phoneNumber: state.formattedPhoneNumber,
                utmSource: state.urlData.utmSource,
                utmMedium: state.urlData.utmMedium,
                utmCampaign: state.urlData.utmCampaign,
                utmContent: state.urlData.utmContent,
                utmTerm: state.urlData.utmTerm,
                utmCode: state.urlData.utmCode,
                sourceUid: state.urlData.sourceUid,
                sid: state.sid,
                uid: state.shareUid,
                answer: {
                    houseName: state.houseName,
                    houseLandType: state.houseLandType,
                    cityId: state.houseCityId,
                    zipCode: state.hosuezipCode,
                    roadName: state.houseRoadName,
                    address: state.userAddress
                },
            }
        },
        dataForSaveRet(state) {
            return {
                phoneNumber: state.formattedPhoneNumber,
                name: state.userName,
                nickname: state.nickName,
                cityId: state.cityId,
                zipCode: state.zipCode,
                roadName: state.roadName,
                address: state.address,
                sid: state.sid,
                uid: state.shareUid,
                buyHouse: state.buyHouse,
                sellHouse: state.sellHouse,
                answer: {
                    houseName: state.houseName,
                    houseLandType: state.houseLandType,
                    cityId: state.houseCityId,
                    zipCode: state.hosuezipCode,
                    roadName: state.houseRoadName,
                    address: state.userAddress
                },
                utmSource: state.urlData.utmSource,
                utmMedium: state.urlData.utmMedium,
                utmCampaign: state.urlData.utmCampaign,
                utmContent: state.urlData.utmContent,
                utmTerm: state.urlData.utmTerm,
                utmCode: state.urlData.utmCode,
                storeId: state.urlData.storeId,
                agentId: state.urlData.agentId,
                otpToken: state.otpToken,
                otpCode: state.otpCode
            }
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
        setUrlData(obj) {
            this.$patch((state) => {
                state.urlData = obj;
            })
        },
        setUserPhone(string) {
            this.$patch((state) => {
                state.userPhone = string;
            })
        },
        setIDToken(token) {
            this.$patch((state) => {
                state.IDToken = token;
            })
        },
        setAccessToken(token) {
            this.$patch((state) => {
                state.accessToken = token;
            })
        },
        setShareUid(id) {
            this.$patch((state) => {
                state.shareUid = id;
            })
        },
        setUserName(string) {
            this.$patch((state) => {
                state.userName = string;
            })
        },
        setSid(string) {
            this.$patch((state) => {
                state.sid = string;
            })
        },
        setCitysData(obj) {
            this.$patch((state) => {
                state.citysData = obj;
            })
        },
        setZipCode(string) {
            this.$patch((state) => {
                state.zipCode = string;
            })
        },
        setHouseLandType(string) {
            this.$patch((state) => {
                state.houseLandType = string;
            })
        },
        setUserAddress(string) {
            this.$patch((state) => {
                state.userAddress = string;
            })
        },
        setCityId(string) {
            this.$patch((state) => {
                state.cityId = string;
            })
        },
        setRoadName(string) {
            this.$patch((state) => {
                state.roadName = string;
            })
        },
        setAddress(string) {
            this.$patch((state) => {
                state.address = string;
            })
        },
        setBuyHouse(boolean) {
            this.$patch((state) => {
                state.buyHouse = boolean;
            })
        },
        setSellHouse(boolean) {
            this.$patch((state) => {
                state.sellHouse = boolean;
            })
        },
        setOtpToken(string) {
            this.$patch((state) => {
                state.otpToken = string;
            })
        },
        setOtpCode(string) {
            this.$patch((state) => {
                state.otpCode = string;
            })
        },
        setHouseName(string) {
            this.$patch((state) => {
                state.houseName = string;
            })
        },
        setPhoneNumber(tel) {
            this.$patch((state) => {
                state.phoneNumber = tel;
            })
        },
        setHouseCityId(string) {
            this.$patch((state) => {
                state.houseCityId = string;
            })
        },
        setHouseZipCode(string) {
            this.$patch((state) => {
                state.hosuezipCode = string;
            })
        },
        setHouseRoadName(string) {
            this.$patch((state) => {
                state.houseRoadName = string;
            })
        },
        setHouseAddress(string) {
            this.$patch((state) => {
                state.houseAddress = string;
            })
        },
        setBackEndData(obj) {
            this.$patch((state) => {
                state.backendData = obj;
            })
        }
    },
})