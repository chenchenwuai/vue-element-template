<template>
  <el-tooltip class="el-icon-tooltip" :effect="dark" :placement="placement">
    <slot slot="content" name="content">{{ content }}</slot>
    <i :class="iconName" />
  </el-tooltip>
</template>
<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'el-icon-info'
    },
    effect: {
      type: String,
      default: 'dark'
    },
    placement: {
      type: String,
      default: 'top'
    },
    content: {
      type: String,
      default: ''
    }
  }
}
</script>
