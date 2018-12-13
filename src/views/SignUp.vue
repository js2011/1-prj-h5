<template>
  <div>
    <Header icon="back" @click.native="back"></Header>
    <div class="sign-up-page">
      <span class="title">注册</span>
      <span class="info">欢迎使用下款王</span>
      <mt-field :state="state ? 'success' : 'error'" class="phone" label="+86" type="tel" placeholder="请输入手机号" v-model="phone"></mt-field>
      <div class="next">
        <span class="btn" @click="jump">下一步</span>
      </div>
      <mt-popup
        class="sign-in"
        v-model="showSignIn"
        position="right">
        <sign-in :phone="phone" @close="showSignIn = false" @signin="back"></sign-in>
      </mt-popup>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header";
import SignIn from '../views/SignIn.vue'

export default {
  components: {
    Header,
    SignIn
  },
  props: {
    path: String
  },
  data () {
    return {
      showSignIn: false,
      phone: ''
    }
  },
  methods: {
    back() {
      this.showSignIn = false;
      this.$emit('close');
    },
    jump () {
      if (!this.state) return;
      this.showSignIn = true;
    }
  },
  computed: {
    state() {
      return /^\d{11}$/.test(this.phone);
    }
  }
}
</script>
<style>
  .sign-in {
    width: 100%;
    height: 100%;
  }
  .sign-up-page {
    padding: 0.3rem .5rem;
    text-align: left;
  }
  .sign-up-page>span {
    display: block;
  }
  .sign-up-page .title {
    font-size: .8rem;
    font-weight: 700;
  }
  .sign-up-page .info {
    font-size: 0.35rem;
    margin: .1rem 0;
    color: rgb(128, 137, 158);
  }
  .sign-up-page .next {
    text-align: right;
    margin: .2rem 0;
  }
  .sign-up-page .next .btn {
    display: inline-block;
    text-align: center;
    width: 2.3rem;
    height: 1rem;
    line-height: 1rem;
    background: rgb(255, 215, 25);
    border-radius: .5rem;
    font-weight: 500;
  }
  .sign-up-page .phone {
    margin: .5rem 0;
  }
  .sign-up-page .mint-cell-wrapper {
    background-image: none;
    border-bottom: 1px solid rgb(238, 242, 249);
    padding: 0;
  }
  .sign-up-page .mint-cell-title {
    width: 1.2rem;
  }
</style>
