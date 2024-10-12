<template>
  <v-container fluid pa-0>
    <div class="main-inner" id="mainarea">
      <transition name="fade" mode="out-in">
        <div class="tab-title" :key="tab">
          {{ tabLabel }}
        </div>
      </transition>
      <!-- <v-select class="px-2" label="請選擇國家隊" variant="underlined"
        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']" color="#fff" item-color="white"
        dark>
      </v-select> -->
      <transition name="fade" mode="out-in">
        <div class="timeline-container" :key="tab" v-if="tab == 'timeline'">
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
            </div>
            <div class="default-content d-flex flex-column align-center" v-else key="default">
              <img src="../assets/run_people.png" alt="">
              <p>快來為你的國家隊加油</p>
            </div>
          </transition>

        </div>
        <div class="board-container" :key="tab" v-if="tab == 'board'"></div>
        <div class="board-container" :key="tab" v-if="tab == 'team'"></div>
      </transition>

    </div>
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
    padding: 0 16px;

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
  }

  .timeline-container {
    margin-top: 48px;

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
