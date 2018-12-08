<template>
  <mt-tabbar v-model="selected" fixed>
    <mt-tab-item v-for="nav in navData" :id="nav.id" :key="nav.id" @click.native="changeNav(nav)">
      <img slot="icon" :src="nav.icon">
      {{nav.title}}
    </mt-tab-item>
  </mt-tabbar>
</template>
<script>
export default {
  data() {
    return {
      selected: "",
      navData: [
        {
          title: "热门",
          id: "remen",
          icon: require("../assets/img/tab_sel_1@3x.png"),
          path: "list"
        },
        {
          title: "爆款",
          id: "baokuan",
          icon: require("../assets/img/tab_sel_2@3x.png"),
          path: "baokuan",
          query: { moudleId: "login_baokuan_shenzhen" }
        },
        {
          title: "一定借到钱",
          id: "yidingjiedaoqian",
          icon: require("../assets/img/tab_sel_3@3x.png"),
          path: "loan"
        },
        {
          title: "下款必备",
          id: "xiakuanbibei",
          icon: require("../assets/img/tab_sel_4@3x.png"),
          path: "xiakuanbibei",
          query: { moudleId: "login_xiakuanbibei_shenzhen" }
        }
      ]
    };
  },
  methods: {
    changeNav(nav) {
      this.$router.push({ path: `/${nav.path}`, query: nav.query || {} });
    }
  },
  mounted() {
    let path = this.$route.path;
    let nav = this.navData.find(nav => `/${nav.path}` === path);
    this.selected = nav && nav.id;
  }
};
</script>
