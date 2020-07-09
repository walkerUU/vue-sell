<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}" ref="shopCart"></i>
          </div>
          <div class="num" v-show="totalCount>0">
            <bubble :num="totalCount"></bubble>
          </div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">

        <div class="pay" @click="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Bubble from 'common/bubble';
const BALL_LEN = 10;
function createBalls() {
  const balls = [];
  for (let i = 0; i < BALL_LEN; i++) {
    balls.push({
      hasBall: false
    });
  }
  return balls;
}
export default {
  name: 'ShopCart',
  components: {
    Bubble
  },
  props: {
    selectedFoods: {
      type: Array,
      default() {
        return [];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    fold: {
      type: Boolean,
      default: true
    },
    sticky: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ballList: createBalls(),
      listFold: this.fold
    };
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectedFoods.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectedFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        const diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`;
      } else {
        return '去结算';
      }
    },
    payClass() {
      if (!this.totalCount || this.totalPrice < this.minPrice) {
        return 'not-enough';
      } else {
        return 'enough';
      }
    }
  },
  methods: {
    drop(el) {
      const elStratRect = el.getBoundingClientRect();
      const elStopRect = this.$refs.shopCart.getBoundingClientRect();
      const startPos = { // 设置ball起始位置
        x: elStratRect.left,
        y: elStratRect.top
      };
      const stopPos = { // 设置ball结束位置
        x: elStopRect.left + 6,
        y: elStopRect.top + 6
      };
      for (let i = 0; i < this.ballList.length; i++) {
        const ball = this.ballList[i];
        if (!ball.hasBall) {
          ball.compBall = this.$createBall(); // 动态创建ball组件，并将其实例保存在ballList的元素属性中
          ball.compBall.drop(startPos, stopPos); // 调用ball组件drop方法
          ball.compBall.$on('transitionOver', () => { // 监听ball组件过渡结束事件
            ball.compBall.remove(); // 动画结束后清除DOM元素
            delete ball.compBall; // 删除compBall属性
            ball.hasBall = false; // 失去compBall属性的ball元素，将其hasBall属性重置为false，以供下次使用
          });
          ball.hasBall = true; // ball添加compBall属性，保存ball组件实例后，将hasBall属性置为true
          return; // 保存本次点击事件创建的ball组件实例后，跳出循环
        }
      }
    },
    toggleList() {
      if (this.listFold) {
        if (!this.totalCount) {
          return;
        }
        this.listFold = false;
        this._showShopCartList();
        this._showShopCartSticky();
      } else {
        this.listFold = true;
        this._hideShopCartList();
      }
    },
    _showShopCartList() {
      this.compShopCartList = this.compShopCartList || this.$createShopCartList({
        $props: {
          selectedFoods: 'selectedFoods'
        }
      });
      this.compShopCartList.$on('hide', () => {
        this.listFold = true;
      });
      this.compShopCartList.$on('cartListLeave', () => {
        this._hideShopCartSticky();
      });
      this.compShopCartList.$on('add', (el) => {
        this.drop(el);
      });
      this.compShopCartList.show();
    },
    _hideShopCartList() {
      console.log(this.sticky);
      const comp = this.sticky
        ? this.$parent.cartList
        : this.compShopCartList;
      comp.hide && comp.hide();
      // this.compShopCartList.hide();
    },
    _showShopCartSticky() {
      this.compShopCartSticky = this.compShopCartSticky || this.$createShopCartSticky({
        $props: {
          selectedFoods: 'selectedFoods',
          deliveryPrice: 'deliveryPrice',
          minPrice: 'minPrice',
          fold: 'listFold',
          cartList: this.compShopCartList,
          sticky: true // 这里也可以不用传，将sticky组件中的sticky设置为true即可，因为在sticky组件中，该变量的值常为true
        }
      });
      this.compShopCartSticky.show();
    },
    _hideShopCartSticky() {
      this.compShopCartSticky.hide();
    },
    pay(e) {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      this.dialogComp = this.$createDialog({ // 保持单例，但不保存缓存，一边每次点击都更新content
        type: 'alert',
        title: '支付',
        content: `支付 ${this.totalPrice + this.deliveryPrice} 元`
      });
      this.dialogComp.show();
      e.stopPropagation(); // 阻止事件冒泡
    }
  },
  watch: {
    fold(newVal) {
      this.listFold = newVal;
    },
    totalCount(newVal) {
      if (!this.listFold && !newVal) {
        this._hideShopCartList();
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~assets/cube-ui-stylus/mixin";
@import "~assets/cube-ui-stylus/variable";
.shopcart{
  height:100%;
  .content{
    display: flex;
    background-color: $color-background;
    font-size:0;
    color:$color-light-grey;
    .content-left{
      flex:1;
      .logo-wrapper{
        display:inline-block;
        vertical-align:top;
        position:relative;
        top:-0.266667rem /* 10/37.5 */;
        margin:0 .32rem /* 12/37.5 */;
        padding:.16rem /* 6/37.5 */;
        width:1.493333rem /* 56/37.5 */;
        height:1.493333rem /* 56/37.5 */;
        box-sizing:border-box;
        border-radius:50%;
        background-color: $color-background;
        .logo{
          width:100%;
          height:100%;
          border-radius:50%;
          text-align:center;
          background-color:$color-dark-grey;
          &.highlight{
            background-color: $color-blue;
          }
          .icon-shopping_cart{
            line-height:1.173333rem /* 44/37.5 */;
            font-size:$fontsize-large-xxx;
            color:$color-light-grey;
            &.highlight{
              color:$color-white;
            }
          }
        }
        .num{
          position:absolute;
          top:0;
          right:0;
        }
      }
      .price{
        display:inline-block;
        vertical-align:top;
        margin-top:.32rem /* 12/37.5 */;
        line-height: .64rem /* 24/37.5 */;
        padding-right: .32rem /* 12/37.5 */;
        box-sizing:border-box;
        border-right: .026667rem /* 1/37.5 */ solid rgba(255, 255, 255, 0.1);
        font-weight: 700;
        font-size: $fontsize-large;
        &.highlight{
          color:$color-white;
        }
      }
      .desc{
        display: inline-block;
        vertical-align:top;
        margin:.32rem /* 12/37.5 */ 0 0 .32rem /* 12/37.5 */;
        line-height:.64rem /* 24/37.5 */;
        font-size: $fontsize-small-s;
      }
    }
    .content-right{
      flex:0 0 2.8rem /* 105/37.5 */;
      width:2.8rem /* 105/37.5 */;
      .pay{
        height:1.28rem /* 48/37.5 */;
        line-height:1.28rem /* 48/37.5 */;
        text-align:center;
        font-weight:700;
        font-size:$fontsize-small;
        &.not-enough{
          background-color:$color-dark-grey;
        }
        &.enough{
          background-color:$color-green;
          color:$color-white;
        }
      }
    }
  }
}
</style>
