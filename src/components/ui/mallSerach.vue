<template>
  <div class="mallSerach">
    <div class="mallSerachBg" v-show="autofocus" @click="autofocusFn">
      <div class="msbg">
        <img class="mallSerachBgImg" src="../../assets/images/ico-search.png" alt="">搜索
      </div>
    </div>
    <div class="mallSerachCon">
      <div class="mscLeft">
        <i class="mallSerachConIcon" @click="onSearch"></i>
        <div class="mallSerachConDiv" ref="testRef">
          <input v-model="serachValue" type="text" placeholder="画作名称" class="mallSerachConDivInput" ref="serachRef" @keyup.enter="onSearch">
        </div>
      </div>
      <div class="mscright">
        <span @click="onCancel">取消</span>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Field } from 'vant'
Vue.use(Field)
export default {
  data() {
    return {
      serachValue: '',
      autofocus: true
    }
  },
  methods: {
    autofocusFn() {
      this.autofocus = false
      this.serachValue = ''
      this.$refs.serachRef.focus()
    },
    onSearch() {
      this.$emit('onSearchEmit', this.serachValue)
    },
    onCancel() {
      this.autofocus = true
    }
  },
  cerated() {
    document.body.addEventListener('touchstart', function() {})
  }
}
</script>
<style lang="scss">
.mallSerach {
  width: 100%;
  max-width: 375px;
  height: 50px;
  background: #fff;
  // position: fixed;
  // top: 0;
  // left: auto;
  z-index: 100;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #c7c7cc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  box-shadow: 0px 1px 0px #f2f2f2;
  position: relative;
  .mallSerachBg {
    width: 100%;
    height: 50px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    top: 0;
    left: 0;
    .msbg {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 30px;
      background: #f2f2f2;
      border-radius: 30px;
    }
    .mallSerachBgImg {
      width: 15px;
      height: 14px;
      margin: 0 8px 0 0;
    }
  }
  .mallSerachCon {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .mscLeft {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 82%;
      height: 30px;
      background: #f2f2f2;
      border-radius: 30px;
      padding: 6px 12px;
      box-sizing: border-box;
      .mallSerachConIcon {
        width: 16px;
        height: 16px;
        display: block;
        background: url('../../assets/images/ico-search.png') no-repeat left
          center;
        background-size: 100%;
        margin: 0 5px 0 0;
      }
      .mallSerachConDiv {
        width: 100%;
        display: flex;
        align-items: center;
      }
      .mallSerachConDivInput {
        background: none;
        border: none;
        width: 100%;
        color: #333;
      }
    }
    .mscright {
      width: 16%;
      height: 30px;
      & > span {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #212121;
        &:active {
          color: #FFCA18;
        }
      }
    }
  }
}
</style>
