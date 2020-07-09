<template>
  <div id="app">
    <v-header :seller="sellerData"></v-header>
    <div class="tab-wrapper">
      <tab :tabs="tabs" :initialIndex="initialIndex"></tab>
    </div>
  </div>
</template>

<script>
import VHeader from './components/v-header';
import Tab from './components/tab';
import Goods from 'components/goods';
import Ratings from 'components/ratings';
import Seller from 'components/seller';

import qs from 'query-string';

import { getSeller } from 'api';

export default {
  name: 'App',
  components: {
    VHeader,
    Tab,
    Goods,
    Ratings,
    Seller
  },
  data() {
    return {
      sellerData: {
        id: qs.parse(location.search).id
      },
      initialIndex: 1
    };
  },
  created() {
    this._getSeller();
  },
  computed: {
    tabs() {
      return [
        {
          label: '商品',
          component: Goods,
          data: {
            seller: this.sellerData
          }
        },
        {
          label: '评论',
          component: Ratings,
          data: {
            seller: this.sellerData
          }
        },
        {
          label: '商家',
          component: Seller,
          data: {
            seller: this.sellerData
          }
        }
      ];
    }
  },
  methods: {
    _getSeller() {
      getSeller({
        id: this.sellerData.id
      }).then(res => {
        this.sellerData = res;
      });
    }
  }
};
</script>

<style lang="scss">
#app{
  .tab-wrapper{
    position: fixed;
    top: 3.573333rem /* 134/37.5 */;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
