<template>
  <v-app>
    <v-main>
      <TopContent />
      <MainContent />
      <Footer />
      <BottomNavigation />
    </v-main>
  </v-app>
</template>

<script>
import MainContent from './components/MainContent';
import TopContent from './components/TopContent';
import Footer from './components/Footer';
import BottomNavigation from './components/BottomNavigation';

export default {
  name: 'App',

  components: {
    MainContent,
    TopContent,
    Footer,
    BottomNavigation
  },

  data: () => ({
    //
  }),
  method: {
    setCssVariable() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    },
    onResize() {
      this.setCssVariable
    }
  },
  created() {
    // window.addEventListener('resize', this.onResize);
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
</style>
