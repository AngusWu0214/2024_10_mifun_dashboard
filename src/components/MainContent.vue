<template>
  <v-container fluid pa-0>
    <div class="main-inner" id="mainarea">
      <transition name="fade" mode="out-in">
        <div class="tab-title" :class="tab" :key="tab">
          {{ tabLabel }}
        </div>
      </transition>
      <transition name="fade" mode="out-in">
        <v-select v-if="tab !== 'board'" class="px-2" placeholder="請選擇國家隊" variant="underlined" :items="teams"
          color="#fff" dark @change="setActiveTeamHandler" item-color="#0000" v-model="userTeam">
        </v-select>
      </transition>
      <transition name="fade" mode="out-in">
        <div class="board-container" :key="tab" v-if="tab == 'board'">
          <transition name="fade" mode="out-in">
            <div class="panel-container" v-if="boardData" key="panel">
              <div class="title-list d-flex justify-space-between mb-2">
                <div class="d-flex">
                  <div class="mr-4">排名</div>
                  <div>隊名</div>
                </div>
                <div>目前積分</div>
              </div>
              <v-expansion-panels v-model="panel" accordion>
                <v-expansion-panel class="mb-1" v-for="(team, index) in boardData" :key="index">
                  <v-expansion-panel-header>
                    <div class="header-item d-flex justify-space-between align-center">
                      <div class="left-content d-flex justify-space-between align-center">
                        <div class="num-icon" v-if="allTugOfWarCompleted">
                          <img v-if="team.rank <= 3" :src="require(`../assets/icon_num_${team.rank}.png`)" alt="">
                          <div v-else>{{ team.rank }}</div>
                        </div>
                        <div class="num-icon" v-else>
                          <img v-if="team.rank <= 3" src="../assets/icon_num_0.png" alt="">
                          <div v-else>{{ team.rank }}</div>
                        </div>
                        <div class="country d-flex align-center">
                          <div class="flag">
                            <img :src="getCountryImagePath(team.country)" alt="">
                          </div>
                          <div class="country-name ml-1">
                            {{ team.country }}
                          </div>
                        </div>
                      </div>
                      <div class="total-score">{{ team.totalScore }}</div>
                    </div>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div class="fraction-list">
                      <div class="fraction-item d-flex justify-space-between">
                        <div class="activity-name">躲避球</div>
                        <div class="score" v-if="team.dodgeballStatus === '比賽結束'">{{ team.dodgeballScore }}</div>
                        <div class="score" v-else>-</div>
                      </div>
                      <div class="fraction-item d-flex justify-space-between">
                        <div class="activity-name">擊劍</div>
                        <div class="score" v-if="team.fencingStatus === '比賽結束'">{{ team.fencingScore }}</div>
                        <div class="score" v-else>-</div>
                      </div>
                      <div class="fraction-item d-flex justify-space-between">
                        <div class="activity-name">排球</div>
                        <div class="score" v-if="team.volleyballStatus === '比賽結束'">{{ team.volleyballScore }}</div>
                        <div class="score" v-else>-</div>
                      </div>
                      <div class="fraction-item d-flex justify-space-between">
                        <div class="activity-name">跳繩</div>
                        <div class="score" v-if="team.jumpropeStatus === '比賽結束'">{{ team.jumpropeScore }}</div>
                        <div class="score" v-else>-</div>
                      </div>
                      <div class="fraction-item d-flex justify-space-between">
                        <div class="activity-name">拔河</div>
                        <div class="score" v-if="team.tugofwarStatus === '比賽結束'">{{ team.tugofwarScore }}</div>
                        <div class="score" v-else>-</div>
                      </div>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              <div class="timeline-tips">
                以上資料為各隊目前總積分，最終比賽結果依 2024 MDCG 福委會公告為準。
              </div>
            </div>
            <div class="default-content d-flex flex-column align-center" v-else key="default">
              <img src="../assets/run_people.png" alt="">
              <p>資料讀取中</p>
            </div>
          </transition>

        </div>
        <div class="timeline-container px-2" :key="tab" v-if="tab == 'timeline'">
          <transition name="fade" mode="out-in">
            <div class="btn-hideend px-4 mb-4 mt-4" v-if="activeTeam && !allMatchesNotStarted"
              @click="isHideEnd = !isHideEnd">{{ isHideEnd ?
                '顯示已結束的活動' : '隱藏已結束的活動' }}</div>
          </transition>

          <transition name="fade" mode="out-in">
            <div class="card-container px-4 d-flex flex-column align-end" v-if="activeTeam">
              <div class="card pa-3"
                :class="{ disabled: selectedTimeLine.matches.length < 5 || selectedTimeLine.matches[0].status === '比賽結束' }"
                v-if="!isHideEnd || selectedTimeLine.matches.length == 5">
                <div class="card-header mb-4 d-flex justify-start align-center">
                  <div class="activity-name">開幕式</div>
                </div>
                <div class="time px-2 py-1">
                  <span class="mr-2"><v-icon class="mr-1" color="#fff"
                      size="20px">mdi-clock-time-four-outline</v-icon>時間</span>
                  <span>13:00 - 13:30</span>
                </div>
              </div>
              <div class="card pa-3" v-for="(event, index) in selectedTimeLine.matches" :key="index"
                :class="{ disabled: event.status === '比賽結束' }">
                <div class="card-header mb-4 d-flex justify-space-between align-center">
                  <div class="activity-name">{{ event.event }}</div>
                  <div class="btn-rule px-4" @click="showPopup(event.event)">查看規則</div>
                </div>
                <div class="time px-2 py-1 mb-2">
                  <span class="mr-2"><v-icon class="mr-1" color="#fff"
                      size="20px">mdi-clock-time-four-outline</v-icon>時間</span>
                  <span>{{ getEventTime(index) }}</span>
                </div>
                <div class="opponent px-2 py-1 d-flex" :class="getTeamColor(event.opponent).className">
                  <v-icon class="mr-1" :color="event.opponent === '巴拉圭' ? '#000' : '#fff'"
                    size="20px">mdi-sword-cross</v-icon>
                  <span class="mr-2">對手</span>
                  <span class="mr-1 icon_conutry"><img :src="getTeamColor(event.opponent).smImage" alt=""></span>
                  <span>{{ event.opponent }}</span>
                </div>
              </div>
              <!-- <div class="card pa-3">
                <div class="card-header mb-4 d-flex justify-space-between align-center">
                  <div class="activity-name">排球</div>
                  <div class="btn-rule px-4">查看規則</div>
                </div>
                <div class="time px-2 py-1 mb-2">
                  <span class="mr-2"><v-icon class="mr-1" color="#fff"
                      size="20px">mdi-clock-time-four-outline</v-icon>時間</span>
                  <span>13:00 - 13:30</span>
                </div>
                <div class="opponent px-2 py-1">
                  <v-icon class="mr-1" color="#fff" size="20px">mdi-sword-cross</v-icon>
                  <span class="mr-2">對手</span>
                  <span class="mr-1 icon_conutry"><img src="../assets/test.png" alt=""></span>
                  <span>馬紹爾群島</span>
                </div>
              </div> -->
              <div class="card pa-3">
                <div class="card-header mb-4 d-flex justify-start align-center">
                  <div class="activity-name">閉幕式</div>
                </div>
                <div class="time px-2 py-1">
                  <span class="mr-2"><v-icon class="mr-1" color="#fff"
                      size="20px">mdi-clock-time-four-outline</v-icon>時間</span>
                  <span>17:20 - 17:40</span>
                </div>
              </div>
            </div>
            <div class="default-content d-flex flex-column align-center" v-else key="default">
              <img src="../assets/run_people.png" alt="">
              <p>快來為你的國家隊加油</p>
            </div>
          </transition>
        </div>
        <div class="team-container" :key="tab" v-if="tab == 'team'">
          <transition name="fade" mode="out-in">
            <div class="member-container" v-if="selectedTeam">
              <div class="leader" :class="activeTeamData.className">
                <img :src="activeTeamData.smImage" alt="" class="mr-1">
                隊長：{{ selectedTeam.people[0] }} | 副隊長：{{ selectedTeam.people[1] }}
              </div>
              <div class="mb-4">國家隊員:</div>
              <div class="team-member">
                <span v-for="(person, index) in selectedTeam.people.slice(2)" :key="index"> {{ person }} /</span>
              </div>
            </div>
            <div class="default-content d-flex flex-column align-center" v-else key="default">
              <img src="../assets/sit_people.png" alt="">
              <p>跟你的國家隊員一起暖身</p>
            </div>
          </transition>
        </div>
      </transition>
    </div>
    <transition name="fade" mode="out-in">
      <div class="popup" v-if="popup" @click="closePopup">
        <div class="popup-container px-4" @click.stop="">
          <div class="popup-header pa-4 d-flex justify-space-between">
            <span>{{ activePopup.event }}規則</span>
            <span @click="closePopup"><v-icon color="#343747">mdi-close</v-icon></span>
          </div>
          <div class="popup-content px-4 pb-4">
            <div class="rule-title round d-flex justify-space-between align-center mb-3">
              <div class="title-content">回合</div>
              <div class="line"></div>
            </div>
            <ul class="rule-content mb-4">
              <li v-for="(item, index) in activePopup.round" :key="index">{{ item }}</li>
            </ul>
            <div class="rule-title rule d-flex justify-space-between align-center mb-3">
              <div class="title-content">規則</div>
              <div class="line"></div>
            </div>
            <ul class="rule-content mb-4">
              <li v-for="(item, index) in activePopup.rule" :key="index">{{ item }}</li>
            </ul>
            <div class="rule-title point d-flex justify-space-between align-center mb-3">
              <div class="title-content">計分</div>
              <div class="line"></div>
            </div>
            <ul class="rule-content mb-4">
              <li v-for="(item, index) in activePopup.score" :key="index">{{ item }}</li>
            </ul>
            <div class="popup-footer d-flex justify-center align-center">
              <div class="btn-agree px-4" @click="closePopup">我了解哩</div>
            </div>
          </div>

        </div>
      </div>
    </transition>
    <div class="btn-reset" @click="resetData" v-if="tab !== 'team'"></div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useMainStore } from "@/store/main";
