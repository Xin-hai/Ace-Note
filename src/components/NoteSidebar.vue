<template>
  <div class="note-sidebar">
    <span class="add-note btn" @click="onAddNote">添加笔记</span>
    <el-dropdown @command="handleCommand" class="notebook-title" placement="bottom" trigger="click">
  <span class="el-dropdown-link">
    {{curBook.title}} <i class="iconfont icon-down"></i>
  </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :command="notebook.id">{{ notebook.title }}</el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes">
        <router-link :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
          <span class="date">{{ note.updatedAtImproved }}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

import {  mapGetters, mapMutations, mapActions } from 'vuex'

// window.Notes= Notes Note接口测试用
export default {

  created(){
    this.getNotebooks()
      .then(()=>{
        this.setCurBook({ curBookId: this.$route.query.notebookId })
        return this.getNotes({notebookId: this.curBook.id})
      })
        .then(()=>{
        this.setCurNote({ curNoteId: this.$route.query.noteId })
          this.$router.replace({
            path: '/note',
            query: {
              noteId: this.curNote.id,
              notebookId: this.curBook.id
            }
          })
    })

    // Notebooks.getAll()
    //   .then(res => {
    //     this.notebooks = res.data
    //     this.curBook = this.notebooks.find( notebook => notebook.id == this.$route.query.notebookId)
    //       || this.notebooks[0] || {}
    //     return Notes.getAll({notebookId: this.curBook.id})
    //   }).then(res => {
    //     this.notes = res.data
    //     this.$emit('update:notes',this.notes)
    //     Bus.$emit('update:notes',this.notes)
    //   })
  },
  // props: ['curNote'],
  data() {
    return {}
  },

  computed: {

    ...mapGetters([
      'notebooks',
      'notes',
      'curBook',
      'curNote'
    ])
  },

  methods: {
    ...mapActions([
      'getNotes',
      'getNotebooks',
      'addNote'
    ]),
    ...mapMutations([
      'setCurBook',
      'setCurNote'
    ]),
    handleCommand(notebookId) {
      if(notebookId === 'trash'){
        return this.$router.push({path: '/trash'})
        }
      this.$store.commit('setCurBook', { curBookId: notebookId})
      this.getNotes({ notebookId })
        .then(()=>{
          this.setCurNote()
          this.$router.replace({
            path: '/note',
            query: {
              noteId: this.curNote.id,
              notebookId: this.curBook.id
            }
          })
        })

    },
    onAddNote(){
      this.addNote({notebookId:this.curBook.id})
    }
  }
}
</script>


<style scoped lang="less">
@import url(../assets/css/note-sidebar.less);
</style>



