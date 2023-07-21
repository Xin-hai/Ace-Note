import request from '@/helpers/request'
import { improvedDate } from '@/helpers/util'

const URL = {
  GET: '/notes/trash',
  REVERT: '/notes/:noteId/revert',
  DELETE: '/notes/:noteId/confirm'
}

export default {
  getAll(){
    return new Promise((resolve, reject) => {
      request(URL.GET)
        .then(res => {
          res.data = res.data.sort((note1, note2) => note1.updatedAt < note2.updatedAt ? 1 : -1)
          res.data.forEach(note => {
            note.createdAtImproved = improvedDate(note.createdAt)
            note.updatedAtImproved = improvedDate(note.updatedAt)
          })
          resolve(res)
        }).catch(err => {
        reject(err)
      })
    })
  },
  revertNote({ noteId }){
    return request(URL.REVERT.replace(':noteId', noteId ),'PATCH')
  },
  deleteNote({ noteId }){
    return request(URL.DELETE.replace(':noteId',noteId),'DELETE')
  }
}
