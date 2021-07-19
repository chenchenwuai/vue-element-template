<template>
  <el-card class="v-card" :shadow="shadow">
    <div slot="header" class="clearfix">
      <span>{{ title }}</span>
      <div class="operation">
        <slot name="operation" />
      </div>
    </div>
    <slot />
  </el-card>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    shadow: {
      type: String,
      default: 'always'
    }
  }
}
</script>
<style lang='scss' scoped>
.v-card {
  border:none;
  ::v-deep  .el-card__header{
    padding: 15px 20px;

    .operation{
      float:right;
      height: 18px;

      .el-button{
        padding: 0px;
        font-size: 16px;
      }
    }
  }
  ::v-deep .el-card__body{
    padding: 10px;
  }
}
</style>
