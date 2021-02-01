<template>
  <div style="display: inline-block">
    <el-dialog :visible.sync="dialog" :close-on-click-modal="false" :before-close="cancel" :title="title" append-to-body width="520px" @close="cancel">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="88px">
        <el-form-item label="旧密码" prop="oldPass">
          <el-input
            v-model="form.oldPass"
            :type="visible.old ? 'text' : 'password'"
            auto-complete="on"
            style="width: 100%;"
            maxlength="50"
            placeholder="请输入旧密码"
          >
            <i slot="suffix" class="el-icon-view" :style="{color:visible.old ? '#409EFF' : ''}" @click="visible.old = !visible.old" />
          </el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input
            v-model="form.newPass"
            :type="visible.new ? 'text' : 'password'"
            auto-complete="on"
            style="width: 100%;"
            maxlength="16"
            placeholder="密码为8-16位字母、数字、特殊字符组成，至少包含两种"
          >
            <i slot="suffix" class="el-icon-view" :style="{color:visible.new ? '#409EFF' : ''}" @click="visible.new = !visible.new" />
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPass">
          <el-input
            v-model="form.confirmPass"
            :type="visible.confirm ? 'text' : 'password'"
            auto-complete="on"
            style="width: 100%;"
            maxlength="16"
            placeholder="请再次输入新密码"
          >
            <i slot="suffix" class="el-icon-view" :style="{color:visible.confirm ? '#409EFF' : ''}" @click="visible.confirm = !visible.confirm" />
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="cancel">取消</el-button>
        <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import { updatePass } from '@/api/system/user'
export default {
  data() {
    const confirmPass = (rule, value, callback) => {
      if (value) {
        if (this.form.newPass !== value) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请再次输入密码'))
      }
    }
    return {
      visible: {
        old: false,
        new: false,
        confirm: false
      },
      loading: false, dialog: false, title: '修改密码', form: { oldPass: '', newPass: '', confirmPass: '' },
      rules: {
        oldPass: [
          { required: true, message: '请输入旧密码', trigger: ['blur', 'change'] }
        ],
        newPass: [
          { required: true, message: '请输入新密码', trigger: ['blur', 'change'] },
          { min: 8, max: 16, message: '密码为8-16位字母、数字、特殊字符组成，至少包含两种', trigger: 'blur' },
          { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)(?![^0-9a-zA-Z]+$)[^\u4E00-\u9FA5]{8,16}$/, message: '密码为8-16位字母、数字、特殊字符组成，至少包含两种', trigger: 'blur' }
        ],
        confirmPass: [
          { required: true, validator: confirmPass, trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          updatePass(this.form).then(res => {
            this.resetForm()
            this.$notify({
              title: '密码修改成功，请重新登录',
              type: 'success',
              duration: 1500
            })
            setTimeout(() => {
              store.dispatch('LogOut').then(() => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
              })
            }, 1500)
          }).catch(err => {
            this.loading = false
            console.log(err.response.data.message)
          })
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { oldPass: '', newPass: '', confirmPass: '' }
      this.visible = { old: false, new: false, confirm: false }
    }
  }
}
</script>

<style scoped>
.el-icon-view{
  cursor: pointer;
}
</style>
