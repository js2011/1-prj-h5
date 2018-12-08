<template>
  <div class="layout">
    <div class="main">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from "../components/Footer";
export default {
  components: {
    Footer
  }
};
</script>
<style lang="scss" scoped>
.layout, .main {
  height: 100%;
}
</style>

