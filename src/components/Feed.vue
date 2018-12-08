<template>
  <div class="jk-wod-main" data-id="d31976fd626384f02f199f5a7c374f53" data-hittype="2">
    <a @click="jump(feed.link)" v-if="!showSignUp">
      <div class="jk-wod-gshead">
        <i>
          <img :src="feed.logo">
        </i>
        <div class="wod-gshead-cnt">
          <h2>
            <span>{{feed.name}}</span>
          </h2>
          <p v-for="(word, i) in feed.detail.feature.split(/,|，/g)" :key="i">{{word}}</p>
        </div>
        <div class="wod-gshead-btn">
          <span>点我拿钱</span>
        </div>
      </div>
      <form
        name="form1"
        method="post"
        action="http://res.txingdai.com/t_2/?id=0b487a85dea0a75074aa1dce6834149d"
      ></form>
      <div class="jk-wod-gscnt">
        <div>
          <header>额度(元)</header>
          <p class="limit">{{feed.detail.limit}}</p>
        </div>
        <div class="split"></div>
        <div>
          <header>成功率</header>
          <p>{{feed.detail.successRate}}%</p>
        </div>
        <div>
          <header>日费率</header>
          <p>{{feed.detail.rate}}%</p>
        </div>
      </div>
    </a>
    <mt-popup class="sign-up" v-model="showSignUp" position="bottom" :modal="true">
      <sign-up :path="$route.path" @close="showSignUp = false"></sign-up>
    </mt-popup>
  </div>
</template>
<script>
import SignUp from "../views/SignUp";
import localforage from "localforage";
export default {
  components: {
    SignUp
  },
  props: {
    user: Object,
    feed: Object
  },
  data() {
    return {
      showSignUp: false
    };
  },
  methods: {
    jump(url) {
      let vm = this;
      localforage.getItem("phone").then(phone => {
        if (phone) {
          this.$http.get("/log/app_active", {
            params: {
              phone,
              key: vm.feed.key,
              boundleId: "com.tengxin.youqianji",
              channel: "appStore"
            }
          });
          localforage.setItem("detail", JSON.stringify(vm.feed));
          this.$router.push({ path: "/detail" });
        } else {
          this.showSignUp = true;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
h2,
p {
  margin: 0;
}
.jk-wod-main {
  border-top: 1px solid #f1f1f1;
  padding: 0.3rem 0.4rem;
  background: #fff;
}
.jk-wod-gshead {
  text-align: left;
  display: flex;
  i {
    width: 1.65rem;
    img {
      width: 100%;
      border-radius: 10px;
    }
  }
  .wod-gshead-cnt {
    align-self: center;
    margin-left: 0.4rem;
    h2 {
      font-weight: 400;
    }
    p {
      margin-top: 0.2rem;
      display: inline-block;
      border: 1px solid rgb(253, 178, 26);
      padding: 2px;
      color: #ff7955;
      font-size: 0.3srem;
      // font-weight: 500;
      margin-right: 5px;
    }
  }
  .wod-gshead-btn {
    position: absolute;
    right: 0.4rem;
    margin-top: 0.2rem;
    span {
      background-color: #fdd900;
      border-radius: 32px;
      text-align: center;
      color: #333333;
      font-size: 0.3rem;
      padding: 0.15rem;
    }
  }
}
.jk-wod-gscnt {
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 0;
  margin-right: 1rem;
  div {
    header {
      color: #999;
    }
    p {
      font-size: 0.45rem;
      margin: 0.2rem 0;
    }
    .limit {
      color: #ff3833;
    }
  }
  .split {
    border-left: 1px solid #f1f1f1;
    margin: 0.1rem 0;
  }
}
.sign-up {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>


