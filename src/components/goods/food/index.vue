<template>
  <transition
    name="move"
    @after-leave="afterLeave"
  >
    <div class="food" v-show="visible">
      <cube-scroll ref="scroll">
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image" alt="">
            <div class="back" @click="hide">
              <i class="icon-arrow_left"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">￥{{food.price}}</span>
              <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="cart-control-wrapper">
              <cart-control @add="addFood" :food="food"></cart-control>
            </div>
            <transition name="fade">
              <div
                class="buy"
                v-show="!food.count"
                @click.stop="addFirst"
              >加入购物车</div>
            </transition>
          </div>
          <split v-show="food.info"></split>
          <div class="info" v-show="food.info">
            <h1 class="titile">商品信息</h1>
            <p class="text">{{food.info}}</p>
          </div>
          <split></split>
          <div class="rating">
            <h1 class="title">商品评价</h1>
            <rating-select
              :ratings = "ratings"
              :onlyContent="onlyContent"
              :selectType="selectType"
              :desc="desc"
              @select="onSelectType"
              @toggle="onToggle"
            >

            </rating-select>
            <div class="rating-wrapper">
              <ul v-show="ratings && ratings.length">
                <li
                  v-for="(rating, index) in computedRatings"
                  class="rating-item border-bottom-1px"
                  :key="index"
                >
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img :src="rating.avatar" alt="" class="avatar">
                  </div>
                  <div class="time">{{ format(rating.rateTime) }}</div>
                  <p class="text">
                    <span :class="{
                      'icon-thumb_up':rating.rateType===0,
                      'icont-thumb_dowm':rating.rateType===1
                    }"></span>
                    {{rating.text}}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </transition>
</template>

<script>
import CartControl from 'components/goods/cart-control';
import ratingMixin from 'common/mixins/rating.js';
import popupMixin from 'common/mixins/popup.js';
import Split from 'common/split';
import RatingSelect from 'common/rating-select';
import moment from 'moment';