export default {
  name: 'MainContent',

  data: () => ({
    tabTitle: '賽程表',
    panel: null,
    sheetData: 1,
    popup: 0,
    teamData: null,
    teams: ["巴拉圭", "馬紹爾群島", "史瓦帝尼", "瓜地馬拉", "聖克里斯多福及尼維斯聯邦", "吐瓦魯", "聖文森及格瑞那丁", "海地"],
    userTeam: null,
    boardData: null,
    timeLineData: null,
    activePopup: null,
    popupData: [
      {
        event: '排球',
        round: ['對抗制，共2回合', '每回合10分鐘，若某隊得到12分則提前結束該回合', '每回合每隊6人上場'],
        rule: ['一切按照排球規則（計分除外）', '兩回合不可派重複的人上場', '每回合開始前，各隊有各發一次球的試玩機會'],
        score: ['採累計制，但每回合最高得分為12分']
      },
      {
        event: '跳繩',
        round: ['輪流進行，每隊3回合', '每回合2分鐘', '每回合每隊分別為3、4、5人上場，外加2名甩繩員', '比賽開始前每隊輪流，各有2分鐘的暖身時間'],
        rule: ['兩隊各派一人猜拳，贏的可以選要先或後', '由各隊自行推派選手', '比賽進行間可換人上場，但損失的時間不會補給', '倒數30秒和時間結束時，裁判會提示', '不得干擾對手進行比賽'],
        score: ['計分取每回合最高連續次數的得分', '每回合，連續跳2下，得1分', '若連續次數為奇數，則多出那一下不計分，例如某回合最高連續次數為11下，則得分為5分', '此項目天花板就是最高25分', '若時間結束，哨聲響起，選手仍繼續跳則不列入計分']
      },
      {
        event: '擊劍',
        round: ['對抗制，男單、女單、男雙、女雙各2回合，共8回合', '每回合40秒'],
        rule: ['由隊內討論選出各回合參賽的劍士', '所有劍士手持泡棉棒，身穿魔鬼氈背心，背心或背帶上附有可被擊落的球', '劍士的目標是用泡棉棒擊落對方身上的球', '依實際男女出席狀況，評審將有權即時賽制調整'],
        score: ['該回合擊落最多球者，單人賽得 2 分，雙人賽得 3 分', '若平手，則各得 1 分', '全部比賽結束後，贏最多局的隊伍再加 5 分', '此項目天花板為最高25分']
      },
      {
        event: '躲避球',
        round: ['對抗制，共3回合', '每回合6分鐘，若某隊得到8分則提前結束該回合', '每回合每隊外場2人，內場6人'],
        rule: ['開場球權爭奪：球置於場中央，雙方球員從後方紅線起跑衝搶球', '奪球後，須先回場踩到紅線，才能發動攻擊', '內場球員若被擊中，視為出局並前往外場', '外場球員擊中敵方內場球員，則復活並進入內場', '場內若僅剩一位球員，該球員被擊中不會出局', '出界為從寬認定，球員踩線不算出界', '男性需雙手擲球，女性不限', '裁判暫停響哨後，擲出的球無效'],
        score: ['採累計制，擊中對手內場得1分', '每回合最高分為8分', '若回合結束，雙方皆未奪下8分，人多的一方+1分', '若回合結束，雙方人數相同時，各+1分', '此項目天花板為總和24分']
      },
      {
        event: '拔河',
        round: ['每場比賽有3 回合，採3戰2勝制', '每回合1分鐘', '每回合由兩隊進行，參賽人數以當天出席人數最少的隊伍為基準(視情況扣除因傷缺席的人員)'],
        rule: ['八強賽4場，四強賽2場，冠軍賽1場，全員共有7場比賽', '比賽場地上有中心線標註', '繩子中間處有紅色標記，左右4公尺處各有一個白色標記，左右5公尺處各有一個藍色標記', '雙方從藍色標記開始交錯站位，最後一位握繩其子必須從身體前方沿著至背部，再斜上對側肩上，多餘的繩子應經由腋下向後；不可將纏繞身體'],
        win: ['比賽時白色標記被拉至場地中心線', '1分鐘結束後，以紅色線條偏向的隊伍方作為勝者'],
        score: ['拔河冠軍獲得25分', '拔河亞軍獲得20分', '拔河季軍、殿軍獲得15分', '拔河五～八強獲得10分']
      }
    ],
    isHideEnd: true,
  }),
  computed: {
    ...mapState(useMainStore, ['tab', 'tabLabel', 'activeTeam', 'activeTeamData']),
    selectedTeam() {
      if (!this.teamData) return 0
      return this.teamData.find(team => team.country === this.activeTeam);
    },
    selectedTimeLine() {
      if (!this.timeLineData) return 0
      let ogData = this.timeLineData.find(team => team.country === this.activeTeam);
      if (this.isHideEnd) {
        return {
          ...ogData,
          matches: ogData.matches.filter(match => match.status === "尚未開始")
        };
      }
      return ogData;
    },
    allTugOfWarCompleted() {
      // 檢查所有的 tugofwarStatus 是否都等於 "比賽結束"
      if (!this.boardData) return 0
      return this.boardData.every(team => team.tugofwarStatus === "比賽結束");
    },
    allMatchesNotStarted() {
      if (!this.timeLineData || !this.activeTeam) return 0;
      let ogData = this.timeLineData.find(team => team.country === this.activeTeam);
      return ogData.matches.every(match => match.status === '尚未開始')
    }
  },
  methods: {
    ...mapActions(useMainStore, ['setActiveTeam', 'setLoading']),
    setActiveTeamHandler(value) {
      this.setActiveTeam(value); // 呼叫 Pinia 的 action 設置 activeTeam
    },
    async resetData() {
      this.setLoading(true);

      try {
        // 依次執行數據獲取，使用 await 確保每個操作完成後才執行下一個
        await this.fetchBoardData();
        await this.fetchTimeLineData();
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("資料加載失敗，請稍後再試");
      } finally {
        // 所有數據加載完畢，關閉 loading
        this.setLoading(false);
      }
    },
    test() {
      this.sheetData = null;
      console.log(this.panel)
    },
    showPopup(eventName) {
      const popupContent = this.popupData.find(item => item.event === eventName);
      if (popupContent) {
        this.activePopup = popupContent;
        this.popup = true;  // 控制顯示彈窗
      }
    },

    closePopup() {
      this.popup = false;  // 關閉彈窗
      this.activePopup = null;
    },
    transpose(array) {
      return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
    },
    async fetchAllData() {
      // 開始加載，設置 loading 狀態
      this.setLoading(true);

      try {
        // 依次執行數據獲取，使用 await 確保每個操作完成後才執行下一個
        await this.fetchTeamData();
        await this.fetchBoardData();
        await this.fetchTimeLineData();
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("資料加載失敗，請稍後再試");
      } finally {
        // 所有數據加載完畢，關閉 loading
        this.setLoading(false);
      }
    },
    async fetchTeamData() {
      const apiKey = "AIzaSyBIk_3y0P0gliDInh146C0oCP1Bp0Xn5KY";
      const sheetId = "1wCI3m6UOnoViw_0sXajYelUpGzwVMkX6zK_mL5efmcA";
      const range = "串接分組名單!A1:H20";
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        let sheetData = data.values;
        const transposedData = this.transpose(sheetData);
        const formattedData = transposedData.map(row => ({
          country: row[0],
          people: row.slice(1).filter(person => person)
        }));
        this.teamData = formattedData;
      } catch (error) {
        console.error("Error fetching team data:", error);
        throw error;
      }
    },
    async fetchBoardData() {
      const apiKey = "AIzaSyBIk_3y0P0gliDInh146C0oCP1Bp0Xn5KY";
      const sheetId = "1wCI3m6UOnoViw_0sXajYelUpGzwVMkX6zK_mL5efmcA";
      const range = "串接分數!A1:H11";
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        let sheetData = data.values;
        const transposedData = this.transpose(sheetData);
        const formattedData = transposedData.map(row => ({
          country: row[0],
          dodgeballScore: parseInt(row[1]) || 0,            // 躲避球分數
          fencingScore: parseInt(row[2]) || 0,              // 擊劍分數
          volleyballScore: parseInt(row[3]) || 0,           // 排球分數
          jumpropeScore: parseInt(row[4]) || 0,             // 跳繩分數
          tugofwarScore: parseInt(row[5]) || 0,             // 拔河分數
          dodgeballStatus: row[6],                          // 躲避球狀態
          fencingStatus: row[7],                            // 擊劍狀態
          volleyballStatus: row[8],                         // 排球狀態
          jumpropeStatus: row[9],                           // 跳繩狀態
          tugofwarStatus: row[10],                          // 拔河狀態
          totalScore: parseInt(row[1]) + parseInt(row[2]) + parseInt(row[3]) + parseInt(row[4]) + parseInt(row[5])
        }));
        formattedData.sort((a, b) => b.totalScore - a.totalScore);
        let rank = 1;
        formattedData.forEach((team, index) => {
          if (index > 0 && team.totalScore < formattedData[index - 1].totalScore) {
            rank = index + 1;
          }
          team.rank = rank; // 新增名次欄位
        });
        this.boardData = formattedData;
        console.log(this.boardData)
      } catch (error) {
        console.error("Error fetching board data:", error);
        throw error;
      }
    },
    async fetchTimeLineData() {
      const apiKey = "AIzaSyBIk_3y0P0gliDInh146C0oCP1Bp0Xn5KY";
      const sheetId = "1wCI3m6UOnoViw_0sXajYelUpGzwVMkX6zK_mL5efmcA";
      const range = "串接賽程表!A1:H16";
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        let sheetData = data.values;
        const formattedData = sheetData[0].map((team, index) => ({
          country: team,
          matches: [
            { opponent: sheetData[1][index], event: sheetData[6][index], status: sheetData[11][index] },
            { opponent: sheetData[2][index], event: sheetData[7][index], status: sheetData[12][index] },
            { opponent: sheetData[3][index], event: sheetData[8][index], status: sheetData[13][index] },
            { opponent: sheetData[4][index], event: sheetData[9][index], status: sheetData[14][index] },
            { opponent: sheetData[5][index], event: sheetData[10][index], status: sheetData[15][index] }
          ]
        }));
        this.timeLineData = formattedData;
        console.log(this.timeLineData)
      } catch (error) {
        console.error("Error fetching timeline data:", error);
        throw error;
      }
    },
    getCountryImagePath(country) {
      // 創建一個對應的國家代碼與名稱的映射
      const countryMap = {
        "巴拉圭": "A",
        "馬紹爾群島": "B",
        "史瓦帝尼": "C",
        "瓜地馬拉": "D",
        "聖克里斯多福及尼維斯聯邦": "E",
        "吐瓦魯": "F",
        "聖文森及格瑞那丁": "G",
        "海地": "H"
      };

      // 根據國家名稱獲取對應的代碼
      const countryCode = countryMap[country];

      // 返回對應的圖片路徑
      if (countryCode) {
        return require(`../assets/${countryCode}_3x.png`);
      } else {
        return ''; // 如果沒有找到對應的國家，返回空字串或一個預設圖片
      }
    },
    getEventTime(index) {
      const eventTimes = [
        "13:35 - 14:15",
        "14:20 - 15:00",
        "15:05 - 15:45",
        "15:50 - 16:30",
        "16:45 - 17:15"
      ];
      return eventTimes[index] || "時間待定"; // 如果 index 超過範圍，顯示 "時間待定"
    },
    getTeamColor(team) {
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
        '吐瓦魯': {
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

      return teams[team];
    },
  },
  mounted() {
    this.fetchAllData();
  }
}
</script>
<style lang="scss">
.main-inner {
  background: linear-gradient(180deg, #1A2B7B 0%, #060000 88.9%);
  // min-height: 200px;
  max-width: 600px;
  padding-top: 16px;
  margin: 0 auto;

  .tab-title {
    position: relative;
    font-size: 24px;
    font-weight: 700;
    // line-height: 35.52px;
    text-align: center;
    color: #fff;
    margin-bottom: 16px;

    &::before {
      position: absolute;
      content: '';
      display: block;
      width: calc(355px / 3);
      height: calc(102px / 3);
      background-image: url(../assets/title_bg_sm.png);
      background-size: cover;
      background-repeat: no-repeat;
      left: 50%;
      transform: translateX(-50%);
      top: 15px;
    }

    &.team {
      &::before {
        position: absolute;
        content: '';
        display: block;
        width: calc(445px / 3);
        height: calc(102px / 3);
        background-image: url(../assets/title_bg_lg.png);
        background-size: cover;
        background-repeat: no-repeat;
        left: 50%;
        transform: translateX(-50%);
        top: 15px;
      }
    }

  }

  .panel-container {
    padding: 0 16px 16px 16px;

    .title-list {
      padding-left: 16px;
      padding-right: 56px;
      color: #fff;
      font-size: 14px;
    }

    .header-item {
      padding-right: 16px;

      .num-icon {
        width: 24px;
        text-align: center;
        margin-right: 16px;
      }

      .flag {
        width: 18px;

        img {
          width: 100%;
        }
      }

      .country-name {
        font-size: 14px;
        font-weight: 500;
        // line-height: 20.72px;
        text-align: left;

      }

      .total-score {
        font-size: 14px;
        font-weight: 400;
      }
    }

    .fraction-list {
      .fraction-item {
        padding: 8px 56px 8px 78px;

        .activity-name {
          font-size: 14px;
          font-weight: 400;
          text-align: left;

        }

        .score {
          font-size: 14px;
          font-weight: 400;
          text-align: right;

        }
      }
    }

    .timeline-tips {
      font-family: Noto Sans CJK TC;
      font-size: 12px;
      font-weight: 400;
      text-align: left;
      margin-top: 16px;
      color: #fff;
    }
  }

  .board-container {
    margin-top: 26px;

    p {
      font-size: 14px;
      font-weight: 400;
      line-height: 24px;
      text-align: center;
      color: #fff;
      margin-top: 8px;
    }
  }

  .team-container {
    padding: 0 12px;

    .member-container {
      width: 100%;
      background-color: rgba(#fff, .2);
      // background: #FFFFFF33;
      border-radius: 12px;
      padding: 12px;
      font-size: 16px;
      font-weight: 500;
      color: #fff;

      .leader {
        padding: 4px 8px;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        text-align: left;
        color: #fff;
        background-color: #1F714F;
        border-radius: 8px;
        display: inline-block;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        width: fit-content;

        &.paraguay {
          background-color: #fff;
          color: #000;
        }

        &.marshall-islands {
          background-color: #3E71D4;
        }

        &.eswatini {
          background-color: #0E0E0E;
        }

        &.guatemala {
          background-color: #57B2F3;
        }

        &.tuvalu {
          background-color: #EF80A0;
        }

        &.st-kitts-nevis {
          background-color: #1F714F;
        }

        &.st-vincent-grenadines {
          background-color: #BEA388;
        }

        &.haiti {
          background-color: #E34D5B;
        }

        img {
          width: 16px;
        }
      }

      .team-member {
        // word-break: break-all;
      }
    }

    .default-content {
      margin-top: 26px;

      p {
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        text-align: center;
        color: #fff;
        margin-top: 8px;
      }
    }
  }

  .timeline-container {
    .btn-hideend {
      color: #fff;
      text-align: left;
      border: 1px solid #D1D5E5;
      background-color: rgba($color: #fff, $alpha: 0.2);
      font-size: 14px;
      font-weight: 500;
      width: 100%;
      height: 45px;
      line-height: 45px;
      border-radius: 8px;
    }

    .card-container {
      gap: 16px;
      position: relative;
      overflow-x: hidden;

      &::before {
        position: absolute;
        content: '';
        display: block;
        height: 100%;
        width: 2px;
        border-radius: 4px;
        left: 0;
        background-color: rgba(#fff, .5);
        left: 27px;
      }

      .card {
        width: calc(100% - 36px);
        background-color: rgba(#fff, .2);
        border-radius: 12px;
        position: relative;

        &.disabled {
          opacity: .2;
        }


        &::before {
          content: '';
          display: block;
          position: absolute;
          width: 24px;
          height: 24px;
          background-image: url(../assets/timepoint.png);
          background-repeat: no-repeat;
          background-size: cover;
          left: -36px;
          top: 50%;
          transform: translateY(-50%);
        }

        // &::after {
        //   background-color: rgba($color: #fff, $alpha: 0.2);
        //   position: absolute;
        //   width: 600px;
        //   height: calc(100% + 16px);
        //   left: -50px;
        //   top: -16px;
        //   position: absolute;
        //   content: '';
        // }

        .card-header {
          font-size: 16px;
          color: #fff;
          line-height: 24px;
          width: 100%;

          .btn-rule {
            color: #D1D5E5;
            font-family: Noto Sans CJK TC;
            font-size: 12px;
            font-weight: 500;
            line-height: 28px;
            text-align: center;
            border: 1px solid #8C95BD;
            border-radius: 8px;
          }
        }

        .time {
          display: inline-block;
          background-color: rgba(#fff, .1);
          font-family: Noto Sans CJK TC;
          font-size: 14px;
          font-weight: 500;
          line-height: 21px;
          text-align: left;
          border-radius: 8px;
          color: #fff;
        }

        .opponent {
          display: block;
          width: fit-content;
          background-color: rgba(#fff, .1);
          font-family: Noto Sans CJK TC;
          font-size: 14px;
          font-weight: 500;
          line-height: 21px;
          text-align: left;
          border-radius: 8px;
          color: #fff;

          &.paraguay {
            background-color: #fff;
            color: #000;
          }

          &.marshall-islands {
            background-color: #3E71D4;
          }

          &.eswatini {
            background-color: #0E0E0E;
          }

          &.guatemala {
            background-color: #57B2F3;
          }

          &.tuvalu {
            background-color: #EF80A0;
          }

          &.st-kitts-nevis {
            background-color: #1F714F;
          }

          &.st-vincent-grenadines {
            background-color: #BEA388;
          }

          &.haiti {
            background-color: #E34D5B;
          }

          .icon_conutry {
            position: relative;

            img {
              transform: translateY(3px);
            }
          }
        }
      }
    }

    .default-content {
      margin-top: 26px;

      p {
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        text-align: center;
        color: #fff;
        margin-top: 8px;
      }
    }
  }
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  backdrop-filter: blur(4px);
  background: #06000080;
  z-index: 9999;

  .popup-container {
    position: absolute;
    max-width: 600px;
    width: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 16px;
    max-height: calc(100vh - 40px);

    .popup-header {
      background-color: #fff;
      border-radius: 16px 16px 0 0;
      color: #343747;
      font-size: 20px;
      font-weight: 500;
      height: 62px;
      text-align: left;
    }

    .popup-content {
      border-radius: 0 0 16px 16px;
      background-color: #fff;
      max-height: calc(100vh - 62px - 40px);
      overflow-y: scroll;

      .rule-title {
        .title-content {
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          line-height: 22px;
          text-align: center;
          padding: 2px 12px;
          background-color: #000;
          // width: fit-content;
          border-radius: 24px;
        }

        .line {
          width: calc(100% - 64px);
          height: 1px;
        }

        &.round {

          .title-content,
          .line {
            background-color: #0B87B9;
          }
        }

        &.rule {

          .title-content,
          .line {
            background-color: #06994E;
          }

        }

        &.point {

          .title-content,
          .line {
            background-color: #F1AC40;
          }
        }
      }

      .rule-content {

        li {
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          text-align: left;
          position: relative;
          list-style: none;

          &::before {
            content: '';
            display: block;
            position: absolute;
            width: 2px;
            height: 2px;
            border-radius: 50%;
            background-color: #000;
            top: 0;
            left: -12px;
            top: 11px;
          }
        }

      }
    }

    .popup-footer {
      height: 60px;
      background-color: #fff;
      border: 0 0 16px 16px;

      .btn-agree {
        font-size: 14px;
        font-weight: 500;
        line-height: 36px;
        letter-spacing: 1.25px;
        text-align: center;
        color: #1A2B7B;
        border-radius: 36px;
        border: 1px solid #1A2B7B;
      }
    }
  }
}

.btn-reset {
  width: 52px;
  height: 52px;
  background-image: url(../assets/btn_reset.png);
  background-size: cover;
  background-repeat: no-repeat;
  position: fixed;
  z-index: 5;
  bottom: 104px;
  right: 12px;

  // transform: translateX(150px);
  @media (min-width: 600px) {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    margin-left: 270px;
  }
}

.v-select__selection.v-select__selection--comma {
  color: #fff;
}

.v-expansion-panel-content__wrap {
  padding: 0 !important;
}

.v-expansion-panel {
  background: rgba(#fff, 5%) !important;
  color: #fff !important;
  border-radius: 16px !important;
}

.v-expansion-panel-header {
  background: rgba(#fff, 10%) !important;
  padding: 16px !important;
  border-radius: 16px;

  &.v-expansion-panel-header--active {
    border-radius: 16px 16px 0 0;
  }
}

.v-expansion-panel-header__icon {
  i {
    color: #fff !important;
  }

}

.v-select__selections {
  padding-left: 12px !important;
}

.v-input__append-inner {
  padding-right: 12px !important;
}

.v-list-item--highlighted {
  color: #000 !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
