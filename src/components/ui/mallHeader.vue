<template>
  <div class="mallHeader">
    <van-nav-bar :title="headerTitle" left-text="" right-text="" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <!-- <img class="headerLeftIcon" src="../../assets/images/ico-arr-right.png" alt="" slot="left"> -->
    </van-nav-bar>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar } from 'vant'
Vue.use(NavBar)

export default {
  props: {
    headerTitle: {
      type: String
    }
  },
  data() {
    return {}
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      console.log('按钮')
    }
  }
}
</script>
<style lang="scss">
.mallHeader {
  width: 100%;
  height: 50px;
  .van-nav-bar{
    height: 100%;
  }
  .headerLeftIcon {
    width: 14px;
    height: 14px;
  }
  .van-nav-bar .van-icon {
    color: #000;
  }
}
</style>
