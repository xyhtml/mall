<template>
  <div class="mallIndex">
    <!-- <MallHeader :headerTitle="headerTitle"></MallHeader> -->
    <!-- <MallSerach></MallSerach> -->
    <div class="mallIndexCon">
      <div class="mallIndexConLb">
        <van-swipe :autoplay="5000">
          <!-- <van-swipe-item v-for="(image, index) in adImages" :key="index" :style="{'background-image': `url(${image})`}"> -->
          <van-swipe-item v-for="(image, index) in adImages" :key="index" :style="{'background-image': `url(http://api.zyk.artreedu.com/v1/attachments/img/${image.picId}/thumb)`}" >
            <!-- <img v-lazy="image" /> -->
            <span class="tmBg" @click="adToLinkFn(image.link)"></span>
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
import { Swipe, SwipeItem, Lazyload, Toast, Dialog } from 'vant'
import Vue from 'vue'
Vue.use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Toast)
  .use(Dialog)
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
      adImages: [],
      images: [
        require('../assets/images/1.jpg'),
        require('../assets/images/2.jpg'),
        require('../assets/images/3.jpg'),
        require('../assets/images/4.jpg'),
        require('../assets/images/5.jpg')
      ]
    }
  },
  methods: {
    adToLinkFn(link) {
      console.log(link, '---------------->')
      window.location.href = link
    },
    getAD() {
      Toast.loading({
        mask: true,
        duration: 0,
        message: '加载中...'
      })
      this.$store
        .dispatch({
          type: 'getAD'
        })
        .then(
          response => {
            Toast.clear()
            console.log(response)
            if (
              response &&
              response.status === 200 &&
              response.data &&
              response.data.data.length > 0
            ) {
              this.adImages = response.data.data
            } else {
              Dialog.alert({
                message: '抱歉，没有加载到轮播图！'
              }).then(() => {
                // on close
              })
            }
          },
          err => {
            Toast.clear()
            Dialog.alert({
              message: '抱歉，网络错误！'
            }).then(() => {
              // on close
            })
            console.log(err)
          }
        )
    }
  },
  created() {
    this.getAD()
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
    padding: 0 0 50px 0;
    box-sizing: border-box;
    .mallIndexConLb {
      width: 100%;
      height: 100%;
      .tmBg{
        width: 100%;
        height: 100%;
        display: inline-block;
        opacity: 0;
      }
      .van-swipe-item {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50%;
      }
      .van-swipe {
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
