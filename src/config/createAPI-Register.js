import Vue from 'vue';
import { createAPI } from 'cube-ui';

import HeaderDetail from 'components/header-detail';
import Ball from 'common/ball';
import ShopCartList from 'components/goods/shop-cart/shop-cart-list';
import ShopCartSticky from 'components/goods/shop-cart/shop-cart-sticky';
import Food from 'components/goods/food';

createAPI(Vue, Ball, ['transitionOver']);
createAPI(Vue, HeaderDetail);
createAPI(Vue, ShopCartList);
createAPI(Vue, ShopCartSticky);
createAPI(Vue, Food);
