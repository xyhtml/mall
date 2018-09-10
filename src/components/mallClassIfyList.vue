<template>
  <div class="mallClassify">
    <div class="msch">
      <MallSerach @onSearchEmit="onSearchEmitFn"></MallSerach>
    </div>
    <div class="mallClssIfyListCon">
      <div class="mcilcPit" v-if="zpNodeShow">没有查到任何作品，谢谢！</div>
      <van-list v-else v-model="loadingMore" :finished="finished" @load="onLoad" :immediate-check="immediateCheck">
        <ul class="mcilcUl">
          <li v-for="(item, index) in listData" :key="index" @click="listDataFn(item.id)">
            <MallLst :listData="item"></MallLst>
          </li>
        </ul>
        <div class="mallClassNone" v-show="classBotShow">我是有底线的</div>
      </van-list>
    </div>
    <MallNav :active="1"></MallNav>
  </div>
</template>
<script>
import MallNav from '@/components/ui/mallNav'
import MallHeader from '@/components/ui/mallHeader'
import MallSerach from '@/components/ui/mallSerach'
import MallLst from '@/components/ui/mallLst'
//
import Vue from 'vue'
import { Toast, Dialog, List } from 'vant'
Vue.use(Toast)
  .use(Dialog)
  .use(List)
export default {
  components: {
    MallNav,
    MallHeader,
    MallSerach,
    MallLst
  },
  data() {
    return {
      active: 1,
      headerTitle: '分类',
      listData: [
        // {
        //   listName:
        //     '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
        //   listImg: require('../assets/images/1.jpg'),
        //   listNum: '1002222'
        // }
      ],
      pageNum: 0,
      zpNodeShow: false,
      //
      list: [],
      loadingMore: false,
      finished: false,
      immediateCheck: false,
      //
      classBotShow: false,
      onSearchTrue: false,
      onSearchName: '',
      keepAliveShow: true,
      createdRoActivated: 0
    }
  },
  created() {
    this.getList()
    this.active = 1
    this.createdRoActivated = 0
    console.log('created')
  },
  methods: {
    // searchOk back
    onSearchEmitFn(params) {
      this.listData = []
      this.onSearchName = params
      this.onSearchTrue = true
      this.classBotShow = false
      this.pageNum = 0
      this.finished = false
      //
      let patrn = /^[0-9]*$/
      if (patrn.test(params)) {
        console.log('num')
        this.getSerachList('', params)
      } else {
        console.log('string')
        this.getSerachList(params, '')
      }
    },
    // loadMore
    onLoad() {
      console.log('load')
      let patrn = /^[0-9]*$/
      if (this.onSearchTrue) {
        // 搜索load
        if (patrn.test(this.onSearchName)) {
          // 纯数字搜索
          this.getSerachList('', this.onSearchName)
        } else {
          // 非纯数字搜索
          this.getSerachList(this.onSearchName, '')
        }
      } else {
        // 非搜索load
        this.getList()
      }
    },
    // to detills
    listDataFn(tagId) {
      this.$router.push({
        path: '/mallDetills',
        query: {
          tagId: tagId
        }
      })
      // console.log(tagId)
    },
    // get info
    getList() {
      if (this.pageNum === 0) {
        Toast.loading({
          mask: true,
          duration: 0,
          message: '加载中...'
        })
      }
      this.$store
        .dispatch({
          type: 'getList',
          categoryId: this.$route.query.id,
          name: null,
          page: this.pageNum.toString(),
          size: '20',
          tagIds: this.$route.query.tagId
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
              if (response.data.data.contents.length > 0) {
                this.listData = this.listData.concat(
                  response.data.data.contents
                )
                this.zpNodeShow = false
                //
                this.loadingMore = false
                this.pageNum += 1
                // 长度小于每页个数断开请求
                if (response.data.data.contents.length < 19) {
                  this.loadingMore = false
                  this.finished = true
                  if (response.data.data.contents.length > 4) {
                    this.classBotShow = true
                  }
                }
              } else {
                this.loadingMore = false
                this.finished = true
                this.classBotShow = true
                if (this.pageNum === 0) {
                  this.zpNodeShow = true
                  this.classBotShow = false
                }
              }
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
    },
    // get Serach info
    getSerachList(params, keywordNum) {
      console.log('-------------')
      this.finished = true
      if (this.pageNum === 0) {
        Toast.loading({
          mask: true,
          duration: 0,
          message: '加载中...'
        })
      }
      this.$store
        .dispatch({
          type: 'getList',
          name: params == 0 ? null : params,
          keyword: keywordNum == 0 ? null : keywordNum,
          page: this.pageNum.toString(),
          size: '20',
          tagIds: null
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
              if (response.data.data.contents.length > 0) {
                this.listData = this.listData.concat(
                  response.data.data.contents
                )
                this.zpNodeShow = false
                //
                this.loadingMore = false
                this.pageNum += 1
                // 长度小于每页个数断开请求
                if (response.data.data.contents.length < 19) {
                  this.finished = true
                  if (response.data.data.contents.length >= 4) {
                    this.classBotShow = true
                  }
                } else {
                  this.finished = false
                }
              } else {
                this.loadingMore = false
                this.finished = true
                this.classBotShow = true
                if (this.pageNum === 0) {
                  this.zpNodeShow = true
                }
              }
            } else {
              this.finished = true
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
  },
  activated() {
    let keep = localStorage.getItem('keep')
    if (keep === 'true' && this.createdRoActivated > 0) {
      this.classBotShow = false
      this.finished = false
      this.listData = []
      this.pageNum = 0
      this.getList()
      console.log('activated')
    }
    this.createdRoActivated = 3
  }
}
</script>
<style lang="scss">
.mallClassify {
  width: 100%;
  max-width: 375px;
  height: 100%;
  // overflow: hidden;
  position: relative;
  .msch {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    z-index: 90;
  }
  .mallClssIfyListCon {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    // position: absolute;
    // top: 50px;
    // left: 0;
    // bottom: 50px;
    // overflow: hidden;
    // overflow-y: auto;
    padding: 51px 0;
    .van-list {
      width: 100%;
      height: auto;
      padding: 0 0 50px 0;
      .van-list__loading {
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .mallClassNone {
      font-size: 13px;
      color: #999;
      padding: 0 0 10px 0;
    }
    .mcilcPit {
      width: 100%;
      height: 98%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 13px;
      color: #999;
      box-sizing: border-box;
    }
    .mcilcUl {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 10px 10px 5px 10px;
      // padding: 10px 10px 50px 10px;
      box-sizing: border-box;
      & > li {
        width: 50%;
        padding: 0 8px 8px 0;
        box-sizing: border-box;
        &:nth-child(2n) {
          padding-right: 0;
        }
      }
    }
  }
}
</style>
