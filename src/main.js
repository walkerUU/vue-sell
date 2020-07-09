import Vue from 'vue';
import './cube-ui';
import App from './App.vue';
import './assets/sass/index.scss';
import './config/createAPI-Register';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
