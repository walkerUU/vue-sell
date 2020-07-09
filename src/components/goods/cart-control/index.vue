<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop="decrease">
        <div class="inner icon-remove_circle_outline"></div>
      </div>
    </transition>
    <div class="cart-count"  v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="add"></div>
  </div>
</template>

<script>
const EVENT_ADD = 'add';
export default {
  name: 'CartControl',
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    add(e) {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
      this.$emit(EVENT_ADD, e.target);
    },
    decrease() {
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~assets/cube-ui-stylus/variable';
.cartcontrol{
  display: flex;
  align-items:center;
  .cart-decrease{
    display:inline-block;
    line-height:.64rem /* 24/37.5 */;
    padding:.16rem /* 6/37.5 */;
    opacity:1;
    .inner{
      height :.64rem /* 24/37.5 */
      display:inline-block;
      line-height:.64rem /* 24/37.5 */;
      font-size:$fontsize-large-xxx;
      color:$color-blue;
      transition: all 0.4s linear;
      transform:rotate(0deg);
    }
    &.move-enter-active, &.move-leave-active{
      transition: all 0.4s linear;
    }
    &.move-enter, &.move-leave-active{
      opacity:0;
      transform:translate3d(.64rem /* 24/37.5 */, 0, 0);
      .inner{
        transform:rotate(180deg);
      }
    }
  }
  .cart-count{
    // width:.32rem /* 12/37.5 */;
    padding:.16rem /* 6/37.5 */;
    line-height:.64rem /* 24/37.5 */;
    font-size:$fontsize-large-xxx;
    color:$color-blue;
  }
  .cart-add{
    display:inline-block;
    padding:.16rem /* 6/37.5 */;
    line-height:.64rem /* 24/37.5 */;
    font-size:$fontsize-large-xxx;
    color:$color-blue;
  }
}
</style>
