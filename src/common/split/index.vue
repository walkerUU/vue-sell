<template>
  <div class="split"></div>
</template>

<script>
export default {
  name: 'split'
};
</script>

<style lang="scss" scoped>
  @import "~assets/sass/variable";
  .split{
    width: 100%;
    height: .426667rem /* 16/37.5 */;
    border-top: .026667rem /* 1/37.5 */ solid $color-row-line;
    border-bottom: .026667rem /* 1/37.5 */ solid $color-row-line;
    background: $color-background-ssss;
  }
</style>
