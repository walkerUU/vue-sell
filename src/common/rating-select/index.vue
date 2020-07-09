<template>
  <div class="rating-select">
    <div class="rating-type border-bottom-1px">
      <span @click="select(2)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span
        class="count">{{ratings.length}}</span></span>
      <span @click="select(0)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span
        class="count">{{positives.length}}</span></span>
      <span @click="select(1)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span
        class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggle" class="switch" :class="{'on':onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
const EVENT_SELECT = 'select';
const EVENT_TOGGLE = 'toggle';
export default {
  name: 'RatingSelect',
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        };
      }
    }
  },
  computed: {
    positives() {
      return this.ratings.filter(rating => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter(rating => {
        return rating.rateType === NEGATIVE;
      });
    }
  },
  methods: {
    select(type) {
      this.$emit(EVENT_SELECT, type);
    },
    toggle() {
      this.$emit(EVENT_TOGGLE);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/sass/variable.scss";
.rating-select{
  .rating-type{
    padding: .48rem /* 18/37.5 */ 0;
    margin: 0 .48rem /* 18/37.5 */;
    .block{
      display: inline-block;
      padding: .213333rem /* 8/37.5 */ .32rem /* 12/37.5 */;
      margin-right: .213333rem /* 8/37.5 */;
      line-height: .426667rem /* 16/37.5 */;
      border-radius: .026667rem /* 1/37.5 */;
      font-size: $fontsize-small;
      color: $color-grey;
      &.active{
        color: $color-white;
      }
      .count{
        margin-left: .053333rem /* 2/37.5 */;
      }
      &.positive{
        background: $color-light-blue;
        &.active{
          background: $color-blue;
        }
      }
      &.negative{
        background: $color-light-grey-s;
        &.active{
          background: $color-grey;
        }
      }
    }
  }

    .switch{
      display: flex;
      align-items: center;
      padding: .32rem /* 12/37.5 */ .48rem /* 18/37.5 */;
      line-height: .64rem /* 24/37.5 */;
      border-bottom: .026667rem /* 1/37.5 */ solid $color-row-line;
      color: $color-light-grey;
      &.on{
        .icon-check_circle{
          color: $color-green;
        }
      }
      .icon-check_circle{
        margin-right: .106667rem /* 4/37.5 */;
        font-size: $fontsize-large-xxx;
      }
      .text{
        font-size: $fontsize-small;
      }
    }
}

</style>
