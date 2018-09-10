<template>
  <div class="mallList">
    <div class="mallListBox">
      <div class="mlbImg">
        <div class="logImg" :style="{'background-image': `url(http://api.zyk.artreedu.com/v1/attachments/img/${listData.cover.id}/thumb)`}">
          <!-- <img v-if="listData.cover" v-lazy="`http://api.zyk.artreedu.com/v1/attachments/img/${listData.cover.id}`" alt=""> -->
        </div>
        <div class="logDiv">
          <van-loading />
        </div>
      </div>
      <!-- <div class="mlbImg"><img v-if="listData.cover" :src="`http://api.zyk.artreedu.com/v1/attachments/img/${listData.cover.id}`" alt=""></div> -->
      <div class="mlbText">
        <div class="mlbtTit">
          {{listData.name}}
        </div>
        <div class="mlbtBot">
          <span class="mlbtBotText">编号：{{listData.no}}</span>
          <span class="mlbtBotIcon"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Lazyload, Loading } from 'vant'
Vue.use(NavBar)
  .use(Lazyload)
  .use(Loading)

export default {
  props: {
    listData: {
      type: Object
    }
  },
  data() {
    return {}
  },
  created() {},
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
.mallList {
  width: 100%;
  height: 100%;
  text-align: left;
  .mallListBox {
    width: 100%;
    .mlbImg {
      width: 100%;
      height: 175px;
      background: #d8d8d8;
      border-radius: 6px 6px 0 0;
      overflow: hidden;
      position: relative;
      .logImg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50%;
      }
      .logDiv {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .mlbText {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #212121;
      background: #fff;
      padding: 10px;
      box-sizing: border-box;
      .mlbtTit {
        width: 100%;
        height: 34px;
        @include MultilineTextOverflow(2);
      }
      .mlbtBot {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #bdbdbd;
        padding: 8px 0 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .mlbtBotText {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #bdbdbd;
          overflow: hidden;
          width: 80%;
          height: 20px;
          white-space: nowrap;
          @include textOverflow;
        }
        .mlbtBotIcon {
          width: 16px;
          height: 6px;
          background: url('../../assets/images/ico-moe.png') no-repeat center
            right;
          background-size: 100%;
          display: inline-block;
        }
      }
    }
  }
}
</style>