const EVENT_SHOW = 'show';
const EVENT_LEAVE = 'leave';
const EVENT_ADD = 'add';
export default {
  name: 'food',
  mixins: [popupMixin, ratingMixin],
  components: {
    Split,
    CartControl,
    RatingSelect
  },
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    };
  },
  created() {
    this.$on(EVENT_SHOW, () => {
      this.$nextTick(() => {
        this.$refs.scroll.refresh(); // 刷新cube-scroll重新计算scroll高度，解决在v-show情况下不能拖动list content的问题
      });
    });
  },
  computed: {
    ratings() {
      return this.food.ratings;
    }

  },
  methods: {
    afterLeave() {
      this.$emit(EVENT_LEAVE);
    },
    addFirst(e) {
      this.$set(this.food, 'count', 1);
      this.$emit(EVENT_ADD, e.target);
    },
    addFood(target) {
      this.$emit(EVENT_ADD, target);
    },
    format(time) {
      return moment(time).format('YYYY-MM-DD hh:mm');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/sass/variable.scss";
@import "~assets/sass/mixin.scss";
.food{
  position: fixed;
  left: 0;
  top:0;
  bottom: 1.28rem /* 48/37.5 */;
  z-index: 30;
  width: 100%;
  background-color: $color-white;
  &.move-enter-active, &.move-leave-active{
    transition: transform 0.3s linear;
  }
  &.move-enter, &.move-leave-active{
    transform: translate3d(100%, 0, 0);
  }
  .image-header{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    img{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .back{
      position: absolute;
      top: .266667rem /* 10/37.5 */;
      left: 0;
      .icon-arrow_left{
        display: block;
        padding: .266667rem /* 10/37.5 */;
        font-size: $fontsize-large-xx;
        color:$color-white;
      }
    }
  }
  .content{
    position: relative;
    padding: .48rem /* 18/37.5 */;
    .title{
      line-height: .373333rem /* 14/37.5 */;
      margin-bottom: .213333rem /* 8/37.5 */;
      font-size: $fontsize-medium;
      font-weight: 700;
      color: $color-dark-grey;
    }
    .detail{
      margin-bottom: .48rem /* 18/37.5 */;
      line-height: .266667rem /* 10/37.5 */;
      height: 10px;
      .sell-count, .rating{
        font-size: $fontsize-small-s;
        color: $color-light-grey;
      }
      .sell-count{
        margin-right: .32rem /* 12/37.5 */;
      }
    }
    .price{
      line-height: .64rem /* 24/37.5 */;
      font-weight: 700;
      .now{
        margin-right: .213333rem /* 8/37.5 */;
        font-size: .373333rem /* 14/37.5 */;
        color: $color-red;
      }
      .old{
        text-decoration: line-through;
        font-size: $fontsize-small-s;
        color: $color-light-grey;
      }
    }
    .cart-control-wrapper{
      position: absolute;
      right: .32rem /* 12/37.5 */;
      bottom: .32rem /* 12/37.5 */;
    }
    .buy{
      position: absolute;
      right: .48rem /* 18/37.5 */;
      bottom: .48rem /* 18/37.5 */;
      z-index: 10;
      height: .64rem /* 24/37.5 */;
      line-height: .64rem /* 24/37.5 */;
      padding: 0 .32rem /* 12/37.5 */;
      box-sizing: border-box;
      border-radius: .32rem /* 12/37.5 */;
      font-size: $fontsize-small-s;
      color: $color-white;
      background: $color-blue;
      opacity: 1;
      &.fade-enter-active, &.fade-leave-active{
        transition: all 0.3s;
      }
      &.fade-enter, &.fade-leave-active{
        opacity: 0;
        z-index: -1;
      }
    }
  }
  .info{
    padding: .48rem /* 18/37.5 */;
    .title{
      line-height: .373333rem /* 14/37.5 */;
      margin-bottom: .16rem /* 6/37.5 */;
      font-size: $fontsize-medium;
      color: $color-dark-grey;
    }
    .text{
      line-height: .64rem /* 24/37.5 */;
      padding: 0 .213333rem /* 8/37.5 */;
      font-size: $fontsize-small;
      color: $color-grey;
    }
  }
  .rating{
    padding-top: .48rem /* 18/37.5 */;
    .title{
      line-height: 14px;
      margin-left: 18px;
      font-size: $fontsize-medium;
      color: $color-dark-grey;
    }
    .rating-wrapper{
      padding: 0 .48rem /* 18/37.5 */;
      .rating-item{
        position: relative;
        padding: .426667rem /* 16/37.5 */ 0;
        &:last-child{
          @include border-none();
        }
        .user{
          position: absolute;
          right: 0;
          top: .426667rem /* 16/37.5 */;
          display: flex;
          align-items: center;
          line-height: .32rem /* 12/37.5 */;
          .name{
            margin-right: .16rem /* 6/37.5 */;
            font-size: $fontsize-small-s;
            color: $color-light-grey;
          }
          .avatar{
            border-radius: 50%;
            width: .32rem /* 12/37.5 */;
            height: .32rem /* 12/37.5 */;
          }
        }
        .time{
          margin-bottom: .16rem /* 6/37.5 */;
          line-height: .32rem /* 12/37.5 */;
          font-size: $fontsize-small-s;
          color: $color-light-grey;
        }
        .text{
          line-height: .426667rem /* 16/37.5 */;
          font-size: $fontsize-small;
          color: $color-dark-grey;
          .icon-thumb_up, .icon-thumb_down{
            margin-right: .106667rem /* 4/37.5 */;
            line-height: .426667rem /* 16/37.5 */;
            font-size: $fontsize-small;
          }
          .icon-thumb_up{
            color: $color-blue;
          }
          .icon-thumb_down{
            color: $color-light-grey;
          }
        }
      }
      .no-rating{
        padding: .426667rem /* 16/37.5 */ 0;
        font-size: $fontsize-small;
        color: $color-light-grey;
      }
    }
  }
}
</style>
