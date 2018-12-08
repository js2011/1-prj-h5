<template>
  <div class="header">
    <div class="back">
      <img :src="require(`../assets/img/${icon}.png`)">
      <span>
        <slot></slot>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    icon: String
  }
};
</script>
<style lang="scss" scoped>
.header {
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: left;
  font-size: 0.4rem;
  background: #ffd700;
  padding: 0.1rem;
  .back {
    display: inline-block;
  }
  img {
    height: 0.7rem;
    vertical-align: middle;
  }
  span {
    vertical-align: middle;
  }
}
</style>
