<template>
  <div>
    <ul class="el-upload-list el-upload-list--picture-card">
      <li v-for="item in imageList" :key="item.id" tabindex="0" class="el-upload-list__item is-success">
        <img v-if="item.raw && item.url" :src="item.url" :alt="item.name" style="width:100%;height:100%;">
        <authImage
          v-else
          ref="img"
          :url="item.accessUrl"
          class="el-upload-list__item-thumbnail"
          :headers="headers"
        />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="onPreview(item)"><i class="el-icon-zoom-in" /></span>
          <span class="el-upload-list__item-delete" @click="onRemove(item)"><i class="el-icon-delete" /></span>
        </span>
      </li>
    </ul>
    <el-upload
      v-show="!imageList || imageList.length < number"
      :action="action"
      :headers="uploadHeaders"
      :accept="accept"
      :disabled="isUploading"
      list-type="picture-card"
      :before-upload="beforeUpload"
      :on-preview="onPreview"
      :on-progress="onProgress"
      :on-success="onSuccess"
      :on-error="onError"
      :on-remove="onRemove"
      :show-file-list="false"
      class="display_ib"
    >
      <i v-if="!isUploading" class="el-icon-plus" />
      <div v-else class="uploading-info">
        <span class="progress">{{ progress }}%</span>
      </div>
    </el-upload>
  </div>
</template>
<script>
import authImage from '@/components/image/auth-image'
import { mapGetters } from 'vuex'

export default {
  name: 'UploadMoreImage',
  components: { authImage },
  props: {
    action: {
      type: String,
      default: '/api/attachments/actions/upload?type=1'
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    number: {
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      imageList: [],
      imageIdList: [],
      isUploading: false,
      progress: 0
    }
  },
  computed: {
    ...mapGetters(['token']),
    uploadHeaders: function() {
      return { Authorization: 'bearer ' + this.token }
    },
    headers: function() {
      return [
        { key: 'Authorization', value: 'bearer ' + this.token }
      ]
    }
  },
  watch: {
    imageIdList(val) {
      this.$emit('image-id-change', this.imageIdList)
    }
  },
  methods: {
    beforeUpload(file) {
      this.isUploading = true
      this.progress = 0
      console.log(file)
      return true
    },
    onProgress(event, file, fileList) {
      console.log(event, file, fileList)
      if (event.percent !== undefined) {
        this.progress = event.percent === 100 ? 99 : Math.floor(event.percent)
      }
    },
    onSuccess(res, file, fileList) {
      console.log(res, file, fileList)
      if (res.code !== 200) {
        this.$message.error('上传文件失败:' + res.message + '(' + res.code + ')')
        fileList.pop()
        this.isUploading = false
      } else {
        this.progress = 100
        this.imageIdList.push(res.data.id)
        if (!this.imageList) {
          this.imageList = []
        }
        this.imageList.push({
          id: res.data.id,
          name: file.name,
          raw: file.raw,
          url: file.url,
          accessUrl: res.data.accessUrl
        })
        setTimeout(() => {
          this.isUploading = false
        }, 300)
      }
    },
    onError() {

    },
    onPreview(item) {
      const url = item.url || item.accessUrl
      if (url) {
        this.$store.dispatch('app/showImageViewer', [url])
      }
    },
    onRemove(item) {
      console.log(item)
      const { id } = item
      const idIndex = this.imageIdList.findIndex(imageId => imageId === id)
      if (idIndex !== -1) {
        this.imageIdList.splice(idIndex, 1)
      }
      const imageIndex = this.imageList.findIndex(image => image.id === id)
      if (imageIndex !== -1) {
        this.imageList.splice(imageIndex, 1)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
::v-deep .el-upload--picture-card{
  width: 120px;
  height: 120px;
  line-height: 120px;
}
::v-deep .el-upload-list--picture-card{
  .el-upload-list__item{
    width: 120px;
    height: 120px;
    line-height: 118px;
    position: relative;
  }
}
.display_ib{
  display:inline-block;
}
.uploading-info{
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
