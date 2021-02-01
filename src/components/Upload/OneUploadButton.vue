<template>
  <el-upload
    :action="action"
    :disabled="disabled || isLoading"
    :headers="uploadHeaders"
    :on-success="uploadSuccess"
    :on-progress="uploadProgress"
    :on-error="uploadError"
    :before-upload="beforeUpload"
    :accept="accept"
    list="1"
    :show-file-list="false"
    style="display:inline-block;margin-right:10px;"
  >
    <el-button size="mini" :type="buttonType" :disabled="disabled || isLoading">{{ text }}</el-button>
  </el-upload>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'OneUploadButton',
  props: {
    action: {
      type: String,
      required: true
    },
    accept: {
      type: String,
      default: ''
    },
    buttonType: {
      type: String,
      default: 'primary'
    },
    buttonText: {
      type: String,
      default: '上传'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoading: false,
      procress: 0
    }
  },
  computed: {
    ...mapGetters(['token']),
    uploadHeaders: function() {
      return { Authorization: 'bearer ' + this.token }
    },
    text: function() {
      if (this.isLoading) {
        return '上传中 ' + this.procress + '%'
      } else {
        return this.buttonText
      }
    }
  },
  methods: {
    beforeUpload() {
      this.isLoading = true
      this.procress = 0
    },
    uploadSuccess(res) {
      this.isLoading = false
      if (res.code === 200) {
        this.$emit('success', res.data)
      } else {
        this.$emit('error', res.data)
      }
    },
    uploadProgress(event) {
      this.isLoading = true
      if (event.percent !== undefined) {
        this.procress = Math.floor(event.percent)
      }
    },
    uploadError(res) {
      this.$emit('error', res)
      this.isLoading = false
      this.procress = 0
    }
  }
}
</script>
