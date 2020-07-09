<template>
  <div class="tab">
    <cube-tab-bar
      :data="tabs"
      :showSlider=true
      v-model="selectedLabel"
      ref="tabBar"
      class="border-bottom-1px"
      :useTransition=false
    >
    </cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
        :loop=false
        :autoPlay=false
        :showDots=false
        :initialIndex="index"
        ref="slide"
        @change="handleSlideChange"
        @scroll="onScroll"
        :options="slideOptions"
      >
        <cube-slide-item v-for="(tab, index) in tabs" :key="index">
          <component :is="tab.component" :data="tab.data" ref="tabComponents"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Tab',
  props: {
    tabs: {
      type: Array,
      default() {
        return [];
      }
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      index: 0,
      slideOptions: { // better-scroll设置项
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      }
    };
  },
  mounted() {
    this.handleSlideChange(this.index);
  },
  computed: {
    selectedLabel: {
      get() {
        return this.tabs[this.index].label;
      },
      set(newVal) {
        this.index = this.tabs.findIndex(item => {
          return item.label === newVal;
        });
      }
    }
  },
  methods: {
    handleSlideChange(currentPage) {
      this.index = currentPage;
      const component = this.$refs.tabComponents[currentPage];
      component.fetch && component.fetch();
    },
    onScroll(pos) { // 监听slider的scroll，需要先绑定options属性，cube-ui的scroll来自better-scroll，因此options设置其实是better-scroll设置
      const tabBarWidth = this.$refs.tabBar.$el.clientWidth; // 获取tabBar宽度
      const slideScrollWidth = this.$refs.slide.slide.scrollerWidth; // 获取slideScroll宽度
      const transpos = -pos.x / slideScrollWidth * tabBarWidth; // 计算tabBar移动坐标
      this.$refs.tabBar.setSliderTransform(transpos);// 设置tabBar移动坐标
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~assets/cube-ui-stylus/variable";
.tab{
  font-size: .586667rem /* 22/37.5 */;
  display: flex;
  flex-direction: column;
  height: 100%;
  >>> .cube-tab{
    padding: .266667rem /* 10/37.5 */ 0;
  }
  .slide-wrapper{
    flex: 1;
    overflow: hidden;
  }
}
</style>

<!--
<style lang="scss" scoped>
@import "~assets/sass/variable.scss";
.tab{
  font-size: .586667rem /* 22/37.5 */;
  display: flex;
  flex-direction: column;
  height: 100%;
  .tab >>> .cube-tab{
    padding: .266667rem /* 10/37.5 */ 0;
  }
  .slide-wrapper{
    flex: 1;
    overflow: hidden;
  }
}
</style>
-->
