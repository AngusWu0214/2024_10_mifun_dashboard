<template>
  <v-app>
    <v-main>
      <TopContent />
      <MainContent />
      <Footer />
      <BottomNavigation />
    </v-main>
    <transition name="fade" mode="out-in">
      <div class="loading-area" v-if="isLoading">
        <div class="loader"></div>
      </div>
    </transition>

  </v-app>
</template>

<script>
import MainContent from './components/MainContent';
import TopContent from './components/TopContent';
import Footer from './components/Footer';
import BottomNavigation from './components/BottomNavigation';
import { mapState } from "pinia";
import { useMainStore } from "@/store/main";
export default {
  name: 'App',

  components: {
    MainContent,
    TopContent,
    Footer,
    BottomNavigation
  },
  computed: {
    ...mapState(useMainStore, ['isLoading'])
  },
  data: () => ({
    //
  }),
  methods: {
    setCssVariable() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    },
    onResize() {
      this.setCssVariable();
    },
  },
  created() {
    window.addEventListener('resize', this.onResize);
  },
  mounted() {
  }
};
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Noto+Serif+TC:wght@200..900&display=swap');
$fontFamilyNotoSans: 'Noto Sans', 'Noto Sans TC', 'sourcehansans-tc', 'Noto Sans S Chinese', 'PingFang TC', 'Microsoft JhengHei', Tahoma, Verdana, Arial, Helvetica, sans-serif;

.v-application .v-application--wrap * {
  font-family: $fontFamilyNotoSans !important;
}

.loading-area {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(#000, .7);
  display: flex;
  justify-content: center;
  align-items: center;
  /* HTML: <div class="loader"></div> */
  z-index: 9999;

  /* HTML: <div class="loader"></div> */
  .loader {
    width: 50px;
    padding: 8px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #FFF;
    --_m:
      conic-gradient(#0000 10%, #000),
      linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
    mask: var(--_m);
    -webkit-mask-composite: source-out;
    mask-composite: subtract;
    animation: l3 1s infinite linear;
  }

  @keyframes l3 {
    to {
      transform: rotate(1turn)
    }
  }

  @keyframes l11 {
    100% {
      transform: rotate(1turn)
    }
  }
}
</style>
