<template>
  <div id=note class=detail>
    <NoteSidebar  @update:notes ="val => notes = val"/>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">
        请选择笔记
      </div>
      <div v-show="curNote.id" class="note-detail-ct">
        <div class="note-bar">
          <span>创建日期： {{curNote.createdAtImproved}}</span>
          <span>更新日期：{{ curNote.updatedAtImproved }}</span>
          <span>{{statusText}}</span>
          <span class="iconfont icon-delete" @click="onDeleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="isShow = !isShow"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model:value="curNote.title" @input="onUpdateNote" @keydown="statusText='正在输入中...'"  placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-show="isShow" v-model:value="curNote.content" @input="onUpdateNote" @keydown="statusText='正在输入中...'"  placeholder="请输入笔记内容，支持Markdown写法"></textarea>
          <div class="preview markdown-body" v-html="previewContent" v-show="!isShow"> <h1>hello</h1></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import NoteSidebar from "@/components/NoteSidebar.vue";
import _ from 'lodash'
import MarkdownIt from 'markdown-it'
import {  mapGetters, mapMutations, mapActions } from 'vuex'

let md = new MarkdownIt();

export default {
  name: 'NoteDetail',
  components: {NoteSidebar},
  data() {
    return {
      statusText: '笔记未改动',
      isShow: true
    }
  },
  created() {
    this.checkLogin({ path: '/login' })
  },

  computed:{
    ...mapGetters([
      'notes',
      'curNote'
    ]),

    previewContent(){
      return md.render(this.curNote.content || '')
    }
  },

  beforeRouteUpdate(to, from, next) {
    this.setCurNote({curNoteId: to.query.noteId})
    next()
  },
  methods:{

    ...mapActions([
     'updateNote',
      'deleteNote',
      'checkLogin'
    ]),
    ...mapMutations([
      'setCurNote'
    ]),

    onUpdateNote: _.debounce(function(){
      this.updateNote({noteId: this.curNote.id, title: this.curNote.title, content: this.curNote.content})
        .then(data => {
          this.statusText = '已保存'
        }).catch(err=>{
          this.statusText = '保存出错'
      })
    },300),

    onDeleteNote() {
      this.deleteNote({noteId: this.curNote.id})
        .then(data => {
          this.$router.replace({path: '/note'})
        })
    }
  }
}
</script>


<style scoped lang="less">
@import url(../assets/css/note-detail);
#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
</style>
