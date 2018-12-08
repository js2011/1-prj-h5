<template>
  <div class="feed-list">
    <div class="category">
      <div class="category-1">
        <div class="item" @click="jump('login_category_xinkouzi')">
          <i>
            <img src="../assets/img/1.png">
          </i>
          <p>今日新口子</p>
        </div>
        <div class="item" @click="jump('login_category_5000yixia')">
          <i>
            <img src="../assets/img/2.png">
          </i>
          <p>2千以下</p>
        </div>
        <div class="item" @click="jump('login_category_5000dao40000')">
          <i>
            <img src="../assets/img/8.png">
          </i>
          <p>2千-1万</p>
        </div>
        <div class="item" @click="jump('login_category_40000dao1000000')">
          <i>
            <img src="../assets/img/7.png">
          </i>
          <p>1万以上</p>
        </div>
      </div>
      <div class="category-2">
        <div class="item" @click="jump('login_category_shoujihaojieqian')">
          <i>
            <img src="../assets/img/more5.png">
          </i>
          <p>手机号借钱</p>
        </div>
        <div class="item" @click="jump('login_category_600zhimafen')">
          <i>
            <img src="../assets/img/more6.png">
          </i>
          <p>600芝麻分借</p>
        </div>
        <div class="item" @click="jump('login_category_buchazhengxin')">
          <i>
            <img src="../assets/img/more7.png">
          </i>
          <p>不查征信</p>
        </div>
        <div class="item" @click="jump('login_category_shenfenzheng')">
          <i>
            <img src="../assets/img/more8.png">
          </i>
          <p>身份证下款</p>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="list-header">
        <span>
          <img src="../assets/img/sdln_hotico.png">
        </span>
      </div>
      <!-- feed card -->
      <feed :user="user" v-for="feed in feedData" :feed="feed" :key="feed.key"></feed>
    </div>
    <div style="height:55px"></div>
  </div>
</template>
<script>
import Feed from "../components/Feed.vue";
import localforage from "localforage";

export default {
  props: { user: Object },
  components: { Feed },
  data() {
    return {
      feedData: [],
      feed1: { detail: { limit: "" } }
    };
  },
  created() {
    let vm = this;
    this.$http
      .get("/appinfo/?ts=1531811436150&start=0&limit=100", {
        params: {
          boundleId: "com.tengxin.youqianji",
          channel: "appStore",
          moudleId: "login_list_shenzhen"
        }
      })
      .then(res => {
        vm.feedData = res.data.data.list;
      });
  },
  methods: {
    jump(url, title) {
      let vm = this;
      this.$router.push({ path: '/category', query: { moudleId: url } });
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
p {
  margin: 0;
}
.category {
  font-size: 0.375rem;
  .category-1,
  .category-2 {
    display: flex;
    background: #fff;
    padding: 0.2rem;
    .item {
      flex: 1;
      margin-top: 0.2rem;
      i {
        display: inline-block;
        width: 1.2rem;
        height: 1.2rem;
        margin: 0 auto 0.2rem;
        img {
          width: 100%;
        }
      }
    }
  }
}
.list {
  margin-top: 0.2rem;
  text-align: left;
  .list-header {
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
}
</style>
