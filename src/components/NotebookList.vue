<template>
  <div id="notebook-list" class="detail">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i>  新建笔记本 &nbsp;</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表{{notebooks.length}}</h3>
        <div class="book-list">
          <router-link v-for="notebook in notebooks" :to="`/note?notebookId=${notebook.id}`" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span>{{notebook.title}}
              <span>{{notebook.noteCounts}}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="date">{{notebook.createdAtImproved}}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>

    </div>
</template>

<script >

import {  mapActions, mapGetters } from 'vuex'

// window.Notebooks = Notebooks 测试接口用
export default {
  name: 'NotebookList',
  data(){
    return {}
  },

  created() {
    this.checkLogin({ path:'/login' })
   this.getNotebooks()
  },

  computed: {
    ...mapGetters(['notebooks'])
  },

  methods: {
    ...mapActions([
      'getNotebooks',
      'updateNotebook',
      'addNotebook',
      'deleteNotebook',
      'checkLogin'
    ]),

    onCreate(){
      this.$prompt('请输入新笔记本标题:', '创建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不能超过30个字符'
      }).then(({ value }) => {
        this.addNotebook({title: value})
       })
    },

    onEdit(notebook){
      let title = ''
      this.$prompt('请输入笔记本标题:', '修改此笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: notebook.title,
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不能超过30个字符'
      }).then(({ value }) => {
        title = value
        this.updateNotebook({ notebookId: notebook.id, title: value })
      })
    },

    onDelete(notebook){
      this.$confirm('此操作将彻底删除此笔记本, 无法恢复，是否继续?', '删除此笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(()=>{
        this.deleteNotebook({ notebookId: notebook.id })
      })
      //   .then(res => {
      //   this.notebooks.splice(this.notebooks.indexOf(notebook),1)
      //   this.$message.success(res.msg)
      // })

    }
  }
}
</script>

<style scoped lang="less">
@import url(../assets/css/note-booklist);
</style>
