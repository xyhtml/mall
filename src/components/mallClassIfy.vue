<template>
  <div class="mallClassIfy" v-if="unbindShow">
    <MallHeader :headerTitle="headerTitle"></MallHeader>
    <div class="mallClassIfyCon">
      <div class="mallClassIfyLeft">
        <div class="wrapper" ref="leftWrapper">
          <div class="content">
            <ul class="mclUi">
              <li class="leftListLi" v-for="(item, index) in leftList" :class="{'fourStyle': item.length === 4, 'liCurrent': index === currentIndex}" :key="index + 'one'" @click="leftListFn(index, $event)" ref="oneListRef">
                <span>{{item.name}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="mallClassIfyRight">
        <div class="rightWrapper" ref="rightWrapper">
          <div class="rightContent">
            <ul class="rightList">
              <li ref="twoListRef" class="rightListLi" v-for="(item, index) in activeList" :key="index + 'two'">
                <div class="rightListH3" @click="rightListFn(item.id, item.name)">
                  <div class="rightListTit">
                    <span>{{item.name}}</span>
                    <i></i>
                  </div>
                </div>
                <div class="rightListDivBox">
                  <div class="rightListDiv" :class="{'rldCurren': items.active}" v-for="(items, indexs) in item.tags" :key="indexs + 'chlid'" @click="rightListDiv(item.id, item.name, items.id, items.name, index, indexs)">{{items.name}}</div>
                </div>
              </li>
            </ul>
            <div class="btnOk">
              <span class="cz" @click="czFn">重置</span>
              <span class="qd" @click="qdFn">确定</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MallNav :active="active"></MallNav>
  </div>
</template>
<script>
import MallNav from '@/components/ui/mallNav'
import MallHeader from '@/components/ui/mallHeader'
import BScroll from 'better-scroll'
// import $ from 'jquery'
//
import Vue from 'vue'
import { Toast, Dialog } from 'vant'
Vue.use(Toast).use(Dialog)
export default {
  components: {
    MallNav,
    MallHeader
  },
  data() {
    return {
      unbindShow: true,
      obj: {},
      activeList: [],
      itemID: 0,
      itemsID: 0,
      indexSplicing: {},
      tagIdSplicing: [],
      indexYes: 0,
      outPageIndex: 0,
      active: 1,
      headerTitle: '分类',
      leftIndex: 0,
      leftList: [
        // '北欧',
        // '现代简约',
        // '古典',
        // '东方',
        // '田园',
        // '新中式',
        // '欧式古典',
        // '大师',
        // '人物',
        // '静物',
        // '植物',
        // '动物'
      ],
      rightList: [
        // {
        //   rightVal: '北欧',
        //   rightList: ['客厅', '玄关', '餐厅', '卧室']
        // },
        // {
        //   rightVal: '现代简约',
        //   rightList: ['客厅', '玄关', '餐厅', '书房']
        // },
        // {
        //   rightVal: '新古典',
        //   rightList: [
        //     '经典',
        //     '玄关',
        //     '低调',
        //     '卧室',
        //     '经典',
        //     '玄关',
        //     '儿童房',
        //     '卧室'
        //   ]
        // },
        // {
        //   rightVal: '东方',
        //   rightList: ['客厅', '玄关', '餐厅', '卧室']
        // },
        // {
        //   rightVal: '田园',
        //   rightList: ['客厅', '玄关', '餐厅', '卧室']
        // },
        // {
        //   rightVal: '新中式',
        //   rightList: ['客厅', '玄关', '餐厅', '卧室']
        // },
        // {
        //   rightVal: '欧式古典',
        //   rightList: ['客厅', '玄关', '餐厅', '卧室']
        // },
        // {
        //   rightVal: '大师',
        //   rightList: ['客厅', '玄关', '餐厅', '卧室']
        // },
        // {
        //   rightVal: '人物',
        //   rightList: ['客厅', '玄关', '餐厅', '卧室']
        // },
        // {
        //   rightVal: '静物',
        //   rightList: ['客厅', '玄关', '餐厅', '卧室']
        // },
        // {
        //   rightVal: '植物',
        //   rightList: ['客厅', '玄关', '餐厅', '卧室']
        // },
        // {
        //   rightVal: '动物',
        //   rightList: ['客厅', '玄关', '餐厅', '卧室']
        // }
      ],
      //
      scrollYTwo: '',
      listHeight: [],
      toast: '',
      createdRoActivated: 0
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (
          !height2 ||
          (this.scrollYTwo >= height1 && this.scrollYTwo < height2)
        ) {
          this.scrollOneElemnt(i)
          return i
        }
      }
      return 0
    }
  },
  created() {
    // this.createdRoActivated = 0
    // this.getClassIfyInfo()
  },
  mounted() {},
  methods: {
    getClassIfyInfo() {
      Toast.loading({
        mask: true,
        duration: 0,
        message: '加载中...'
      })
      this.$store
        .dispatch({
          type: 'getClassIfy'
        })
        .then(
          response => {
            Toast.clear()
            if (
              response &&
              response.status == 200 &&
              response.data &&
              response.data.data.length > 0
            ) {
              this.leftList = response.data.data
              this.rightList = response.data.data
              //
              let datas = response.data.data
              for (let a in datas) {
                let aa = {}
                aa.id = datas[a].id
                aa.name = datas[a].name
                aa.tags = []
                for (let b in datas[a].tags) {
                  let bb = {}
                  bb.id = datas[a].tags[b].id
                  bb.name = datas[a].tags[b].name
                  bb.active = false
                  aa.tags.push(bb)
                }
                this.activeList.push(aa)
              }
              console.log(this.activeList)
              this.$nextTick(() => {
                this._initScroll()
                this._calculateHeight()
              })
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
    // left click
    leftListFn(index, event) {
      console.log('-----?')
      // console.log(event._constructed)
      if (!event._constructed) {
        return
      }
      let twoListRef = this.$refs.twoListRef
      let el = twoListRef[index]
      this.scrollTwo.scrollToElement(el, 300)
      this.outPageIndex = index
    },
    _initScroll() {
      this.scrollOne = new BScroll(this.$refs.leftWrapper, {
        click: true
      })

      this.scrollTwo = new BScroll(this.$refs.rightWrapper, {
        click: true,
        probeType: 3
      })

      this.scrollTwo.on('scroll', pos => {
        // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
        if (pos.y <= 0) {
          this.scrollYTwo = Math.abs(Math.round(pos.y))
        }
      })
    },
    _calculateHeight() {
      let twoListRef = this.$refs.twoListRef
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < twoListRef.length; i++) {
        let item = twoListRef[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
      // 从详情页返回后设置分类滚动条位置
      if (
        localStorage.getItem('classScroll') &&
        localStorage.getItem('classScroll') >= 0
      ) {
        let twoListRef = this.$refs.twoListRef
        let el = twoListRef[Number(localStorage.getItem('classScroll'))]
        this.scrollTwo.scrollToElement(el, 1)
      }
    },
    // 设置左边菜单滚动
    scrollOneElemnt(index) {
      localStorage.setItem('classScroll', index)
      let oneListRef = this.$refs.oneListRef
      let el = oneListRef[index]
      this.scrollOne.scrollToElement(el, 300, 0, -100)
    },
    // tolink more
    rightListFn(id, name) {
      this.$router.push({
        path: '/mallClassIfyList',
        query: {
          id: id,
          name: name
        }
      })
    },
    // tolink tag
    rightListDiv(id, name, tagId, tagName, index, indexs) {
      // console.log(id, name, tagId, tagName)
      this.obj.id = id
      this.obj.name = name
      this.obj.tagId = tagId
      this.obj.tagName = tagName
      this.obj.index = index
      this.obj.indexs = indexs
      // 记录选择过的编号
      if (this.tagIdSplicing.indexOf(tagId) > -1) {
        let index = this.tagIdSplicing.indexOf(tagId)
        this.tagIdSplicing.splice(index, 1)
      } else {
        this.tagIdSplicing.push(tagId)
      }
      // 设置高亮
      this.activeList[index].tags[indexs].active = !this.activeList[index].tags[indexs].active
      console.log(this.tagIdSplicing, this.tagIdSplicing.join(','))
    },
    toMallList() {
      this.$router.push({
        path: '/mallClassIfyList',
        query: {
          id: this.obj.id,
          name: this.obj.name,
          tagId: this.obj.tagId,
          tagName: this.obj.tagName,
          idList: this.tagIdSplicing.join(',')
        }
      })
    },
    // 确定
    qdFn() {
      if (this.tagIdSplicing.length > 0) {
        this.toMallList()
      } else {
        Dialog.alert({
          message: '请至少选择一种类型'
        }).then(() => {
          // on close
        })
      }
    },
    // 重置
    czFn() {
      this.tagIdSplicing = []
      for (let a in this.activeList) {
        for (let b in this.activeList[a].tags) {
          this.activeList[a].tags[b].active = false
        }
      }
    }
  },
  activated() {
    if (
      localStorage.getItem('keepAlive') &&
      localStorage.getItem('keepAlive') === 'no'
    ) {
      // location.reload()
      this.unbindShow = false
      setTimeout(() => {
        this.unbindShow = true
        //
        this.createdRoActivated = 0
        this.getClassIfyInfo()
        this.czFn()
      }, 100)
    }

    // let keepClass = localStorage.getItem('keepClass')
    // console.log(keepClass)
    // if (keepClass === 'true' && this.createdRoActivated > 0) {
    //   this.getClassIfyInfo()
    // }
    // this.createdRoActivated = 3
  },
  beforeRouteLeave(to, form, next) {
    if (to.name != 'MallClassifyList') {
      console.log(to.name, form.name)
      // this.$destroy()
    }
    next()
  }
}
</script>

<style lang="scss">
.mallClassIfy {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  position: relative;
  .btnOk {
    width: 100%;
    padding: 10px 0;
    & > span {
      display: inline-block;
      padding: 6px 20px;
      font-size: 16px;
    }
    .cz {
      border: 1px solid #efefef;
    }
    .qd {
      color: #fff;
      border-radius: 0 2px 2px 0;
      background: -moz-linear-gradient(left top, #ace, #f96);
      background: -webkit-linear-gradient(left top, #ff6600, #ffcc33);
    }
  }
  .mallClassIfyCon {
    width: 100%;
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 50px;
    display: flex;
    justify-content: space-between;
    .mallClassIfyLeft {
      width: 70px;
      height: 100%;
      background: #f2f2f2;
      display: flex;
      justify-content: center;
      .wrapper {
        width: 100%;
      }
      .mclUi {
        width: 100%;
        .liCurrent {
          background: #fff;
          position: relative;
          &::before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: 3px;
            height: 100%;
            background: #ffca18;
          }
        }
        .fourStyle {
          & > span {
            width: 35px;
          }
        }
        & > li {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 60px;
          & > span {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #212121;
            line-height: 20px;
          }
        }
      }
    }
    .mallClassIfyRight {
      width: 270px;
      padding: 0 20px 0 0;
      height: 100%;
      .rightWrapper {
        width: 100%;
        height: 100%;
      }
      .rightList {
        width: 100%;
        & > li {
          width: 100%;
          height: auto;
          padding: 20px 0 0 0;
          .rightListH3 {
            width: 100%;
            font-family: PingFangSC-Regular;
            font-size: 18px;
            color: #212121;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .rightListTit {
              font-family: PingFangSC-Regular;
              font-size: 18px;
              color: #212121;
              position: relative;
              & > span {
                position: relative;
                z-index: 100;
              }
              & > i {
                position: absolute;
                top: 8px;
                left: 10px;
                content: '';
                display: block;
                background: #ffca18;
                width: 88%;
                height: 10px;
                z-index: 90;
              }
            }
            &::after {
              width: 8px;
              height: 13px;
              content: '';
              display: block;
              background: url('../assets/images/ico-arr-right.png') no-repeat
                center right;
              background-size: 100%;
            }
          }
          .rightListDivBox {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 15px 0 0 0;
            .rldCurren {
              background: #ffca18 !important;
              color: #fff !important;
            }
            .rightListDiv {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 49%;
              height: 45px;
              background: #f2f2f2;
              border-radius: 5px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #212121;
              text-align: center;
              margin: 0 0 5px 0;
              &:nth-child(2n) {
                margin-right: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
