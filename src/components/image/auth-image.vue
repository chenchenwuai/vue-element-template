<template>
  <img
    ref="img"
    src=""
    alt=""
  >
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadError: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['token']),
    headers: function() {
      return [
        { key: 'Authorization', value: 'bearer ' + this.token }
      ]
    }
  },
  watch: {
    url(val) {
      this.$emit('update:loading', true)
      this.$refs.img.src = ''
      this.requestImage(val, this.$refs.img)
    }
  },
  mounted() {
    this.$emit('update:loading', true)
    this.requestImage(this.url, this.$refs.img)
  },
  methods: {
    requestImage(url, element) {
      const request = new XMLHttpRequest()
      request.responseType = 'blob'
      request.open('get', url, true)
      this.headers.forEach(header => {
        if (header.key !== undefined && header.value !== undefined) {
          request.setRequestHeader(header.key, header.value)
        }
      })
      request.onreadystatechange = e => {
        if (request.readyState === XMLHttpRequest.DONE) {
          this.$emit('update:loading', false)
          if (request.status === 200) {
            element.src = URL.createObjectURL(request.response)
            element.onload = () => {
              URL.revokeObjectURL(element.src)
            }
          } else {
            element.alt = '加载失败'
            this.$emit('update:loadError', true)
          }
        } else {
          this.$emit('update:loading', false)
        }
      }
      request.send(null)
    }
  }
}
</script>
