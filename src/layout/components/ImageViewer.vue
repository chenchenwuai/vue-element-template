<template>
  <el-image-viewer
    v-if="imageViewerVisible"
    :on-close="closeImageViewer"
    :url-list="imageList"
    :z-index="imageViewerZIndex"
    :headers="headers"
  />
</template>
<script>
import ElImageViewer from '@/components/image/image-viewer'
import { PopupManager } from 'element-ui/lib/utils/popup'
import { mapGetters } from 'vuex'

export default {
  name: 'ImageViewer',
  components: { ElImageViewer },
  data() {
    return {
      imageViewerVisible: false,
      imageViewerZIndex: 9999
    }
  },
  computed: {
    ...mapGetters(['token']),
    headers: function() {
      return [
        { key: 'Authorization', value: 'bearer ' + this.token }
      ]
    },
    visible: function() {
      return this.$store.state.app.imageViewerVisible
    },
    imageList: function() {
      return this.$store.state.app.imageViewerUrlList || []
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.showImageViewer(this.imageList)
      } else {
        this.imageViewerVisible = val
      }
    }
  },
  methods: {
    showImageViewer(urlList) {
      if (!urlList || urlList.length === 0) {
        return
      }
      this.imageViewerZIndex = PopupManager.nextZIndex()
      this.imageViewerVisible = true
    },
    closeImageViewer() {
      this.$store.dispatch('app/closeImageViewer')
      this.imageViewerVisible = false
    }
  }
}
</script>
<style lang='scss' scoped>

</style>
