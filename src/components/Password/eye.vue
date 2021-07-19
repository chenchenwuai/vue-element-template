<template>
  <span class="show-pwd" @click="showPwd">
    <svg-icon :icon-class="!eyeOpen ? 'eye' : 'eye-open'" />
  </span>
</template>
<script>
export default {
  props: {
    eyeOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },

  methods: {
    showPwd() {
      this.$emit('update:eye-open', !this.eyeOpen)
    }
  }
}
</script>
<style lang='scss' scoped>
.show-pwd {
  font-size: 1em;
  cursor: pointer;
  user-select: none;
}
</style>
