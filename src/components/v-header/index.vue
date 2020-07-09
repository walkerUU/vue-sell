<template>
  <div class="header" @click="handleHeaderClick">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="support" v-if="seller.supports" >
          <support-icon :type="seller.supports[1].type" :size=1></support-icon>
          <span class="text">{{seller.supports[1].description}}</span>
        </div>
      </div>
      <div class="support-count">
        <span class="count" v-if="seller.supports">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrap">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="avatar">
    </div>
  </div>
</template>

<script>
import SupportIcon from 'common/support-icon';
export default {
  name: 'VHeader',
  components: {
    SupportIcon
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
    handleHeaderClick() {
      this.compHeaderDetail = this.compHeaderDetail || this.$createHeaderDetail({
        $props: { seller: this.seller }
      });
      this.compHeaderDetail.show();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/sass/mixin.scss";
@import "~assets/sass/variable.scss";

.header{
  position: relative;
  overflow: hidden;
  color: $color-white;
  background-color: $color-background-ss;
  .content-wrapper{
    position: relative;
    display: flex;
    align-items: center;
    padding: .64rem /* 24/37.5 */ .32rem /* 12/37.5 */ .48rem /* 18/37.5 */ .64rem /* 24/37.5 */;
    .avatar{
      flex: 0 0 1.706667rem /* 64/37.5 */;
      width: 1.706667rem /* 64/37.5 */;
      height: 1.706667rem /* 64/37.5 */;
      margin-right: .426667rem /* 16/37.5 */;
      img{
        width: 100%;
        border-radius: .053333rem /* 2/37.5 */;
      }
    }
    .content{
      flex:1;
      .title{
        display: flex;
        align-items: center;
        margin-bottom: .213333rem /* 8/37.5 */;
        .brand{
          width: .8rem /* 30/37.5 */;
          height: .48rem /* 18/37.5 */;
          @include bg-image('brand');
          background-size: cover;
        }
        .name{
          font-size: $fontsize-large; //16px
          margin-left: .16rem /* 6/37.5 */;
          font-weight: bold;
        }
      }
      .description{
        font-size: $fontsize-small;
        line-height: $fontsize-small;
        margin-bottom: .213333rem /* 8/37.5 */;
      }
      .support{
        display: flex;
        align-items: center;
        .support-icon{
          margin-right: .106667rem /* 4/37.5 */;
        }
        .text{
          font-size: $fontsize-small-s;
          line-height: $fontsize-small;
        }
      }
    }
    .support-count{
      position: absolute;
      right: .32rem /* 12/37.5 */;
      bottom: .373333rem /* 14/37.5 */;
      display: flex;
      align-items: center;
      height: .64rem /* 24/37.5 */;
      line-height: .64rem /* 24/37.5 */;
      padding: 0 .213333rem /* 8/37.5 */;
      text-align: center;
      border-radius: .373333rem /* 14/37.5 */;
      background-color: $color-background-sss;
      font-size: $fontsize-small-s;
      .icon-keyboard_arrow_right{
        margin-left: .053333rem /* 2/37.5 */;
        line-height: .64rem /* 24/37.5 */;
        font-size: $fontsize-large;
      }
    }
  }
  .bulletin-wrap{
    display: flex;
    align-items: center;
    height: .746667rem /* 28/37.5 */;
    line-height: .746667rem /* 28/37.5 */;
    padding: 0 .213333rem /* 8/37.5 */;
    background-color: $color-background-sss;
    .bulletin-title{
      width: .586667rem /* 22/37.5 */;
      height: .32rem /* 12/37.5 */;
      @include bg-image('bulletin');
      background-size: cover;
      margin-right: .16rem /* 6/37.5 */;
    }
    .bulletin-text{
      flex: 1;
      font-size: $fontsize-small-s;
      @include ellipsis();
    }
    .icon-keyboard_arrow_right{
      flex: 0 0 .32rem /* 12/37.5 */;
      width: .32rem /* 12/37.5 */;
      font-size: $fontsize-large;
    }
  }
  .background{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter:blur(10px);
  }
}
</style>
