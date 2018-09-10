<template>
  <div class="mallIndex">
    <!-- <MallHeader :headerTitle="headerTitle"></MallHeader> -->
    <!-- <MallSerach></MallSerach> -->
    <div class="mallIndexCon">
      <div class="mallIndexConLb">
        <van-swipe :autoplay="5000">
          <van-swipe-item v-for="(image, index) in images" :key="index" :style="{'background-image': `url(${image})`}">
            <!-- <img v-lazy="image" /> -->
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <MallNav :active="active"></MallNav>
  </div>
</template>
<script>
import MallNav from '@/components/ui/mallNav'
import MallHeader from '@/components/ui/mallHeader'
import MallSerach from '@/components/ui/mallSerach'
//
import { Swipe, SwipeItem, Lazyload } from 'vant'
import Vue from 'vue'
Vue.use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
export default {
  components: {
    MallNav,
    MallHeader,
    MallSerach
  },
  data() {
    return {
      active: 0,
      headerTitle: '主页',
      images: [
        require('../assets/images/1.jpg'),
        require('../assets/images/2.jpg'),
        require('../assets/images/3.jpg'),
        require('../assets/images/4.jpg'),
        require('../assets/images/5.jpg')
      ]
    }
  }
}
</script>
<style lang="scss">
.mallIndex {
  width: 100%;
  height: 100%;
  .mallIndexCon {
    width: 100%;
    height: 100%;
    padding:0 0 50px 0;
    box-sizing: border-box;
    .mallIndexConLb {
      width: 100%;
      height: 100%;
      .van-swipe-item{
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50%;
      }
      .van-swipe{
        height: 100%;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
