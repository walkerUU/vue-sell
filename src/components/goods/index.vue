<template>
  <div class="goods">
    <div class="scroll-nav-wrapper">
      <cube-scroll-nav
        :side=true
        :data="goods"
        :options="scrollOptions"
        v-if="goods.length"
      >
        <template slot="bar" slot-scope="props">
          <cube-scroll-nav-bar
            direction="vertical"
            :labels="props.labels"
            :txts="barTxts"
            :current="props.current"
          >
            <template slot-scope="props">
              <div class="text">
                <support-icon
                  v-if="props.txt.type>=1"
                  :size=3
                  :type="props.txt.type"
                >
                </support-icon>
                <span>{{props.txt.name}}</span>
                <span class="num" v-if="props.txt.count>0">
                  <bubble :num="props.txt.count"></bubble>
                </span>
              </div>
            </template>
          </cube-scroll-nav-bar>
        </template>
        <cube-scroll-nav-panel
          v-for="good in goods"
          :key="good.name"
          :label="good.name"
          :title="good.name"
        >
          <ul>
            <li
              v-for="food in good.foods"
              :key="food.name"
              class="food-item"
              @click="selectFood(food)"
            >
              <div class="icon">
                <img :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control :food="food" @add="onAdd"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <div class="shop-cart-wrapper">
      <shop-cart
        :selectedFoods="selectedFoods"
        :deliveryPrice="seller.deliveryPrice"
        :minPrice="seller.minPrice"
        ref="shopCart"
      ></shop-cart>
    </div>
  </div>
</template>

<script>
import ShopCart from './shop-cart';
import CartControl from './cart-control';
import SupportIcon from 'common/support-icon';
import Bubble from 'common/bubble';
import { getGoods } from 'api';
export default {
  name: 'Goods',
  components: {
    ShopCart,
    CartControl,
    SupportIcon,
    Bubble
  },
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      goods: [],
      scrollOptions: {
        click: false,
        directionLockThreshold: 0
      },
      selectedFood: {}
    };
  },
  computed: {
    seller() {
      return this.data.seller;
    },
    selectedFoods() {
      const foodList = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foodList.push(food);
          }
        });
      });
      return foodList;
    },
    barTxts() {
      const res = [];
      this.goods.forEach(good => {
        const { type, name, foods } = good;
        let count = 0;
        foods.forEach(food => {
          count += food.count || 0;
        });
        res.push({ type, name, count });
      });
      return res;
    }
  },
  methods: {
    fetch() {
      if (!this.fetched) { // this.fetched未定义则说明fetch()没有被调用过，也就是说没有请求过ajax数据
        this.fetched = true; // fecth()被调用过，也就是goods拿到了数据，添加this.fetched字段并将其置为true，防止标签页滑动造成的重复获取数据、初始化页面数据，比如用户选择商品被清除
        getGoods().then(res => {
          this.goods = res;
        });
      }
    },
    onAdd(el) {
      this.$refs.shopCart.drop(el);
    },
    selectFood(food) {
      this.selectedFood = food;
      this._showFood();
      this._showShopSticky();
    },
    _showFood() {
      this.compFood = this.compFood || this.$createFood({
        $props: {
          food: 'selectedFood'
        }
      });
      this.compFood.$on('leave', () => {
        this._hideShopSticky();
      });
      this.compFood.$on('add', (el) => {
        this.$refs.shopCart.drop(el);
      });
      this.compFood.show();
    },
    _showShopSticky() {
      this.compShopCartSticky = this.compShopCartSticky || this.$createShopCartSticky({
        $props: {
          selectedFoods: 'selectedFoods',
          deliveryPrice: this.seller.deliveryPrice,
          minPrice: this.seller.minPrice,
          fold: true
        }
      });
      this.compShopCartSticky.show();
    },
    _hideShopSticky() {
      this.compShopCartSticky && this.compShopCartSticky.hide();
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~assets/cube-ui-stylus/mixin"
  @import "~assets/cube-ui-stylus/variable"
  .goods{
    position: relative;
    text-align: left;
    height: 100%;
    .scroll-nav-wrapper{
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      bottom: 1.28rem /* 48/37.5 */;
    }
    >>> .cube-scroll-nav-bar{
      width: 2.133333rem /* 80/37.5 */;
      white-space: normal;
      overflow: hidden;
    }
    >>> .cube-scroll-nav-bar-item{
      padding: 0 .266667rem /* 10/37.5 */;
      display: flex;
      align-items: center;
      height: 1.493333rem /* 56/37.5 */;
      line-height: .373333rem /* 14/37.5 */;
      font-size: $fontsize-small;
      background: $color-background-ssss;
      .text{
        flex: 1;
        position: relative;
      }
      .num{
        position: absolute;
        right: -0.213333rem /* 8/37.5 */;
        top: -0.266667rem /* 10/37.5 */;
      }
      .support-icon{
        display: inline-block;
        vertical-align: top;
        margin-right: .106667rem /* 4/37.5 */;
      }
    }
    >>> .cube-scroll-nav-bar-item_active{
      background: $color-white;
      color: $color-dark-grey;
    }
    >>> .cube-scroll-nav-panel-title{
      padding-left: .373333rem /* 14/37.5 */;
      height: .693333rem /* 26/37.5 */;
      line-height: .693333rem /* 26/37.5 */;
      border-left: .053333rem /* 2/37.5 */ solid $color-col-line;
      font-size: $fontsize-small;
      color: $color-grey;
      background: $color-background-ssss;
    }
    .food-item{
      display: flex;
      margin: .48rem /* 18/37.5 */;
      padding-bottom: .48rem /* 18/37.5 */;
      position: relative;
      &:last-child{
        border-none();
        margin-bottom: 0;
      }
      .icon{
        flex: 0 0 1.52rem /* 57/37.5 */;
        margin-right: .266667rem /* 10/37.5 */;
        img{
          width 1.52rem /* 57/37.5 */;
          height 1.52rem /* 57/37.5 */;
        }
      }
      .content{
        flex: 1;
        .name{
          margin: .053333rem /* 2/37.5 */ 0 .213333rem /* 8/37.5 */ 0;
          height: .373333rem /* 14/37.5 */;
          line-height: .373333rem /* 14/37.5 */;
          font-size: $fontsize-medium;
          color: $color-dark-grey;
        }
        .desc, .extra{
          line-height: .266667rem /* 10/37.5 */;
          font-size: $fontsize-small-s;
          color: $color-light-grey;
        }
        .desc{
          line-height: .32rem /* 12/37.5 */;
          margin-bottom: .213333rem /* 8/37.5 */;
        }
        .extra{
          .count{
            margin-right: .32rem /* 12/37.5 */;
          }
        }
        .price{
          font-weight: 700;
          line-height: .64rem /* 24/37.5 */;
          .now{
            margin-right: .213333rem /* 8/37.5 */;
            font-size: $fontsize-medium;
            color: $color-red;
          }
          .old{
            text-decoration: line-through;
            font-size: $fontsize-small-s;
            color: $color-light-grey;
          }
        }
        .cart-control-wrapper{
          position:absolute;
          right:0;
          bottom:.32rem /* 12/37.5 */;
        }
      }
    }
    .shop-cart-wrapper{
      position:absolute;
      left:0;
      bottom:0;
      z-index:50;
      width:100%;
      height:1.28rem /* 48/37.5 */;
    }
  }
</style>
