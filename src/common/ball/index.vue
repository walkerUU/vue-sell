<template>
  <transition name="dropBall"
    @before-enter="beforeDrop"
    @enter="dropping"
    @after-enter="afterDrop"
  >
    <div class="blue-ball" v-show="btnShow">
      <div class="inner"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Ball',
  data() {
    return {
      btnShow: false,
      startPos: {},
      stopPos: {}
    };
  },
  methods: {
    // 对外接口
    drop(startPos, stopPos) {
      this.btnShow = !this.btnShow;
      this.startPos = startPos;
      this.stopPos = stopPos;
    },
    beforeDrop(el) { // 过渡开始前，将小球设置到指定起始位置
      const inner = el.getElementsByClassName('inner')[0]; // 重置子元素位置，为下一次动画做准备
      inner.style.transform = 'translate3d(0, 0, 0)';

      el.style.transform = `translate3d( ${this.startPos.x}px, ${this.startPos.y}px, 0)`;
    },
    dropping(el, done) { // 过渡，将小球移动到指定终点位置
      this._reflow = el.offsetWidth; // 触发重绘

      const inner = el.getElementsByClassName('inner')[0];
      el.style.transform = `translate3d(${this.startPos.x}px, ${this.stopPos.y}px, 0)`; // 外层
      inner.style.transform = `translate3d(${this.stopPos.x - this.startPos.x}px, 0, 0)`; // 内层
      done();
    },
    afterDrop(el) {
      this.btnShow = !this.btnShow; // 动画结束后隐藏小球
      // 对外发送动画结束信号
      el.addEventListener('transitionend', () => {
        this.$emit('transitionOver');
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/sass/variable.scss";
.blue-ball{
  position: absolute;
  left: 0;
  top: 0;
  z-index: 200;
  transition: transform 0.5s cubic-bezier(0.28,-0.27, 0.55, 0.06);
  .inner{
    width:.426667rem /* 16/37.5 */;
    height:.426667rem /* 16/37.5 */;
    border-radius: 50%;
    background-color:$color-blue;
    transition: all 0.5s linear ;
  }
}
</style>
