<template>
  <div class="shop-cart-sticky" v-show="visible">
    <shop-cart
        :selectedFoods="selectedFoods"
        :deliveryPrice="deliveryPrice"
        :minPrice="minPrice"
        :fold="fold"
        :sticky="sticky"
        ref="shopCart"
      ></shop-cart>
  </div>
</template>

<script>
import ShopCart from 'components/goods/shop-cart';
import popupMixin from 'common/mixins/popup.js';
export default {
  name: 'ShopCartSticky',
  mixins: [popupMixin],
  components: {
    ShopCart
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
    cartList: {
      type: Object,
      default() {
        return {};
      }
    },
    sticky: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
.shop-cart-sticky{
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 1.28rem /* 48/37.5 */;
}
</style>
