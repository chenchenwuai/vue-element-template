<template>
  <div class="login-container">
    <el-form ref="loginForm" :inline="false" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="off" label-position="left">
      <div class="title-container">
        <h3 class="title">{{ WEB_TITLE }}</h3>
      </div>
      <el-form-item prop="username" class="inline-form-item">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
          :autofocus="true"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="大写已锁定" placement="right" manual>
        <el-form-item prop="password" :inline="false" style="width:100%;">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <a :class="['btn btn-4',loading ? 'logining':'']" @click="handleLogin">{{ loading ? '登录中...' : '登录' }}</a>
    </el-form>
  </div>
</template>

<script>

import md5 from 'js-md5'
import { mapGetters } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          { min: 5, trigger: 'blur', message: '密码不小于5位' }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  computed: {
    ...mapGetters(['WEB_TITLE'])
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    } else {
      this.$refs.username.focus()
    }
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      if (this.loading) {
        return
      }
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const ps = md5(this.loginForm.password)
          this.$store.dispatch('Login', {
            username: this.loginForm.username,
            password: ps.toUpperCase()
          }).then(() => {
            this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          }).catch((e) => {
            console.log(e)
            if (e.message) {
              this.$message.error(e.message)
            }
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          this.loading = false
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: calc( 100% - 31px);

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      // 修复chrome自动填充密码后有背景颜色的bug
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active{
        background-clip: text;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  width: 100%;
  height:100%;
  background: #889aa4;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    z-index: 1;
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    background: #889aa4; /* IE Fallback */
    background: rgba(36,46,77,.7);
    width: 100%;
    height: 100%;
  }

  .login-form {
    width: 400px;
    max-width: 100%;
    overflow: hidden;
    z-index: 2;
    padding: 20px;
    position: relative;
    background: rgba(0,0,0,0.2);

    .at-icon{
      font-size: 18px;
      color: #fff;
      width: 30px;
      display: inline-block;
      text-align: center;
    }
  }

  .inline-form-item{
    display: inline-block;
    width: 100%;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    padding-top:30px;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}

//default button
.btn {
  color: #fff;
  cursor: pointer;
  display: block;
  font-size:16px;
  font-weight: 400;
  line-height: 40px;
  margin: 0 auto;
  max-width: 160px;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  width: 100%;
  user-select: none;

  &:hover { text-decoration: none; }

}

.btn-4 {
  border: 1px solid #6477b9;
  overflow: hidden;
  position: relative;

  &:after {
    background: #fff;
    content: "";
    height: 155px;
    left: -75px;
    opacity: .2;
    position: absolute;
    top: -50px;
    transform: rotate(35deg);
    transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
    width: 50px;
    z-index: -10;
  }
}

.btn-4:hover, .logining {
  border: 1px solid #64d077;
  color:#64d077;
  transition: border color .55s ease;

  &:after {
    left: 120%;
    transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
  }
}
</style>
