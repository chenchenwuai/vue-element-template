<template>
  <div>
    <slot name="left" />
    <el-button
      v-if="permission.edit"
      v-permission="permission.edit"
      :disabled="disabledEdit"
      size="mini"
      :type="isText ? 'text' : 'primary'"
      :icon="isText ? '' : 'el-icon-edit'"
      @click="crud.toEdit(data)"
    >
      {{ isText ? '编辑' : '' }}
    </el-button>
    <el-popover
      v-if="permission.del"
      v-model="pop"
      v-permission="permission.del"
      placement="top"
      width="180"
      trigger="manual"
      @show="onPopoverShow"
      @hide="onPopoverHide"
    >
      <p>{{ msg }}</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="doCancel">取消</el-button>
        <el-button :loading="crud.dataStatus[crud.getDataId(data)].delete === 2" type="danger" size="mini" @click="crud.doDelete(data)">确定</el-button>
      </div>
      <el-button v-if="!isText" slot="reference" :disabled="disabledDle" type="danger" icon="el-icon-delete" size="mini" @click="toDelete" />
      <el-button
        v-if="isText"
        slot="reference"
        :disabled="disabledDle"
        type="text"
        size="mini"
        class="el-button--danger"
        @click="toDelete"
      >删除
      </el-button>
    </el-popover>
  </div>
</template>
<script>
import CRUD, { crud } from '@crud/crud'
export default {
  mixins: [crud()],
  props: {
    data: {
      type: Object,
      required: true
    },
    permission: {
      type: Object,
      required: true
    },
    disabledEdit: {
      type: Boolean,
      default: false
    },
    disabledDle: {
      type: Boolean,
      default: false
    },
    msg: {
      type: String,
      default: '确定删除本条数据吗？'
    },
    isText: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pop: false
    }
  },
  methods: {
    doCancel() {
      this.pop = false
      this.crud.cancelDelete(this.data)
    },
    toDelete() {
      this.pop = true
    },
    [CRUD.HOOK.afterDelete](crud, data) {
      if (data === this.data) {
        this.pop = false
      }
    },
    onPopoverShow() {
      setTimeout(() => {
        document.addEventListener('click', this.handleDocumentClick)
      }, 0)
    },
    onPopoverHide() {
      document.removeEventListener('click', this.handleDocumentClick)
    },
    handleDocumentClick(event) {
      this.pop = false
    }
  }
}
</script>
<style lang="scss" scoped>
  .error-btn{
    color:#F56C6C
  }
  .el-button--text{
    margin-right:5px;
  }
  .el-button + .el-button{
    margin-left:0
  }
</style>
