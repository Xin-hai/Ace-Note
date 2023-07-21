import Vue from 'vue'
import Router from 'vue-router'

// const Foo = () => import('./Foo.vue') VueRouter   模块懒加载

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      alias: '/notebooks',
      component:   () => import('@/components/NotebookList.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/Login.vue')
    },
    {
      path: '/helloWord',
      component: () => import('@/components/HelloWorld.vue')
    },
    {
      path: '/note',
      component: () => import('@/components/NoteDetail.vue')
    },
    {
      path: '/trash',
      component: () => import('@/components/TrashDetail.vue')
    }
  ]
})
