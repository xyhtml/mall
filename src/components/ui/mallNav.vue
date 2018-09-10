<template>
  <div class="mallNav">
    <van-tabbar v-model="activeData">
      <van-tabbar-item v-for="(item, index) in navList" :key="index" @click="changeFn(activeData)">
        <span>{{item.val}}</span>
        <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.normal">
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import Vue from 'vue'
import { Tabbar, TabbarItem } from 'vant'
Vue.use(Tabbar).use(TabbarItem)
export default {
  props: {
    active: {
      type: Number
      // default: 0
    }
  },
  watch: {
    active(val) {
      this.activeData = val
      console.log('active: ' + val)
    }
  },
  data() {
    return {
      activeData: this.active,
      navList: [
        {
          normal: require('../../assets/images/ico-home.png'),
          active: require('../../assets/images/ico-home-on.png'),
          val: '首页'
        },
        {
          normal: require('../../assets/images/ico-type.png'),
          active: require('../../assets/images/ico-type-on.png'),
          val: '分类'
        }
      ]
    }
  },
  created() {},
  activated() {
    this.activeData = 1
  },
  methods: {
    changeFn(activeNum) {
      // console.log(activeNum)
      switch (activeNum) {
        case 0:
          this.$router.push('/')
          break
        case 1:
          this.$router.push('/mallClassIfy')
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="scss">
.mallNav {
  width: 100%;
  max-width: 750px;
  height: 50px;
  left: auto;
  bottom: 0;
  position: fixed;
  z-index: 120;
  .van-tabbar-item--active {
    color: #666;
  }
  .van-tabbar--fixed {
    left: auto;
    max-width: 375px;
  }
}
</style>
