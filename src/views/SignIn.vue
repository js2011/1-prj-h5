<template>
  <div>
    <Header icon="back" @click.native="back"></Header>
    <div class="sign-in-page">
      <span class="title">注册</span>
      <span class="info">请输入 {{phone}} 收到的验证码</span>
      <mt-field class="code" type="number" placeholder="验证码" v-model="code"></mt-field>
      <div class="next">
        <span
          :class="coded ? '' : 'get-code'"
          @click="getCode"
        >{{coded ? '剩余(' + time + ')秒' : '获取验证码'}}</span>
        <span class="sign-in" @click="signIn">登录</span>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header";
import localforage from "localforage";

export default {
  components: { Header },
  props: {
    phone: String
  },
  data() {
    return {
      time: 120,
      code: "",
      coded: false
    };
  },
  methods: {
    back() {
      this.$emit("close");
    },
    signIn() {
      let vm = this;
      const params = new URLSearchParams();
      params.append("boundleId", "com.tengxin.youqianji");
      params.append("channel", "appStore");
      params.append("phone", vm.phone);
      params.append("code", vm.code);
      this.$http.post("/account/login", params).then(res => {
        if (res.data.code === 10200) {
          localforage.setItem("phone", vm.phone);
          vm.$emit("signin");
        }
      });
    },
    getCode() {
      let vm = this;
      if (vm.coded) return;
      this.$http
        .get("/account/code", {
          params: {
            boundleId: "com.tengxin.youqianji",
            channel: "appStore",
            phone: vm.phone,
            develop: false
          }
        })
        .then(res => {
          if (res.data.code === 10200) {
            // vm.code = res.data.data;
            vm.coded = true;
            let timer = setInterval(() => {
              vm.time--;
              if (vm.time === 0) {
                clearInterval(timer);
                vm.coded = false;
                vm.time = 120;
              }
            }, 1000);
          } else {
            vm.coded = false;
          }
        });
    }
  },
  created() {}
};
</script>
<style>
.sign-in-page {
  padding: 0.3rem 0.5rem;
}
.sign-in-page > span {
  display: block;
}
.sign-in-page .title {
  font-size: 0.8rem;
  font-weight: 700;
}
.sign-in-page .info {
  font-size: 0.35rem;
  margin: 0.1rem 0;
  color: rgb(128, 137, 158);
}
.sign-in-page .next {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.2rem 0;
}
.sign-in-page .next .get-code {
  cursor: pointer;
  color: rgba(32, 108, 255, 0.9);
  background: none;
}
.sign-in-page .next .sign-in {
  display: inline-block;
  text-align: center;
  width: 2.3rem;
  height: 1rem;
  line-height: 1rem;
  background: rgb(255, 215, 25);
  border-radius: 0.5rem;
  font-weight: 500;
}
.sign-in-page .code {
  margin: 0.5rem 0;
}
.sign-in-page .mint-cell-wrapper {
  background-image: none;
  border-bottom: 1px solid rgb(238, 242, 249);
  padding: 0;
}
.sign-in-page .mint-cell-title {
  width: 1.2rem;
}
</style>
