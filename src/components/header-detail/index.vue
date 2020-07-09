<template>
  <transition name="fade">
    <div class="header-detail"  v-show="visible">
      <div class="detail-wrapper">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size=48 :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports">
            <li class="supports-item" v-for="(item, index) in seller.supports" :key="index">
              <support-icon :type="item.type" :size=1></support-icon>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hide">
        <i class="icon-close"></i>
      </div>
    </div>
  </transition>
</template>

<script>
import SupportIcon from 'common/support-icon';
import popupMixin from 'common/mixins/popup.js';
import Star from 'common/star';

export default {
  name: 'header-detail',
  mixins: [popupMixin],
  components: {
    SupportIcon,
    Star
  },
  data() {
    return {
      visible: false
    };
  },
  props: {
    seller: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/sass/mixin.scss";
@import "~assets/sass/variable.scss";
.header-detail{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  overflow: auto;
  backdrop-filter: (10px);
  opacity: 1;
  color: $color-white;
  background-color: $color-background-s;
  &.fade-enter-active, &.fade-leave-active{
    transition: all 0.5s;
  }
  &.fade-enter, &.fade-leave-active{
    opacity: 0;
    background-color: $color-background;
  }
  .detail-wrapper{
    display: inline-block;
    width: 100%;
    min-height: 100%;
    .detail-main{
      margin-top: 1.706667rem /* 64/37.5 */;
      padding-bottom: 1.706667rem /* 64/37.5 */;
      .name{
        line-height: .426667rem /* 16/37.5 */;
        text-align: center;
        font-size: .426667rem /* 16/37.5 */;
        font-weight: 700;
      }
      .star-wrapper{
        margin-top: .48rem /* 18/37.5 */;
        padding: .053333rem /* 2/37.5 */ 0;
        text-align: center;
      }
      .title{
        display: flex;
        width: 80%;
        margin: .746667rem /* 28/37.5 */ auto .64rem /* 24/37.5 */ auto;
        .text{
          padding: 0 .32rem /* 12/37.5 */;
          font-weight: 700;
          font-size: $fontsize-medium;// 14px
        }
        .line{
          flex: 1;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          position: relative;
          top: -0.16rem /* 6/37.5 */;
        }
      }
      .supports{
        width: 80%;
        margin: 0 auto;
        .supports-item{
          display: flex;
          align-items: center;
          padding: 0 .32rem /* 12/37.5 */;
          margin-bottom: .32rem /* 12/37.5 */;
          &:last-child{
            margin-right: 0;
          }
          .support-icon{
            margin-right: .16rem /* 6/37.5 */;
          }
          .text{
            font-size: $fontsize-small;
            line-height: .426667rem /* 16/37.5 */;
          }
        }
      }
      .bulletin{
        width: 80%;
        margin: 0 auto;
        .content{
          padding: 0 .32rem /* 12/37.5 */;
          line-height: .64rem /* 24/37.5 */;
          font-size: $fontsize-small;
        }
      }
    }
  }
  .detail-close{
    position: relative;
    width: .8rem /* 30/37.5 */;
    height: .8rem /* 30/37.5 */;
    margin: -1.706667rem /* 64/37.5 */ auto 0 auto;
    clear: both;
    font-size: $fontsize-large-xxxx;
  }
}
</style>
