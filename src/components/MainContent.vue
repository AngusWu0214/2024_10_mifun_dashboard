<template>
  <v-container fluid pa-0>
    <div class="main-inner" id="mainarea">
      <transition name="fade" mode="out-in">
        <div class="tab-title" :key="tab">
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
              <v-expansion-panels v-model="panel" accordion>
                <v-expansion-panel class="mb-1" v-for="(team, index) in boardData" :key="index">
                  <v-expansion-panel-header>
                    <div class="header-item d-flex justify-space-between align-center">
                      <div class="left-content d-flex justify-space-between align-center">
                        <div class="num-icon">
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
                        <div class="score">{{ team.dodgeballScore }}</div>
                      </div>
                      <div class="fraction-item d-flex justify-space-between">
                        <div class="activity-name">擊劍</div>
                        <div class="score">{{ team.fencingScore }}</div>
                      </div>
                      <div class="fraction-item d-flex justify-space-between">
                        <div class="activity-name">排球</div>
                        <div class="score">{{ team.volleyballScore }}</div>
                      </div>
                      <div class="fraction-item d-flex justify-space-between">
                        <div class="activity-name">跳繩</div>
                        <div class="score">{{ team.jumpropeScore }}</div>
                      </div>
                      <div class="fraction-item d-flex justify-space-between">
                        <div class="activity-name">拔河</div>
                        <div class="score">{{ team.tugofwarScore }}</div>
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
        <div class="timeline-container" :key="tab" v-if="tab == 'timeline'">
          <transition name="fade" mode="out-in">
            <div class="card-container px-4 d-flex flex-column align-end" v-if="activeTeam">
              <div class="card pa-3">
                <div class="card-header mb-4 d-flex justify-start align-center">
                  <div class="activity-name">開幕式</div>
                </div>
                <div class="time px-2 py-1">
                  <span class="mr-2"><v-icon class="mr-1" color="#fff"
                      size="20px">mdi-clock-time-four-outline</v-icon>時間</span>
                  <span>13:00 - 13:30</span>
                </div>
              </div>
              <div class="card pa-3" v-for="(event, index) in selectedTimeLine.matches" :key="index">
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
              <div class="btn-agree px-4">我了解哩</div>
            </div>
          </div>

        </div>
      </div>
    </transition>
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
    teams: ["巴拉圭", "馬紹爾群島", "史瓦帝尼", "瓜地馬拉", "聖克里斯多福及尼維斯聯邦", "吐瓦魯國", "聖文森及格瑞那丁", "海地"],
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
        round: ['輪流進行，每隊3回合，共6回合', '每回合3分鐘', '每回合每隊分別為3、4、5人上場，外加2名甩繩員'],
        rule: ['兩隊各派一人猜拳，贏的可以選要先或後', '由各隊自行推派選手', '比賽進行間可換人上場，但損失的時間不會補給', '倒數30秒和時間結束時，裁判會提示'],
        score: ['3人回合，連續跳2下，得1分', '4人回合，連續跳2下，得2分', '5人回合，連續跳2下，得3分', '此項目天花板就是最高25分', '若時間結束，哨聲響起，選手仍繼續跳則不列入計分']
      },
      {
        event: '擊劍',
        round: ['對抗制，男單、女單、男雙、女雙各2回合，共8回合', '每回合40秒'],
        rule: ['由隊內討論選出各回合參賽的劍士', '所有劍士手持泡棉棒，身穿魔鬼氈背心，背心或背帶上附有可被擊落的球', '劍士的目標是用泡棉棒擊落對方身上的球', '依實際男女出席狀況，評審將有權即時賽制調整'],
        score: ['該回合擊落最多球者，單人賽得 2 分，雙人賽得 3 分', '若平手，則各得 1 分', '全部比賽結束後，贏最多局的隊伍再加 5 分']
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
    ]
  }),
  computed: {
    ...mapState(useMainStore, ['tab', 'tabLabel', 'activeTeam', 'activeTeamData']),
    selectedTeam() {
      if (!this.teamData) return 0
      return this.teamData.find(team => team.country === this.activeTeam);
    },
    selectedTimeLine() {
      if (!this.timeLineData) return 0
      return this.timeLineData.find(team => team.country === this.activeTeam);
    }
  },
  methods: {
    ...mapActions(useMainStore, ['setActiveTeam']),
    setActiveTeamHandler(value) {
      this.setActiveTeam(value); // 呼叫 Pinia 的 action 設置 activeTeam
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
    fetchTeamData() {
      const apiKey = "AIzaSyBIk_3y0P0gliDInh146C0oCP1Bp0Xn5KY";
      const sheetId = "1wCI3m6UOnoViw_0sXajYelUpGzwVMkX6zK_mL5efmcA";
      // Sheets 中要取得的資料範圍，格式如下
      const range = "串接分組名單!A1:H20";
      // Sheets API 的 URL
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          let sheetData = data.values;
          const transposedData = this.transpose(sheetData);
          const formattedData = transposedData.map(row => {
            return {
              country: row[0], // 第一列是國家
              people: row.slice(1).filter(person => person) // 如果是空值，替換為空字符串 // 後面的列是人名
            };
          });
          this.teamData = formattedData
          console.log(formattedData);
        })
        .catch((error) => console.error("Error:", error));
    },
    fetchBoardData() {
      const apiKey = "AIzaSyBIk_3y0P0gliDInh146C0oCP1Bp0Xn5KY";
      const sheetId = "1wCI3m6UOnoViw_0sXajYelUpGzwVMkX6zK_mL5efmcA";
      // Sheets 中要取得的資料範圍，格式如下
      const range = "串接分數!A1:H6";
      // Sheets API 的 URL
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const sheetData = data.values;
          const transposedData = this.transpose(sheetData);
          const formattedData = transposedData.map(row => {
            const dodgeballScore = parseInt(row[1]) || 0;
            const fencingScore = parseInt(row[2]) || 0;
            const volleyballScore = parseInt(row[3]) || 0;
            const jumpropeScore = parseInt(row[4]) || 0;
            const tugofwarScore = parseInt(row[5]) || 0;
            const totalScore = dodgeballScore + fencingScore + volleyballScore + jumpropeScore + tugofwarScore;
            return {
              country: row[0], // 第一個值是國家
              dodgeballScore,  // 第二個值是躲避球分數
              fencingScore,    // 第三個值是擊劍分數
              volleyballScore, // 第四個值是排球分數
              jumpropeScore,   // 第五個值是跳繩分數
              tugofwarScore,   // 第六個值是拔河分數
              totalScore       // 新增的總分欄位
            };
          });
          formattedData.sort((a, b) => b.totalScore - a.totalScore);
          let rank = 1;
          formattedData.forEach((team, index) => {
            if (index > 0 && team.totalScore < formattedData[index - 1].totalScore) {
              rank = index + 1;
            }
            team.rank = rank; // 新增名次欄位
          });
          this.boardData = formattedData;
          console.log(formattedData);
        })
        .catch((error) => console.error("Error:", error));
    },
    fetchTimeLineData() {
      const apiKey = "AIzaSyBIk_3y0P0gliDInh146C0oCP1Bp0Xn5KY";
      const sheetId = "1wCI3m6UOnoViw_0sXajYelUpGzwVMkX6zK_mL5efmcA";
      const self = this;
      // Sheets 中要取得的資料範圍，格式如下
      const range = "串接賽程表!A1:H11";
      // Sheets API 的 URL
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const sheetData = data.values;

          const formattedData = sheetData[0].map((team, index) => {
            return {
              country: team, // 各隊名稱
              matches: [
                {
                  opponent: sheetData[1][index], // 第一個對手
                  event: sheetData[6][index], // 第一場比賽的項目
                },
                {
                  opponent: sheetData[2][index], // 第二個對手
                  event: sheetData[7][index], // 第二場比賽的項目
                },
                {
                  opponent: sheetData[3][index], // 第三個對手
                  event: sheetData[8][index], // 第三場比賽的項目
                },
                {
                  opponent: sheetData[4][index], // 第四個對手
                  event: sheetData[9][index], // 第四場比賽的項目
                },
                {
                  opponent: sheetData[5][index], // 第五個對手
                  event: sheetData[10][index], // 第五場比賽的項目
                }
              ]
            };
          });

          // 將處理後的賽程資料存入變數
          self.timeLineData = formattedData;

          console.log(self.timelineData); // 可以檢查格式化後的賽程資料
        })
        .catch((error) => console.error("Error:", error));
    },
    getCountryImagePath(country) {
      // 創建一個對應的國家代碼與名稱的映射
      const countryMap = {
        "巴拉圭": "A",
        "馬紹爾群島": "B",
        "史瓦帝尼": "C",
        "瓜地馬拉": "D",
        "聖克里斯多福及尼維斯聯邦": "E",
        "吐瓦魯國": "F",
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

      return teams[team];
    },
  },
  mounted() {
    this.fetchTeamData();
    this.fetchBoardData();
    this.fetchTimeLineData();
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
  }

  .panel-container {
    padding: 0 16px 16px 16px;

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
          font-size: 12px;
          font-weight: 400;
          text-align: left;

        }

        .score {
          font-size: 12px;
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
        word-break: break-all;
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
    .card-container {
      gap: 16px;
      position: relative;

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
    top: 0;
    max-width: 600px;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 16px;

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
      max-height: calc(100vh - 62px - 84px);
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
