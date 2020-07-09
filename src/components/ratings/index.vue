<template>
  <cube-scroll ref="scroll" class="ratings" :data="computedRatings" :options="scrollOptions">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select
        :ratings = "ratings"
        :onlyContent="onlyContent"
        :selectType="selectType"
        @select="onSelectType"
        @toggle="onToggle"
        v-if="ratings.length"
      >

      </rating-select>
      <div class="rating-wrapper">
        <ul>
          <li
            v-for="(rating,index) in computedRatings"
            :key="index"
            class="rating-item border-bottom-1px"
          >
            <div class="avatar">
              <img :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span
                  class="item"
                  v-for="(item,index) in rating.recommend"
                  :key="index"
                >
                  {{item}}
                </span>
              </div>
              <div class="time">
                {{format(rating.rateTime)}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </cube-scroll>
</template>

<script>
import Star from 'common/star';
import Split from 'common/split';
import ratingMixin from 'common/mixins/rating';
import RatingSelect from 'common/rating-select';
import moment from 'moment';
import { getRatings } from 'api';
export default {
  name: 'Ratings',
  mixins: [ratingMixin],
  components: {
    Star,
    Split,
    RatingSelect
  },
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
      scrollOptions: {
        click: false,
        directionLocakThreshold: 0
      }
    };
  },
  computed: {
    seller() {
      return this.data.seller || {};
    }
  },
  methods: {
    fetch() {
      if (!this.fetched) { // this.fetched未定义则说明fetch()没有被调用过，也就是说没有请求过ajax数据
        this.fetched = true; // fecth()被调用过，也就是goods拿到了数据，添加this.fetched字段并将其置为true，防止标签页滑动造成的重复获取数据、初始化页面数据，比如用户选择商品被清除
        getRatings({
          id: this.seller.id
        }).then(res => {
          this.ratings = res;
        });
      }
    },
    format(time) {
      return moment(time).format('YYYY-MM-DD hh:mm');
    }
  }

};
</script>

<style lang="scss" scoped>
@import "assets/sass/variable.scss";
@import "assets/sass/mixin.scss";

.ratings{
  position: relative;
  text-align: left;
  white-space: normal;
  height: 100%;
  .overview{
    display: flex;
    padding: .48rem /* 18/37.5 */ 0;
    .overview-left{
      flex: 0 0 3.653333rem /* 137/37.5 */;
      padding: .16rem /* 6/37.5 */ 0;
      width: 3.653333rem /* 137/37.5 */;
      border-right: .026667rem /* 1/37.5 */ solid $color-col-line;
      text-align: center;
      @media only screen and (max-width: 320px){
        flex: 0 0 3.2rem /* 120/37.5 */;
        width: 3.2rem /* 120/37.5 */;
      }
      .score{
        margin-bottom: .16rem /* 6/37.5 */;
        line-height: .746667rem /* 28/37.5 */;
        font-size: $fontsize-large-xxx;
        color: $color-orange;
      }
      .title{
        margin-bottom: .213333rem /* 8/37.5 */;
        line-height: .32rem /* 12/37.5 */;
        font-size: $fontsize-small;
        color: $color-dark-grey;
      }
      .rank{
        line-height: .266667rem /* 10/37.5 */;
        font-size: $fontsize-small-s;
        color: $color-light-grey;
      }
    }
    .overview-right{
      flex: 1;
      padding: .16rem /* 6/37.5 */ 0 .16rem /* 6/37.5 */ .64rem /* 24/37.5 */;
      @media only screen and (max-width: 320px){
        padding-left: .16rem /* 6/37.5 */;
      }
      .score-wrapper{
        display: flex;
        align-items: center;
        margin-bottom: .213333rem /* 8/37.5 */;
        .title{
          line-height: .48rem /* 18/37.5 */;
          font-size: $fontsize-small;
          color: $color-dark-grey;
        }
        .star{
          margin: 0 .32rem /* 12/37.5 */;
        }
        .score{
          line-height: .48rem /* 18/37.5 */;
          font-size: $fontsize-small;
          color: $color-orange;
        }
      }
      .delivery-wrapper{
        display: flex;
        align-items: center;
        .title{
          line-height: .48rem /* 18/37.5 */;
          font-size: $fontsize-small;
          color: $color-dark-grey;
        }
        .delivery{
          margin-left: .32rem /* 12/37.5 */;
          font-size: $fontsize-small;
          color: $color-light-grey;
        }
      }
    }
  }
  .rating-wrapper{
    padding: 0 .48rem /* 18/37.5 */;
    .rating-item{
      display: flex;
      padding: .48rem /* 18/37.5 */ 0;
      &:last-child{
        @include border-none();
      }
      .avatar{
        flex: 0 0 .746667rem /* 28/37.5 */;
        width: .746667rem /* 28/37.5 */;
        margin-right: .32rem /* 12/37.5 */;
        img{
          height: auto;
          border-radius: 50%;
          width: .64rem /* 24/37.5 */;
          height: .64rem /* 24/37.5 */;
        }
      }
      .content{
        position: relative;
        flex: 1;
        .name{
          margin-bottom: .106667rem /* 4/37.5 */;
          line-height: .32rem /* 12/37.5 */;
          font-size: $fontsize-small-s;
          color: $color-dark-grey;
        }
        .star-wrapper{
          margin-bottom: .16rem /* 6/37.5 */;
          display: flex;
          align-items: center;
          .star{
            margin-right: .16rem /* 6/37.5 */;
          }
          .delivery{
            font-size: $fontsize-small-s;
            color: $color-light-grey;
          }
        }
        .text{
          margin-bottom: .213333rem /* 8/37.5 */;
          line-height: .48rem /* 18/37.5 */;
          color: $color-dark-grey;
          font-size: $fontsize-small;
        }
        .recommend{
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          line-height: .426667rem /* 16/37.5 */;
          .icon-thumb_up, .item{
            margin: 0 .213333rem /* 8/37.5 */ .106667rem /* 4/37.5 */ 0;
            font-size: $fontsize-small-s;
          }
          .icon-thumb_up{
            color: $color-blue;
          }
          .item{
            padding: 0 .16rem /* 6/37.5 */;
            border: .026667rem /* 1/37.5 */ solid $color-row-line;
            border-radius: .026667rem /* 1/37.5 */;
            color: $color-light-grey;
            background: $color-white;
          }
        }
        .time{
          position: absolute;
          top: 0;
          right: 0;
          line-height: .32rem /* 12/37.5 */;
          font-size: $fontsize-small;
          color: $color-light-grey;
        }
      }
    }
  }
}
</style>
