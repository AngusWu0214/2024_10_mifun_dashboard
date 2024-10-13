<template>
  <v-container fluid pa-0>
    <div class="main-inner" id="mainarea">
      <transition name="fade" mode="out-in">
        <div class="tab-title" :key="tab">
          {{ tabLabel }}
        </div>
      </transition>
      <transition name="fade" mode="out-in">
        <v-select v-if="tab !== 'board'" class="px-2" placeholder="請選擇國家隊" variant="underlined"
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']" color="#fff" item-color="white"
          dark v-model="activeTeam">
        </v-select>
      </transition>
      <transition name="fade" mode="out-in">
        <div class="board-container" :key="tab" v-if="tab == 'board'">
          <transition name="fade" mode="out-in">
            <div class="panel-container" v-if="sheetData" key="panel">
              <v-expansion-panels v-model="panel" accordion>
                <v-expansion-panel class="mb-1">
                  <v-expansion-panel-header>
                    <div class="header-item d-flex justify-space-between align-center">
                      <div class="left-content d-flex justify-space-between align-center">
                        <div class="num-icon">
                          <img src="../assets/icom_num_0.png" alt="">
                        </div>
                        <div class="country d-flex align-center">
                          <div class="flag">
                            <img src="../assets/country_A.png" alt="">
                          </div>
                          <div class="country-name ml-1">
                            馬紹爾群島
                          </div>
                        </div>
                      </div>
                      <div class="total-score">125</div>
                    </div>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div class="fraction-list">
                      <div class="fraction-item d-flex justify-space-between">
                        <div class="activity-name">排球</div>
                        <div class="score">20</div>
                      </div>
                      <div class="fraction-item d-flex justify-space-between">
                        <div class="activity-name">排球</div>
                        <div class="score">-</div>
                      </div>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>Panel 2</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    Some content
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>Panel 3</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    Some content
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
              <div class="card pa-3">
                <div class="card-header mb-4 d-flex justify-space-between align-center">
                  <div class="activity-name">排球</div>
                  <div class="btn-rule px-4" @click="popup = 1">查看規則</div>
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
              </div>
              <div class="card pa-3">
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
              </div>
              <div class="card pa-3">
                <div class="card-header mb-4 d-flex justify-start align-center">
                  <div class="activity-name">閉幕式</div>
                </div>
                <div class="time px-2 py-1">
                  <span class="mr-2"><v-icon class="mr-1" color="#fff"
                      size="20px">mdi-clock-time-four-outline</v-icon>時間</span>
                  <span>13:00 - 13:30</span>
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
            <div class="member-container" v-if="activeTeam">
              <div class="leader">
                隊長：Larry | 副隊長：Matthew
              </div>
              <div class="mb-4">國家隊員:</div>
              <div>Abby / Abby</div>
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
      <div class="popup" v-if="popup">
        <div class="popup-container px-4">
          <div class="popup-header pa-4 d-flex justify-space-between">
            <span>排球規則</span>
            <span><v-icon color="#343747">mdi-close</v-icon></span>
          </div>
          <div class="popup-content px-4 pb-4">
            <div class="rule-title round d-flex justify-space-between align-center mb-3">
              <div class="title-content">回合</div>
              <div class="line"></div>
            </div>
            <ul class="rule-content mb-4">
              <li>對抗制，共3回合</li>
              <li>每回合6分鐘，若某隊得到8分則提前結束該回合</li>
              <li>每回合每隊外場2人，內場6人</li>
            </ul>
            <div class="rule-title rule d-flex justify-space-between align-center mb-3">
              <div class="title-content">規則</div>
              <div class="line"></div>
            </div>
            <ul class="rule-content mb-4">
              <li>對抗制，共3回合</li>
              <li>每回合6分鐘，若某隊得到8分則提前結束該回合</li>
              <li>每回合每隊外場2人，內場6人</li>
            </ul>
            <div class="rule-title point d-flex justify-space-between align-center mb-3">
              <div class="title-content">計分</div>
              <div class="line"></div>
            </div>
            <ul class="rule-content mb-4">
              <li>對抗制，共3回合</li>
              <li>每回合6分鐘，若某隊得到8分則提前結束該回合</li>
              <li>每回合每隊外場2人，內場6人</li>
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
import { mapState } from "pinia";
import { useMainStore } from "@/store/main";
export default {
  name: 'MainContent',

  data: () => ({
    tabTitle: '賽程表',
    panel: null,
    sheetData: 1,
    activeTeam: 1,
    popup: 0,
  }),
  computed: {
    ...mapState(useMainStore, ['tab', 'tabLabel']),
  },
  methods: {
    test() {
      this.sheetData = null;
      console.log(this.panel)

    }
  },
  mounted() {
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
        margin-right: 16px;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
