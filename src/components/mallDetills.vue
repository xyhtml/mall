<template>
  <div class="mallDetills">
    <div class="mallDetillsTopImg">
      <div class="mdtiBack" @click="mdtiBackFn"><img src="../assets/images/ico-arr-right.png" alt=""></div>
      <van-swipe :autoplay="5000">
        <van-swipe-item v-for="(image, index) in imagesTop" :key="index" :style="{'background-image': `url(http://api.zyk.artreedu.com/v1/attachments/img/${image}/thumb)`}">
          <!-- <img v-lazy="`http://api.zyk.artreedu.com/v1/attachments/img/${image}`" /> -->
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="mallDetillsTopText">
      <div class="mdsttTop">{{detData.name}}</div>
      <div class="mdsttBot">
        <span class="mdttSpan">编号：{{detData.no}}</span>
      </div>
    </div>
    <div class="mallDetillsCon">
      <ul class="mdcUl">
        <li class="mdcUlLi">
          <span class="mdcUlLiLieft">作者</span>
          <span class="mdcUlLiRight">{{detData.author || '无'}}</span>
        </li>
        <li class="mdcUlLi">
          <span class="mdcUlLiLieft">作者介绍</span>
          <span class="mdcUlLiRight">{{detData.authorIntro || '无'}}</span>
        </li>
        <li class="mdcUlLi">
          <span class="mdcUlLiLieft">材质</span>
          <span class="mdcUlLiRight">{{detData.texture || '无'}}</span>
        </li>
        <li class="mdcUlLi">
          <span class="mdcUlLiLieft">画芯尺寸</span>
          <span class="mdcUlLiRight">{{detData.length ? detData.length + ' x' : ''}}{{detData.width ? detData.width : ''}}{{detData.thickness ? ' x ' + detData.thickness: ''}} cm</span>
        </li>
      </ul>
      <div class="mdcIMGText" v-show="detData.pics && detData.pics.length > 0">
        <span class="mdcITxjt">细节图</span>
        <p v-for="(itemImg, index) in detData.pics" :key="index" v-if="detData.pics.length > 0">
          <img :src="`http://api.zyk.artreedu.com/v1/attachments/img/${itemImg.id}`" alt="">
        </p>
        <!-- <span v-show="detData.pics && detData.pics.length <= 0" class="mdcItxJtNode">无</span> -->
      </div>
    </div>
  </div>
</template>
<script>
//
import { Swipe, SwipeItem, Lazyload, Toast, Dialog } from 'vant'
//
import Vue from 'vue'
Vue.use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Toast)
  .use(Dialog)
export default {
  data() {
    return {
      imagesTop: [
        // require('../assets/images/1.jpg')
      ],
      detData: []
    }
  },
  created() {
    window.scrollTo(0, 0)
    this.getListDet()
  },
  methods: {
    mdtiBackFn() {
      this.$router.go(-1)
    },
    getListDet() {
      Toast.loading({
        mask: true,
        duration: 0,
        message: '加载中...'
      })
      this.$store
        .dispatch({
          type: 'getListDet',
          path: this.$route.query.tagId
        })
        .then(
          response => {
            Toast.clear()
            if (
              response &&
              response.status == 200 &&
              response.data &&
              response.data.data
            ) {
              this.detData = response.data.data
              this.imagesTop.push(response.data.data.cover.id)
            } else {
              Dialog.alert({
                message: '抱歉，网络错误!!!！'
              }).then(() => {
                // on close
              })
            }
          },
          err => {
            Dialog.alert({
              message: '抱歉，网络错误！'
            }).then(() => {
              // on close
            })
            console.log(err)
          }
        )
    }
  }
}
</script>

<style lang="scss">
@mixin MultilineTextOverflow($nub) {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: $nub;
  -webkit-box-orient: vertical;
}
@mixin textOverflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mallDetills {
  width: 100%;
  height: 100%;
  text-align: left;
  .mallDetillsTopImg {
    width: 100%;
    height: 375px;
    background: #d8d8d8;
    position: relative;
    .van-swipe-item {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 50%;
    }
    .mdtiBack {
      width: 36px;
      height: 36px;
      position: absolute;
      top: 5px;
      left: 5px;
      z-index: 100;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 12px;
        height: 18px;
        transform: rotate(180deg);
        opacity: 0.5;
      }
    }
    .van-swipe {
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .mallDetillsTopText {
    width: 100%;
    background: #fff;
    padding: 15px;
    box-sizing: border-box;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #bdbdbd;
    .mdsttTop {
      font-size: 16px;
      color: #212121;
      width: 100%;
      max-height: 44px;
      @include MultilineTextOverflow(2);
    }
    .mdsttBot {
      width: 100%;
      padding: 15px 0 0 0;
      .mdttSpan {
        font-size: 13px;
        color: #bdbdbd;
      }
    }
  }
  .mallDetillsCon {
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #212121;
    .mdcUl {
      width: 100%;
      padding: 15px;
      box-sizing: border-box;
      margin: 10px 0 0 0;
      background: #fff;
      .mdcUlLi {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 0 15px 0;
        & > span {
          color: #bdbdbd;
          font-size: 13px;
        }
        .mdcUlLiLieft {
          color: #bdbdbd;
          width: 52px;
        }
        .mdcUlLiRight {
          color: #212121;
          width: 275px;
          max-height: 36px;
          @include MultilineTextOverflow(2);
        }
      }
    }
    .mdcIMGText {
      width: 100%;
      padding: 15px;
      box-sizing: border-box;
      margin: 10px 0 0 0;
      background: #fff;
      text-align: center;
      font-size: 18px;
      color: #212121;
      .mdcItxJtNode {
        display: block;
        width: 100;
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #bdbdbd;
      }
      .mdcITxjt {
        display: inline-block;
        padding: 0 0 10px 0;
      }
      img {
        max-width: 100%;
      }
    }
  }
}
</style>
