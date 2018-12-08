<template>
  <div class="feed-list">
    <Header v-if="showHeader" icon="back" @click.native="back">热门</Header>
    <article class="g-big">
      <!-- 热门推荐 -->
      <section class="pt-rsd-list">
        <div class="list-header">
          <span>
            <img src="../assets/img/sdln_hotico.png">
          </span>
        </div>
        <!-- feed card -->
        <loading v-if="showLoading"></loading>
        <feed v-else :user="user" v-for="feed in feedData" :feed="feed" :key="`${feed.key}_${Math.random()}`"></feed>
        <div v-show="showRetry" class="retry">
          <img src="../assets/img/jiazaishibai.png">
          <div class="retry_btn" @click="retry">网络异常，点击重试</div>
        </div>
        <!-- 推荐专题 -->
        <div class="tuijian" v-show="feedData.length">
          <div class="title">
            <div>&nbsp;</div>推荐专题
          </div>
          <div class="tuijian-img">
            <img
              src="../assets/img/zhuanti1.png"
              @click="openZhuanti('login_category_xinkouzituijian')"
            >
            <img
              src="../assets/img/zhuanti2.png"
              @click="openZhuanti('login_category_gaotongguotuijian')"
            >
            <img
              src="../assets/img/zhuanti3.png"
              @click="openZhuanti('login_category_jinrirementuijian')"
            >
          </div>
        </div>
        <div v-if="!showHeader" style="height:55px"></div>
      </section>
    </article>
  </div>
</template>
<script>
import Feed from "../components/Feed.vue";
import Loading from "../components/Loading.vue";
import Header from "../components/Header.vue";
export default {
  props: { user: Object },
  components: { Feed, Loading, Header },
  data() {
    return {
      showLoading: true,
      showRetry: false,
      feedData: []
    };
  },
  created() {
    let vm = this;
    // vm.loadData();
  },
  methods: {
    back() {
      this.$router.push({ path: "/list" });
    },
    loadData(moudleId) {
      let vm = this;
      if (vm.feedData.length === 0) {
        vm.showLoading = true;
      }
      vm.showRetry = false;
      return new Promise((resolve, reject) => {
        vm.$http
          .get("/appinfo/?ts=1531811436150&start=0&limit=100", {
            params: {
              boundleId: "com.tengxin.youqianji",
              channel: "appStore",
              moudleId:
                moudleId || vm.$route.query.moudleId || "login_baokuan_shenzhen"
            }
          })
          .then(res => {
            if (res.data.code === 10200) {
              vm.feedData = res.data.data.list;
            } else {
              vm.showRetry = true;
            }
            vm.showLoading = false;
            resolve("更新成功~");
          })
          .catch(e => {
            vm.showLoading = false;
            vm.showRetry = true;
            reject("更新失败~");
          });
      });
    },
    retry() {
      this.loadData();
    },
    openZhuanti(id) {
      if (
        ["login_baokuan_shenzhen", "login_xiakuanbibei_shenzhen"].indexOf(
          this.$route.query.moudleId
        ) === -1
      ) {
        this.feedData = [];
        this.loadData(id);
      } else {
        this.$router.push({ path: "/category", query: { moudleId: id } });
      }
    }
  },
  mounted() {},
  computed: {
    showHeader() {
      return (
        ["login_baokuan_shenzhen", "login_xiakuanbibei_shenzhen"].indexOf(
          this.$route.query.moudleId
        ) === -1
      );
    }
  },
  watch: {
    "$route.path": {
      immediate: true,
      handler() {
        this.loadData();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.g-big {
  margin: 0 auto;
  height: 100%;
  position: relative;
}
.feed-list {
  height: 100%;
}
.pt-rsd-list {
  height: 100%;
  position: relative;
}
.tuijian {
  text-align: left;
  background: #fff;
  padding: 10px 0;
}
.tuijian .title {
  font-size: 14px;
  font-weight: 300;
  border-top: 5px solid #eee;
  margin-bottom: 5px;
  padding-top: 5px;
}
.tuijian .title div {
  display: inline-block;
  width: 3px;
  height: 100%;
  background: orange;
  margin: 0 5px;
}
.tuijian .tuijian-img {
  display: flex;
}
.tuijian .tuijian-img img {
  flex: 1;
  width: 100px;
  height: 100%;
  margin: 0 3px;
  // padding-bottom: 55px;
}
.retry {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 70%;
  height: 2.5rem;
  text-align: center;
}
.retry img {
  width: 1rem;
}
.retry_btn {
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  background: #fff;
  margin-top: 0.5rem;
}
.list-header {
  text-align: left;
  background: #fff;
  height: 1.12rem;
  line-height: 1.12rem;
  span {
    display: inline-block;
    height: 0.533rem;
    img {
      height: 100%;
      vertical-align: middle;
    }
  }
}
</style>
