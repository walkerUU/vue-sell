<template>
  <transition name="fade">
    <cube-popup
      v-show="visible"
      position="bottom"
      :mask-closable=true
      @mask-click="maskClick"
      type="shop-cart-list"
      :z-index=90
    >
      <transition
        name="move"
        @after-leave="onLeave"
      >
        <div v-show="visible">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span @click="empty" class="empty">清空</span>
          </div>
          <cube-scroll class="list-content" ref="listContent">
            <ul>
              <li
                class="food"
                v-for="(food,index) in selectedFoods"
                :key="index"
              >
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control @add="onAdd" :food="food"></cart-control>
                </div>
              </li>
            </ul>
          </cube-scroll>
        </div>
      </transition>
    </cube-popup>
  </transition>
</template>

<script>
import CartControl from 'components/goods/cart-control';
import popupMixin from 'common/mixins/popup.js';
const EVENT_HIDE = 'hide';
const EVENT_SHOW = 'show';
const EVENT_LEAVE = 'cartListLeave';
const EVENT_ADD = 'add';
export default {
  name: 'ShopCartList',
  mixins: [popupMixin],
  components: {
    CartControl
  },
  props: {
    selectedFoods: Array
  },
  created() {
    this.$on(EVENT_SHOW, () => {
      this.$nextTick(() => {
        this.$refs.listContent.refresh(); // 刷新cube-scroll重新计算scroll高度，解决在v-show情况下不能拖动list content的问题
      });
    });
  },
  methods: {
    maskClick() {
      this.hide();
      this.$emit(EVENT_HIDE);
    },
    onLeave() {
      this.$emit(EVENT_LEAVE);
    },
    onAdd(el) {
      this.$emit(EVENT_ADD, el);
    },
    empty() {
      this.dialogComp = this.dialogComp || this.$createDialog({
        type: 'confirm',
        title: '清空购物车',
        content: '确认清空吗',
        confirmBtn: '确定',
        cancelBtn: '取消',
        $events: {
          confirm: () => {
            this.selectedFoods.forEach(food => {
              if (food.count) {
                food.count = 0;
              }
            });
            this.hide();
          }
        }
      });
      this.dialogComp.show();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/sass/variable.scss";
.cube-shop-cart-list{
  bottom:1.28rem /* 48/37.5 */;
  &.fade-enter, &.fade-leave-active{
    opacity: 0;
  }
  &.fade-enter-active, &.fade-leave-active{
    transition: all 0.3s ease-in-out;
  }
  .move-enter, .move-leave-active{
    transform:translate3d(0, 100%, 0);
  }
  .move-enter-active, .move-leave-active{
    transition: all 0.3s ease-in-out;
  }
  .list-header{
    height:1.066667rem /* 40/37.5 */;
    line-height: 1.066667rem /* 40/37.5 */;
    padding: 0 .48rem /* 18/37.5 */;
    background-color: $color-background-ssss;
    .title{
      float: left;
      font-size: $fontsize-medium;
      color:$color-dark-grey;
    }
    .empty{
      float: right;
      font-size: $fontsize-small;
      color:$color-blue;
    }
  }
  .list-content{
    padding: 0 .48rem /* 18/37.5 */;
    max-height: 5.786667rem /* 217/37.5 */;
    overflow: hidden;
    background-color: $color-white;
    .food{
      position: relative;
      padding: .32rem /* 12/37.5 */ 0;
      .name{
        line-height: .64rem /* 24/37.5 */;
        font-size: $fontsize-medium;
        color:$color-dark-grey;
      }
      .price{
        position: absolute;
        right: 2.666667rem /* 100/37.5 */;
        bottom: .32rem /* 12/37.5 */;
        line-height: .64rem /* 24/37.5 */;
        font-weight: 700;
        color:$color-red;
        font-size: $fontsize-medium;
      }
      .cart-control-wrapper{
        position: absolute;
        right: 0;
        bottom: .16rem /* 6/37.5 */;
      }
    }
  }
}
</style>
