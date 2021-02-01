<template>
  <div class="app-container">
    <el-row :gutter="20" class="info">
      <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="5" style="margin-bottom: 10px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div>
            <ul class="user-info">
              <li><div style="height: 100%"><svg-icon icon-class="login" /> 登录账号<div class="user-right">{{ userinfo.username }}</div></div></li>
              <li><svg-icon icon-class="user" /> 用户姓名 <div class="user-right">{{ userinfo.name }}</div></li>
              <li><svg-icon icon-class="phone" /> 手机号码 <div class="user-right">{{ userinfo.phoneNumber }}</div></li>
              <li><svg-icon icon-class="email" /> 用户邮箱 <div class="user-right">{{ userinfo.email }}</div></li>
              <li>
                <svg-icon icon-class="anq" /> 安全设置
                <div class="user-right">
                  <a @click="$refs.pass.dialog = true">修改密码</a>
                </div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="19">
        <el-card class="box-card">
          <el-tabs v-model="activeName">
            <el-tab-pane label="用户资料" name="first">
              <el-form ref="form" :model="form" :rules="rules" style="margin-top: 10px;" size="small" label-width="65px">
                <el-form-item label="昵称" prop="name">
                  <el-input v-model="form.name" style="width: 35%" />
                  <span style="color: #C0C0C0;margin-left: 10px;">昵称不作为登录使用</span>
                </el-form-item>
                <el-form-item label="手机号" prop="phoneNumber">
                  <el-input v-model="form.phoneNumber" style="width: 35%;" />
                  <span style="color: #C0C0C0;margin-left: 10px;" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="form.email" style="width: 35%;" />
                  <span style="color: #C0C0C0;margin-left: 10px;" />
                </el-form-item>
                <el-form-item label="">
                  <el-button :loading="isLoading" size="mini" type="primary" @click="doSubmit">保存配置</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
    <updatePass ref="pass" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import updatePass from './updatePass'
import store from '@/store'
import { editUser } from '@/api/system/user'
import { validatePhone } from '@/utils/validate'
export default {
  name: 'Profile',
  components: { updatePass },
  data() {
    return {
      activeName: 'first',
      isLoading: false,
      form: {},
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        phoneNumber: [
          { validator: validatePhone }
        ],
        email: [
          { type: 'email', message: '请输入正确邮箱', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  },
  created() {
    this.form = {
      id: this.userinfo.id,
      name: this.userinfo.name,
      phoneNumber: this.userinfo.phoneNumber,
      email: this.userinfo.email
    }
  },
  methods: {
    doSubmit() {
      if (this.$refs['form']) {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.isLoading = true
            editUser(this.form, this.userinfo.id).then(() => {
              this.$message.success('更新成功')
              store.dispatch('GetInfo').then(() => {})
              this.isLoading = false
            }).catch(e => {
              this.$message.error('更新失败' + e)
              this.isLoading = false
            })
          }
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container{
    padding: 20px 0 45px;

    .info{
      padding: 0 20px;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      width: 120px;
      height: 120px;
      line-height: 120px;
      text-align: center
    }

    .avatar {
      width: 120px;
      height: 120px;
      display: block;
      border-radius: 50%
    }
    .user-info {
      padding-left: 0;
      list-style: none;
      li{
        border-bottom: 1px solid #F0F3F4;
        padding: 11px 0;
        font-size: 13px;
      }
      .user-right {
        float: right;

        a{
          color: #317EF3;
        }
      }
    }

    #el-main-footer{

      .version{
        float:right;
      }
    }

    .application{
      background: #fff;
      position: absolute;
      height: 40px;
      line-height: 40px;
      bottom: 0;
      left: 0;
      width: 100%;
      text-align: right;
      padding: 0 20px;
      font-size: 14px;
      color:#666;
    }
  }
</style>
