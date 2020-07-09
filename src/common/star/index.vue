<template>
  <div class="star" :class="starSize">
    <span class="star-item" v-for="(starType, index) in starTypeList" :class="starType" :key="index"></span>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';
export default {
  name: 'star',
  props: {
    size: {
      type: Number,
      default: 48,
      validator(value) {
        return [24, 36, 48].indexOf(value) > -1;
      }
    },
    score: {
      type: Number,
      default: 3.5
    }
  },
  computed: {
    starSize() {
      return `star-${this.size}`;
    },
    starTypeList() {
      const list = [];
      const num = Math.floor(this.score * 2) / 2;
      const fullStarNum = Math.floor(num);
      for (let i = 0; i < fullStarNum; i++) {
        list.push(CLS_ON);
      }
      const hasHalf = num % 1 !== 0;
      if (hasHalf) {
        list.push(CLS_HALF);
      }
      while (list.length < LENGTH) {
        list.push(CLS_OFF);
      }
      return list;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/sass/mixin.scss";
.star{
  @include flex-center();
  .star-item{
    background-size: cover;
    background-repeat: no-repeat;
  }
  &.star-48{
    .star-item{
      width: .533333rem /* 20/37.5 */;
      height: .533333rem /* 20/37.5 */;
      margin-right: .586667rem /* 22/37.5 */;
      &:last-child{
        margin-right: 0;
      }
      &.on{
        @include bg-image('star48_on');
      }
      &.half{
        @include bg-image('star48_half');
      }
      &.off{
        @include bg-image('star48_off');
      }
    }
  }
  &.star-36{
    .star-item{
      width: .4rem /* 15/37.5 */;
      height: .4rem /* 15/37.5 */;
      margin-right: .213333rem /* 8/37.5 */;
      &:last-child{
        margin-right: 0;
      }
      &.on{
        @include bg-image('star36_on');
      }
      &.half{
        @include bg-image('star36_half');
      }
      &.off{
        @include bg-image('star36_off');
      }
    }
  }
  &.star-24{
    .star-item{
      width: .266667rem /* 10/37.5 */;
      height: .266667rem /* 10/37.5 */;
      margin-right: .08rem /* 3/37.5 */;
      &:last-child{
        margin-right: 0;
      }
      &.on{
        @include bg-image('star24_on');
      }
      &.half{
        @include bg-image('star24_half');
      }
      &.off{
        @include bg-image('star24_off');
      }
    }
  }
}
</style>
