<template>
      <div id="trash" class="detail">
        <div class="note-sidebar">
          <h3 class="notebook-title" >回收站</h3>
          <div class="menu">
            <div>更新时间</div>
            <div>标题</div>
          </div>
          <ul class="notes">
            <li v-for="note in trashNotes">
              <router-link :to="`/trash?noteId=${note.id}`">
                <span class="date">{{ note.updatedAtImproved }}</span>
                <span class="title">{{ note.title }}</span>
              </router-link>
            </li>
          </ul>
        </div>
          <div class="note-detail">
            <div class="note-bar" v-if="true">
              <span> 创建日期 {{curTrashNote.createdAtImproved}}</span>
              <span> | </span>
              <span> 更新日期 {{curTrashNote.updatedAtImproved}}</span>
              <span> | </span>
              <span> 所属笔记本：{{belongTo}}</span>

              <a class="btn action" @click="onRevert">恢复</a>
              <a class="btn action" @click="onDelete">彻底删除</a>
            </div>
            <div class="note-title">
              <span>{{curTrashNote.title}}</span>
            </div>
            <div class="editor">
              <div class="preview markdown-body" v-html="compiledMarkdown"></div>
            </div>
          </div>
      </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import {mapGetters, mapActions, mapMutations} from "vuex";

let md = new MarkdownIt();

export default {
  name: 'TrashDetail',
  data() {
    return {}
  },

  created() {
    this.checkLogin({ path: '/login' })
    this.getNotebooks()
    this.getTrashNotes()
      .then(() => {
        this.setCurTrashNote({curTrashNoteId: this.$route.query.noteId })
      })
  },

  computed: {
    compiledMarkdown(){
      return md.render(this.curTrashNote.content||'')
    },
    ...mapGetters([
      'trashNotes',
      'curTrashNote',
      'belongTo'
    ])
  },

  methods: {
    ...mapMutations([
      'setCurTrashNote',
    ]),
    ...mapActions([
      'checkLogin',
      'deleteTrashNote',
      'revertTrashNote',
      'getTrashNotes',
      'getNotebooks'
    ]),
    onDelete(){
      this.$confirm('此操作将彻底删除,无法恢复,是否继续?', '确定删除此笔记本？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(()=>{
        return this.deleteTrashNote({ noteId: this.curTrashNote.id })
      })

    },
    onRevert(){
      this.revertTrashNote({ noteId: this.curTrashNote.id })
    }
  },

  beforeRouteUpdate(to, from, next) {
    this.setCurTrashNote({ curTrashNoteId: to.query.noteId })
    next()
  }
}
</script>



<style scoped lang="less">
@import url(../assets/css/note-detail);
@import url(../assets/css/note-sidebar);

#trash {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
  position: relative;
  .note-bar {
    .action {
      float: right;
      font-size: 12px;
      margin-left: 10px;
      padding: 2px 4px;
    }
  }
}
</style>
