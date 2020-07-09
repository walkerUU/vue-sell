<template>
  <span class="bubble">
    {{num}}
  </span>
</template>

<script>
export default {
  name: 'bubble',
  props: {
    num: {
      type: Number
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/sass/variable.scss";
.bubble{
  display: inline-block;
  padding: 0 .133333rem /* 5/37.5 */;
  height: .426667rem /* 16/37.5 */;
  line-height: .426667rem /* 16/37.5 */;
  text-align: center;
  border-radius: .426667rem /* 16/37.5 */;
  font-family: Helvetica;
  font-weight: 700;
  font-size: $fontsize-small-s;
  color:$color-white;
  background: linear-gradient(to right, $color-orange, $color-red);
}
</style>
