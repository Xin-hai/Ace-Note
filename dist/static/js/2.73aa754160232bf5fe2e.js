webpackJsonp([2],{Mr3i:function(e,s){},xJsL:function(e,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r=i("Dd8w"),t=i.n(r),o=i("NYxO"),n={name:"Login",data:function(){return{isShowLogin:!0,isShowRegister:!1,login:{username:"",password:"",notice:"请输入用户名和密码",isError:!1},register:{username:"",password:"",notice:"创建账户后请记住用户名和密码",isError:!1}}},methods:t()({},Object(o.b)({loginUser:"login",registerUser:"register"}),{showRegister:function(){this.isShowRegister=!0,this.isShowLogin=!1},showLogin:function(){this.isShowRegister=!1,this.isShowLogin=!0},onRegister:function(){var e=this,s=this.validUsername(this.register.username);if(!s.isValid)return this.register.isError=!0,void(this.register.notice=s.notice);var i=this.validPassword(this.register.password);if(!i.isValid)return this.register.isError=!0,void(this.register.notice=i.notice);this.registerUser({username:this.register.username,password:this.register.password}).then(function(){e.register.isError=!1,e.register.notice="",e.$router.push({path:"notebooks"})}).catch(function(s){e.register.isError=!0,e.register.notice=s.msg})},onLogin:function(){var e=this,s=this.validUsername(this.login.username);if(!s.isValid)return this.login.isError=!0,void(this.login.notice=s.notice);var i=this.validPassword(this.login.password);if(!i.isValid)return this.login.isError=!0,void(this.login.notice=i.notice);this.loginUser({username:this.login.username,password:this.login.password}).then(function(){e.login.isError=!1,e.login.notice="",e.$router.push({path:"notebooks"})}).catch(function(s){e.login.isError=!0,e.login.notice=s.msg})},validUsername:function(e){return{isValid:/^[\w\u4e00-\u9fa5]{3,15}$/.test(e),notice:"用户名必须是3-15个字符，仅限于数字、英文字母和中文"}},validPassword:function(e){return{isValid:/^[\w_-]{6,16}$/.test(e),notice:"密码长度为6-16个字符"}}})},a={render:function(){var e=this,s=e.$createElement,i=e._self._c||s;return i("div",{attrs:{id:"login"}},[i("div",{staticClass:"modal-mask"},[i("div",{staticClass:"modal-wrapper"},[i("div",{staticClass:"modal-container"},[i("div",{staticClass:"main"}),e._v(" "),i("div",{staticClass:"form"},[i("h3",{on:{click:e.showRegister}},[e._v("创建账户")]),e._v(" "),i("transition",{attrs:{name:"slide"}},[i("div",{staticClass:"register",class:{show:e.isShowRegister}},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.register.username,expression:"register.username"}],attrs:{type:"text",placeholder:"用户名"},domProps:{value:e.register.username},on:{input:function(s){s.target.composing||e.$set(e.register,"username",s.target.value)}}}),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.register.password,expression:"register.password"}],attrs:{type:"password",placeholder:"密码"},domProps:{value:e.register.password},on:{keyup:function(s){return!s.type.indexOf("key")&&e._k(s.keyCode,"enter",13,s.key,"Enter")?null:e.onRegister.apply(null,arguments)},input:function(s){s.target.composing||e.$set(e.register,"password",s.target.value)}}}),e._v(" "),i("p",{class:{error:e.register.isError}},[e._v(" "+e._s(e.register.notice))]),e._v(" "),i("div",{staticClass:"button",on:{click:e.onRegister}},[e._v("创建账号")])])]),e._v(" "),i("h3",{on:{click:e.showLogin}},[e._v("登录")]),e._v(" "),i("transition",{attrs:{name:"slide"}},[i("div",{staticClass:"login",class:{show:e.isShowLogin}},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.login.username,expression:"login.username"}],attrs:{type:"text",placeholder:"用户名"},domProps:{value:e.login.username},on:{input:function(s){s.target.composing||e.$set(e.login,"username",s.target.value)}}}),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.login.password,expression:"login.password"}],attrs:{type:"password",placeholder:"密码"},domProps:{value:e.login.password},on:{input:function(s){s.target.composing||e.$set(e.login,"password",s.target.value)}}}),e._v(" "),i("p",{class:{error:e.login.isError}},[e._v(" "+e._s(e.login.notice))]),e._v(" "),i("div",{staticClass:"button",on:{click:e.onLogin}},[e._v("登录")])])])],1)])])])])},staticRenderFns:[]};var l=i("VU/8")(n,a,!1,function(e){i("Mr3i")},"data-v-87d5e504",null);s.default=l.exports}});
//# sourceMappingURL=2.73aa754160232bf5fe2e.js.map