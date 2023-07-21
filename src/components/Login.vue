<template>
  <div id="login">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="main"></div>
          <div class="form">
            <h3 @click="showRegister">创建账户</h3>
            <transition name="slide">
              <div class="register" v-bind:class="{show: isShowRegister}">
                <input type="text" v-model="register.username" placeholder="用户名">
                <input type="password" v-model="register.password" @keyup.enter="onRegister" placeholder="密码">
                <p :class="{error: register.isError}"> {{ register.notice }}</p>
                <div class="button" @click="onRegister">创建账号</div>
              </div>
            </transition>

            <h3 @click="showLogin">登录</h3>
            <transition name="slide">
              <div class="login" v-bind:class="{show: isShowLogin}">
                <input type="text" v-model="login.username" placeholder="用户名">
                <input type="password" v-model="login.password" placeholder="密码">
                <p :class="{error: login.isError}"> {{ login.notice }}</p>
                <div class="button" @click="onLogin">登录</div>
              </div>
            </transition>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>


import { mapActions } from "vuex";


export default {
  name: 'Login',
  data() {
    return {
      isShowLogin: true,
      isShowRegister: false,
      login: {
        username: 'hunger',
        password: '123456',
        notice: '请输入用户名和密码',
        isError: false,
      },
      register: {
        username: '',
        password: '',
        notice: '创建账户后请记住用户名和密码',
        isError: false,
      }
    }
  },
  methods: {
    ...mapActions({
        loginUser: 'login',
        registerUser: 'register'
    }
    ),

    showRegister() {
      this.isShowRegister = true
      this.isShowLogin = false
    },
    showLogin() {
      this.isShowRegister = false
      this.isShowLogin = true
    },
    onRegister() {
      let result1 = this.validUsername(this.register.username)
      if (!result1.isValid) {
        this.register.isError = true
        this.register.notice = result1.notice
        return
      }
      let result2 = this.validPassword(this.register.password)
      if (!result2.isValid) {
        this.register.isError = true
        this.register.notice = result2.notice
        return
      }

     this.registerUser(
        {username:this.register.username,
        password: this.register.password
      }).then( () => {
        this.register.isError = false
        this.register.notice = ''
        this.$router.push({path: 'notebooks'})
      }).catch(data => {
        this.register.isError = true
        this.register.notice = data.msg
      })

    },

    onLogin() {
      let result1 = this.validUsername(this.login.username)
      if (!result1.isValid) {
        this.login.isError = true
        this.login.notice = result1.notice
        return
      }
      let result2 = this.validPassword(this.login.password)
      if (!result2.isValid) {
        this.login.isError = true
        this.login.notice = result2.notice
        return
      }

    this.loginUser({
      username: this.login.username,
      password: this.login.password
    }).then( ()=>{
      this.login.isError = false
      this.login.notice = ''
      this.$router.push({path: 'notebooks'})
    }).catch(data => {
      this.login.isError = true
      this.login.notice = data.msg
    })


    },
    validUsername(username) {
      return {
        isValid: /^[\w\u4e00-\u9fa5]{3,15}$/.test(username),
        notice: '用户名必须是3-15个字符，仅限于数字、英文字母和中文',
      }
    },
    validPassword(password) {
      return {
        isValid: /^[\w_-]{6,16}$/.test(password),
        notice: '密码长度为6-16个字符',
      }
    }
  }
}
</script>

<style lang="less" scoped>
.modal-mask {
  position: fixed;

  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, .7);
  display: table;
  transition: opacity .3s ease;
  z-index: 10;
}

.modal-wrapper {
  display: table-cell;
  //类似于HTML的td
  vertical-align: baseline; // 1
  position: relative;
}

.modal-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  width: 1000px;
  height: 560px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, .5);
  transition: all 0.5s ease-out;
  font-family: Helvetica, Arial, sans-serif;


  .main {
    flex: 1;
    background: #42b983 url(//cdn.pixabay.com/photo/2016/01/09/18/28/notebook-1130742_1280.jpg) center center no-repeat;
    background-size: contain;
  }

  .form {
    border-left: 1px solid #ccc;
    width: 340px;
    overflow: hidden;

    h3 {
      margin-top: -1px;
      padding: 10px 20px;
      font-weight: normal;
      font-size: 18px;
      border-top: 1px solid #eee;
      cursor: pointer;

      &:nth-of-type(2) {
        border-bottom: 1px solid #eee;
      }
    }

    .button {
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-weight: bold;
      color: #fff;
      background-color: #42b983;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 20px;
    }

    .login,.register {

      padding: 0 20px;
      border-top: 1px solid #eee;
      height: 0;
      overflow: hidden;
      transition: height .5s;

      &.show {
        height: 193px
      }

      input {
        border: 1px solid #ccc;
        display: block;
        width: 100%;
        height: 40px;
        line-height: 40px;
        margin-top: 10px;
        padding-left: 6px;
        padding-right: 6px;
        border-radius: 4px;
        outline: none;
        font-size: 14px;
      }

      input:focus {
        border: 3px solid #9dcaf8;
      }

      p {
        font-size: 12px;
        margin-top: 10px;
        color: #444
      }

      .error {
        color: red;
      }
    }

    .login {
      border-top: 0;
    }
  }
}

</style>
